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
  // Q1–Q5: BEGINNER BAND
  // =========================================================================
  {
    id: 1,
    band: "Beginner",
    topic: "Core Syntax & Strings",
    title: "Format a Welcome Message",
    prompt:
      'Write a function format_welcome(name, city) that returns the exact string "Welcome, <name> from <city>!".',
    exampleSummary: 'format_welcome("Sam", "Leeds") -> "Welcome, Sam from Leeds!"',
    starterCode: `def format_welcome(name, city):\n    # Return the formatted welcome string\n    pass\n`,
    recommendedLessonId: "b3",
    hiddenTests: `
assert callable(globals().get("format_welcome")), "Define function format_welcome(name, city)."
assert format_welcome("Sam", "Leeds") == "Welcome, Sam from Leeds!", "Check exact punctuation and spacing."
assert format_welcome("Ada", "York") == "Welcome, Ada from York!", "Function must work for any inputs."
`,
  },
  {
    id: 2,
    band: "Beginner",
    topic: "Conditionals",
    title: "Classify Temperature",
    prompt:
      'Write a function classify_temp(c) that returns "Hot" if c >= 25, "Mild" if 15 <= c < 25, and "Cold" if c < 15.',
    exampleSummary: 'classify_temp(28) -> "Hot", classify_temp(18) -> "Mild", classify_temp(8) -> "Cold"',
    starterCode: `def classify_temp(c):\n    # Return "Hot", "Mild", or "Cold"\n    pass\n`,
    recommendedLessonId: "b5",
    hiddenTests: `
assert callable(globals().get("classify_temp")), "Define function classify_temp(c)."
assert classify_temp(25) == "Hot", "25 should return 'Hot'."
assert classify_temp(30) == "Hot", "30 should return 'Hot'."
assert classify_temp(24) == "Mild", "24 should return 'Mild'."
assert classify_temp(15) == "Mild", "15 should return 'Mild'."
assert classify_temp(14) == "Cold", "14 should return 'Cold'."
`,
  },
  {
    id: 3,
    band: "Beginner",
    topic: "Loops & Filtering",
    title: "Sum Even Numbers",
    prompt:
      "Write a function sum_evens(nums) that loops through a list of integers and returns the sum of all even numbers.",
    exampleSummary: "sum_evens([1, 2, 3, 4, 6]) -> 12",
    starterCode: `def sum_evens(nums):\n    # Return the sum of even numbers in nums\n    pass\n`,
    recommendedLessonId: "b6",
    hiddenTests: `
assert callable(globals().get("sum_evens")), "Define function sum_evens(nums)."
assert sum_evens([1, 2, 3, 4, 6]) == 12, "sum_evens([1, 2, 3, 4, 6]) should return 12."
assert sum_evens([1, 3, 5]) == 0, "Odd-only list should return 0."
assert sum_evens([0, -2, 8]) == 6, "Should handle zero and negative even integers."
`,
  },
  {
    id: 4,
    band: "Beginner",
    topic: "Lists & Indexing",
    title: "First and Last Elements",
    prompt:
      "Write a function edge_items(items) that returns a 2-item list [first, last] from a non-empty list.",
    exampleSummary: 'edge_items(["a", "b", "c"]) -> ["a", "c"]',
    starterCode: `def edge_items(items):\n    # Return [first_item, last_item]\n    pass\n`,
    recommendedLessonId: "b4",
    hiddenTests: `
assert callable(globals().get("edge_items")), "Define function edge_items(items)."
assert edge_items(["a", "b", "c"]) == ["a", "c"], "Should return ['a', 'c']."
assert edge_items([42]) == [42, 42], "Single-item list should return [42, 42]."
assert edge_items([10, 20, 30, 40]) == [10, 40], "Should return [10, 40]."
`,
  },
  {
    id: 5,
    band: "Beginner",
    topic: "Basic Functions",
    title: "Count Vowels",
    prompt:
      'Write a function count_vowels(text) that returns the total number of vowels (a, e, i, o, u — upper or lower case) in text.',
    exampleSummary: 'count_vowels("Python Path") -> 2',
    starterCode: `def count_vowels(text):\n    # Return vowel count in text\n    pass\n`,
    recommendedLessonId: "b6",
    hiddenTests: `
assert callable(globals().get("count_vowels")), "Define function count_vowels(text)."
assert count_vowels("Python Path") == 2, "'Python Path' has 2 vowels."
assert count_vowels("AEIOUaeiou") == 10, "Should count both uppercase and lowercase vowels."
assert count_vowels("rhythm") == 0, "Should return 0 when no vowels exist."
`,
  },

  // =========================================================================
  // Q6–Q10: INTERMEDIATE BAND
  // =========================================================================
  {
    id: 6,
    band: "Intermediate",
    topic: "List Comprehensions",
    title: "Squares of Odd Numbers",
    prompt:
      "Write a function odd_squares(nums) that returns a list containing the square (n ** 2) of each odd number in nums, preserving order.",
    exampleSummary: "odd_squares([1, 2, 3, 4, 5]) -> [1, 9, 25]",
    starterCode: `def odd_squares(nums):\n    # Return squares of odd numbers\n    pass\n`,
    recommendedLessonId: "i1",
    hiddenTests: `
assert callable(globals().get("odd_squares")), "Define function odd_squares(nums)."
assert odd_squares([1, 2, 3, 4, 5]) == [1, 9, 25], "Expected [1, 9, 25]."
assert odd_squares([2, 4, 6]) == [], "Even-only list should return []."
assert odd_squares([-3, 0, 7]) == [9, 49], "Should handle negative odd numbers."
`,
  },
  {
    id: 7,
    band: "Intermediate",
    topic: "Dictionaries & Sets",
    title: "Common Unique Elements",
    prompt:
      "Write a function common_sorted(list_a, list_b) that returns a sorted list of unique values appearing in both lists.",
    exampleSummary: "common_sorted([3, 1, 2, 2], [2, 3, 4]) -> [2, 3]",
    starterCode: `def common_sorted(list_a, list_b):\n    # Return sorted unique items present in both lists\n    pass\n`,
    recommendedLessonId: "i2",
    hiddenTests: `
assert callable(globals().get("common_sorted")), "Define function common_sorted(list_a, list_b)."
assert common_sorted([3, 1, 2, 2], [2, 3, 4]) == [2, 3], "Expected [2, 3]."
assert common_sorted([1, 2], [3, 4]) == [], "Disjoint lists should return []."
assert common_sorted(["b", "a", "b"], ["a", "c", "b"]) == ["a", "b"], "Should work with strings too."
`,
  },
  {
    id: 8,
    band: "Intermediate",
    topic: "Error Handling (try / except)",
    title: "Safe Percentage Calculator",
    prompt:
      "Write a function safe_percent(part, total) that returns round((part / total) * 100, 1). If total is 0 or an invalid type causes an error, return 0.0.",
    exampleSummary: 'safe_percent(1, 4) -> 25.0, safe_percent(5, 0) -> 0.0, safe_percent("x", 10) -> 0.0',
    starterCode: `def safe_percent(part, total):\n    # Return rounded percentage or 0.0 on error\n    pass\n`,
    recommendedLessonId: "i3",
    hiddenTests: `
assert callable(globals().get("safe_percent")), "Define function safe_percent(part, total)."
assert safe_percent(1, 4) == 25.0, "safe_percent(1, 4) should be 25.0."
assert safe_percent(1, 3) == 33.3, "safe_percent(1, 3) should round to 33.3."
assert safe_percent(5, 0) == 0.0, "Zero total should return 0.0."
assert safe_percent("x", 10) == 0.0, "Invalid type should return 0.0."
`,
  },
  {
    id: 9,
    band: "Intermediate",
    topic: "OOP Classes",
    title: "BankAccount Class",
    prompt:
      "Build a BankAccount class initialised with balance=0. Implement deposit(amount) (adds to balance) and withdraw(amount) (subtracts and returns True if balance >= amount, otherwise leaves balance unchanged and returns False).",
    exampleSummary: "acc = BankAccount(50); acc.withdraw(30) -> True (balance 20); acc.withdraw(40) -> False (balance 20)",
    starterCode: `class BankAccount:\n    def __init__(self, balance=0):\n        # Initialise self.balance\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n`,
    recommendedLessonId: "i4",
    hiddenTests: `
assert "BankAccount" in globals(), "Define class BankAccount."
acc = BankAccount(50)
assert acc.balance == 50, "Initial balance should be 50."
acc.deposit(25)
assert acc.balance == 75, "Balance after deposit(25) should be 75."
assert acc.withdraw(30) is True and acc.balance == 45, "Valid withdrawal should return True and deduct balance."
assert acc.withdraw(100) is False and acc.balance == 45, "Overdraft must return False and keep balance unchanged."
default_acc = BankAccount()
assert default_acc.balance == 0, "Default balance should be 0."
`,
  },
  {
    id: 10,
    band: "Intermediate",
    topic: "JSON & Collections",
    title: "Most Frequent Tag from JSON",
    prompt:
      "Write a function top_tag(json_str) that parses a JSON string containing a list of string tags and returns the most frequent tag (or None if the list is empty).",
    exampleSummary: 'top_tag(\'["api", "db", "api"]\') -> "api"',
    starterCode: `import json\nfrom collections import Counter\n\ndef top_tag(json_str):\n    # Parse JSON and return the most common tag\n    pass\n`,
    recommendedLessonId: "i6",
    hiddenTests: `
assert callable(globals().get("top_tag")), "Define function top_tag(json_str)."
assert top_tag('["api", "db", "api", "web"]') == "api", "Expected 'api'."
assert top_tag('["ml"]') == "ml", "Single-item list should return 'ml'."
assert top_tag("[]") is None, "Empty list should return None."
`,
  },

  // =========================================================================
  // Q11–Q15: ADVANCED BAND
  // =========================================================================
  {
    id: 11,
    band: "Advanced",
    topic: "Decorators",
    title: "Prefix Return Value Decorator",
    prompt:
      'Write a decorator tag_ok(fn) that calls fn(*args, **kwargs) and returns the string f"OK: {result}".',
    exampleSummary: '@tag_ok def greet(n): return f"Hi {n}" -> greet("Ada") == "OK: Hi Ada"',
    starterCode: `def tag_ok(fn):\n    # Implement wrapper(*args, **kwargs)\n    pass\n`,
    recommendedLessonId: "a1",
    hiddenTests: `
assert callable(globals().get("tag_ok")), "Define decorator tag_ok(fn)."
@tag_ok
def _g(name, punctuation="!"):
    return f"Hi {name}{punctuation}"
assert _g("Ada") == "OK: Hi Ada!", "Decorated call should prepend 'OK: '."
assert _g("Sam", punctuation=".") == "OK: Hi Sam.", "Decorator must forward **kwargs."
`,
  },
  {
    id: 12,
    band: "Advanced",
    topic: "Generators (yield)",
    title: "Fibonacci Generator",
    prompt:
      "Write a generator function fib_gen(count) that yields the first `count` numbers of the Fibonacci sequence starting with 0, 1, 1, 2, 3...",
    exampleSummary: "list(fib_gen(6)) -> [0, 1, 1, 2, 3, 5]",
    starterCode: `def fib_gen(count):\n    # Yield the first count Fibonacci numbers\n    pass\n`,
    recommendedLessonId: "a2",
    hiddenTests: `
import types
assert callable(globals().get("fib_gen")), "Define generator function fib_gen(count)."
gen = fib_gen(6)
assert isinstance(gen, types.GeneratorType), "fib_gen must use yield and return a generator."
assert list(gen) == [0, 1, 1, 2, 3, 5], "First 6 Fibonacci numbers are [0, 1, 1, 2, 3, 5]."
assert list(fib_gen(1)) == [0], "fib_gen(1) should yield [0]."
assert list(fib_gen(0)) == [], "fib_gen(0) should yield []."
`,
  },
  {
    id: 13,
    band: "Advanced",
    topic: "Context Managers",
    title: "ListAppender Context Manager",
    prompt:
      'Create a context manager class ListAppender(target, start_msg, end_msg) that appends start_msg to target on __enter__ (returning target) and appends end_msg to target on __exit__.',
    exampleSummary: 'with ListAppender(log, "start", "done") as lst: lst.append("step") -> ["start", "step", "done"]',
    starterCode: `class ListAppender:\n    def __init__(self, target, start_msg, end_msg):\n        self.target = target\n        self.start_msg = start_msg\n        self.end_msg = end_msg\n\n    # Implement __enter__ and __exit__\n`,
    recommendedLessonId: "a3",
    hiddenTests: `
assert "ListAppender" in globals(), "Define class ListAppender."
log = []
with ListAppender(log, "start", "done") as lst:
    assert lst is log, "__enter__ should return target list."
    lst.append("step")
assert log == ["start", "step", "done"], f"Expected ['start', 'step', 'done'], got {log}."
log2 = []
try:
    with ListAppender(log2, "begin", "cleanup"):
        raise ValueError("fail")
except ValueError:
    pass
assert log2 == ["begin", "cleanup"], "__exit__ must run even when an exception occurs."
`,
  },
  {
    id: 14,
    band: "Advanced",
    topic: "Custom Iterators & Dataclasses",
    title: "Dataclass & Step Range Iterator",
    prompt:
      "Create a @dataclass named Task(title: str, priority: int = 1) AND a custom iterator class StepRange(start, stop, step) implementing __iter__ and __next__ that yields integers from start up to (but excluding) stop by step.",
    exampleSummary: 'Task("Test").priority == 1; list(StepRange(1, 7, 2)) -> [1, 3, 5]',
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Task:\n    # title: str and priority: int = 1\n    pass\n\nclass StepRange:\n    def __init__(self, start, stop, step=1):\n        self.current = start\n        self.stop = stop\n        self.step = step\n\n    # Implement __iter__ and __next__\n`,
    recommendedLessonId: "a4",
    hiddenTests: `
from dataclasses import is_dataclass
assert "Task" in globals() and is_dataclass(Task), "Task must be a @dataclass."
t1 = Task("Deploy")
t2 = Task("Deploy", 1)
assert t1 == t2 and t1.priority == 1, "Task should default priority to 1 and support dataclass equality."
assert "StepRange" in globals(), "Define custom iterator class StepRange."
assert list(StepRange(1, 7, 2)) == [1, 3, 5], "list(StepRange(1, 7, 2)) should equal [1, 3, 5]."
assert list(StepRange(5, 5, 1)) == [], "StepRange(5, 5, 1) should be empty."
`,
  },
  {
    id: 15,
    band: "Advanced",
    topic: "Algorithmic Problem-Solving",
    title: "Balanced Brackets Validator",
    prompt:
      'Write a function is_balanced(text) that returns True if all brackets (), [], and {} in text are properly opened and closed in the correct nested order, and False otherwise.',
    exampleSummary: 'is_balanced("([{}])") -> True, is_balanced("([)]") -> False',
    starterCode: `def is_balanced(text):\n    # Use a stack list to validate brackets (), [], {}\n    pass\n`,
    recommendedLessonId: "a6",
    hiddenTests: `
assert callable(globals().get("is_balanced")), "Define function is_balanced(text)."
assert is_balanced("([{}])") is True, "'([{}])' is balanced."
assert is_balanced("a + (b * [c - {d}])") is True, "Should ignore non-bracket characters."
assert is_balanced("([)]") is False, "'([)]' is improperly nested."
assert is_balanced("(((") is False, "Unclosed brackets must return False."
assert is_balanced("]") is False, "Unmatched closing bracket must return False."
assert is_balanced("") is True, "Empty string is balanced."
`,
  },
];
