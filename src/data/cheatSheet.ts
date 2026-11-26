export interface CheatSheetItem {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  summary: string;
  code: string;
}

export const CHEAT_SHEET_ITEMS: CheatSheetItem[] = [
  {
    level: "Beginner",
    title: "print() & Variables",
    summary: "Store values with clear names and print text or f-strings.",
    code: `name = "Sam"\nprint(f"Hello, {name}!")`,
  },
  {
    level: "Beginner",
    title: "Lists & len()",
    summary: "Ordered collections indexed from 0, measured with len().",
    code: `colours = ["red", "blue"]\nprint(colours[0], len(colours))`,
  },
  {
    level: "Beginner",
    title: "if / elif / else",
    summary: "Branch behaviour with indented 4-space blocks.",
    code: `if score >= 80:\n    print("High")\nelse:\n    print("Standard")`,
  },
  {
    level: "Beginner",
    title: "for Loops & Functions",
    summary: "Iterate over sequences and define reusable functions.",
    code: `def double(n):\n    return n * 2\n\nfor x in [1, 2]:\n    print(double(x))`,
  },
  {
    level: "Intermediate",
    title: "List Comprehensions",
    summary: "Build transformed or filtered lists in a single readable expression.",
    code: `evens = [\n    n * 2 for n in range(5)\n    if n % 2 == 0\n]`,
  },
  {
    level: "Intermediate",
    title: "Dictionaries & Sets",
    summary: "Safe key lookups with .get() and unique items with set().",
    code: `scores = {"Alex": 90}\nval = scores.get("Sam", 0)\nunique = set([1, 1, 2])`,
  },
  {
    level: "Intermediate",
    title: "try / except",
    summary: "Handle runtime errors gracefully without crashing.",
    code: `try:\n    x = 10 / n\nexcept ZeroDivisionError:\n    x = 0`,
  },
  {
    level: "Intermediate",
    title: "Classes & OOP",
    summary: "Bundle state and methods into reusable objects.",
    code: `class Counter:\n    def __init__(self):\n        self.n = 0`,
  },
  {
    level: "Intermediate",
    title: "json & Counter",
    summary: "Parse JSON strings and tally frequencies with collections.",
    code: `import json\nfrom collections import Counter\ndata = json.loads('["a","a"]')`,
  },
  {
    level: "Advanced",
    title: "Decorators",
    summary: "Wrap functions to extend behaviour using *args and **kwargs.",
    code: `def wrap(fn):\n    def inner(*a, **kw):\n        return fn(*a, **kw)\n    return inner`,
  },
  {
    level: "Advanced",
    title: "Generators (yield)",
    summary: "Produce sequence items lazily on demand without storing all in memory.",
    code: `def count_up(n):\n    for i in range(n):\n        yield i`,
  },
  {
    level: "Advanced",
    title: "Context Managers & Dataclasses",
    summary: "Manage setup/teardown with `with` and model structured data cleanly.",
    code: `from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str`,
  },
];
