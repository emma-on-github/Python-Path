# Python Path

A free, privacy-first interactive Python self-study course and certification studio built around zero-storage UK GDPR principles. All Python execution, automated grading, progress tracking, and PDF certificate generation run directly in the learner's browser with no accounts, no cookies, and no backend user storage.

---

## Key Features

- **Course Level Home Page**  
  Start on a dedicated landing page where learners choose their course level—**Beginner Python**, **Intermediate Python**, or **Advanced Python**—with live temporary-memory progress and quick links to the Certification Exam and Cheat Sheet.

- **Self-Study Course (3 Modules · 18 Guided Lessons)**  
  Structured across three progressive modules (6 lessons per module):
  1. **Module 1: Beginner Python** — `print()` output, variables & basic maths, strings & f-strings, lists & indexing, `if / elif / else` & `for` loops, and functions.
  2. **Module 2: Intermediate Python** — list comprehensions, dictionaries & sets, `try / except` error handling, classes & OOP, JSON parsing, and `collections.Counter`.
  3. **Module 3: Advanced Python** — decorators, generators (`yield`), context managers, custom iterators, dataclasses, and algorithmic problem-solving.

  The course workspace places a **vertical lesson progression sidebar** on the left, the **Lesson Explanation & Hands-On Exercise** (with an optional **Show Hint** toggle) on the right, and an enlarged **Python 3 Sandbox** underneath.

- **In-Browser Python 3 Sandbox (Pyodide WebAssembly)**  
  Executes Python code safely inside the browser without sending user code to any remote server. Captures `print()` standard output, standalone return values, and Python tracebacks paired with plain-English coaching tips for common errors (`SyntaxError`, `IndentationError`, `NameError`, `TypeError`, `IndexError`, `KeyError`, and `ZeroDivisionError`).

- **Selectable Certification Exam & Full Tiered Assessment**  
  Learners can choose a focused single-level exam (**Beginner**, **Intermediate**, or **Advanced** — 5 coding challenges each, requiring at least `4 / 5` to pass) or take the **Full Tiered Assessment** across all 15 challenges with sequential `4 / 5` band thresholds. Exam submissions are validated quietly against hidden Python `assert` tests with hints and sample solutions disabled, and unsuccessful attempts recommend specific Self-Study lessons to review.

- **Live Executive Certificate & Client-Side PDF Export**  
  Passing a level unlocks a live parchment-and-navy **Certificate of Completion** (`Python Path — [Beginner / Intermediate / Advanced] Python Certificate`). Learners can enter or edit their name right before exporting and download a high-resolution A4 landscape PDF generated locally via HTML5 Canvas (`2×` scale) and `jsPDF`, featuring a Completion Date (`DD/MM/YYYY`) and an on-device **Certificate ID** (`CERT-XXXXXX`).

  Sample certificate PDF: [python-path-complete-certificate-emma-hicks.pdf](https://github.com/user-attachments/files/35475492/python-path-complete-certificate-emma-hicks.pdf)


- **Filterable Python Cheat Sheet**  
  Copyable syntax reference snippets filterable by **All**, **Beginner**, **Intermediate**, and **Advanced** topics, accessible anytime from the top navigation bar.

---

## Zero-Storage UK GDPR Architecture

- **Temporary Page Memory Only:** Lesson progress, exam answers, scores, and optional learner names live strictly in active page memory and clear immediately when the browser tab closes.
- **No Browser Persistence or Tracking:** Zero cookies, zero `localStorage`, zero `sessionStorage`, no user accounts, and no analytics scripts.
- **Client-Side Execution & On-Device Certificates:** All Python code, hidden exam assertions, and PDF certificate rendering stay entirely on the user's device.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Python Runtime:** Pyodide (`v0.27.2`) Python 3 in WebAssembly
- **Certificate Export:** HTML5 Canvas (`2×` rendering) + `jsPDF`
- **Dev & Serving:** Vite + Express (`server.ts`)

---

## Running Locally

```bash
npm install
npm run dev
```

To type-check and build for production:

```bash
npm run lint
npm run build
npm start
```
