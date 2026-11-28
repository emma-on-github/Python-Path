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
    topic: "Printing Output",
    title: "Print a Welcome Message",
    prompt:
      "Write code that prints the exact message Welcome! to the console.",
    exampleSummary: 'print("Welcome!") -> Welcome!',
    starterCode: `# Write your print statement below\n`,
    hint: 'Use print() with matching quotes: print("Welcome!")',
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
      "Given a = 4 and b = 6, create a variable named total equal to a + b, then print total.",
    exampleSummary: "a = 4, b = 6 -> total == 10",
    starterCode: `a = 4\nb = 6\n\n# Create total and print it below\n`,
    hint: "Write total = a + b on one line, then print(total) on the next line.",
    solution: `a = 4\nb = 6\n\ntotal = a + b\nprint(total)`,
    recommendedLessonId: "b2",
    hiddenTests: `
assert "total" in globals(), "Create a variable named total."
assert total == 10, f"Expected total to be 10, got {total}."
assert __captured_stdout__.strip() == "10", "Make sure you call print(total)."
`,
  },
  {
    id: 3,
    band: "Beginner",
    topic: "f-strings",
    title: "Greeting with an f-string",
    prompt:
      'Given name = "Ada", use an f-string to print Hello, Ada! to the console.',
    exampleSummary: 'name = "Ada" -> Hello, Ada!',
    starterCode: `name = "Ada"\n\n# Print the greeting using an f-string\n`,
    hint: 'Use an f-string: print(f"Hello, {name}!")',
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
      'Given colours = ["blue", "green", "red"], print the first colour from the list.',
    exampleSummary: 'colours[0] -> blue',
    starterCode: `colours = ["blue", "green", "red"]\n\n# Print the first colour below\n`,
    hint: "Python lists start at index 0, so write print(colours[0]).",
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
      'Given score = 80, write an if / else statement that prints "Pass" when score >= 50, and "Retry" otherwise.',
    exampleSummary: "score = 80 -> prints Pass",
    starterCode: `score = 80\n\n# Write your if / else block below\n`,
    hint: 'Use if score >= 50: followed by print("Pass"), then else: followed by print("Retry"). Remember to indent with 4 spaces.',
    solution: `score = 80\n\nif score >= 50:\n    print("Pass")\nelse:\n    print("Retry")`,
    recommendedLessonId: "b5",
    hiddenTests: `
assert "if " in __user_code__ or "if(" in __user_code__, "Use an if / else statement."
assert __captured_stdout__.strip() == "Pass", f"Expected 'Pass', got '{__captured_stdout__.strip()}'."
`,
  },

  // =========================================================================
  // INTERMEDIATE BAND
  // =========================================================================
  {
    id: 6,
    band: "Intermediate",
    topic: "List Comprehensions",
    title: "Add 2 to Every Number",
    prompt:
      "Complete add_two(nums) so it returns a new list with 2 added to every number in nums.",
    exampleSummary: "add_two([1, 2, 3]) -> [3, 4, 5]",
    starterCode: `def add_two(nums):\n    # Your code here\n    pass\n`,
    hint: "Use a list comprehension: return [n + 2 for n in nums].",
    solution: `def add_two(nums):\n    return [n + 2 for n in nums]`,
    recommendedLessonId: "i1",
    hiddenTests: `
assert callable(globals().get("add_two")), "Define function add_two(nums)."
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
      "Complete get_price(prices, item) so it returns the price of item from the dictionary prices, or 0 if item is missing.",
    exampleSummary: 'get_price({"pen": 2, "book": 8}, "book") -> 8; missing -> 0',
    starterCode: `def get_price(prices, item):\n    # Your code here\n    pass\n`,
    hint: "Use dictionary .get() with a fallback: return prices.get(item, 0).",
    solution: `def get_price(prices, item):\n    return prices.get(item, 0)`,
    recommendedLessonId: "i2",
    hiddenTests: `
assert callable(globals().get("get_price")), "Define function get_price(prices, item)."
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
      "Complete divide_or_zero(a, b) using try / except so it returns a / b, or 0 if b is 0.",
    exampleSummary: "divide_or_zero(12, 3) -> 4.0, divide_or_zero(12, 0) -> 0",
    starterCode: `def divide_or_zero(a, b):\n    # Your code here\n    pass\n`,
    hint: "Put return a / b inside a try: block, and return 0 inside except ZeroDivisionError:.",
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
    topic: "Classes",
    title: "Simple Book Class",
    prompt:
      "Complete the Book class so __init__(self, title) stores title on self.title.",
    exampleSummary: 'Book("Python").title -> "Python"',
    starterCode: `class Book:\n    def __init__(self, title):\n        # Your code here\n        pass\n`,
    hint: "Inside __init__, write self.title = title.",
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
      'Complete read_name(json_str) so it parses the JSON string and returns the value for "name".',
    exampleSummary: 'read_name(\'{"name": "Ada"}\') -> "Ada"',
    starterCode: `import json\n\ndef read_name(json_str):\n    # Your code here\n    pass\n`,
    hint: 'Call data = json.loads(json_str) and return data["name"].',
    solution: `import json\n\ndef read_name(json_str):\n    data = json.loads(json_str)\n    return data["name"]`,
    recommendedLessonId: "i5",
    hiddenTests: `
assert callable(globals().get("read_name")), "Define function read_name(json_str)."
assert read_name('{"name": "Ada"}') == "Ada", "Expected 'Ada'."
assert read_name('{"name": "Sam"}') == "Sam", "Expected 'Sam'."
`,
  },

  // =========================================================================
  // ADVANCED BAND
  // =========================================================================
  {
    id: 11,
    band: "Advanced",
    topic: "Decorators",
    title: "Uppercase Decorator",
    prompt:
      "Complete the decorator make_upper(fn) so its wrapper calls fn() and returns the string converted to uppercase.",
    exampleSummary: '@make_upper def say(): return "hi" -> say() == "HI"',
    starterCode: `def make_upper(fn):\n    def wrapper():\n        # Your code here\n        pass\n    return wrapper\n`,
    hint: "Inside wrapper(), write return fn().upper().",
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
      "Complete the generator function three_numbers() so it yields 1, 2, and 3 one by one.",
    exampleSummary: "list(three_numbers()) -> [1, 2, 3]",
    starterCode: `def three_numbers():\n    # Your code here\n    pass\n`,
    hint: "Loop with for n in [1, 2, 3]: and yield n on each step.",
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
      'Complete Tracker so __enter__ appends "open" to self.log (and returns self), and __exit__ appends "close" to self.log (and returns False).',
    exampleSummary: 'with Tracker(log): log.append("work") -> ["open", "work", "close"]',
    starterCode: `class Tracker:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        # Your code here\n        pass\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Your code here\n        pass\n`,
    hint: 'In __enter__, write self.log.append("open") and return self. In __exit__, write self.log.append("close") and return False.',
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
      "Complete the @dataclass named Book with two fields: title (str) and pages (int).",
    exampleSummary: 'Book("Python", 120).pages == 120',
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    # Add your fields below\n    pass\n`,
    hint: "Replace pass with title: str on one line and pages: int on the next line.",
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
      "Complete get_unique(items) so it returns a list (or set) of the unique items with duplicates removed.",
    exampleSummary: "get_unique([1, 2, 2, 3]) -> contains 1, 2, and 3 once each",
    starterCode: `def get_unique(items):\n    # Your code here\n    pass\n`,
    hint: "Convert items to a set and back to a list: return list(set(items)).",
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
