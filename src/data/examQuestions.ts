export type ExamBand = "Beginner" | "Intermediate" | "Advanced";

export interface ExamQuestion {
  id: number;
  band: ExamBand;
  topic: string;
  title: string;
  prompt: string;
  exampleSummary: string;
  starterCode: string;
  recommendedLessonId: string;
  hiddenTests: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // =========================================================================
  // BEGINNER BAND
  // =========================================================================
  {
    id: 1,
    band: "Beginner",
    topic: "Strings & f-strings",
    title: "Format a Greeting",
    prompt:
      'Write a function greet(name) that returns the exact string "Hello, <name>!".',
    exampleSummary: 'greet("Sam") -> "Hello, Sam!"',
    starterCode: `def greet(name):\n    # Return "Hello, <name>!"\n    pass\n`,
    recommendedLessonId: "b3",
    hiddenTests: `
assert callable(globals().get("greet")), "Define function greet(name)."
assert greet("Sam") == "Hello, Sam!", "Check exact punctuation and spacing."
assert greet("Ada") == "Hello, Ada!", "Function must work for any name."
`,
  },
  {
    id: 2,
    band: "Beginner",
    topic: "Conditionals",
    title: "Pass or Retry Check",
    prompt:
      'Write a function check_pass(score) that returns "Pass" if score >= 50, and "Retry" otherwise.',
    exampleSummary: 'check_pass(65) -> "Pass", check_pass(40) -> "Retry"',
    starterCode: `def check_pass(score):\n    # Return "Pass" if score >= 50 else "Retry"\n    pass\n`,
    recommendedLessonId: "b5",
    hiddenTests: `
assert callable(globals().get("check_pass")), "Define function check_pass(score)."
assert check_pass(50) == "Pass", "50 should return 'Pass'."
assert check_pass(80) == "Pass", "80 should return 'Pass'."
assert check_pass(49) == "Retry", "49 should return 'Retry'."
`,
  },
  {
    id: 3,
    band: "Beginner",
    topic: "Loops & Functions",
    title: "Sum a List of Numbers",
    prompt:
      "Write a function sum_all(nums) that loops through the list nums and returns the total sum.",
    exampleSummary: "sum_all([2, 4, 6]) -> 12",
    starterCode: `def sum_all(nums):\n    total = 0\n    # Loop through nums and return total\n    return total\n`,
    recommendedLessonId: "b6",
    hiddenTests: `
assert callable(globals().get("sum_all")), "Define function sum_all(nums)."
assert sum_all([2, 4, 6]) == 12, "sum_all([2, 4, 6]) should return 12."
assert sum_all([10, 5]) == 15, "sum_all([10, 5]) should return 15."
assert sum_all([]) == 0, "Empty list should return 0."
`,
  },
  {
    id: 4,
    band: "Beginner",
    topic: "Lists & Indexing",
    title: "First Item in a List",
    prompt:
      "Write a function get_first(items) that returns the first element of a non-empty list.",
    exampleSummary: 'get_first(["red", "blue", "green"]) -> "red"',
    starterCode: `def get_first(items):\n    # Return the first item in items\n    pass\n`,
    recommendedLessonId: "b4",
    hiddenTests: `
assert callable(globals().get("get_first")), "Define function get_first(items)."
assert get_first(["red", "blue", "green"]) == "red", "Should return 'red'."
assert get_first([42]) == 42, "Should return 42."
`,
  },
  {
    id: 5,
    band: "Beginner",
    topic: "Loops & Strings",
    title: "Count the Letter 'a'",
    prompt:
      "Write a function count_a(text) that returns how many times the lowercase letter 'a' appears in text.",
    exampleSummary: 'count_a("banana") -> 3',
    starterCode: `def count_a(text):\n    # Count how many 'a' characters are in text\n    pass\n`,
    recommendedLessonId: "b6",
    hiddenTests: `
assert callable(globals().get("count_a")), "Define function count_a(text)."
assert count_a("banana") == 3, "'banana' contains 3 'a' characters."
assert count_a("apple") == 1, "'apple' contains 1 'a'."
assert count_a("python") == 0, "'python' contains 0 'a' characters."
`,
  },

  // =========================================================================
  // INTERMEDIATE BAND
  // =========================================================================
  {
    id: 6,
    band: "Intermediate",
    topic: "List Comprehensions",
    title: "Double All Numbers",
    prompt:
      "Write a function double_all(nums) that uses a list comprehension to return a new list with every number multiplied by 2.",
    exampleSummary: "double_all([1, 2, 3]) -> [2, 4, 6]",
    starterCode: `def double_all(nums):\n    # Return doubled list\n    pass\n`,
    recommendedLessonId: "i1",
    hiddenTests: `
assert callable(globals().get("double_all")), "Define function double_all(nums)."
assert double_all([1, 2, 3]) == [2, 4, 6], "Expected [2, 4, 6]."
assert double_all([]) == [], "Empty list should return []."
`,
  },
  {
    id: 7,
    band: "Intermediate",
    topic: "Dictionaries & Sets",
    title: "Unique Sorted Items",
    prompt:
      "Write a function unique_sorted(items) that removes duplicates from items and returns a sorted list.",
    exampleSummary: "unique_sorted([3, 1, 2, 2, 3]) -> [1, 2, 3]",
    starterCode: `def unique_sorted(items):\n    # Return a sorted list of unique items\n    pass\n`,
    recommendedLessonId: "i2",
    hiddenTests: `
assert callable(globals().get("unique_sorted")), "Define function unique_sorted(items)."
assert unique_sorted([3, 1, 2, 2, 3]) == [1, 2, 3], "Expected [1, 2, 3]."
assert unique_sorted(["b", "a", "b"]) == ["a", "b"], "Should work with strings too."
assert unique_sorted([]) == [], "Empty list should return []."
`,
  },
  {
    id: 8,
    band: "Intermediate",
    topic: "Error Handling (try / except)",
    title: "Safe Division",
    prompt:
      "Write a function safe_divide(a, b) that returns a / b, or 0 if b is 0 (using try / except ZeroDivisionError).",
    exampleSummary: "safe_divide(10, 2) -> 5.0, safe_divide(10, 0) -> 0",
    starterCode: `def safe_divide(a, b):\n    # Return a / b or 0 on ZeroDivisionError\n    pass\n`,
    recommendedLessonId: "i3",
    hiddenTests: `
assert callable(globals().get("safe_divide")), "Define function safe_divide(a, b)."
assert safe_divide(10, 2) == 5.0, "safe_divide(10, 2) should return 5.0."
assert safe_divide(5, 0) == 0, "Zero divisor should return 0."
`,
  },
  {
    id: 9,
    band: "Intermediate",
    topic: "OOP Classes",
    title: "Simple Score Class",
    prompt:
      "Complete the Score class so __init__(self) sets self.points = 0 and add(self, amount) adds amount to self.points.",
    exampleSummary: "s = Score(); s.add(5); s.points -> 5",
    starterCode: `class Score:\n    def __init__(self):\n        # Set self.points = 0\n        pass\n\n    def add(self, amount):\n        # Add amount to self.points\n        pass\n`,
    recommendedLessonId: "i4",
    hiddenTests: `
assert "Score" in globals(), "Define class Score."
s = Score()
assert s.points == 0, "Initial points should be 0."
s.add(5)
s.add(3)
assert s.points == 8, "After adding 5 and 3, points should be 8."
`,
  },
  {
    id: 10,
    band: "Intermediate",
    topic: "JSON & Dictionaries",
    title: "Read a Name from JSON",
    prompt:
      'Write a function read_name(json_str) that parses a JSON string (e.g. \'{"name": "Ada"}\') using json.loads() and returns the value of "name".',
    exampleSummary: 'read_name(\'{"name": "Ada"}\') -> "Ada"',
    starterCode: `import json\n\ndef read_name(json_str):\n    # Parse json_str and return the "name" value\n    pass\n`,
    recommendedLessonId: "i5",
    hiddenTests: `
assert callable(globals().get("read_name")), "Define function read_name(json_str)."
assert read_name('{"name": "Ada"}') == "Ada", "Expected 'Ada'."
assert read_name('{"name": "Sam", "age": 25}') == "Sam", "Expected 'Sam'."
`,
  },

  // =========================================================================
  // ADVANCED BAND
  // =========================================================================
  {
    id: 11,
    band: "Advanced",
    topic: "Decorators",
    title: "Uppercase Return Decorator",
    prompt:
      "Complete the decorator make_upper(fn) so its wrapper calls fn(*args, **kwargs) and returns the string result converted to .upper().",
    exampleSummary: '@make_upper def greet(n): return f"Hi {n}" -> greet("Ada") == "HI ADA"',
    starterCode: `def make_upper(fn):\n    def wrapper(*args, **kwargs):\n        # Call fn(*args, **kwargs) and return .upper()\n        pass\n    return wrapper\n`,
    recommendedLessonId: "a1",
    hiddenTests: `
assert callable(globals().get("make_upper")), "Define decorator make_upper(fn)."
@make_upper
def _g(name):
    return f"Hi {name}"
assert _g("Ada") == "HI ADA", "Decorated call should return 'HI ADA'."
`,
  },
  {
    id: 12,
    band: "Advanced",
    topic: "Generators (yield)",
    title: "Count Up Generator",
    prompt:
      "Write a generator function count_up(n) that yields the integers from 1 up to n (inclusive).",
    exampleSummary: "list(count_up(4)) -> [1, 2, 3, 4]",
    starterCode: `def count_up(n):\n    # Use yield inside a loop from 1 to n\n    pass\n`,
    recommendedLessonId: "a2",
    hiddenTests: `
import types
assert callable(globals().get("count_up")), "Define generator function count_up(n)."
gen = count_up(4)
assert isinstance(gen, types.GeneratorType), "count_up must use yield and return a generator."
assert list(gen) == [1, 2, 3, 4], "Expected [1, 2, 3, 4]."
assert list(count_up(0)) == [], "count_up(0) should yield []."
`,
  },
  {
    id: 13,
    band: "Advanced",
    topic: "Context Managers",
    title: "Tracker Context Manager",
    prompt:
      'Complete Tracker so __enter__ appends "open" to self.log and returns self, and __exit__ appends "close" to self.log and returns False.',
    exampleSummary: 'with Tracker(log): log.append("work") -> ["open", "work", "close"]',
    starterCode: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        # Append "open" and return self\n        pass\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Append "close" and return False\n        pass\n`,
    recommendedLessonId: "a3",
    hiddenTests: `
assert "Tracker" in globals(), "Define class Tracker."
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
      "Complete the @dataclass named Book with fields title: str and pages: int = 100.",
    exampleSummary: 'Book("Python").pages == 100',
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    # Add title: str and pages: int = 100\n    pass\n`,
    recommendedLessonId: "a5",
    hiddenTests: `
from dataclasses import is_dataclass
assert "Book" in globals() and is_dataclass(Book), "Book must be a @dataclass."
b1 = Book("Python")
b2 = Book("Python", 100)
assert b1 == b2 and b1.pages == 100, "Book should default pages to 100 and support dataclass equality."
`,
  },
  {
    id: 15,
    band: "Advanced",
    topic: "Algorithmic Problem-Solving",
    title: "Duplicate Checker",
    prompt:
      "Write a function has_duplicate(items) that returns True if any item appears more than once in items, and False otherwise.",
    exampleSummary: "has_duplicate([1, 2, 2]) -> True, has_duplicate([1, 2, 3]) -> False",
    starterCode: `def has_duplicate(items):\n    # Return True if items contains duplicates, else False\n    pass\n`,
    recommendedLessonId: "a6",
    hiddenTests: `
assert callable(globals().get("has_duplicate")), "Define function has_duplicate(items)."
assert has_duplicate([1, 2, 2]) is True, "[1, 2, 2] has a duplicate."
assert has_duplicate([1, 2, 3]) is False, "[1, 2, 3] has no duplicates."
assert has_duplicate([]) is False, "Empty list has no duplicates."
`,
  },
];
