import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { COURSE_LESSONS, CourseModuleId } from "./data/courseLessons";
import { getPyodide } from "./lib/pyodide";
import { CheatSheetPanel } from "./components/CheatSheetPanel";
import { HomePage } from "./components/HomePage";
import {
  createInitialCourseProgress,
  LessonProgress,
  SelfStudyCourse,
} from "./components/SelfStudyCourse";
import {
  CertificationExam,
  createInitialExamState,
  ExamSessionState,
} from "./components/CertificationExam";

type EngineStatus = "loading" | "ready" | "error";
type ActiveView = "home" | "course" | "exam" | "cheatsheet" | "privacy";

const NAV_ITEMS: { id: ActiveView; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "course", label: "Self-Study Course" },
  { id: "exam", label: "Certification Exam" },
  { id: "cheatsheet", label: "Cheat Sheet" },
  { id: "privacy", label: "Privacy" },
];

export default function App() {
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("loading");
  const [engineError, setEngineError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("home");

  // All course progress, exam state, and learner name live strictly in temporary page memory.
  const [selectedModuleId, setSelectedModuleId] = useState<CourseModuleId>("beginner");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("b1");
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>(
    createInitialCourseProgress
  );

  const [learnerName, setLearnerName] = useState<string>("");
  const [examState, setExamState] = useState<ExamSessionState>(createInitialExamState);

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

  const handleUpdateLesson = (
    lessonId: string,
    updater: (prev: LessonProgress) => LessonProgress
  ) => {
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: updater(prev[lessonId]),
    }));
  };

  const handleSelectCourseLevel = (moduleId: CourseModuleId) => {
    setSelectedModuleId(moduleId);
    const moduleLessons = COURSE_LESSONS.filter((l) => l.moduleId === moduleId);
    const firstIncomplete = moduleLessons.find((l) => !lessonProgress[l.id]?.passed);
    setSelectedLessonId((firstIncomplete ?? moduleLessons[0]).id);
    setActiveView("course");
  };

  const handleReviewLessonFromExam = (moduleId: CourseModuleId, lessonId: string) => {
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
    setActiveView("course");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar: 3-zone contract */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("home");
            }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Python Path
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`transition-colors underline-offset-8 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 ${
                    isActive
                      ? "font-semibold text-slate-900 underline decoration-sky-600 decoration-2"
                      : "hover:text-slate-900 hover:underline"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            {activeView !== "exam" ? (
              <button
                type="button"
                onClick={() => setActiveView("exam")}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
              >
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Certification Exam</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveView("course")}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
              >
                <span>Back to Course</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-7">
        {/* WebAssembly Status Bar */}
        <div className="mb-4 flex flex-wrap items-center gap-3 print:hidden">
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

        {/* Active View Content */}
        {activeView === "home" && (
          <HomePage
            lessonProgress={lessonProgress}
            onSelectCourseLevel={handleSelectCourseLevel}
            onGoToExam={() => setActiveView("exam")}
            onGoToCheatSheet={() => setActiveView("cheatsheet")}
          />
        )}

        {activeView === "course" && (
          <SelfStudyCourse
            engineStatus={engineStatus}
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            selectedLessonId={selectedLessonId}
            onSelectLesson={setSelectedLessonId}
            lessonProgress={lessonProgress}
            onUpdateLesson={handleUpdateLesson}
            onGoToExam={() => setActiveView("exam")}
            onBackToHome={() => setActiveView("home")}
          />
        )}

        {activeView === "exam" && (
          <CertificationExam
            engineStatus={engineStatus}
            learnerName={learnerName}
            onLearnerNameChange={setLearnerName}
            examState={examState}
            onUpdateExamState={setExamState}
            onReviewLesson={handleReviewLessonFromExam}
          />
        )}

        {activeView === "cheatsheet" && <CheatSheetPanel />}

        {activeView === "privacy" && (
          <section
            aria-label="Zero-Storage UK GDPR Privacy Architecture"
            className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 sm:p-7"
          >
            <div className="mb-4 flex items-center gap-2.5 border-b border-slate-200 pb-4">
              <ShieldCheck className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">
                Zero-Storage UK GDPR Architecture
              </h2>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p>
                Python Path is built to store zero personal data on any server or browser storage mechanism.
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>
                  <strong>Temporary Page Memory Only:</strong> Your lesson progress, exam code, scores, and optional
                  learner name exist solely in active React page memory and clear immediately when the tab closes.
                </li>
                <li>
                  <strong>No Browser Persistence or Tracking:</strong> No cookies, no <code>localStorage</code>, no{" "}
                  <code>sessionStorage</code>, no user accounts, and no analytics scripts are used.
                </li>
                <li>
                  <strong>Local WebAssembly Execution &amp; On-Device Certificates:</strong> All Python code, hidden
                  exam test assertions, and PDF certificate rendering run directly inside your browser.
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="mb-3 flex items-start gap-2.5 border-b border-slate-100 pb-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-slate-600">
              <strong className="font-semibold text-slate-900">Zero-Storage UK GDPR Privacy Notice:</strong> Python
              runs locally in your browser via WebAssembly. Lesson progress, exam answers, and optional learner names
              stay strictly in temporary page memory and are never saved to cookies, local storage, or any backend
              server.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>Python Path · Created by Emma Hicks</span>
            <span>Client-Side Execution · Zero Backend User Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
