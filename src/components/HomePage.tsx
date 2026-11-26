import { ArrowRight, Award, BookOpen, CheckCircle2, FileCode2 } from "lucide-react";
import { COURSE_LESSONS, COURSE_MODULES, CourseModuleId } from "../data/courseLessons";
import { LessonProgress } from "./SelfStudyCourse";

interface HomePageProps {
  lessonProgress: Record<string, LessonProgress>;
  onSelectCourseLevel: (moduleId: CourseModuleId) => void;
  onGoToExam: () => void;
  onGoToCheatSheet: () => void;
}

export function HomePage({
  lessonProgress,
  onSelectCourseLevel,
  onGoToExam,
  onGoToCheatSheet,
}: HomePageProps) {
  const totalCompleted = COURSE_LESSONS.filter((l) => lessonProgress[l.id]?.passed).length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-sky-700 uppercase">
            Self-Study Python Training &amp; Certification
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
            Choose Your Python Course Level
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Pick a level below to start learning in your browser with guided lessons, hands-on coding exercises, and an
            interactive Python 3 sandbox. Everything runs locally on your device with zero server storage.
          </p>
        </div>

        {totalCompleted > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-sm font-medium text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span className="tabular-nums">
              Current session progress: <strong>{totalCompleted}</strong> of {COURSE_LESSONS.length} lessons completed
            </span>
          </div>
        )}
      </section>

      {/* Course Level Selection Grid */}
      <section aria-label="Course Levels">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {COURSE_MODULES.map((mod) => {
            const lessons = COURSE_LESSONS.filter((l) => l.moduleId === mod.id);
            const completedCount = lessons.filter((l) => lessonProgress[l.id]?.passed).length;
            const percent = Math.round((completedCount / lessons.length) * 100);
            const levelTitle = mod.title.replace(/^Module \d+:\s*/, "");
            const shortLevelName =
              mod.id === "beginner"
                ? "Beginner"
                : mod.id === "intermediate"
                  ? "Intermediate"
                  : "Advanced";

            return (
              <article
                key={mod.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-sky-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-sm font-semibold">
                    <span className="text-sky-700">Module {mod.number}</span>
                    <span className="text-slate-500 tabular-nums">{lessons.length} Lessons</span>
                  </div>

                  <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
                    {levelTitle}
                  </h2>

                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {mod.subtitle}
                  </p>

                  {/* Lesson Preview List */}
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
                    {lessons.map((lesson) => {
                      const isDone = Boolean(lessonProgress[lesson.id]?.passed);
                      return (
                        <li key={lesson.id} className="flex items-center gap-2.5">
                          {isDone ? (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-emerald-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500 tabular-nums"
                              aria-hidden="true"
                            >
                              {lesson.lessonNumber}
                            </span>
                          )}
                          <span className={isDone ? "font-medium text-emerald-900" : "text-slate-700"}>
                            {lesson.title}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 tabular-nums">
                    <span>Progress</span>
                    <span>
                      {completedCount} / {lessons.length} ({percent}%)
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={completedCount}
                    aria-valuemin={0}
                    aria-valuemax={lessons.length}
                    aria-label={`${levelTitle} progress`}
                    className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100"
                  >
                    <div
                      className="h-full rounded-full bg-sky-600 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCourseLevel(mod.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {completedCount > 0 && completedCount < lessons.length
                        ? `Continue ${shortLevelName} Course`
                        : completedCount === lessons.length
                          ? `Review ${shortLevelName} Course`
                          : `Start ${shortLevelName} Course`}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Secondary Actions: Certification Exam & Cheat Sheet */}
      <section aria-label="Additional Resources" className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Ready for Your Certificate?</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Take a Beginner, Intermediate, or Advanced exam—or the full assessment—to earn an on-device Python
              Certificate.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToExam}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <Award className="h-4 w-4 text-sky-600" aria-hidden="true" />
            <span>Go to Certification Exam</span>
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Python Syntax Cheat Sheet</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Browse quick examples for variables, loops, dictionaries, classes, decorators, and generators anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToCheatSheet}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <FileCode2 className="h-4 w-4 text-sky-600" aria-hidden="true" />
            <span>Open Cheat Sheet</span>
          </button>
        </div>
      </section>
    </div>
  );
}
