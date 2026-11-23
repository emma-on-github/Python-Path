export interface CheatSheetItem {
  title: string;
  summary: string;
  code: string;
}

export const CHEAT_SHEET_ITEMS: CheatSheetItem[] = [
  {
    title: "print()",
    summary: "Show text or values in the output console.",
    code: `print("Hello, world!")`,
  },
  {
    title: "Variables",
    summary: "Store numbers or text with a clear name.",
    code: `score = 10\nname = "Sam"`,
  },
  {
    title: "Lists",
    summary: "Ordered items starting at index 0.",
    code: `items = ["a", "b", "c"]\nprint(items[0])  # "a"`,
  },
  {
    title: "Dictionaries",
    summary: "Key-value pairs looked up by key name.",
    code: `user = {"name": "Alex"}\nprint(user["name"])`,
  },
  {
    title: "if / else",
    summary: "Run indented code based on a condition.",
    code: `if age >= 18:\n    print("Adult")\nelse:\n    print("Minor")`,
  },
  {
    title: "for Loops",
    summary: "Repeat an indented block for every item.",
    code: `for num in [1, 2, 3]:\n    print(num)`,
  },
  {
    title: "len()",
    summary: "Count how many items are in a list or text.",
    code: `count = len(["x", "y"])\nprint(count)  # 2`,
  },
  {
    title: "Functions",
    summary: "Reusable steps defined with def and return.",
    code: `def double(n):\n    return n * 2`,
  },
];
