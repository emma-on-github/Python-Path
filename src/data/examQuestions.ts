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
  // BEGINNER BAND
  // =========================================================================
  {
    id: 1,
    band: "Beginner",
    topic: "Strings & f-strings",
    title: "Format a Greeting",
    prompt:
      'Complete greet(name) so it returns the exact string "Hello, <name>!".',
    exampleSummary: 'greet("Sam") -> "Hello, Sam!"',
    starterCode: `def greet(name):\n    # Return "Hello, <name>!" using an f-string\n    pass\n`,
    hint: 'Use an f-string: return f"Hello, {name}!"',
    solution: `def greet(name):\n    return f"Hello, {name}!"`,
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
      'Complete check_pass(score) so it returns "Pass" when score >= 50, and "Retry" otherwise.',
    exampleSummary: 'check_pass(65) -> "Pass", check_pass(40) -> "Retry"',
    starterCode: `def check_pass(score):\n    if score >= 50:\n        # Return "Pass"\n        pass\n    else:\n        # Return "Retry"\n        pass\n`,
    hint: 'Replace the first pass with return "Pass" and the second pass with return "Retry".',
    solution: `def check_pass(score):\n    if score >= 50:\n        return "Pass"\n    else:\n        return "Retry"`,
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
      "Complete sum_all(nums) so it adds every number in nums to total and returns total.",
    exampleSummary: "sum_all([2, 4, 6]) -> 12",
    starterCode: `def sum_all(nums):\n    total = 0\n    for n in nums:\n        # Add n to total\n        pass\n    return total\n`,
    hint: "Replace pass with total += n (or replace the body with return sum(nums)).",
    solution: `def sum_all(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total`,
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
      "Complete get_first(items) so it returns the first element of the list items.",
    exampleSummary: 'get_first(["red", "blue", "green"]) -> "red"',
    starterCode: `def get_first(items):\n    # Return the first item in items\n    pass\n`,
    hint: "Python lists start at index 0, so write return items[0].",
    solution: `def get_first(items):\n    return items[0]`,
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
    topic: "Variables & Basic Maths",
    title: "Calculate Rectangle Area",
    prompt:
      "Complete calculate_area(width, height) so it returns width multiplied by height.",
    exampleSummary: "calculate_area(8, 5) -> 40",
    starterCode: `def calculate_area(width, height):\n    # Return width multiplied by height\n    pass\n`,
    hint: "Replace pass with return width * height.",
    solution: `def calculate_area(width, height):\n    return width * height`,
    recommendedLessonId: "b2",
    hiddenTests: `
assert callable(globals().get("calculate_area")), "Define function calculate_area(width, height)."
assert calculate_area(8, 5) == 40, "calculate_area(8, 5) should return 40."
assert calculate_area(3, 4) == 12, "calculate_area(3, 4) should return 12."
assert calculate_area(0, 7) == 0, "calculate_area(0, 7) should return 0."
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
      "Complete double_all(nums) using a list comprehension to return a new list with every number multiplied by 2.",
    exampleSummary: "double_all([1, 2, 3]) -> [2, 4, 6]",
    starterCode: `def double_all(nums):\n    # Return a doubled list using a list comprehension\n    pass\n`,
    hint: "Use the list comprehension pattern: return [n * 2 for n in nums].",
    solution: `def double_all(nums):\n    return [n * 2 for n in nums]`,
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
    topic: "Dictionaries & Safe Lookups",
    title: "Look Up Item Price",
    prompt:
      "Complete get_price(prices, item) so it returns the price of item from the dictionary prices, or 0 if item is missing.",
    exampleSummary: 'get_price({"pen": 2, "book": 8}, "book") -> 8; missing item -> 0',
    starterCode: `def get_price(prices, item):\n    # Return prices.get(item, 0)\n    pass\n`,
    hint: "Use dictionary .get() with a default fallback: return prices.get(item, 0).",
    solution: `def get_price(prices, item):\n    return prices.get(item, 0)`,
    recommendedLessonId: "i2",
    hiddenTests: `
assert callable(globals().get("get_price")), "Define function get_price(prices, item)."
assert get_price({"pen": 2, "book": 8}, "book") == 8, "Should return 8 for 'book'."
assert get_price({"pen": 2, "book": 8}, "bag") == 0, "Missing item should return 0."
assert get_price({}, "pen") == 0, "Empty dictionary should return 0."
`,
  },
  {
    id: 8,
    band: "Intermediate",
    topic: "Error Handling (try / except)",
    title: "Divide Safely",
    prompt:
      "Complete the try / except block in divide_or_zero(a, b) so it returns a / b, or 0 if b is 0.",
    exampleSummary: "divide_or_zero(12, 3) -> 4.0, divide_or_zero(12, 0) -> 0",
    starterCode: `def divide_or_zero(a, b):\n    try:\n        # Return a / b\n        pass\n    except ZeroDivisionError:\n        # Return 0\n        pass\n`,
    hint: "Replace the first pass with return a / b and the second pass with return 0.",
    solution: `def divide_or_zero(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    recommendedLessonId: "i3",
    hiddenTests: `
assert callable(globals().get("divide_or_zero")), "Define function divide_or_zero(a, b)."
assert divide_or_zero(12, 3) == 4.0, "divide_or_zero(12, 3) should return 4.0."
assert divide_or_zero(5, 0) == 0, "Zero divisor should return 0."
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
    hint: "In __init__, write self.points = 0. In add, write self.points += amount.",
    solution: `class Score:\n    def __init__(self):\n        self.points = 0\n\n    def add(self, amount):\n        self.points += amount`,
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
      'Complete read_name(json_str) so it returns the value of "name" from the parsed dictionary data.',
    exampleSummary: 'read_name(\'{"name": "Ada"}\') -> "Ada"',
    starterCode: `import json\n\ndef read_name(json_str):\n    data = json.loads(json_str)\n    # Return the "name" value from data\n    pass\n`,
    hint: 'Replace pass with return data["name"].',
    solution: `import json\n\ndef read_name(json_str):\n    data = json.loads(json_str)\n    return data["name"]`,
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
    hint: "Inside wrapper, replace pass with return fn(*args, **kwargs).upper().",
    solution: `def make_upper(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs).upper()\n    return wrapper`,
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
      "Complete the loop inside the generator count_up(n) so it yields each integer i from 1 up to n.",
    exampleSummary: "list(count_up(4)) -> [1, 2, 3, 4]",
    starterCode: `def count_up(n):\n    for i in range(1, n + 1):\n        # Yield i\n        pass\n`,
    hint: "Replace pass with yield i.",
    solution: `def count_up(n):\n    for i in range(1, n + 1):\n        yield i`,
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
      'Complete Tracker so __enter__ appends "open" to self.log and __exit__ appends "close" to self.log.',
    exampleSummary: 'with Tracker(log): log.append("work") -> ["open", "work", "close"]',
    starterCode: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        # Append "open" to self.log\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Append "close" to self.log\n        return False\n`,
    hint: 'Add self.log.append("open") in __enter__, and self.log.append("close") in __exit__.',
    solution: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        self.log.append("open")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("close")\n        return False`,
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
    hint: "Replace pass with title: str on the first line and pages: int = 100 on the next line.",
    solution: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int = 100`,
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
      "Complete has_duplicate(items) so it returns True if any item appears more than once in items, and False otherwise.",
    exampleSummary: "has_duplicate([1, 2, 2]) -> True, has_duplicate([1, 2, 3]) -> False",
    starterCode: `def has_duplicate(items):\n    # Return True if items contains duplicates, else False\n    pass\n`,
    hint: "Compare the list length with a set of its items: return len(items) != len(set(items)).",
    solution: `def has_duplicate(items):\n    return len(items) != len(set(items))`,
    recommendedLessonId: "a6",
    hiddenTests: `
assert callable(globals().get("has_duplicate")), "Define function has_duplicate(items)."
assert has_duplicate([1, 2, 2]) is True, "[1, 2, 2] has a duplicate."
assert has_duplicate([1, 2, 3]) is False, "[1, 2, 3] has no duplicates."
assert has_duplicate([]) is False, "Empty list has no duplicates."
`,
  },
];
