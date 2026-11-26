import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Play,
  Terminal,
} from "lucide-react";
import {
  COURSE_LESSONS,
  COURSE_MODULES,
  CourseLesson,
  CourseModuleId,
} from "../data/courseLessons";
import { PythonExecutionResult, runPythonCode } from "../lib/pyodide";
import { CodeEditor } from "./CodeEditor";

export interface LessonProgress {
  code: string;
  passed: boolean;
  hintVisible: boolean;
  lastResult: PythonExecutionResult | null;
}

export function createInitialCourseProgress(): Record<string, LessonProgress> {
  const initial: Record<string, LessonProgress> = {};
  for (const lesson of COURSE_LESSONS) {
    initial[lesson.id] = {
      code: lesson.starterCode,
      passed: false,
      hintVisible: false,
      lastResult: null,
    };
  }
  return initial;
}

interface SelfStudyCourseProps {
  engineStatus: "loading" | "ready" | "error";
  selectedModuleId: CourseModuleId;
  onSelectModule: (moduleId: CourseModuleId) => void;
  selectedLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  lessonProgress: Record<string, LessonProgress>;
  onUpdateLesson: (
    lessonId: string,
    updater: (prev: LessonProgress) => LessonProgress
  ) => void;
  onGoToExam: () => void;
  onBackToHome: () => void;
}

export function SelfStudyCourse({
  engineStatus,
  selectedModuleId,
  onSelectModule,
  selectedLessonId,
  onSelectLesson,
  lessonProgress,
  onUpdateLesson,
  onGoToExam,
  onBackToHome,
}: SelfStudyCourseProps) {
  const [isRunning, setIsRunning] = useState(false);

  const moduleLessons = useMemo(
    () => COURSE_LESSONS.filter((l) => l.moduleId === selectedModuleId),
    [selectedModuleId]
  );

  const activeModule =
    COURSE_MODULES.find((m) => m.id === selectedModuleId) ?? COURSE_MODULES[0];

  const activeLesson: CourseLesson =
    moduleLessons.find((l) => l.id === selectedLessonId) ?? moduleLessons[0];
  const currentState = lessonProgress[activeLesson.id];

  const moduleCompleted = useMemo(
    () => moduleLessons.filter((l) => lessonProgress[l.id]?.passed).length,
    [moduleLessons, lessonProgress]
  );

  const modulePercent = Math.round(
    (moduleCompleted / moduleLessons.length) * 100
  );

  const totalCompleted = useMemo(
    () => COURSE_LESSONS.filter((l) => lessonProgress[l.id]?.passed).length,
    [lessonProgress]
  );

  const overallPercent = Math.round(
    (totalCompleted / COURSE_LESSONS.length) * 100
  );

  const handleModuleChange = (moduleId: CourseModuleId) => {
    onSelectModule(moduleId);
    const lessonsInModule = COURSE_LESSONS.filter((l) => l.moduleId === moduleId);
    const firstIncomplete = lessonsInModule.find((l) => !lessonProgress[l.id]?.passed);
    if (firstIncomplete) {
      onSelectLesson(firstIncomplete.id);
    } else if (lessonsInModule[0]) {
      onSelectLesson(lessonsInModule[0].id);
    }
  };

  const handleRunLesson = async () => {
    if (engineStatus !== "ready" || isRunning) return;
    setIsRunning(true);
    const lesson = activeLesson;

    try {
      const result = await runPythonCode(currentState.code, {
        hiddenTests: lesson.hiddenTests,
      });

      const didPass = !result.errorType && result.testsPassed;
      onUpdateLesson(lesson.id, (prev) => ({
        ...prev,
        lastResult: result,
        passed: prev.passed || didPass,
      }));
    } catch (err) {
      onUpdateLesson(lesson.id, (prev) => ({
        ...prev,
        lastResult: {
          stdout: "",
          returnValue: null,
          errorType: "RuntimeError",
          traceback: err instanceof Error ? err.message : "Execution error",
          friendlyTip: "Unable to run code in the Python sandbox right now.",
          testsPassed: false,
          testMessage: null,
        },
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleNextLesson = () => {
    const idx = COURSE_LESSONS.findIndex((l) => l.id === activeLesson.id);
    if (idx >= 0 && idx < COURSE_LESSONS.length - 1) {
      const next = COURSE_LESSONS[idx + 1];
      onSelectModule(next.moduleId);
      onSelectLesson(next.id);
    } else {
      onGoToExam();
    }
  };

  const isLastOverallLesson =
    activeLesson.id === COURSE_LESSONS[COURSE_LESSONS.length - 1].id;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      {/* LEFT SIDEBAR: Course Level & Vertical Lesson Progression */}
      <aside
        aria-label="Course Progression and Lessons"
        className="space-y-4 lg:col-span-4 xl:col-span-3"
      >
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>All Course Levels</span>
            </button>
            <span className="text-xs font-semibold text-slate-600 tabular-nums">
              {totalCompleted} / {COURSE_LESSONS.length} overall
            </span>
          </div>

          <h2 className="text-base font-bold text-slate-900">
            {activeModule.title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            {activeModule.subtitle}
          </p>

          {/* Module Progression Bar */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700 tabular-nums">
              <span>Level Progress</span>
              <span>
                {moduleCompleted} of {moduleLessons.length} ({modulePercent}%)
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={moduleCompleted}
              aria-valuemin={0}
              aria-valuemax={moduleLessons.length}
              aria-label={`${activeModule.title} progress`}
              className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-sky-600 transition-all duration-300"
                style={{ width: `${modulePercent}%` }}
              />
            </div>
          </div>

          {/* Vertical Lesson Progression List */}
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lessons
            </p>
            <nav aria-label="Module lessons" className="space-y-1.5">
              {moduleLessons.map((lesson) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isDone = Boolean(lessonProgress[lesson.id]?.passed);

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    aria-current={isCurrent ? "step" : undefined}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      isCurrent
                        ? "border-sky-600 bg-sky-50/90 text-slate-900"
                        : isDone
                          ? "border-emerald-200 bg-emerald-50/60 text-emerald-950 hover:bg-emerald-50"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums ${
                        isCurrent
                          ? "bg-sky-600 text-white"
                          : isDone
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isDone && !isCurrent ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        lesson.lessonNumber
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold">
                        {lesson.title}
                      </p>
                      <p
                        className={`text-[11px] ${
                          isCurrent
                            ? "font-medium text-sky-700"
                            : isDone
                              ? "text-emerald-700"
                              : "text-slate-500"
                        }`}
                      >
                        {isDone ? "Completed" : isCurrent ? "In progress" : "Not started"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Switch Course Level */}
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Switch Level ({overallPercent}% overall)
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {COURSE_MODULES.map((mod) => {
                const lessons = COURSE_LESSONS.filter((l) => l.moduleId === mod.id);
                const doneCount = lessons.filter((l) => lessonProgress[l.id]?.passed).length;
                const isSelected = mod.id === selectedModuleId;
                const shortLabel =
                  mod.id === "beginner"
                    ? "Beginner"
                    : mod.id === "intermediate"
                      ? "Intermed."
                      : "Advanced";

                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleModuleChange(mod.id)}
                    className={`rounded-lg border px-2 py-2 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                      isSelected
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-[11px] font-semibold">{shortLabel}</span>
                    <span
                      className={`block text-[10px] tabular-nums ${
                        isSelected ? "text-sky-100" : "text-slate-500"
                      }`}
                    >
                      {doneCount}/{lessons.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onGoToExam}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <Award className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
              <span>Take Certification Exam</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT WORKSPACE: Lesson + Hands-On Exercise on top, Larger Sandbox underneath */}
      <div className="space-y-6 lg:col-span-8 xl:col-span-9">
        {/* Top Row: Lesson Explanation & Hands-On Exercise */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          {/* Short Lesson Card */}
          <section
            aria-label="Lesson Explanation"
            className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-7"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
              <span className="font-semibold text-sky-700">
                Lesson {activeLesson.lessonNumber} of {moduleLessons.length}
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {activeLesson.title}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
              {activeLesson.explanation}
            </p>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-semibold text-slate-600">Syntax Example</p>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-2.5 font-mono text-xs leading-relaxed text-slate-100">
                <code>{activeLesson.syntaxExample}</code>
              </pre>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
              <p className="text-xs font-semibold text-slate-800">Why it matters</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                {activeLesson.whyItMatters}
              </p>
            </div>
          </section>

          {/* Hands-On Exercise Card */}
          <section
            aria-label="Hands-On Exercise"
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-5"
          >
            <div>
              <h4 className="text-base font-bold text-slate-900">Hands-On Exercise</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {activeLesson.taskPrompt}
              </p>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                <p className="text-xs font-semibold text-slate-600">Target Behaviour</p>
                <p className="mt-0.5 font-mono text-xs text-slate-800">
                  {activeLesson.expectedSummary}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() =>
                  onUpdateLesson(activeLesson.id, (prev) => ({
                    ...prev,
                    hintVisible: !prev.hintVisible,
                  }))
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                <span>{currentState.hintVisible ? "Hide Hint" : "Show Hint"}</span>
              </button>

              {currentState.hintVisible && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-950">
                  {activeLesson.hint}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Underneath: Larger Python Sandbox, Controls & Console Output */}
        <section
          aria-label="Python Sandbox and Console Output"
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-slate-900">Python Sandbox</h4>
              <p className="text-xs text-slate-500">
                Write and test your code directly in the browser before moving to the next lesson.
              </p>
            </div>
            {currentState.passed && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Lesson Completed</span>
              </span>
            )}
          </div>

          <CodeEditor
            size="large"
            value={currentState.code}
            onChange={(nextCode) =>
              onUpdateLesson(activeLesson.id, (prev) => ({
                ...prev,
                code: nextCode,
              }))
            }
            onReset={() =>
              onUpdateLesson(activeLesson.id, (prev) => ({
                ...prev,
                code: activeLesson.starterCode,
                lastResult: null,
              }))
            }
            onRunShortcut={handleRunLesson}
            disabled={isRunning}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRunLesson}
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
                    ? "Running Checks..."
                    : "Run & Check Code"}
              </span>
            </button>

            {currentState.passed && (
              <button
                type="button"
                onClick={handleNextLesson}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 whitespace-nowrap shrink-0"
              >
                {isLastOverallLesson ? (
                  <>
                    <Award className="h-4 w-4" aria-hidden="true" />
                    <span>Go to Certification Exam</span>
                  </>
                ) : (
                  <>
                    <span>Next Lesson</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Console Output */}
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
                  Click &quot;Run &amp; Check Code&quot; to test your solution.
                </p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-medium text-slate-500">Printed Output (stdout)</p>
                    <pre className="min-h-[64px] overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-3 font-mono text-sm leading-relaxed text-slate-100">
                      <code>
                        {currentState.lastResult.stdout.length > 0
                          ? currentState.lastResult.stdout
                          : "(nothing printed)"}
                      </code>
                    </pre>
                  </div>

                  {currentState.lastResult.returnValue !== null && (
                    <div>
                      <p className="mb-1 text-xs font-medium text-slate-500">Return Value</p>
                      <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs text-slate-800">
                        <code>{currentState.lastResult.returnValue}</code>
                      </pre>
                    </div>
                  )}

                  {currentState.lastResult.errorType && (
                    <div className="space-y-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3.5">
                      {currentState.lastResult.friendlyTip && (
                        <div className="flex items-start gap-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" aria-hidden="true" />
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

          {/* Grading Result Banner */}
          {currentState.lastResult &&
            !currentState.lastResult.errorType &&
            currentState.lastResult.testsPassed && (
              <div
                role="status"
                className="flex flex-col justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      Lesson Complete — All Checks Passed
                    </p>
                    <p className="text-xs text-emerald-800">
                      Great work! Your code passed all WebAssembly checks.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextLesson}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
                >
                  <span>{isLastOverallLesson ? "Start Certification Exam" : "Next Lesson"}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

          {currentState.lastResult &&
            !currentState.lastResult.errorType &&
            !currentState.lastResult.testsPassed && (
              <div
                role="status"
                className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
              >
                <p className="font-semibold text-amber-900">Not quite there yet</p>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-900">
                  {currentState.lastResult.testMessage ||
                    "Check your logic against the target behaviour and try running again."}
                </p>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}
