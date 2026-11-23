import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CHEAT_SHEET_ITEMS } from "../data/cheatSheet";

interface CheatSheetPanelProps {
  isOpen: boolean;
}

export function CheatSheetPanel({ isOpen }: CheatSheetPanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

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
      id="cheat-sheet"
      aria-label="Beginner Python Cheat Sheet"
      className="mb-6 rounded-xl border border-slate-200 bg-white p-5"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Beginner Python Cheat Sheet</h2>
          <p className="text-sm text-slate-600">
            Quick syntax examples you can reference anytime while solving the 10 challenges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CHEAT_SHEET_ITEMS.map((item, idx) => {
          const isCopied = copiedIndex === idx;
          return (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-3.5"
            >
              <div>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="font-mono text-sm font-semibold text-slate-900">{item.title}</h3>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.code, idx)}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
                    aria-label={`Copy ${item.title} example`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mb-2.5 text-xs leading-relaxed text-slate-600">{item.summary}</p>
              </div>
              <pre className="overflow-x-auto rounded-md bg-slate-900 px-3 py-2 font-mono text-xs leading-relaxed text-slate-100">
                <code>{item.code}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </section>
  );
}
