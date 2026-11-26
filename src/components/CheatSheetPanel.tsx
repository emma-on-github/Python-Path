import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CHEAT_SHEET_ITEMS, CheatSheetItem } from "../data/cheatSheet";

type LevelFilter = "All" | CheatSheetItem["level"];

export function CheatSheetPanel() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<LevelFilter>("All");

  const filteredItems =
    filter === "All"
      ? CHEAT_SHEET_ITEMS
      : CHEAT_SHEET_ITEMS.filter((item) => item.level === filter);

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      window.setTimeout(() => {
        setCopiedIndex((prev) => (prev === index ? null : prev));
      }, 1500);
    } catch {
      // Clipboard API unavailable in restricted contexts; ignore silently.
    }
  };

  return (
    <section
      aria-label="Python Cheat Sheet"
      className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Python Reference Cheat Sheet</h2>
          <p className="mt-1 text-base text-slate-600">
            Quick syntax examples across Beginner, Intermediate, and Advanced Python concepts.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start sm:self-auto">
          {(["All", "Beginner", "Intermediate", "Advanced"] as LevelFilter[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                filter === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, idx) => {
          const isCopied = copiedIndex === idx;
          return (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-4"
            >
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="font-semibold text-sky-700">{item.level}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.code, idx)}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
                    aria-label={`Copy ${item.title} example`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="font-mono text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 mb-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
              </div>
              <pre className="whitespace-pre-wrap break-words rounded-md bg-slate-900 px-3.5 py-3 font-mono text-sm leading-relaxed text-slate-100">
                <code>{item.code}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </section>
  );
}
