# Python Path

A beginner-friendly, privacy-first interactive Python learning and assessment studio built around zero-storage UK GDPR principles. All Python execution, grading, progress tracking, and certificate generation run directly in the learner's browser with no accounts, no cookies, and no backend user storage.

---

## Key Features

- **In-Browser Python 3 Sandbox (Pyodide WebAssembly)**  
  Runs Python safely inside the browser without sending user code to any remote server. Captures `print()` standard output, standalone return values, and Python tracebacks in a dedicated console.
- **10 Step-by-Step Beginner Challenges**  
  Guides newcomers from first principles through:
  1. `print()` output
  2. Variables & basic maths
  3. Strings
  4. Lists & indexing
  5. List length with `len()`
  6. `if / else` conditionals
  7. Basic `for` loops
  8. Loops with filtering (`if` inside `for`)
  9. Dictionaries
  10. Simple functions (`def` and `return`)
- **Collapsible Beginner Python Cheat Sheet**  
  Quick, copyable syntax examples for core Python building blocks available anytime from the top bar.
- **Plain-English Error Coaching & Smart Solution Gate**  
  Pairs `SyntaxError`, `IndentationError`, `NameError`, `TypeError`, `IndexError`, and `KeyError` tracebacks with beginner-friendly tips. Tracks failed attempts per challenge and unlocks **Show Sample Solution** after 3 failed attempts while still requiring learners to run the code to pass.
- **Live Executive Certificate Preview & Client-Side PDF Export**  
  Upon completing all 10 challenges, learners can enter their name to preview a live parchment-and-navy **Certificate of Achievement** and download a high-resolution A4 landscape PDF generated locally via HTML5 Canvas (`2×` scale) and `jsPDF`, featuring a UK issue date (`DD/MM/YYYY`) and locally generated Credential ID (`CERT-XXXXXX`).

[python-foundations-certificate-emma-hicks.pdf](https://github.com/user-attachments/files/35267099/python-foundations-certificate-emma-hicks.pdf)

---

## Zero-Storage UK GDPR Architecture

- **No accounts or login**: Learners start coding immediately.
- **No database or server persistence**: Progress exists only in temporary page memory and clears when the tab closes.
- **Local-only certificate rendering**: Learner names never leave the browser.

---
