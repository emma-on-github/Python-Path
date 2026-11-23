import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Loader2,
  Play,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { PYTHON_QUESTIONS, PythonQuestion } from "./data/questions";
import {
  getPyodide,
  normalizeOutput,
  PythonExecutionResult,
  runPythonCode,
} from "./lib/pyodide";
import { formatUkDate, generateCredentialId } from "./lib/certificate";
import { CheatSheetPanel } from "./components/CheatSheetPanel";
import { CodeEditor } from "./components/CodeEditor";
import { CertificateCard } from "./components/CertificateCard";

type EngineStatus = "loading" | "ready" | "error";

interface QuestionProgress {
  code: string;
  incorrectAttempts: number;
  passed: boolean;
  solutionVisible: boolean;
  lastResult: PythonExecutionResult | null;
  lastErrorBanner: string | null;
}

function createInitialProgress(): Record<number, QuestionProgress> {
  const initial: Record<number, QuestionProgress> = {};
  for (const q of PYTHON_QUESTIONS) {
    initial[q.id] = {
      code: q.starterCode,
      incorrectAttempts: 0,
      passed: false,
      solutionVisible: false,
      lastResult: null,
      lastErrorBanner: null,
    };
  }
  return initial;
}

export default function App() {
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("loading");
  const [engineError, setEngineError] = useState<string | null>(null);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progressById, setProgressById] = useState<Record<number, QuestionProgress>>(
    createInitialProgress
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const [certificateMeta] = useState(() => ({
    ukDate: formatUkDate(new Date()),
    credentialId: generateCredentialId(),
  }));

  const currentQuestion: PythonQuestion = PYTHON_QUESTIONS[currentIndex];
  const currentState: QuestionProgress = progressById[currentQuestion.id];

  const completedCount = useMemo(
    () => PYTHON_QUESTIONS.filter((q) => progressById[q.id]?.passed).length,
    [progressById]
  );
  const allCompleted = completedCount === PYTHON_QUESTIONS.length;

  const initialisePyodide = useCallback(async () => {
    setEngineStatus("loading");
    setEngineError(null);
    try {
      await getPyodide();
      setEngineStatus("ready");
    } catch (err) {
      setEngineStatus("error");
      setEngineError(
        err instanceof Error
          ? err.message
          : "Could not initialise the in-browser Python runtime."
      );
    }
  }, []);

  useEffect(() => {
    initialisePyodide();
  }, [initialisePyodide]);

  const updateCurrentQuestion = (
    questionId: number,
    updater: (prev: QuestionProgress) => QuestionProgress
  ) => {
    setProgressById((prev) => ({
      ...prev,
      [questionId]: updater(prev[questionId]),
    }));
  };

  const handleCodeChange = (nextCode: string) => {
    const qId = currentQuestion.id;
    updateCurrentQuestion(qId, (prev) => ({
      ...prev,
      code: nextCode,
    }));
  };

  const handleResetCode = () => {
    const q = currentQuestion;
    updateCurrentQuestion(q.id, (prev) => ({
      ...prev,
      code: q.starterCode,
      lastResult: null,
      lastErrorBanner: null,
    }));
  };

  const handleRunCode = async () => {
    if (engineStatus !== "ready" || isRunning) return;

    const q = currentQuestion;
    const codeToRun = currentState.code;
    setIsRunning(true);

    try {
      const result = await runPythonCode(codeToRun, q.requiredSymbols);
      const actualNormalized = normalizeOutput(result.stdout);
      const expectedNormalized = normalizeOutput(q.expectedOutput);

      const hasPythonError = Boolean(result.errorType);
      const outputMatches = actualNormalized === expectedNormalized;
      const didPass = !hasPythonError && outputMatches && result.extraCheckPassed;

      let errorBanner: string | null = null;
      if (!didPass) {
        if (hasPythonError) {
          errorBanner = `Your code raised a ${result.errorType}. Read the plain-English tip in the console below and give it another try.`;
        } else if (!outputMatches) {
          errorBanner =
            actualNormalized.length === 0
              ? "Nothing was printed yet. Make sure you use print() to display the answer."
              : "Close! Your output did not match the expected text yet. Compare your output with the expected answer.";
        } else if (!result.extraCheckPassed && result.extraCheckMessage) {
          errorBanner = result.extraCheckMessage;
        }
      }

      updateCurrentQuestion(q.id, (prev) => ({
        ...prev,
        lastResult: result,
        lastErrorBanner: errorBanner,
        passed: prev.passed || didPass,
        incorrectAttempts: didPass
          ? prev.incorrectAttempts
          : prev.incorrectAttempts + 1,
      }));
    } catch (err) {
      updateCurrentQuestion(q.id, (prev) => ({
        ...prev,
        lastErrorBanner:
          err instanceof Error
            ? err.message
            : "Something went wrong while running your Python code.",
        incorrectAttempts: prev.incorrectAttempts + 1,
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleToggleSampleSolution = () => {
    updateCurrentQuestion(currentQuestion.id, (prev) => ({
      ...prev,
      solutionVisible: !prev.solutionVisible,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < PYTHON_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowCertificate(false);
    } else if (allCompleted) {
      setShowCertificate(true);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setShowCertificate(false);
    setCurrentIndex(index);
  };

  const canNavigateToStep = (index: number) => {
    if (index === 0) return true;
    const targetQ = PYTHON_QUESTIONS[index];
    const prevQ = PYTHON_QUESTIONS[index - 1];
    return (
      Boolean(progressById[targetQ.id]?.passed) ||
      Boolean(progressById[prevQ.id]?.passed) ||
      index <= currentIndex
    );
  };

  const progressPercentage = Math.round(
    (completedCount / PYTHON_QUESTIONS.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar: strict 3-zone contract */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <a
            href="#sandbox"
            onClick={(e) => {
              e.preventDefault();
              setShowCertificate(false);
            }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Python Path
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#sandbox"
              onClick={() => setShowCertificate(false)}
              className="transition-colors hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Sandbox
            </a>
            <a
              href="#cheat-sheet"
              onClick={(e) => {
                e.preventDefault();
                setIsCheatSheetOpen(true);
                window.setTimeout(() => {
                  document
                    .getElementById("cheat-sheet")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
              className="transition-colors hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Cheat Sheet
            </a>
            <a
              href="#privacy"
              className="transition-colors hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Privacy
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCheatSheetOpen((open) => !open)}
              aria-expanded={isCheatSheetOpen}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
              <span>Cheat Sheet</span>
              {isCheatSheetOpen ? (
                <ChevronUp className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="sandbox" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Welcome & Trust Strip */}
        <section className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2.5 flex flex-wrap items-center gap-3">

              {engineStatus === "loading" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-600" aria-hidden="true" />
                  <span>Loading browser Python sandbox...</span>
                </span>
              )}

              {engineStatus === "ready" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  <span>Python 3 WebAssembly ready</span>
                </span>
              )}

              {engineStatus === "error" && (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{engineError}</span>
                  <button
                    type="button"
                    onClick={initialisePyodide}
                    className="underline hover:text-red-900"
                  >
                    Retry
                  </button>
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl [text-wrap:balance]">
              Learn Python Foundations Safely in Your Browser
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Complete 10 step-by-step beginner exercises. Everything runs locally on your device with zero accounts and
              zero server storage.
            </p>
          </div>

          {allCompleted && !showCertificate && (
            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 whitespace-nowrap shrink-0"
            >
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Claim Your Certificate</span>
            </button>
          )}
        </section>

        {/* Visual Progress Bar (Question X of 10) */}
        <section aria-label="Course progress" className="mb-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 tabular-nums">
              <span>
                Question {currentQuestion.id} of {PYTHON_QUESTIONS.length}
              </span>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="font-medium text-slate-600">{currentQuestion.topic}</span>
            </div>

            <div className="text-xs font-medium text-slate-600 tabular-nums">
              {completedCount} of {PYTHON_QUESTIONS.length} completed ({progressPercentage}%)
            </div>
          </div>

          <div
            role="progressbar"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={PYTHON_QUESTIONS.length}
            aria-label="Completed Python challenges"
            className="mb-3.5 h-2 w-full overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-sky-600 transition-all duration-300"
              style={{ width: `${Math.max(progressPercentage, 4)}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {PYTHON_QUESTIONS.map((q, idx) => {
              const isPassed = Boolean(progressById[q.id]?.passed);
              const isCurrent = !showCertificate && idx === currentIndex;
              const unlocked = canNavigateToStep(idx);

              return (
                <button
                  key={q.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => handleSelectQuestion(idx)}
                  title={`Question ${q.id}: ${q.topic}`}
                  className={`flex h-9 items-center justify-center gap-1 rounded-lg border text-xs font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                    isCurrent
                      ? "border-sky-600 bg-sky-600 text-white"
                      : isPassed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        : unlocked
                          ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                  }`}
                >
                  <span>{q.id}</span>
                  {isPassed && !isCurrent && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Collapsible Cheat Sheet */}
        <CheatSheetPanel isOpen={isCheatSheetOpen} />

        {/* Main Workspace: Either Certificate View or Two-Zone Sandbox */}
        {showCertificate && allCompleted ? (
          <CertificateCard
            ukDate={certificateMeta.ukDate}
            credentialId={certificateMeta.credentialId}
            onBackToChallenges={() => setShowCertificate(false)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Zone: Challenge Prompt, Tutor & Sample Solution */}
            <section
              aria-label="Challenge instructions"
              className="space-y-5 lg:col-span-5"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-medium text-sky-700">
                    Challenge {String(currentQuestion.id).padStart(2, "0")} · {currentQuestion.topic}
                  </span>
                  <span className="tabular-nums">
                    Failed attempts: {currentState.incorrectAttempts}
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {currentQuestion.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  {currentQuestion.prompt}
                </p>

                {currentQuestion.starterVariables.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-1.5 text-xs font-semibold text-slate-600">
                      Provided Starter Variables
                    </p>
                    <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs leading-relaxed text-slate-800">
                      <code>{currentQuestion.starterVariables.join("\n")}</code>
                    </pre>
                  </div>
                )}

                <div className="mt-4">
                  <p className="mb-1.5 text-xs font-semibold text-slate-600">Expected Output</p>
                  <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 px-3.5 py-2.5 font-mono text-xs leading-relaxed text-emerald-300">
                    <code>{currentQuestion.expectedOutput}</code>
                  </pre>
                </div>

                {/* Sample Solution Action (Revealed after 3 failed attempts) */}
                {currentState.incorrectAttempts >= 3 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-slate-200 pt-4">
                    <button
                      type="button"
                      onClick={handleToggleSampleSolution}
                      className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 whitespace-nowrap shrink-0"
                    >
                      <Eye className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                      <span>
                        {currentState.solutionVisible
                          ? "Hide Sample Solution"
                          : "Show Sample Solution"}
                      </span>
                    </button>
                  </div>
                )}

                {/* Sample Solution Panel (Revealed only after 3 failed attempts + click) */}
                {currentState.incorrectAttempts >= 3 && currentState.solutionVisible && (
                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-4">
                    <p className="mb-2 text-xs font-semibold text-amber-950">
                      Sample Solution Reference
                    </p>
                    <pre className="overflow-x-auto rounded-md bg-slate-900 px-3 py-2.5 font-mono text-xs leading-relaxed text-slate-100">
                      <code>{currentQuestion.sampleSolution}</code>
                    </pre>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
                      {currentQuestion.solutionExplanation}
                    </p>
                    <p className="mt-2 text-xs font-medium text-amber-900">
                      Try entering and running this in the editor to pass the challenge.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Right Zone: Interactive Editor, Run Control, Console & Grading */}
            <section
              aria-label="Python code editor and output console"
              className="space-y-4 lg:col-span-7"
            >
              <CodeEditor
                value={currentState.code}
                onChange={handleCodeChange}
                onReset={handleResetCode}
                onRunShortcut={handleRunCode}
                disabled={isRunning}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={engineStatus !== "ready" || isRunning}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 whitespace-nowrap shrink-0"
                >
                  {engineStatus === "loading" || isRunning ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  )}
                  <span>
                    {engineStatus === "loading"
                      ? "Initialising Python..."
                      : isRunning
                        ? "Running..."
                        : "Run Python Code"}
                  </span>
                </button>

                {currentState.passed && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {currentIndex < PYTHON_QUESTIONS.length - 1
                        ? "Next Question"
                        : "View Your Certificate"}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Console / Output Box */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Terminal className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    <span>Console Output</span>
                  </div>
                  {currentState.lastResult && !currentState.lastResult.errorType && (
                    <span className="text-xs text-slate-500">Executed in browser</span>
                  )}
                </div>

                <div className="p-4">
                  {!currentState.lastResult ? (
                    <p className="font-mono text-xs text-slate-400">
                      Click &quot;Run Python Code&quot; to see your output here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {/* Standard Output (print) */}
                      <div>
                        <p className="mb-1 text-xs font-medium text-slate-500">Printed Output (stdout)</p>
                        <pre className="min-h-[48px] overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-3 font-mono text-sm leading-relaxed text-slate-100">
                          <code>
                            {currentState.lastResult.stdout.length > 0
                              ? currentState.lastResult.stdout
                              : "(nothing printed)"}
                          </code>
                        </pre>
                      </div>

                      {/* Optional Return Value if standalone expression was evaluated */}
                      {currentState.lastResult.returnValue !== null && (
                        <div>
                          <p className="mb-1 text-xs font-medium text-slate-500">Return Value</p>
                          <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs text-slate-800">
                            <code>{currentState.lastResult.returnValue}</code>
                          </pre>
                        </div>
                      )}

                      {/* Friendly Error Tip + Python Traceback */}
                      {currentState.lastResult.errorType && (
                        <div className="space-y-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3.5">
                          {currentState.lastResult.friendlyTip && (
                            <div className="flex items-start gap-2">
                              <AlertCircle
                                className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium leading-relaxed text-red-950">
                                {currentState.lastResult.friendlyTip}
                              </p>
                            </div>
                          )}

                          {currentState.lastResult.traceback && (
                            <pre className="overflow-x-auto rounded-md bg-slate-900 px-3 py-2.5 font-mono text-xs leading-relaxed text-red-300">
                              <code>{currentState.lastResult.traceback}</code>
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Gentle Grading Feedback Banner */}
              {currentState.passed && (
                <div
                  role="status"
                  className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-emerald-950">
                        Correct! Output matched.
                      </p>
                      <p className="text-xs text-emerald-800">
                        {currentIndex < PYTHON_QUESTIONS.length - 1
                          ? "Nice job! You've unlocked the next challenge."
                          : allCompleted
                            ? "You've completed all 10 challenges! You can now download your PDF certificate."
                            : "Great work on Question 10! Complete any remaining challenges to claim your certificate."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {currentIndex < PYTHON_QUESTIONS.length - 1
                        ? "Next Question"
                        : allCompleted
                          ? "View Certificate"
                          : "Finish"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {!currentState.passed && currentState.lastErrorBanner && (
                <div
                  role="status"
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
                >
                  <p className="font-semibold text-amber-900">Keep going — almost there</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-amber-900">
                    {currentState.lastErrorBanner}
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Privacy Promise Section */}
        <section
          id="privacy"
          className="mt-8 rounded-lg border border-slate-200 bg-white px-4 py-3.5"
        >
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <div>
              <h2 className="text-xs font-semibold text-slate-900">
                Zero-Storage UK GDPR Architecture
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                Python runs locally in your browser via WebAssembly, progress stays in temporary page memory, and
                certificates render on your device with zero server storage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-xs text-slate-500 sm:px-6">
          <span>Python Path · Created by Emma Hicks</span>
          <span>Client-Side Execution · Zero Backend User Storage</span>
        </div>
      </footer>
    </div>
  );
}
