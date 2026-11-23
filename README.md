# Python Path

A beginner-friendly, privacy-first interactive Python learning and assessment studio built around **zero-storage UK GDPR principles**. All Python execution, grading, progress tracking, and certificate generation run directly in the learner's browser with no accounts, no cookies, and no backend user storage.

Created by **Emma Hicks**.

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

---

## Zero-Storage UK GDPR Architecture

- **No accounts or login**: Learners start coding immediately.
- **No database or server persistence**: Progress exists only in temporary page memory and clears when the tab closes.
- **Local-only certificate rendering**: Learner names never leave the browser.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **In-Browser Python**: Pyodide (`v0.27.2` via WebAssembly)
- **PDF Generation**: HTML5 Canvas 2D + `jsPDF`
- **Server Host**: Express (`server.ts`) serving Vite middleware in development and `dist/` in production

---

## Getting Started Locally

### Prerequisites

- Node.js 22+

### Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (http://localhost:3000)
npm run dev
```

### Build & Type-Check

```bash
# Run TypeScript type checking
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```

---

## Project Structure

```text
├── index.html                  # App entry HTML & Google Fonts
├── server.ts                   # Express + Vite middleware server
├── src/
│   ├── App.tsx                 # Main workspace, progress bar & Python sandbox UI
│   ├── index.css               # Tailwind CSS v4 theme configuration
│   ├── components/
│   │   ├── CertificateCard.tsx # Live executive certificate preview & PDF trigger
│   │   ├── CheatSheetPanel.tsx # Collapsible beginner syntax reference
│   │   └── CodeEditor.tsx      # Code editor with line numbers & Tab indentation
│   ├── data/
│   │   ├── cheatSheet.ts       # Beginner Python Cheat Sheet entries
│   │   └── questions.ts        # 10 beginner Python challenges & sample solutions
│   └── lib/
│       ├── certificate.ts      # High-res Canvas 2D + jsPDF landscape exporter
│       └── pyodide.ts          # Pyodide loader, isolated runner & error tips
└── package.json
```
