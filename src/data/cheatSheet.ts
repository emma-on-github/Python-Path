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
    summary: "Store values with clear names and display text or f-strings.",
    code: `name = "Sam"\nprint(f"Hi, {name}!")`,
  },
  {
    level: "Beginner",
    title: "Simple Lists",
    summary: "Lists hold items inside [ ] and start counting at position 0.",
    code: `fruits = ["apple", "banana"]\nprint(fruits[0])  # apple`,
  },
  {
    level: "Beginner",
    title: "if / else Decisions",
    summary: "Choose between two paths using 4-space indentation.",
    code: `if age >= 18:\n    print("Adult")\nelse:\n    print("Young")`,
  },
  {
    level: "Beginner",
    title: "for Loops",
    summary: "Repeat an action once for every item in a list.",
    code: `for pet in ["cat", "dog"]:\n    print(pet)`,
  },
  {
    level: "Intermediate",
    title: "Functions & Comprehensions",
    summary: "Wrap reusable steps in def and transform lists in one line.",
    code: `def add_one(nums):\n    return [n + 1 for n in nums]`,
  },
  {
    level: "Intermediate",
    title: "Dictionaries & .get()",
    summary: "Look up values safely with a fallback when a key is missing.",
    code: `ages = {"Alex": 12}\nprint(ages.get("Mia", 0))  # 0`,
  },
  {
    level: "Intermediate",
    title: "try / except",
    summary: "Catch errors like dividing by zero without crashing.",
    code: `try:\n    x = 10 / b\nexcept ZeroDivisionError:\n    x = 0`,
  },
  {
    level: "Intermediate",
    title: "Simple Classes",
    summary: "Create objects with attributes saved onto self in __init__.",
    code: `class Pet:\n    def __init__(self, name):\n        self.name = name`,
  },
  {
    level: "Intermediate",
    title: "json & Counter",
    summary: "Read JSON text and count items in a list automatically.",
    code: `import json\nfrom collections import Counter\ndata = json.loads('{"city": "Leeds"}')`,
  },
  {
    level: "Advanced",
    title: "Simple Decorators",
    summary: "Wrap a function to adjust its output without editing it.",
    code: `def shout(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper`,
  },
  {
    level: "Advanced",
    title: "Generators (yield)",
    summary: "Hand back values one at a time using yield.",
    code: `def give_numbers():\n    for n in [1, 2, 3]:\n        yield n`,
  },
  {
    level: "Advanced",
    title: "Dataclasses & Sets",
    summary: "Model structured items with @dataclass and remove duplicates with set().",
    code: `from dataclasses import dataclass\n\n@dataclass\nclass Pet:\n    name: str\n    age: int`,
  },
];
