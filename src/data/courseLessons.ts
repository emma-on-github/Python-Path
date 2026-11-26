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
    subtitle: "Comprehensions, dictionaries & sets, error handling, OOP classes, and JSON.",
  },
  {
    id: "advanced",
    number: 3,
    title: "Module 3: Advanced Python",
    subtitle: "Decorators, generators, context managers, iterators, dataclasses, and algorithms.",
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
    taskPrompt: 'Use print() to output the exact message Hello, Python! to the console.',
    starterCode: `# Write your print() statement below\n`,
    hint: 'Type print("Hello, Python!") with exact capitalisation and punctuation.',
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
    taskPrompt: "Create a variable area = width * height, then print(area).",
    starterCode: `width = 8\nheight = 5\n\n# Calculate area and print it\n`,
    hint: "Write area = width * height on one line, then print(area) on the next line.",
    expectedSummary: "area == 40 and console prints 40",
    hiddenTests: `
assert "area" in globals(), "Please create a variable named area."
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
    taskPrompt: 'Given name = "Sam", use an f-string to print Hello, Sam! to the console.',
    starterCode: `name = "Sam"\n\n# Use an f-string with print() below\n`,
    hint: 'Try print(f"Hello, {name}!").',
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
      "A list stores an ordered sequence of items inside square brackets, separated by commas. Python uses zero-based indexing, meaning the very first item is at position [0] and the second is at [1]. You can count the total items in any list using len().",
    syntaxExample: `colours = ["red", "blue", "green"]\nprint(colours[0])      # red\nprint(len(colours))  # 3`,
    whyItMatters:
      "Lists are one of Python's workhorse structures for holding datasets, queues, and collections of items.",
    taskPrompt: 'Given colours = ["red", "blue", "green", "gold"], print the first colour and the total count using len().',
    starterCode: `colours = ["red", "blue", "green", "gold"]\n\n# Print colours[0] on line 1, and len(colours) on line 2\n`,
    hint: "Write print(colours[0]) on one line, then print(len(colours)) on the next line.",
    expectedSummary: "Prints red on the first line and 4 on the second line",
    hiddenTests: `
lines = [l.strip() for l in __captured_stdout__.strip().splitlines() if l.strip()]
assert lines == ["red", "4"], f"Expected lines ['red', '4'], got {lines}."
`,
  },
  {
    id: "b5",
    moduleId: "beginner",
    lessonNumber: 5,
    title: "Making Decisions with if / elif / else",
    explanation:
      "Conditionals let your programme choose different paths using comparisons such as >= (greater than or equal to), <= (less than or equal to), or == (equal to). Every if, elif, and else line ends with a colon (:), and the code inside must be indented by 4 spaces. Python runs only the first branch whose condition is True.",
    syntaxExample: `score = 75\nif score >= 80:\n    result = "Distinction"\nelif score >= 50:\n    result = "Pass"\nelse:\n    result = "Retry"\nprint(result)`,
    whyItMatters:
      "Branching logic enables validation rules, grading checks, alerts, and decision trees.",
    taskPrompt: 'Given score = 85, write an if / elif / else statement that sets result to "Distinction" if score >= 80, "Pass" if score >= 50, or "Retry" otherwise, then call print(result).',
    starterCode: `score = 85\n\n# Write your if / elif / else block below to set result\n\n\n# Then print(result)\n`,
    hint: 'Use if score >= 80: result = "Distinction", elif score >= 50: result = "Pass", else: result = "Retry", followed by print(result).',
    expectedSummary: 'result == "Distinction" and console prints Distinction',
    hiddenTests: `
assert "result" in globals(), "Please create a variable named result inside your if / elif / else block."
assert result == "Distinction", f"For score = 85, expected result to be 'Distinction', got '{result}'."
assert __captured_stdout__.strip() == "Distinction", f"Expected console output 'Distinction', got '{__captured_stdout__.strip()}'."
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
    taskPrompt: "Complete the function sum_list(nums) so it loops through every number in nums, adds it to total, and returns total.",
    starterCode: `def sum_list(nums):\n    total = 0\n    # Loop through nums and add each number to total\n    \n    return total\n`,
    hint: "Add two lines inside the function: for n in nums: followed by total += n (indented 4 more spaces).",
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
    starterCode: `def get_score(scores, name):\n    # Use scores.get(name, 0)\n    pass\n`,
    hint: "Write return scores.get(name, 0).",
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
    taskPrompt: "Complete safe_divide(a, b) using try / except ZeroDivisionError so it returns a / b, or 0 when b is 0.",
    starterCode: `def safe_divide(a, b):\n    # Use try / except ZeroDivisionError\n    pass\n`,
    hint: "Inside try: write return a / b. Inside except ZeroDivisionError: write return 0.",
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
    hint: "Use self.count = 0 inside __init__, and self.count += 1 inside increment.",
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
    taskPrompt: 'Complete get_user_name(json_str) by parsing json_str with json.loads() and returning data["name"].',
    starterCode: `import json\n\ndef get_user_name(json_str):\n    # Parse json_str with json.loads() and return data["name"]\n    pass\n`,
    hint: 'Write data = json.loads(json_str) followed by return data["name"].',
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
      "Python's collections module includes Counter, a helpful tool that counts how many times each item appears in a list automatically. Converting a Counter back to a regular dict with dict(Counter(items)) gives you a clean frequency dictionary.",
    syntaxExample: `from collections import Counter\ncounts = Counter(["apple", "pear", "apple"])\nprint(dict(counts))  # {'apple': 2, 'pear': 1}`,
    whyItMatters:
      "Counter saves you from writing manual counting loops whenever you need item totals.",
    taskPrompt: "Complete count_items(items) so it uses Counter(items) and returns a regular dictionary with the item counts.",
    starterCode: `from collections import Counter\n\ndef count_items(items):\n    # Return dict(Counter(items))\n    pass\n`,
    hint: "Replace pass with return dict(Counter(items)).",
    expectedSummary: 'count_items(["a", "b", "a"]) == {"a": 2, "b": 1}',
    hiddenTests: `
assert callable(globals().get("count_items")), "Define count_items(items)."
assert count_items(["a", "b", "a"]) == {"a": 2, "b": 1}, "Should return {'a': 2, 'b': 1}."
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
    taskPrompt: "Complete the wrapper inside double_result(fn) so it calls fn(*args, **kwargs) and returns the result multiplied by 2.",
    starterCode: `def double_result(fn):\n    def wrapper(*args, **kwargs):\n        # Return fn(*args, **kwargs) * 2\n        pass\n    return wrapper\n`,
    hint: "Replace pass with return fn(*args, **kwargs) * 2.",
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
    taskPrompt: "Complete the generator function count_up_to(n) so it yields integers from 1 up to n (inclusive).",
    starterCode: `def count_up_to(n):\n    # Loop i from 1 to n and yield i\n    pass\n`,
    hint: "Write for i in range(1, n + 1): followed by yield i.",
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
      "A context manager guarantees that setup and cleanup code runs reliably around a block using Python's with statement. Implementing __enter__ handles setup, while __exit__ handles cleanup when the block finishes.",
    syntaxExample: `class Session:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return False`,
    whyItMatters:
      "Context managers ensure files, connections, and temporary resources are always cleaned up safely.",
    taskPrompt: "Complete TagTracker so __enter__ appends 'enter' to self.log (and returns self) and __exit__ appends 'exit' to self.log (and returns False).",
    starterCode: `class TagTracker:\n    def __init__(self, log_list):\n        self.log = log_list\n\n    def __enter__(self):\n        # Append 'enter' to self.log and return self\n        pass\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        # Append 'exit' to self.log and return False\n        pass\n`,
    hint: "In __enter__: self.log.append('enter') then return self. In __exit__: self.log.append('exit') then return False.",
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
    taskPrompt: "Complete __next__(self) on Countdown so it counts down from start to 1 (inclusive) and raises StopIteration when self.current <= 0.",
    starterCode: `class Countdown:\n    def __init__(self, start):\n        self.current = start\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        # If self.current <= 0: raise StopIteration\n        # Otherwise save value, subtract 1 from self.current, and return value\n        pass\n`,
    hint: "Write: if self.current <= 0: raise StopIteration; val = self.current; self.current -= 1; return val.",
    expectedSummary: "list(Countdown(3)) == [3, 2, 1]",
    hiddenTests: `
assert "Countdown" in globals(), "Define class Countdown."
assert list(Countdown(3)) == [3, 2, 1], "list(Countdown(3)) should equal [3, 2, 1]."
assert list(Countdown(0)) == [], "Countdown(0) should produce []."
`,
  },
  {
    id: "a5",
    moduleId: "advanced",
    lessonNumber: 5,
    title: "Dataclasses for Clean Data Models",
    explanation:
      "The @dataclass decorator automatically writes __init__, __repr__, and equality (__eq__) methods from simple type-annotated fields. This saves repetitive code when modelling structured items like products or users.",
    syntaxExample: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float`,
    whyItMatters:
      "Dataclasses make structured data models concise, readable, and easy to compare.",
    taskPrompt: "Complete the @dataclass named Product with two fields: name: str and price: float.",
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    # Add name: str and price: float\n    pass\n`,
    hint: "Replace pass with name: str on one line and price: float on the next line.",
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
      "Checking every pair of items in a list with nested loops takes O(n²) time, which slows down on large inputs. Because Python sets check membership in O(1) average time, tracking seen items in a set (or comparing len(items) with len(set(items))) solves duplicate checks in a single pass.",
    syntaxExample: `def has_duplicates(items):\n    return len(items) != len(set(items))`,
    whyItMatters:
      "Choosing a set instead of nested loops keeps scripts fast as lists grow larger.",
    taskPrompt: "Complete has_duplicates(items) so it returns True if any item appears more than once in items, or False if all items are unique.",
    starterCode: `def has_duplicates(items):\n    # Return True if items contains any duplicates, else False\n    pass\n`,
    hint: "You can write return len(items) != len(set(items)) or track seen items in a set.",
    expectedSummary: "has_duplicates([1, 2, 2, 3]) == True; has_duplicates([1, 2, 3]) == False",
    hiddenTests: `
assert callable(globals().get("has_duplicates")), "Define has_duplicates(items)."
assert has_duplicates([1, 2, 2, 3]) is True, "List with repeated 2 should return True."
assert has_duplicates([1, 2, 3]) is False, "Unique list should return False."
assert has_duplicates([]) is False, "Empty list has no duplicates."
`,
  },
];
