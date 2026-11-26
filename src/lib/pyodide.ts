export interface PythonExecutionResult {
  stdout: string;
  returnValue: string | null;
  errorType: string | null;
  traceback: string | null;
  friendlyTip: string | null;
  testsPassed: boolean;
  testMessage: string | null;
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
      if (tb.includes("=>") || tb.includes("=<")) {
        return "Syntax tip: In Python, write >= for greater-than-or-equal (not =>) and <= for less-than-or-equal (not =<).";
      }
      if (tb.includes("':'") || tb.includes("expected ':'")) {
        return "Syntax tip: Lines starting with if, elif, else, for, while, def, class, try, except, or with need a colon (:) at the end.";
      }
      if (tb.includes("unterminated string") || tb.includes("EOL")) {
        return "Syntax tip: A quote mark appears to be missing. Ensure strings have matching quotes at both ends.";
      }
      return "Syntax tip: Python could not parse a line. Check for missing quotes, brackets, parentheses, or colons (:).";

    case "IndentationError":
      return "Indentation tip: Python uses 4 spaces to group code inside blocks (if, for, def, class, with). Ensure lines inside a block align cleanly.";

    case "NameError": {
      const match = tb.match(/name '([^']+)' is not defined/);
      const missingName = match?.[1];
      if (missingName) {
        return `Name tip: Python does not recognise "${missingName}" yet. Check spelling and capitalisation, or add quotes if you meant plain text.`;
      }
      return "Name tip: Python found an unrecognised name. Check variable/function spelling, or add quotes around plain text.";
    }

    case "TypeError":
      return "Type tip: Incompatible data types were combined or wrong arguments were passed. Check function parameters or use an f-string / str().";

    case "IndexError":
      return "Index tip: You tried to access a list position that does not exist. Remember Python lists start at index 0.";

    case "KeyError":
      return "Key tip: That dictionary key was not found. Double-check the exact spelling and quotes of the key, or use .get().";

    case "ZeroDivisionError":
      return "Maths tip: Division by zero is not allowed in Python. Guard against zero or catch ZeroDivisionError with try/except.";

    default:
      return `${errorType} tip: Check the final line of the traceback below for the exact cause and line number.`;
  }
}

export interface RunPythonOptions {
  hiddenTests?: string;
}

export async function runPythonCode(
  userCode: string,
  options?: RunPythonOptions
): Promise<PythonExecutionResult> {
  const pyodide = await getPyodide();

  const runnerPython = `
import sys
import io
import ast
import json
import traceback

def __run_sandbox__(code_str, hidden_tests_str):
    stdout_buf = io.StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = stdout_buf
    sys.stderr = stdout_buf

    ns = {}
    return_val = None
    error_type = None
    tb_text = None
    tests_passed = True
    test_message = None

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
    except Exception as exc:
        error_type = type(exc).__name__
        tb_lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
        filtered = [line for line in tb_lines if "__run_sandbox__" not in line]
        tb_text = "".join(filtered).strip()
        tests_passed = False
    finally:
        captured_stdout = stdout_buf.getvalue()
        sys.stdout = old_stdout
        sys.stderr = old_stderr

    if error_type is None and hidden_tests_str:
        test_buf = io.StringIO()
        sys.stdout = test_buf
        sys.stderr = test_buf
        try:
            ns["__captured_stdout__"] = captured_stdout
            ns["__user_code__"] = code_str
            exec(compile(hidden_tests_str, "<tests>", "exec"), ns)
        except AssertionError as ae:
            tests_passed = False
            msg = str(ae).strip()
            test_message = msg if msg else "Your code ran without errors, but did not pass all automated checks."
        except Exception as exc:
            tests_passed = False
            test_message = f"Test check failed ({type(exc).__name__}: {exc}). Ensure the required function, class, or variable name matches the prompt."
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr

    return json.dumps({
        "stdout": captured_stdout,
        "returnValue": return_val,
        "errorType": error_type,
        "traceback": tb_text,
        "testsPassed": tests_passed,
        "testMessage": test_message,
    })
`;

  await pyodide.runPythonAsync(runnerPython);
  pyodide.globals.set("__user_code__", userCode);
  pyodide.globals.set("__hidden_tests__", options?.hiddenTests ?? "");

  const rawJson = (await pyodide.runPythonAsync(
    `__run_sandbox__(__user_code__, __hidden_tests__)`
  )) as string;

  const parsed = JSON.parse(rawJson) as {
    stdout: string;
    returnValue: string | null;
    errorType: string | null;
    traceback: string | null;
    testsPassed: boolean;
    testMessage: string | null;
  };

  return {
    stdout: parsed.stdout,
    returnValue: parsed.returnValue,
    errorType: parsed.errorType,
    traceback: parsed.traceback,
    friendlyTip: getPlainEnglishErrorTip(parsed.errorType, parsed.traceback),
    testsPassed: parsed.testsPassed,
    testMessage: parsed.testMessage,
  };
}
