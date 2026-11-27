export type ExamBand = "Beginner" | "Intermediate" | "Advanced";

export interface ExamQuestion {
  id: number;
  band: ExamBand;
  topic: string;
  title: string;
  prompt: string;
  exampleSummary: string;
  starterCode: string;
  hint: string;
  solution: string;
  recommendedLessonId: string;
  hiddenTests: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // =========================================================================
  // BEGINNER BAND (Gentle First-Time Programming Questions)
  // =========================================================================
  {
    id: 1,
    band: "Beginner",
    topic: "Printing Output",
    title: "Print a Welcome Message",
    prompt:
      'Put the word Welcome! inside print("") so it prints Welcome! on screen.',
    exampleSummary: 'print("Welcome!") -> Welcome!',
    starterCode: `# Type Welcome! inside the quotes\nprint("")\n`,
    hint: 'Change the line to print("Welcome!").',
    solution: `print("Welcome!")`,
    recommendedLessonId: "b1",
    hiddenTests: `
assert __captured_stdout__.strip() == "Welcome!", f"Expected 'Welcome!', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: 2,
    band: "Beginner",
    topic: "Variables & Simple Maths",
    title: "Add Two Variables",
    prompt:
      "Change total = 0 so it adds a and b together (a + b), then prints the result.",
    exampleSummary: "a = 4, b = 6 -> total == 10",
    starterCode: `a = 4\nb = 6\n\n# Replace 0 with a + b\ntotal = 0\nprint(total)\n`,
    hint: "Change total = 0 to total = a + b.",
    solution: `a = 4\nb = 6\n\ntotal = a + b\nprint(total)`,
    recommendedLessonId: "b2",
    hiddenTests: `
assert "total" in globals(), "Keep the variable named total."
assert total == 10, f"Expected total to be 10, got {total}."
assert __captured_stdout__.strip() == "10", "Make sure print(total) runs."
`,
  },
  {
    id: 3,
    band: "Beginner",
    topic: "f-strings",
    title: "Greeting with an f-string",
    prompt:
      'Given name = "Ada", finish print(f"") so it prints Hello, Ada!.',
    exampleSummary: 'name = "Ada" -> Hello, Ada!',
    starterCode: `name = "Ada"\n\n# Put Hello, {name}! inside the quotes\nprint(f"")\n`,
    hint: 'Update the line to print(f"Hello, {name}!").',
    solution: `name = "Ada"\n\nprint(f"Hello, {name}!")`,
    recommendedLessonId: "b3",
    hiddenTests: `
assert __captured_stdout__.strip() == "Hello, Ada!", f"Expected 'Hello, Ada!', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: 4,
    band: "Beginner",
    topic: "Simple Lists",
    title: "First Item in a List",
    prompt:
      'Given colours = ["blue", "green", "red"], print the first colour using colours[0].',
    exampleSummary: 'colours[0] -> blue',
    starterCode: `colours = ["blue", "green", "red"]\n\n# Put colours[0] inside print()\nprint()\n`,
    hint: "Python lists start at 0, so write print(colours[0]).",
    solution: `colours = ["blue", "green", "red"]\n\nprint(colours[0])`,
    recommendedLessonId: "b4",
    hiddenTests: `
assert __captured_stdout__.strip() == "blue", f"Expected 'blue', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: 5,
    band: "Beginner",
    topic: "if / else Choices",
    title: "Pass or Retry Check",
    prompt:
      'Given score = 80, replace pass under if score >= 50: with print("Pass").',
    exampleSummary: "score = 80 -> prints Pass",
    starterCode: `score = 80\n\nif score >= 50:\n    # Replace pass with print("Pass") (keep 4 spaces)\n    pass\nelse:\n    print("Retry")\n`,
    hint: 'Delete pass and write print("Pass") indented by 4 spaces.',
    solution: `score = 80\n\nif score >= 50:\n    print("Pass")\nelse:\n    print("Retry")`,
    recommendedLessonId: "b5",
    hiddenTests: `
assert "if " in __user_code__ or "if(" in __user_code__, "Keep the if / else block."
assert __captured_stdout__.strip() == "Pass", f"Expected 'Pass', got '{__captured_stdout__.strip()}'."
`,
  },

  // =========================================================================
  // INTERMEDIATE BAND (1-Line Guided Functions & Classes)
  // =========================================================================
  {
    id: 6,
    band: "Intermediate",
    topic: "List Comprehensions",
    title: "Add 2 to Every Number",
    prompt:
      "Inside add_two(nums), replace [] with [n + 2 for n in nums].",
    exampleSummary: "add_two([1, 2, 3]) -> [3, 4, 5]",
    starterCode: `def add_two(nums):\n    # Replace [] with [n + 2 for n in nums]\n    return []\n`,
    hint: "Change return [] to return [n + 2 for n in nums].",
    solution: `def add_two(nums):\n    return [n + 2 for n in nums]`,
    recommendedLessonId: "i1",
    hiddenTests: `
assert callable(globals().get("add_two")), "Keep function add_two(nums)."
assert add_two([1, 2, 3]) == [3, 4, 5], "Expected [3, 4, 5]."
assert add_two([]) == [], "Empty list should return []."
`,
  },
  {
    id: 7,
    band: "Intermediate",
    topic: "Dictionaries & Safe Lookups",
    title: "Look Up Item Price",
    prompt:
      "Inside get_price(prices, item), replace 0 with prices.get(item, 0).",
    exampleSummary: 'get_price({"pen": 2, "book": 8}, "book") -> 8; missing -> 0',
    starterCode: `def get_price(prices, item):\n    # Replace 0 with prices.get(item, 0)\n    return 0\n`,
    hint: "Change return 0 to return prices.get(item, 0).",
    solution: `def get_price(prices, item):\n    return prices.get(item, 0)`,
    recommendedLessonId: "i2",
    hiddenTests: `
assert callable(globals().get("get_price")), "Keep function get_price(prices, item)."
assert get_price({"pen": 2, "book": 8}, "book") == 8, "Should return 8 for 'book'."
assert get_price({"pen": 2, "book": 8}, "bag") == 0, "Missing item should return 0."
`,
  },
  {
    id: 8,
    band: "Intermediate",
    topic: "try / except",
    title: "Divide Safely",
    prompt:
      "Finish divide_or_zero(a, b) by replacing pass with return 0 inside the except block.",
    exampleSummary: "divide_or_zero(12, 3) -> 4.0, divide_or_zero(12, 0) -> 0",
    starterCode: `def divide_or_zero(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        # Replace pass with return 0\n        pass\n`,
    hint: "Delete pass and write return 0.",
    solution: `def divide_or_zero(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    recommendedLessonId: "i3",
    hiddenTests: `
assert callable(globals().get("divide_or_zero")), "Keep function divide_or_zero(a, b)."
assert divide_or_zero(12, 3) == 4.0, "divide_or_zero(12, 3) should return 4.0."
assert divide_or_zero(5, 0) == 0, "Zero divisor should return 0."
`,
  },
  {
    id: 9,
    band: "Intermediate",
    topic: "Classes",
    title: "Simple Book Class",
    prompt:
      "Finish the Book class by replacing pass with self.title = title inside __init__.",
    exampleSummary: 'Book("Python").title -> "Python"',
    starterCode: `class Book:\n    def __init__(self, title):\n        # Replace pass with self.title = title\n        pass\n`,
    hint: "Delete pass and write self.title = title.",
    solution: `class Book:\n    def __init__(self, title):\n        self.title = title`,
    recommendedLessonId: "i4",
    hiddenTests: `
assert "Book" in globals(), "Keep class Book."
b = Book("Python")
assert getattr(b, "title", None) == "Python", 'Book("Python").title should be "Python".'
`,
  },
  {
    id: 10,
    band: "Intermediate",
    topic: "JSON & Dictionaries",
    title: "Read a Name from JSON",
    prompt:
      'Finish read_name(json_str) by replacing "" with data["name"].',
    exampleSummary: 'read_name(\'{"name": "Ada"}\') -> "Ada"',
    starterCode: `import json\n\ndef read_name(json_str):\n    data = json.loads(json_str)\n    # Replace "" with data["name"]\n    return ""\n`,
    hint: 'Change return "" to return data["name"].',
    solution: `import json\n\ndef read_name(json_str):\n    data = json.loads(json_str)\n    return data["name"]`,
    recommendedLessonId: "i5",
    hiddenTests: `
assert callable(globals().get("read_name")), "Keep function read_name(json_str)."
assert read_name('{"name": "Ada"}') == "Ada", "Expected 'Ada'."
assert read_name('{"name": "Sam"}') == "Sam", "Expected 'Sam'."
`,
  },

  // =========================================================================
  // ADVANCED BAND (Gentle 1-Line Guided Exercises)
  // =========================================================================
  {
    id: 11,
    band: "Advanced",
    topic: "Decorators",
    title: "Uppercase Decorator",
    prompt:
      'Inside wrapper(), replace "" with fn().upper() so the wrapped function returns UPPERCASE text.',
    exampleSummary: '@make_upper def say(): return "hi" -> say() == "HI"',
    starterCode: `def make_upper(fn):\n    def wrapper():\n        # Replace "" with fn().upper()\n        return ""\n    return wrapper\n`,
    hint: 'Change return "" to return fn().upper().',
    solution: `def make_upper(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper`,
    recommendedLessonId: "a1",
    hiddenTests: `
assert callable(globals().get("make_upper")), "Keep decorator make_upper(fn)."
@make_upper
def _say():
    return "hello"
assert _say() == "HELLO", "Decorated call should return 'HELLO'."
`,
  },
  {
    id: 12,
    band: "Advanced",
    topic: "Generators (yield)",
    title: "Three Numbers Generator",
    prompt:
      "Inside three_numbers(), replace pass with yield n so it yields 1, 2, and 3.",
    exampleSummary: "list(three_numbers()) -> [1, 2, 3]",
    starterCode: `def three_numbers():\n    for n in [1, 2, 3]:\n        # Replace pass with yield n\n        pass\n`,
    hint: "Delete pass and write yield n.",
    solution: `def three_numbers():\n    for n in [1, 2, 3]:\n        yield n`,
    recommendedLessonId: "a2",
    hiddenTests: `
import types
assert callable(globals().get("three_numbers")), "Keep generator three_numbers()."
gen = three_numbers()
assert isinstance(gen, types.GeneratorType), "three_numbers must use yield."
assert list(gen) == [1, 2, 3], "Expected [1, 2, 3]."
`,
  },
  {
    id: 13,
    band: "Advanced",
    topic: "Context Managers",
    title: "Tracker Context Manager",
    prompt:
      'Look at how __exit__ appends "close". Add self.log.append("open") inside __enter__ right above return self.',
    exampleSummary: 'with Tracker(log): log.append("work") -> ["open", "work", "close"]',
    starterCode: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        # Add self.log.append("open") below\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("close")\n        return False\n`,
    hint: 'Write self.log.append("open") on a line above return self inside __enter__.',
    solution: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        self.log.append("open")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("close")\n        return False`,
    recommendedLessonId: "a3",
    hiddenTests: `
assert "Tracker" in globals(), "Keep class Tracker."
log = []
with Tracker(log):
    log.append("work")
assert log == ["open", "work", "close"], f"Expected ['open', 'work', 'close'], got {log}."
`,
  },
  {
    id: 14,
    band: "Advanced",
    topic: "Dataclasses",
    title: "Book Dataclass",
    prompt:
      "Look at title: str in the Book dataclass. Add pages: int right underneath it.",
    exampleSummary: 'Book("Python", 120).pages == 120',
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    # Add pages: int below\n`,
    hint: "Add pages: int on the line directly under title: str.",
    solution: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int`,
    recommendedLessonId: "a5",
    hiddenTests: `
from dataclasses import is_dataclass
assert "Book" in globals() and is_dataclass(Book), "Book must keep @dataclass."
b1 = Book("Python", 120)
b2 = Book("Python", 120)
assert b1 == b2 and b1.pages == 120, "Book should store title and pages."
`,
  },
  {
    id: 15,
    band: "Advanced",
    topic: "Sets & Unique Items",
    title: "Remove Duplicates with set()",
    prompt:
      "Inside get_unique(items), replace [] with list(set(items)) to remove repeated items.",
    exampleSummary: "get_unique([1, 2, 2, 3]) -> contains 1, 2, and 3 once each",
    starterCode: `def get_unique(items):\n    # Replace [] with list(set(items))\n    return []\n`,
    hint: "Change return [] to return list(set(items)).",
    solution: `def get_unique(items):\n    return list(set(items))`,
    recommendedLessonId: "a6",
    hiddenTests: `
assert callable(globals().get("get_unique")), "Keep function get_unique(items)."
res = get_unique([1, 2, 2, 3])
assert isinstance(res, (list, set)), "Return a list or set of unique items."
assert len(res) == 3 and set(res) == {1, 2, 3}, "Should contain {1, 2, 3} with no duplicates."
assert list(get_unique([])) == [], "Empty list should return empty."
`,
  },
];
