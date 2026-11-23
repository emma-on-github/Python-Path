export interface PythonExecutionResult {
  stdout: string;
  returnValue: string | null;
  errorType: string | null;
  traceback: string | null;
  friendlyTip: string | null;
  extraCheckPassed: boolean;
  extraCheckMessage: string | null;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    set: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
  };
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

const PYODIDE_INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";
const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`;

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (window.loadPyodide) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Pyodide script.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not download the in-browser Python engine."));
    document.head.appendChild(script);
  });
}

export async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScriptOnce(PYODIDE_SCRIPT_URL);
      if (!window.loadPyodide) {
        throw new Error("Python WebAssembly loader did not initialise properly.");
      }
      return window.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
    })().catch((err) => {
      pyodidePromise = null;
      throw err;
    });
  }
  return pyodidePromise;
}

export function normalizeOutput(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function getPlainEnglishErrorTip(errorType: string | null, traceback: string | null): string | null {
  if (!errorType) return null;
  const tb = traceback ?? "";

  switch (errorType) {
    case "SyntaxError":
      if (tb.includes("':'") || tb.includes("expected ':'")) {
        return "Syntax tip: Lines starting with if, else, for, or def need a colon (:) at the very end of the line.";
      }
      if (tb.includes("unterminated string") || tb.includes("EOL")) {
        return "Syntax tip: It looks like a quote mark is missing! Make sure text has matching quotes at both the start and end.";
      }
      return "Syntax tip: Python couldn't read the punctuation or structure on one line. Check for missing quotes, brackets, parentheses, or colons (:).";

    case "IndentationError":
      return "Indentation tip: Python uses 4 spaces to group code inside if, else, for, or def blocks. Make sure lines inside a block line up cleanly.";

    case "NameError": {
      const match = tb.match(/name '([^']+)' is not defined/);
      const missingName = match?.[1];
      if (missingName) {
        return `Name tip: Python doesn't recognise "${missingName}" yet. Check your spelling/capitalisation, or put quotes around it if you meant plain text.`;
      }
      return "Name tip: Python found a word it doesn't recognise. Check variable spelling, capitalisation, or add quotes around plain text.";
    }

    case "TypeError":
      return "Type tip: You tried to combine incompatible data types (like adding a number directly to text). Try an f-string or str() to mix text and numbers.";

    case "IndexError":
      return "Index tip: You tried to access a list position that doesn't exist. Remember Python list positions start counting at 0.";

    case "KeyError":
      return "Key tip: That dictionary key wasn't found. Double-check the exact spelling and quotes of the key name.";

    default:
      return `${errorType} tip: Read the last line of the error message below and double-check your variable names and punctuation.`;
  }
}

export async function runPythonCode(
  userCode: string,
  requiredSymbols?: {
    variableName?: string;
    functionName?: string;
    functionCallCheck?: string;
    friendlyMissingMessage?: string;
  }
): Promise<PythonExecutionResult> {
  const pyodide = await getPyodide();

  const runnerPython = `
import sys
import io
import ast
import json
import traceback

def __run_sandbox__(code_str, req_var, req_func, req_call):
    stdout_buf = io.StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = stdout_buf
    sys.stderr = stdout_buf

    ns = {}
    return_val = None
    error_type = None
    tb_text = None
    extra_ok = True

    try:
        tree = ast.parse(code_str, filename="<sandbox>", mode="exec")
        last_expr = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last_expr = ast.Expression(body=tree.body.pop().value)
            ast.fix_missing_locations(last_expr)

        if tree.body:
            exec(compile(tree, "<sandbox>", "exec"), ns)

        if last_expr is not None:
            val = eval(compile(last_expr, "<sandbox>", "eval"), ns)
            if val is not None:
                return_val = repr(val)

        if req_var and req_var not in ns:
            extra_ok = False
        if req_func and (req_func not in ns or not callable(ns[req_func])):
            extra_ok = False
        if extra_ok and req_call:
            try:
                if not bool(eval(req_call, ns)):
                    extra_ok = False
            except Exception:
                extra_ok = False
    except Exception as exc:
        error_type = type(exc).__name__
        tb_lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
        filtered = [line for line in tb_lines if "__run_sandbox__" not in line]
        tb_text = "".join(filtered).strip()
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr

    return json.dumps({
        "stdout": stdout_buf.getvalue(),
        "returnValue": return_val,
        "errorType": error_type,
        "traceback": tb_text,
        "extraOk": extra_ok,
    })
`;

  await pyodide.runPythonAsync(runnerPython);
  pyodide.globals.set("__user_code__", userCode);
  pyodide.globals.set("__req_var__", requiredSymbols?.variableName ?? "");
  pyodide.globals.set("__req_func__", requiredSymbols?.functionName ?? "");
  pyodide.globals.set("__req_call__", requiredSymbols?.functionCallCheck ?? "");

  const rawJson = (await pyodide.runPythonAsync(
    `__run_sandbox__(__user_code__, __req_var__, __req_func__, __req_call__)`
  )) as string;

  const parsed = JSON.parse(rawJson) as {
    stdout: string;
    returnValue: string | null;
    errorType: string | null;
    traceback: string | null;
    extraOk: boolean;
  };

  return {
    stdout: parsed.stdout,
    returnValue: parsed.returnValue,
    errorType: parsed.errorType,
    traceback: parsed.traceback,
    friendlyTip: getPlainEnglishErrorTip(parsed.errorType, parsed.traceback),
    extraCheckPassed: parsed.extraOk,
    extraCheckMessage: parsed.extraOk ? null : (requiredSymbols?.friendlyMissingMessage ?? null),
  };
}
