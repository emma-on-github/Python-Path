import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { CourseModuleId } from "../data/courseLessons";
import { EXAM_QUESTIONS, ExamBand } from "../data/examQuestions";
import {
  CertificateAwardLevel,
  formatUkDate,
  generateCertificateId,
} from "../lib/certificate";
import { PythonExecutionResult, runPythonCode } from "../lib/pyodide";
import { CertificateCard } from "./CertificateCard";
import { CodeEditor } from "./CodeEditor";

export type ExamPhase = "intro" | "active" | "results";
export type ExamTrack = ExamBand | "Full";

export interface ExamAnswerState {
  code: string;
  attempted: boolean;
  passed: boolean;
  hintVisible: boolean;
  lastResult: PythonExecutionResult | null;
}

export interface ExamSessionState {
  phase: ExamPhase;
  selectedTrack: ExamTrack;
  currentIndex: number;
  answersById: Record<number, ExamAnswerState>;
  certificateId: string;
  completionDate: string;
}

const EXAM_TRACKS: {
  id: ExamTrack;
  badge: string;
  title: string;
  description: string;
}[] = [
  {
    id: "Beginner",
    badge: "5 Questions · Pass threshold: 3 / 5",
    title: "Beginner Exam",
    description:
      "Core syntax, conditionals, loops, lists, and functions. Score at least 3/5 to earn the Beginner Python Certificate.",
  },
  {
    id: "Intermediate",
    badge: "5 Questions · Pass threshold: 3 / 5",
    title: "Intermediate Exam",
    description:
      "Comprehensions, dictionaries, try/except, OOP classes, and JSON. Score at least 3/5 to earn the Intermediate Python Certificate.",
  },
  {
    id: "Advanced",
    badge: "5 Questions · Pass threshold: 3 / 5",
    title: "Advanced Exam",
    description:
      "Decorators, generators, context managers, dataclasses, and algorithms. Score at least 3/5 for the Advanced Certificate.",
  },
  {
    id: "Full",
    badge: "15 Questions · All Levels",
    title: "Full Tiered Assessment",
    description:
      "Take all 3 levels together (3/5 per level to pass). Passing all 3 tiers unlocks the Complete Python Certificate.",
  },
];

export function createInitialExamState(track: ExamTrack = "Beginner"): ExamSessionState {
  const answersById: Record<number, ExamAnswerState> = {};
  for (const q of EXAM_QUESTIONS) {
    answersById[q.id] = {
      code: q.starterCode,
      attempted: false,
      passed: false,
      hintVisible: false,
      lastResult: null,
    };
  }
  return {
    phase: "intro",
    selectedTrack: track,
    currentIndex: 0,
    answersById,
    certificateId: generateCertificateId(),
    completionDate: formatUkDate(new Date()),
  };
}

function getQuestionsForTrack(track: ExamTrack) {
  if (track === "Full") return EXAM_QUESTIONS;
  return EXAM_QUESTIONS.filter((q) => q.band === track);
}

function getModuleIdForBand(band: ExamBand): CourseModuleId {
  if (band === "Beginner") return "beginner";
  if (band === "Intermediate") return "intermediate";
  return "advanced";
}

function getModuleTitleForBand(band: ExamBand): string {
  if (band === "Beginner") return "Module 1: Beginner Python";
  if (band === "Intermediate") return "Module 2: Intermediate Python";
  return "Module 3: Advanced Python";
}

interface CertificationExamProps {
  engineStatus: "loading" | "ready" | "error";
  learnerName: string;
  onLearnerNameChange: (name: string) => void;
  examState: ExamSessionState;
  onUpdateExamState: (updater: (prev: ExamSessionState) => ExamSessionState) => void;
  onReviewLesson: (moduleId: CourseModuleId, lessonId: string) => void;
}

export function CertificationExam({
  engineStatus,
  learnerName,
  onLearnerNameChange,
  examState,
  onUpdateExamState,
  onReviewLesson,
}: CertificationExamProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isGradingAll, setIsGradingAll] = useState(false);

  const activeQuestions = useMemo(
    () => getQuestionsForTrack(examState.selectedTrack),
    [examState.selectedTrack]
  );

  const safeIndex = Math.min(examState.currentIndex, Math.max(0, activeQuestions.length - 1));
  const currentQuestion = activeQuestions[safeIndex];
  const currentAnswer = examState.answersById[currentQuestion.id];

  const bandSummary = useMemo(() => {
    const beginnerQs = EXAM_QUESTIONS.filter((q) => q.band === "Beginner");
    const intermediateQs = EXAM_QUESTIONS.filter((q) => q.band === "Intermediate");
    const advancedQs = EXAM_QUESTIONS.filter((q) => q.band === "Advanced");

    const beginnerScore = beginnerQs.filter((q) => examState.answersById[q.id]?.passed).length;
    const intermediateScore = intermediateQs.filter((q) => examState.answersById[q.id]?.passed).length;
    const advancedScore = advancedQs.filter((q) => examState.answersById[q.id]?.passed).length;

    let awardedLevel: CertificateAwardLevel | null = null;
    const beginnerPassed = beginnerScore >= 3;
    const intermediatePassed = beginnerPassed && intermediateScore >= 3;
    const advancedPassed = intermediatePassed && advancedScore >= 3;

    if (examState.selectedTrack === "Full") {
      awardedLevel = advancedPassed
        ? "Complete"
        : intermediatePassed
          ? "Intermediate"
          : beginnerPassed
            ? "Beginner"
            : null;
    } else if (examState.selectedTrack === "Beginner") {
      awardedLevel = beginnerScore >= 3 ? "Beginner" : null;
    } else if (examState.selectedTrack === "Intermediate") {
      awardedLevel = intermediateScore >= 3 ? "Intermediate" : null;
    } else if (examState.selectedTrack === "Advanced") {
      awardedLevel = advancedScore >= 3 ? "Advanced" : null;
    }

    const activePassed = activeQuestions.filter((q) => examState.answersById[q.id]?.passed).length;

    return {
      beginnerScore,
      intermediateScore,
      advancedScore,
      beginnerPassed,
      intermediatePassed,
      advancedPassed,
      awardedLevel,
      activePassed,
    };
  }, [examState.answersById, examState.selectedTrack, activeQuestions]);

  const handleRunCurrentTests = async () => {
    if (engineStatus !== "ready" || isRunning || isGradingAll) return;
    setIsRunning(true);
    const q = currentQuestion;
    const codeToRun = currentAnswer.code;

    try {
      const result = await runPythonCode(codeToRun, {
        hiddenTests: q.hiddenTests,
      });
      const passed = !result.errorType && result.testsPassed;
      onUpdateExamState((prev) => ({
        ...prev,
        answersById: {
          ...prev.answersById,
          [q.id]: {
            ...prev.answersById[q.id],
            attempted: true,
            passed,
            lastResult: result,
          },
        },
      }));
    } catch (err) {
      onUpdateExamState((prev) => ({
        ...prev,
        answersById: {
          ...prev.answersById,
          [q.id]: {
            ...prev.answersById[q.id],
            attempted: true,
            passed: false,
            lastResult: {
              stdout: "",
              returnValue: null,
              errorType: "RuntimeError",
              traceback: err instanceof Error ? err.message : "Execution error",
              friendlyTip: "Unable to execute test checks right now.",
              testsPassed: false,
              testMessage: null,
            },
          },
        },
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitAndGradeExam = async () => {
    if (engineStatus !== "ready" || isGradingAll || isRunning) return;
    setIsGradingAll(true);

    try {
      const updatedAnswers: Record<number, ExamAnswerState> = { ...examState.answersById };

      for (const q of activeQuestions) {
        const entry = updatedAnswers[q.id];
        const codeChangedFromStarter = entry.code.trim() !== q.starterCode.trim();
        if (codeChangedFromStarter || entry.attempted) {
          const result = await runPythonCode(entry.code, {
            hiddenTests: q.hiddenTests,
          });
          updatedAnswers[q.id] = {
            ...entry,
            attempted: true,
            passed: !result.errorType && result.testsPassed,
            lastResult: result,
          };
        }
      }

      onUpdateExamState((prev) => ({
        ...prev,
        answersById: updatedAnswers,
        phase: "results",
        completionDate: formatUkDate(new Date()),
        certificateId: generateCertificateId(),
      }));
    } finally {
      setIsGradingAll(false);
    }
  };

  const handleRetakeExam = () => {
    const fresh = createInitialExamState(examState.selectedTrack);
    onUpdateExamState(() => ({
      ...fresh,
      phase: "active",
    }));
  };

  const handleChooseAnotherLevel = () => {
    const fresh = createInitialExamState(examState.selectedTrack);
    onUpdateExamState(() => ({
      ...fresh,
      phase: "intro",
    }));
  };

  // =========================================================================
  // 1. EXAM INTRODUCTION & LEVEL SELECTOR SCREEN
  // =========================================================================
  if (examState.phase === "intro") {
    return (
      <section aria-label="Certification Exam Introduction" className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3.5 border-b border-slate-200 pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700">
              <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-700">
                Choose Your Exam Track · Automated Hidden Tests
              </p>
              <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                Python Path Certification Exam
              </h2>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-700">
            Select a single certification level to focus on right now, or take the Full Tiered Assessment across all 15
            questions. Your code runs locally against automated Python assertions, with optional hints available if you
            need a nudge.
          </p>

          {/* Selectable Exam Tracks in a Single List */}
          <div className="mt-5 flex flex-col gap-3">
            {EXAM_TRACKS.map((track) => {
              const isSelected = examState.selectedTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() =>
                    onUpdateExamState((prev) => ({
                      ...prev,
                      selectedTrack: track.id,
                      currentIndex: 0,
                    }))
                  }
                  className={`flex items-start justify-between gap-4 rounded-lg border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                    isSelected
                      ? "border-sky-600 bg-sky-50/70"
                      : "border-slate-200 bg-slate-50/70 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-base font-bold text-slate-900">{track.title}</p>
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-sky-700" : "text-slate-500"
                        }`}
                      >
                        {track.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{track.description}</p>
                  </div>

                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Optional Learner Name Input */}
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="exam-learner-name" className="mb-1.5 block text-base font-medium text-slate-800">
                Learner Name (optional — used only on your on-device certificate)
              </label>
              <input
                id="exam-learner-name"
                type="text"
                value={learnerName}
                onChange={(e) => onLearnerNameChange(e.target.value)}
                placeholder="e.g., Jordan Taylor"
                maxLength={80}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/20"
              />
            </div>

            <button
              type="button"
              disabled={engineStatus !== "ready"}
              onClick={() =>
                onUpdateExamState((prev) => ({
                  ...prev,
                  phase: "active",
                  currentIndex: 0,
                }))
              }
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 whitespace-nowrap shrink-0"
            >
              {engineStatus === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Initialising Python...</span>
                </>
              ) : (
                <>
                  <span>
                    {examState.selectedTrack === "Full"
                      ? "Start Full Exam (15 Questions)"
                      : `Start ${examState.selectedTrack} Exam (5 Questions)`}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. EXAM RESULTS & CERTIFICATE / REVIEW BREAKDOWN
  // =========================================================================
  if (examState.phase === "results") {
    const targetBand: ExamBand =
      examState.selectedTrack === "Full" ? "Beginner" : examState.selectedTrack;
    const missedInTargetBand = activeQuestions.filter(
      (q) => q.band === targetBand && !examState.answersById[q.id]?.passed
    );

    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <section
          aria-label="Exam Results Summary"
          className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 print:hidden"
        >
          <div className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                {examState.selectedTrack === "Full"
                  ? `Full Exam Graded · ${bandSummary.activePassed} of 15 Passed`
                  : `${examState.selectedTrack} Exam Graded · ${bandSummary.activePassed} of 5 Passed`}
              </p>
              <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                {bandSummary.awardedLevel === "Complete"
                  ? "Congratulations! You completed all 3 tiers and earned the Complete Python Certificate"
                  : bandSummary.awardedLevel
                    ? `Congratulations! You earned the ${bandSummary.awardedLevel} Python Certificate`
                    : `Keep Practising — Review ${getModuleTitleForBand(targetBand)}`}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleChooseAnotherLevel}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                <span>Choose Level</span>
              </button>
              <button
                type="button"
                onClick={handleRetakeExam}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Retake Exam</span>
              </button>
            </div>
          </div>

          {examState.selectedTrack === "Full" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={`rounded-lg border p-4 ${
                  bandSummary.beginnerPassed
                    ? "border-emerald-200 bg-emerald-50/70"
                    : "border-amber-200 bg-amber-50/70"
                }`}
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-700">Beginner Band</span>
                  <span className={bandSummary.beginnerPassed ? "text-emerald-700" : "text-amber-800"}>
                    {bandSummary.beginnerPassed ? "Passed" : "Needs 3/5"}
                  </span>
                </div>
                <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
                  {bandSummary.beginnerScore} / 5
                </p>
              </div>

              <div
                className={`rounded-lg border p-4 ${
                  bandSummary.intermediatePassed
                    ? "border-emerald-200 bg-emerald-50/70"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-700">Intermediate Band</span>
                  <span className={bandSummary.intermediatePassed ? "text-emerald-700" : "text-slate-600"}>
                    {bandSummary.intermediatePassed
                      ? "Passed"
                      : !bandSummary.beginnerPassed
                        ? "Requires Beginner Pass"
                        : "Needs 3/5"}
                  </span>
                </div>
                <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
                  {bandSummary.intermediateScore} / 5
                </p>
              </div>

              <div
                className={`rounded-lg border p-4 ${
                  bandSummary.advancedPassed
                    ? "border-emerald-200 bg-emerald-50/70"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-700">Advanced Band</span>
                  <span className={bandSummary.advancedPassed ? "text-emerald-700" : "text-slate-600"}>
                    {bandSummary.advancedPassed
                      ? "Passed"
                      : !bandSummary.intermediatePassed
                        ? "Requires Intermediate Pass"
                        : "Needs 3/5"}
                  </span>
                </div>
                <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
                  {bandSummary.advancedScore} / 5
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-lg border p-4 ${
                bandSummary.awardedLevel
                  ? "border-emerald-200 bg-emerald-50/70"
                  : "border-amber-200 bg-amber-50/70"
              }`}
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-700">{examState.selectedTrack} Track Score</span>
                <span className={bandSummary.awardedLevel ? "text-emerald-700" : "text-amber-800"}>
                  {bandSummary.awardedLevel ? "Passed (≥ 3/5)" : "Needs 3/5 to Pass"}
                </span>
              </div>
              <p className="mt-1.5 text-2xl font-bold text-slate-900 tabular-nums">
                {bandSummary.activePassed} / 5
              </p>
            </div>
          )}

          {/* Supportive Breakdown when selected track did not pass */}
          {!bandSummary.awardedLevel && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
              <h3 className="text-base font-bold text-amber-950">
                Recommended Self-Study Lessons Before Retaking
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-amber-900">
                You scored {bandSummary.activePassed} / 5 (3 / 5 is needed to unlock the {targetBand} Python
                Certificate). Review these topics in <strong>{getModuleTitleForBand(targetBand)}</strong> and try
                again:
              </p>

              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {missedInTargetBand.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() =>
                      onReviewLesson(getModuleIdForBand(targetBand), q.recommendedLessonId)
                    }
                    className="flex items-center justify-between rounded-lg border border-amber-300 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-slate-800 transition-colors hover:bg-amber-50"
                  >
                    <span>
                      {q.topic} — {q.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden="true" />
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() =>
                    onReviewLesson(
                      getModuleIdForBand(targetBand),
                      targetBand === "Beginner" ? "b1" : targetBand === "Intermediate" ? "i1" : "a1"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
                >
                  <span>Open {getModuleTitleForBand(targetBand)}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>

        {bandSummary.awardedLevel && (
          <CertificateCard
            awardedLevel={bandSummary.awardedLevel}
            recipientName={learnerName}
            onRecipientNameChange={onLearnerNameChange}
            completionDate={examState.completionDate}
            certificateId={examState.certificateId}
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // 3. ACTIVE EXAM WORKSPACE
  // =========================================================================
  const progressPercent = Math.round((bandSummary.activePassed / activeQuestions.length) * 100);

  return (
    <div className="space-y-6">
      <section
        aria-label="Certification Exam Progress"
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 tabular-nums">
            <span>
              Question {safeIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <span className="text-sky-700">{currentQuestion.band} Band</span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <span className="font-medium text-slate-600">{currentQuestion.topic}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleChooseAnotherLevel}
              className="text-xs font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              Change Level
            </button>
            <span className="text-xs font-medium text-slate-600 tabular-nums">
              {bandSummary.activePassed} / {activeQuestions.length} passed
            </span>
            <button
              type="button"
              onClick={handleSubmitAndGradeExam}
              disabled={engineStatus !== "ready" || isGradingAll || isRunning}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 whitespace-nowrap shrink-0"
            >
              {isGradingAll ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  <span>Grading Exam...</span>
                </>
              ) : (
                <>
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Submit &amp; Grade Exam</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div
          role="progressbar"
          aria-valuenow={bandSummary.activePassed}
          aria-valuemin={0}
          aria-valuemax={activeQuestions.length}
          aria-label="Exam challenges passed"
          className="mb-3.5 h-2 w-full overflow-hidden rounded-full bg-slate-100"
        >
          <div
            className="h-full rounded-full bg-sky-600 transition-all duration-300"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>

        <div
          className={`grid gap-1.5 ${
            activeQuestions.length <= 5 ? "grid-cols-5" : "grid-cols-5 sm:grid-cols-15"
          }`}
        >
          {activeQuestions.map((q, idx) => {
            const state = examState.answersById[q.id];
            const isCurrent = idx === safeIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() =>
                  onUpdateExamState((prev) => ({
                    ...prev,
                    currentIndex: idx,
                  }))
                }
                title={`Question ${idx + 1} (${q.band}): ${q.title}`}
                className={`flex h-9 items-center justify-center gap-1 rounded-lg border text-xs font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                  isCurrent
                    ? "border-sky-600 bg-sky-600 text-white"
                    : state?.passed
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                      : state?.attempted
                        ? "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{idx + 1}</span>
                {state?.passed && !isCurrent && (
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        <section aria-label="Exam Question Prompt" className="lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm text-slate-500">
              <span className="font-semibold text-sky-700">
                Question {safeIndex + 1} · {currentQuestion.band} Band
              </span>
              <span>{currentQuestion.topic}</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentQuestion.title}
            </h3>

            <p className="mt-3 text-base leading-relaxed text-slate-700">
              {currentQuestion.prompt}
            </p>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Example</p>
              <pre className="mt-1.5 overflow-x-auto font-mono text-sm leading-relaxed text-slate-800">
                <code>{currentQuestion.exampleSummary}</code>
              </pre>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() =>
                  onUpdateExamState((prev) => ({
                    ...prev,
                    answersById: {
                      ...prev.answersById,
                      [currentQuestion.id]: {
                        ...prev.answersById[currentQuestion.id],
                        hintVisible: !prev.answersById[currentQuestion.id].hintVisible,
                      },
                    },
                  }))
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
              >
                <Lightbulb className="h-4 w-4 text-amber-600" aria-hidden="true" />
                <span>{currentAnswer.hintVisible ? "Hide Hint" : "Show Hint"}</span>
              </button>

              {currentAnswer.hintVisible && (
                <div className="mt-3 whitespace-pre-line rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-sm leading-relaxed text-amber-950">
                  {currentQuestion.hint}
                </div>
              )}
            </div>
          </div>
        </section>

        <section aria-label="Exam Code Editor and Test Results" className="space-y-4 lg:col-span-7">
          <CodeEditor
            value={currentAnswer.code}
            onChange={(nextCode) =>
              onUpdateExamState((prev) => ({
                ...prev,
                answersById: {
                  ...prev.answersById,
                  [currentQuestion.id]: {
                    ...prev.answersById[currentQuestion.id],
                    code: nextCode,
                  },
                },
              }))
            }
            onReset={() =>
              onUpdateExamState((prev) => ({
                ...prev,
                answersById: {
                  ...prev.answersById,
                  [currentQuestion.id]: {
                    ...prev.answersById[currentQuestion.id],
                    code: currentQuestion.starterCode,
                    attempted: false,
                    passed: false,
                    lastResult: null,
                  },
                },
              }))
            }
            onRunShortcut={handleRunCurrentTests}
            disabled={isRunning || isGradingAll}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRunCurrentTests}
              disabled={engineStatus !== "ready" || isRunning || isGradingAll}
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
                    ? "Running Tests..."
                    : "Run Automated Tests"}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() =>
                  onUpdateExamState((prev) => ({
                    ...prev,
                    currentIndex: Math.max(0, safeIndex - 1),
                  }))
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Previous</span>
              </button>

              {safeIndex < activeQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    onUpdateExamState((prev) => ({
                      ...prev,
                      currentIndex: Math.min(activeQuestions.length - 1, safeIndex + 1),
                    }))
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAndGradeExam}
                  disabled={engineStatus !== "ready" || isGradingAll || isRunning}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Submit &amp; Grade Exam</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Terminal className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <span>Console &amp; Test Output</span>
              </div>
              {currentAnswer.lastResult && !currentAnswer.lastResult.errorType && (
                <span className="text-sm text-slate-500">Executed in browser</span>
              )}
            </div>

            <div className="p-4">
              {!currentAnswer.lastResult ? (
                <p className="font-mono text-sm text-slate-400">
                  Click &quot;Run Automated Tests&quot; to check your solution against hidden assertions.
                </p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-600">Printed Output (stdout)</p>
                    <pre className="min-h-[48px] overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 font-mono text-base leading-relaxed text-slate-100">
                      <code>
                        {currentAnswer.lastResult.stdout.length > 0
                          ? currentAnswer.lastResult.stdout
                          : "(nothing printed)"}
                      </code>
                    </pre>
                  </div>

                  {currentAnswer.lastResult.errorType && (
                    <div className="space-y-2.5 rounded-lg border border-red-200 bg-red-50/70 p-4">
                      {currentAnswer.lastResult.friendlyTip && (
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                          <p className="text-base font-medium leading-relaxed text-red-950">
                            {currentAnswer.lastResult.friendlyTip}
                          </p>
                        </div>
                      )}
                      {currentAnswer.lastResult.traceback && (
                        <pre className="overflow-x-auto rounded-md bg-slate-900 px-3.5 py-3 font-mono text-sm leading-relaxed text-red-300">
                          <code>{currentAnswer.lastResult.traceback}</code>
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {currentAnswer.lastResult && !currentAnswer.lastResult.errorType && currentAnswer.passed && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <div>
                <p className="text-base font-semibold text-emerald-950">
                  All Hidden Test Assertions Passed
                </p>
                <p className="text-sm text-emerald-800">
                  Question {safeIndex + 1} is marked as passed in temporary page memory.
                </p>
              </div>
            </div>
          )}

          {currentAnswer.lastResult && !currentAnswer.lastResult.errorType && !currentAnswer.passed && (
            <div
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
            >
              <p className="text-base font-semibold text-amber-900">Automated Checks Did Not Pass Yet</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-900">
                {currentAnswer.lastResult.testMessage ||
                  "Review the prompt requirements and test edge cases, then run your tests again."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
