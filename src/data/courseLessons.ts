export type CourseModuleId = "beginner" | "intermediate" | "advanced";

export interface CourseModuleMeta {
  id: CourseModuleId;
  number: number;
  title: string;
  subtitle: string;
}

export interface CourseLesson {
  id: string;
  moduleId: CourseModuleId;
  lessonNumber: number;
  title: string;
  explanation: string;
  syntaxExample: string;
  whyItMatters: string;
  taskPrompt: string;
  starterCode: string;
  hint: string;
  solution: string;
  expectedSummary: string;
  hiddenTests: string;
}

export const COURSE_MODULES: CourseModuleMeta[] = [
  {
    id: "beginner",
    number: 1,
    title: "Module 1: Beginner Python",
    subtitle: "Core syntax, variables, strings, lists, conditionals, and functions.",
  },
  {
    id: "intermediate",
    number: 2,
    title: "Module 2: Intermediate Python",
    subtitle: "Comprehensions, dictionaries, error handling, OOP classes, and JSON.",
  },
  {
    id: "advanced",
    number: 3,
    title: "Module 3: Advanced Python",
    subtitle: "Decorators, generators, context managers, iterators, dataclasses, and sets.",
  },
];

export const COURSE_LESSONS: CourseLesson[] = [
  // =========================================================================
  // MODULE 1: BEGINNER PYTHON (6 LESSONS)
  // =========================================================================
  {
    id: "b1",
    moduleId: "beginner",
    lessonNumber: 1,
    title: "Displaying Output with print()",
    explanation:
      "Every Python journey starts with showing information on the screen. The built-in print() function outputs text, numbers, or calculation results to the console. Text values, called strings, must always be wrapped in matching single or double quotation marks.",
    syntaxExample: `print("Welcome to Python!")\nprint(2026)`,
    whyItMatters:
      "Printing values is the fastest way to inspect what your programme is doing and verify results as you learn.",
    taskPrompt: 'Put the exact message Hello, Python! inside print("") below to output it to the console.',
    starterCode: `# Type Hello, Python! inside the quotes below\nprint("")\n`,
    hint: 'Update the line to print("Hello, Python!") with exact capitalisation and punctuation.',
    solution: `print("Hello, Python!")`,
    expectedSummary: "Console prints Hello, Python!",
    hiddenTests: `
assert __captured_stdout__.strip() == "Hello, Python!", f"Expected 'Hello, Python!' in output, got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b2",
    moduleId: "beginner",
    lessonNumber: 2,
    title: "Variables and Basic Maths",
    explanation:
      "A variable is a named label that stores a value in memory so you can reuse it later. You assign a value using a single equals sign (=), with the variable name on the left and the value on the right. Python supports standard arithmetic operators such as +, -, *, and /.",
    syntaxExample: `price = 12\nquantity = 3\ntotal = price * quantity\nprint(total)  # 36`,
    whyItMatters:
      "Variables let your code adapt to changing inputs instead of repeating fixed numbers everywhere.",
    taskPrompt: "Update area so it multiplies width * height, then run the code to print the result.",
    starterCode: `width = 8\nheight = 5\n\n# Replace 0 with width * height\narea = 0\nprint(area)\n`,
    hint: "Change area = 0 to area = width * height.",
    solution: `width = 8\nheight = 5\n\narea = width * height\nprint(area)`,
    expectedSummary: "area == 40 and console prints 40",
    hiddenTests: `
assert "area" in globals(), "Please keep the variable named area."
assert area == 40, f"Expected area to be 40, got {area}."
assert __captured_stdout__.strip() == "40", "Make sure you call print(area)."
`,
  },
  {
    id: "b3",
    moduleId: "beginner",
    lessonNumber: 3,
    title: "Strings and f-strings",
    explanation:
      "Strings store sequences of characters such as names, messages, or postcodes. An f-string (formatted string) lets you embed variables directly inside curly braces {} by putting the letter f before the opening quote. This makes building readable sentences simple and clean.",
    syntaxExample: `city = "Bristol"\ntemp = 18\nprint(f"{city} is {temp}C today")`,
    whyItMatters:
      "f-strings are the modern Python standard for formatting reports, alerts, and user messages cleanly.",
    taskPrompt: 'Given name = "Sam", finish the f-string inside print(f"") so it prints Hello, Sam! to the console.',
    starterCode: `name = "Sam"\n\n# Put Hello, {name}! inside the f-string quotes below\nprint(f"")\n`,
    hint: 'Update the print line to print(f"Hello, {name}!").',
    solution: `name = "Sam"\n\nprint(f"Hello, {name}!")`,
    expectedSummary: "Console prints Hello, Sam!",
    hiddenTests: `
assert __captured_stdout__.strip() == "Hello, Sam!", f"Expected 'Hello, Sam!', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b4",
    moduleId: "beginner",
    lessonNumber: 4,
    title: "Lists, Indexing, and len()",
    explanation:
      "A list stores an ordered sequence of items inside square brackets, separated by commas. Python uses zero-based indexing, meaning the very first item is at position [0] and the second is at [1]. You can also count the total items in any list using len().",
    syntaxExample: `colours = ["red", "blue", "green"]\nprint(colours[0])      # red\nprint(len(colours))  # 3`,
    whyItMatters:
      "Lists are one of Python's workhorse structures for holding datasets, queues, and collections of items.",
    taskPrompt: 'Given colours = ["red", "blue", "green", "gold"], print the first colour using index [0].',
    starterCode: `colours = ["red", "blue", "green", "gold"]\n\n# Print the first colour using colours[0]\nprint()\n`,
    hint: "Put colours[0] inside print() so it reads print(colours[0]).",
    solution: `colours = ["red", "blue", "green", "gold"]\n\nprint(colours[0])`,
    expectedSummary: "Console prints red",
    hiddenTests: `
assert __captured_stdout__.strip() == "red", f"Expected 'red', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b5",
    moduleId: "beginner",
    lessonNumber: 5,
    title: "Making Decisions with if / elif / else",
    explanation:
      "Conditionals let your programme choose different paths using comparisons such as >= (greater than or equal to), <= (less than or equal to), or == (equal to). Every if, elif, and else line ends with a colon (:), and the code inside must be indented by 4 spaces.",
    syntaxExample: `temp = 22\nif temp >= 25:\n    label = "Hot"\nelif temp >= 15:\n    label = "Mild"\nelse:\n    label = "Cold"\nprint(label)`,
    whyItMatters:
      "Branching logic enables validation rules, grading checks, alerts, and decision trees.",
    taskPrompt: 'Given score = 75, complete the if / else block below so result is set to "Pass" when score >= 50, or "Retry" otherwise.',
    starterCode: `score = 75\nresult = ""\n\nif score >= 50:\n    # Set result = "Pass"\n    pass\nelse:\n    # Set result = "Retry"\n    pass\n\nprint(result)\n`,
    hint: 'Replace the first pass with result = "Pass" and the second pass with result = "Retry" (keep the 4-space indentation).',
    solution: `score = 75\nresult = ""\n\nif score >= 50:\n    result = "Pass"\nelse:\n    result = "Retry"\n\nprint(result)`,
    expectedSummary: 'result == "Pass" and console prints Pass',
    hiddenTests: `
assert "if " in __user_code__ or "if(" in __user_code__, "Keep the if / else statement to set result."
assert __captured_stdout__.strip() == "Pass", f"For score = 75, expected console output 'Pass', got '{__captured_stdout__.strip()}'."
if "result" in globals() and result != "":
    assert result == "Pass", f"For score = 75, expected result to be 'Pass', got '{result}'."
`,
  },
  {
    id: "b6",
    moduleId: "beginner",
    lessonNumber: 6,
    title: "for Loops and Simple Functions",
    explanation:
      "A for loop repeats an indented block once for every item in a list. Defining a reusable function with def lets you take an input parameter, run a loop over it, and send back the answer using return.",
    syntaxExample: `def sum_list(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total`,
    whyItMatters:
      "Functions and loops form the core building blocks of almost every real Python script.",
    taskPrompt: "Complete the loop inside sum_list(nums) so it adds each number n to total and returns total.",
    starterCode: `def sum_list(nums):\n    total = 0\n    for n in nums:\n        # Add n to total\n        pass\n    return total\n`,
    hint: "Replace pass with total += n (or total = total + n).",
    solution: `def sum_list(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total`,
    expectedSummary: "sum_list([2, 4, 6]) == 12",
    hiddenTests: `
assert callable(globals().get("sum_list")), "Keep the function named sum_list(nums)."
assert sum_list([2, 4, 6]) == 12, "sum_list([2, 4, 6]) should return 12."
assert sum_list([10, 5]) == 15, "sum_list([10, 5]) should return 15."
assert sum_list([]) == 0, "sum_list([]) should return 0."
`,
  },

  // =========================================================================
  // MODULE 2: INTERMEDIATE PYTHON (6 LESSONS)
  // =========================================================================
  {
    id: "i1",
    moduleId: "intermediate",
    lessonNumber: 1,
    title: "List Comprehensions",
    explanation:
      "A list comprehension creates a new list in a single line by transforming every item in an existing list. The pattern [expression for item in items] replaces a multi-line append loop with clean, readable Python.",
    syntaxExample: `nums = [1, 2, 3]\ndoubled = [n * 2 for n in nums]\n# [2, 4, 6]`,
    whyItMatters:
      "List comprehensions are used constantly in Python to transform lists cleanly in one line.",
    taskPrompt: "Complete double_numbers(nums) using a list comprehension so it returns each number multiplied by 2.",
    starterCode: `def double_numbers(nums):\n    # Return [n * 2 for n in nums]\n    pass\n`,
    hint: "Replace pass with return [n * 2 for n in nums].",
    solution: `def double_numbers(nums):\n    return [n * 2 for n in nums]`,
    expectedSummary: "double_numbers([1, 3, 5]) == [2, 6, 10]",
    hiddenTests: `
assert callable(globals().get("double_numbers")), "Define double_numbers(nums)."
assert double_numbers([1, 3, 5]) == [2, 6, 10], "Expected [2, 6, 10]."
assert double_numbers([]) == [], "Empty list should return []."
`,
  },
  {
    id: "i2",
    moduleId: "intermediate",
    lessonNumber: 2,
    title: "Dictionaries and Safe Lookups",
    explanation:
      "Dictionaries map keys to values inside curly braces {}. Using .get(key, default) lets you look up a key safely and return a fallback value if the key is missing, avoiding a KeyError.",
    syntaxExample: `scores = {"Alex": 90, "Sam": 82}\nprint(scores.get("Alex", 0))  # 90\nprint(scores.get("Mia", 0))   # 0`,
    whyItMatters:
      "Safe dictionary lookups prevent crashes when optional keys or names are missing from your data.",
    taskPrompt: "Complete get_score(scores, name) so it returns the score for name from the dictionary scores, or 0 if the name is missing.",
    starterCode: `def get_score(scores, name):\n    # Return scores.get(name, 0)\n    pass\n`,
    hint: "Replace pass with return scores.get(name, 0).",
    solution: `def get_score(scores, name):\n    return scores.get(name, 0)`,
    expectedSummary: 'get_score({"Alex": 90}, "Alex") == 90; missing name returns 0',
    hiddenTests: `
assert callable(globals().get("get_score")), "Define get_score(scores, name)."
assert get_score({"Alex": 90, "Sam": 82}, "Alex") == 90, "Should return 90 for Alex."
assert get_score({"Alex": 90}, "Mia") == 0, "Missing name should return 0."
`,
  },
  {
    id: "i3",
    moduleId: "intermediate",
    lessonNumber: 3,
    title: "Handling Errors with try / except",
    explanation:
      "Dividing by zero raises a ZeroDivisionError that stops a script unless handled. Wrapping the division inside a try block and catching ZeroDivisionError in an except block lets your function return a safe fallback value instead.",
    syntaxExample: `def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    whyItMatters:
      "Defensive error handling keeps your code running smoothly even when unexpected inputs arrive.",
    taskPrompt: "Complete the try / except block in safe_divide(a, b) so it returns a / b, or 0 when b is 0.",
    starterCode: `def safe_divide(a, b):\n    try:\n        # Return a / b\n        pass\n    except ZeroDivisionError:\n        # Return 0\n        pass\n`,
    hint: "Replace the first pass with return a / b and the second pass with return 0.",
    solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    expectedSummary: "safe_divide(10, 2) == 5.0 and safe_divide(10, 0) == 0",
    hiddenTests: `
assert callable(globals().get("safe_divide")), "Define safe_divide(a, b)."
assert safe_divide(10, 2) == 5.0, "safe_divide(10, 2) should return 5.0."
assert safe_divide(10, 0) == 0, "Division by zero should return 0."
`,
  },
  {
    id: "i4",
    moduleId: "intermediate",
    lessonNumber: 4,
    title: "Object-Oriented Programming: Classes",
    explanation:
      "A class bundles data (attributes) and actions (methods) together in one blueprint. The __init__ method sets up starting attributes on self, and methods accept self as their first parameter so they can read or update those attributes.",
    syntaxExample: `class ScoreBoard:\n    def __init__(self):\n        self.points = 0\n    def add_point(self):\n        self.points += 1`,
    whyItMatters:
      "Classes keep related state and behaviour neatly organised in larger Python projects.",
    taskPrompt: "Complete the Counter class so __init__ sets self.count = 0 and increment(self) adds 1 to self.count.",
    starterCode: `class Counter:\n    def __init__(self):\n        # Set self.count = 0\n        pass\n\n    def increment(self):\n        # Add 1 to self.count\n        pass\n`,
    hint: "Replace the first pass with self.count = 0, and the second pass with self.count += 1.",
    solution: `class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1`,
    expectedSummary: "c = Counter(); c.increment(); c.count == 1",
    hiddenTests: `
assert "Counter" in globals(), "Define a class named Counter."
c = Counter()
assert c.count == 0, "Initial count should be 0."
c.increment()
c.increment()
assert c.count == 2, "Calling increment() twice should make count equal 2."
`,
  },
  {
    id: "i5",
    moduleId: "intermediate",
    lessonNumber: 5,
    title: "Working with JSON Data",
    explanation:
      "JSON is a standard text format for sharing structured data. Python's built-in json module converts a JSON text string into a Python dictionary or list using json.loads(), allowing you to read keys just like any normal dictionary.",
    syntaxExample: `import json\nuser = json.loads('{"name": "Alex", "role": "editor"}')\nprint(user["name"])  # Alex`,
    whyItMatters:
      "Reading JSON payloads is one of the most common tasks when working with APIs and config files.",
    taskPrompt: 'Complete get_user_name(json_str) by returning data["name"] from the parsed dictionary data.',
    starterCode: `import json\n\ndef get_user_name(json_str):\n    data = json.loads(json_str)\n    # Return data["name"]\n    pass\n`,
    hint: 'Replace pass with return data["name"].',
    solution: `import json\n\ndef get_user_name(json_str):\n    data = json.loads(json_str)\n    return data["name"]`,
    expectedSummary: 'get_user_name(\'{"name": "Alex"}\') == "Alex"',
    hiddenTests: `
assert callable(globals().get("get_user_name")), "Define get_user_name(json_str)."
assert get_user_name('{"name": "Alex", "role": "editor"}') == "Alex", "Should return 'Alex'."
assert get_user_name('{"name": "Sam"}') == "Sam", "Should return 'Sam'."
`,
  },
  {
    id: "i6",
    moduleId: "intermediate",
    lessonNumber: 6,
    title: "Counting Items with collections.Counter",
    explanation:
      "Python's collections module includes Counter, a helpful tool that counts how many times each item appears in a list automatically. You can return Counter(items) directly or wrap it in dict(Counter(items)) for a plain dictionary.",
    syntaxExample: `from collections import Counter\ncounts = Counter(["apple", "pear", "apple"])\nprint(dict(counts))  # {'apple': 2, 'pear': 1}`,
    whyItMatters:
      "Counter saves you from writing manual counting loops whenever you need item totals.",
    taskPrompt: "Complete count_items(items) so it returns Counter(items) (or dict(Counter(items))) with the item counts.",
    starterCode: `from collections import Counter\n\ndef count_items(items):\n    # Return Counter(items)\n    pass\n`,
    hint: "Replace pass with return Counter(items) (or return dict(Counter(items))).",
    solution: `from collections import Counter\n\ndef count_items(items):\n    return dict(Counter(items))`,
    expectedSummary: 'count_items(["a", "b", "a"]) == {"a": 2, "b": 1}',
    hiddenTests: `
assert callable(globals().get("count_items")), "Define count_items(items)."
assert count_items(["a", "b", "a"]) == {"a": 2, "b": 1}, "Should match {'a': 2, 'b': 1}."
assert count_items([]) == {}, "Empty list should return {}."
`,
  },

  // =========================================================================
  // MODULE 3: ADVANCED PYTHON (6 LESSONS)
  // =========================================================================
  {
    id: "a1",
    moduleId: "advanced",
    lessonNumber: 1,
    title: "Function Decorators",
    explanation:
      "A decorator wraps an existing function to modify or extend its result without changing the original function's code. Inside the decorator, a wrapper(*args, **kwargs) function calls fn(*args, **kwargs) and returns the adjusted value.",
    syntaxExample: `def add_one(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs) + 1\n    return wrapper`,
    whyItMatters:
      "Decorators are widely used across Python frameworks for logging, caching, and access checks.",
    taskPrompt: "Complete wrapper inside double_result(fn) so it calls fn(*args, **kwargs) and returns the result multiplied by 2.",
    starterCode: `def double_result(fn):\n    def wrapper(*args, **kwargs):\n        # Return fn(*args, **kwargs) * 2\n        pass\n    return wrapper\n`,
    hint: "Replace pass with return fn(*args, **kwargs) * 2.",
    solution: `def double_result(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs) * 2\n    return wrapper`,
    expectedSummary: "@double_result on add(2, 3) returns 10",
    hiddenTests: `
assert callable(globals().get("double_result")), "Define decorator double_result(fn)."
@double_result
def _sample_add(a, b):
    return a + b
assert _sample_add(2, 3) == 10, "Decorated add(2, 3) should return 10."
@double_result
def _sample_one(x=4):
    return x
assert _sample_one(x=7) == 14, "Decorator must pass keyword arguments (**kwargs)."
`,
  },
  {
    id: "a2",
    moduleId: "advanced",
    lessonNumber: 2,
    title: "Generators and yield",
    explanation:
      "Unlike a normal function that builds and returns a whole list at once, a generator function uses yield to produce one value at a time as needed. This keeps memory usage low and works seamlessly inside for loops and list().",
    syntaxExample: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1`,
    whyItMatters:
      "Generators let you process large streams of data efficiently without loading everything into memory.",
    taskPrompt: "Complete the loop inside count_up_to(n) so it uses yield to produce each number i from 1 up to n.",
    starterCode: `def count_up_to(n):\n    for i in range(1, n + 1):\n        # Yield i\n        pass\n`,
    hint: "Replace pass with yield i.",
    solution: `def count_up_to(n):\n    for i in range(1, n + 1):\n        yield i`,
    expectedSummary: "list(count_up_to(4)) == [1, 2, 3, 4]",
    hiddenTests: `
import types
assert callable(globals().get("count_up_to")), "Define count_up_to(n)."
g = count_up_to(4)
assert isinstance(g, types.GeneratorType), "count_up_to must use yield to return a generator."
assert list(g) == [1, 2, 3, 4], "list(count_up_to(4)) should equal [1, 2, 3, 4]."
assert list(count_up_to(0)) == [], "count_up_to(0) should yield []."
`,
  },
  {
    id: "a3",
    moduleId: "advanced",
    lessonNumber: 3,
    title: "Context Managers and the with Statement",
    explanation:
      "A context manager guarantees that setup and cleanup code runs reliably around a block using Python's with statement. Implementing __enter__ handles setup and returns self, while __exit__ handles cleanup when the block finishes.",
    syntaxExample: `class Session:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return False`,
    whyItMatters:
      "Context managers ensure files, connections, and temporary resources are always cleaned up safely.",
    taskPrompt: 'Complete TagTracker so __enter__ appends "enter" to self.log and __exit__ appends "exit" to self.log.',
    starterCode: `class TagTracker:\n    def __init__(self, log_list):\n        self.log = log_list\n\n    def __enter__(self):\n        # Append "enter" to self.log\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Append "exit" to self.log\n        return False\n`,
    hint: 'Add self.log.append("enter") before return self, and self.log.append("exit") before return False.',
    solution: `class TagTracker:\n    def __init__(self, log_list):\n        self.log = log_list\n\n    def __enter__(self):\n        self.log.append("enter")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("exit")\n        return False`,
    expectedSummary: "Using with TagTracker(logs): records ['enter', ..., 'exit']",
    hiddenTests: `
assert "TagTracker" in globals(), "Define class TagTracker."
logs = []
with TagTracker(logs):
    logs.append("work")
assert logs == ["enter", "work", "exit"], f"Expected ['enter', 'work', 'exit'], got {logs}."
`,
  },
  {
    id: "a4",
    moduleId: "advanced",
    lessonNumber: 4,
    title: "Custom Iterators (__iter__ and __next__)",
    explanation:
      "Every for loop relies on __iter__() to get an iterator and __next__() to fetch the next item. When there are no more items left, __next__() raises StopIteration to signal that the loop should finish cleanly.",
    syntaxExample: `class StepUp:\n    def __init__(self, max_val):\n        self.cur = 0\n        self.max_val = max_val\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.cur >= self.max_val:\n            raise StopIteration\n        self.cur += 1\n        return self.cur`,
    whyItMatters:
      "Understanding __iter__ and __next__ shows how Python loops and streams work behind the scenes.",
    taskPrompt: "Complete __next__(self) on CountUp so it adds 1 to self.current and returns self.current.",
    starterCode: `class CountUp:\n    def __init__(self, max_val):\n        self.current = 0\n        self.max_val = max_val\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.max_val:\n            raise StopIteration\n        # Replace raise StopIteration below with self.current += 1 and return self.current\n        raise StopIteration\n`,
    hint: "Replace the second raise StopIteration with self.current += 1 followed by return self.current.",
    solution: `class CountUp:\n    def __init__(self, max_val):\n        self.current = 0\n        self.max_val = max_val\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.max_val:\n            raise StopIteration\n        self.current += 1\n        return self.current`,
    expectedSummary: "list(CountUp(3)) == [1, 2, 3]",
    hiddenTests: `
assert "CountUp" in globals(), "Define class CountUp."
assert list(CountUp(3)) == [1, 2, 3], "list(CountUp(3)) should equal [1, 2, 3]."
assert list(CountUp(0)) == [], "CountUp(0) should produce []."
`,
  },
  {
    id: "a5",
    moduleId: "advanced",
    lessonNumber: 5,
    title: "Dataclasses for Clean Data Models",
    explanation:
      "The @dataclass decorator automatically writes __init__, __repr__, and equality (__eq__) methods from simple type-annotated fields, and you can also provide default values like qty: int = 1. This saves repetitive code when modelling structured items like products or books.",
    syntaxExample: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float = 0.0`,
    whyItMatters:
      "Dataclasses make structured data models concise, readable, and easy to compare.",
    taskPrompt: "Complete the @dataclass named Product with two fields: name: str and price: float.",
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    # Add name: str and price: float\n    pass\n`,
    hint: "Replace pass with name: str on one line and price: float on the next line.",
    solution: `from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float`,
    expectedSummary: 'Product("Book", 12.5) stores name, price, and supports equality',
    hiddenTests: `
from dataclasses import is_dataclass
assert "Product" in globals() and is_dataclass(Product), "Product must use @dataclass."
p1 = Product("Book", 12.5)
p2 = Product("Book", 12.5)
assert p1.name == "Book" and p1.price == 12.5, "Product should store name and price."
assert p1 == p2, "Dataclass instances with equal fields should be equal."
`,
  },
  {
    id: "a6",
    moduleId: "advanced",
    lessonNumber: 6,
    title: "Fast Duplicate Checking with Sets",
    explanation:
      "Checking every pair of items in a list with nested loops takes O(n²) time, which slows down on large inputs. Because Python sets check membership in O(1) average time, comparing len(items) with len(set(items)) solves duplicate checks in a single pass.",
    syntaxExample: `def has_duplicates(items):\n    return len(items) != len(set(items))`,
    whyItMatters:
      "Choosing a set instead of nested loops keeps scripts fast as lists grow larger.",
    taskPrompt: "Complete has_duplicates(items) so it returns True if any item appears more than once in items, or False if all items are unique.",
    starterCode: `def has_duplicates(items):\n    # Return len(items) != len(set(items))\n    pass\n`,
    hint: "Replace pass with return len(items) != len(set(items)).",
    solution: `def has_duplicates(items):\n    return len(items) != len(set(items))`,
    expectedSummary: "has_duplicates([1, 2, 2, 3]) == True; has_duplicates([1, 2, 3]) == False",
    hiddenTests: `
assert callable(globals().get("has_duplicates")), "Define has_duplicates(items)."
assert has_duplicates([1, 2, 2, 3]) is True, "List with repeated 2 should return True."
assert has_duplicates([1, 2, 3]) is False, "Unique list should return False."
assert has_duplicates([]) is False, "Empty list has no duplicates."
`,
  },
];
