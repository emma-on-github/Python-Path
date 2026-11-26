import React, { useRef } from "react";
import { RotateCcw } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (nextValue: string) => void;
  onReset: () => void;
  onRunShortcut: () => void;
  disabled?: boolean;
  size?: "default" | "large";
}

export function CodeEditor({
  value,
  onChange,
  onReset,
  onRunShortcut,
  disabled = false,
  size = "default",
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const minRows = size === "large" ? 13 : 8;
  const lineCount = Math.max(value.split("\n").length, minRows);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onRunShortcut();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      if (e.shiftKey) {
        const lineStart = value.lastIndexOf("\n", start - 1) + 1;
        const linePrefix = value.slice(lineStart, lineStart + 4);
        const spacesToRemove = linePrefix.match(/^ {1,4}/)?.[0].length ?? 0;
        if (spacesToRemove > 0) {
          const next = value.slice(0, lineStart) + value.slice(lineStart + spacesToRemove);
          onChange(next);
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              const newPos = Math.max(lineStart, start - spacesToRemove);
              textareaRef.current.selectionStart = newPos;
              textareaRef.current.selectionEnd = Math.max(lineStart, end - spacesToRemove);
            }
          });
        }
        return;
      }

      const next = value.slice(0, start) + "    " + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 4;
          textareaRef.current.selectionEnd = start + 4;
        }
      });
      return;
    }

    if (e.key === "Enter") {
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const beforeCursor = value.slice(0, start);
      const currentLineStart = beforeCursor.lastIndexOf("\n") + 1;
      const currentLine = beforeCursor.slice(currentLineStart);
      const leadingSpaces = currentLine.match(/^ */)?.[0] ?? "";
      const needsExtraIndent = currentLine.trimEnd().endsWith(":");
      const indent = leadingSpaces + (needsExtraIndent ? "    " : "");

      if (indent.length > 0) {
        e.preventDefault();
        const next = value.slice(0, start) + "\n" + indent + value.slice(end);
        onChange(next);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            const cursorPos = start + 1 + indent.length;
            textareaRef.current.selectionStart = cursorPos;
            textareaRef.current.selectionEnd = cursorPos;
          }
        });
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="font-mono font-medium text-slate-100">sandbox.py</span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <span className="hidden text-slate-400 sm:inline">Tab inserts 4 spaces · Ctrl/Cmd + Enter to run</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Code</span>
        </button>
      </div>

      <div
        className={`flex overflow-auto ${
          size === "large"
            ? "max-h-[560px] min-h-[340px]"
            : "max-h-[340px] min-h-[220px]"
        }`}
      >
        <div
          aria-hidden="true"
          className="select-none border-r border-slate-800 bg-slate-950/40 px-3 py-3.5 text-right font-mono text-xs leading-6 text-slate-500 tabular-nums"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Python code editor"
          rows={Math.max(lineCount, minRows)}
          className="code-editor w-full resize-none bg-transparent px-4 py-3.5 font-mono text-sm leading-6 text-slate-100 placeholder:text-slate-500 focus:outline-none"
          placeholder="# Write your Python code here..."
        />
      </div>
    </div>
  );
}
