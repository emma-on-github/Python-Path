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
  // MODULE 1: BEGINNER FOUNDATIONS (6 LESSONS)
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
    taskPrompt: "Create variables width = 8 and height = 5, compute area = width * height, and print area.",
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
    taskPrompt: 'Given name = "Sam" and level = "Beginner", print the exact sentence Sam is learning Beginner Python.',
    starterCode: `name = "Sam"\nlevel = "Beginner"\n\n# Use an f-string to print the sentence\n`,
    hint: 'Try print(f"{name} is learning {level} Python").',
    expectedSummary: "Console prints Sam is learning Beginner Python",
    hiddenTests: `
assert __captured_stdout__.strip() == "Sam is learning Beginner Python", f"Expected 'Sam is learning Beginner Python', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b4",
    moduleId: "beginner",
    lessonNumber: 4,
    title: "Lists, Indexing, and len()",
    explanation:
      "A list stores an ordered sequence of items inside square brackets, separated by commas. Python uses zero-based indexing, meaning the very first item is at position [0], the second at [1], and the last item can be reached with [-1]. You can count the total items in any list using len().",
    syntaxExample: `colours = ["red", "blue", "green"]\nprint(colours[0])      # red\nprint(len(colours))  # 3`,
    whyItMatters:
      "Lists are one of Python's workhorse structures for holding datasets, queues, and collections of items.",
    taskPrompt: 'Given colours = ["red", "blue", "green", "gold"], print the first colour and the total count using len().',
    starterCode: `colours = ["red", "blue", "green", "gold"]\n\n# Print the first colour on line 1, and len(colours) on line 2\n`,
    hint: "Use print(colours[0]) followed by print(len(colours)).",
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
      "Conditionals let your programme choose different paths based on comparisons like >, <, >=, or ==. Every if, elif, and else line ends with a colon (:), and the code belonging to that branch must be indented by 4 spaces. Python runs only the first branch whose condition evaluates to True.",
    syntaxExample: `score = 75\nif score >= 80:\n    print("Distinction")\nelif score >= 50:\n    print("Pass")\nelse:\n    print("Retry")`,
    whyItMatters:
      "Branching logic enables validation rules, pricing tiers, alerts, and decision trees.",
    taskPrompt: 'Write a function check_speed(mph) that returns "Fast" if mph > 70, "Normal" if mph >= 30, and "Slow" otherwise.',
    starterCode: `def check_speed(mph):\n    # Return "Fast", "Normal", or "Slow"\n    pass\n`,
    hint: 'Check if mph > 70 first, then elif mph >= 30, and finish with else: return "Slow".',
    expectedSummary: "check_speed(80) -> 'Fast', check_speed(50) -> 'Normal', check_speed(20) -> 'Slow'",
    hiddenTests: `
assert callable(globals().get("check_speed")), "Define a function named check_speed(mph)."
assert check_speed(80) == "Fast", "check_speed(80) should return 'Fast'."
assert check_speed(70) == "Normal", "check_speed(70) should return 'Normal'."
assert check_speed(30) == "Normal", "check_speed(30) should return 'Normal'."
assert check_speed(20) == "Slow", "check_speed(20) should return 'Slow'."
`,
  },
  {
    id: "b6",
    moduleId: "beginner",
    lessonNumber: 6,
    title: "for Loops and Reusable Functions",
    explanation:
      "A for loop repeats an indented block once for every item in a list or range. Combining loops with functions (defined with def and return) lets you process collections cleanly and return computed results. Using return sends a value back to the caller rather than just printing it.",
    syntaxExample: `def total_up(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total`,
    whyItMatters:
      "Functions and loops form the core building blocks of almost every real Python script.",
    taskPrompt: "Write a function sum_positives(nums) that loops through nums and returns the sum of numbers greater than 0.",
    starterCode: `def sum_positives(nums):\n    # Loop through nums and add values > 0\n    pass\n`,
    hint: "Start with total = 0, loop for n in nums:, check if n > 0: total += n, then return total.",
    expectedSummary: "sum_positives([-3, 4, 0, 6]) == 10",
    hiddenTests: `
assert callable(globals().get("sum_positives")), "Define a function named sum_positives(nums)."
assert sum_positives([-3, 4, 0, 6]) == 10, "sum_positives([-3, 4, 0, 6]) should return 10."
assert sum_positives([-5, -1]) == 0, "sum_positives([-5, -1]) should return 0."
assert sum_positives([1, 2, 3]) == 6, "sum_positives([1, 2, 3]) should return 6."
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
      "A list comprehension creates a new list in a single expressive line by transforming and optionally filtering an existing sequence. The pattern [expression for item in iterable if condition] replaces multi-line append loops with concise, readable code. Python evaluates it faster than an equivalent manual loop.",
    syntaxExample: `nums = [1, 2, 3, 4]\ndoubled_evens = [n * 2 for n in nums if n % 2 == 0]\n# [4, 8]`,
    whyItMatters:
      "List comprehensions are idiomatic Python used constantly in data cleaning and API payload transformation.",
    taskPrompt: "Write a function long_words(words) that returns a list of words (in uppercase) whose length is 4 or more.",
    starterCode: `def long_words(words):\n    # Return [w.upper() for w in words if len(w) >= 4]\n    pass\n`,
    hint: "Use [w.upper() for w in words if len(w) >= 4].",
    expectedSummary: 'long_words(["hi", "code", "py", "data"]) == ["CODE", "DATA"]',
    hiddenTests: `
assert callable(globals().get("long_words")), "Define long_words(words)."
assert long_words(["hi", "code", "py", "data"]) == ["CODE", "DATA"], "Check uppercase and length >= 4."
assert long_words(["a", "bc"]) == [], "Words shorter than 4 characters should be excluded."
`,
  },
  {
    id: "i2",
    moduleId: "intermediate",
    lessonNumber: 2,
    title: "Dictionaries and Sets",
    explanation:
      "Dictionaries map unique keys to values in curly braces, allowing instant O(1) lookups by key or safe retrieval with .get(key, default). Sets store unordered collections of unique items, making deduplication and membership checks effortless. Together they solve most grouping and uniqueness tasks.",
    syntaxExample: `scores = {"Alex": 90}\nprint(scores.get("Sam", 0))  # 0\nunique_tags = set(["py", "py", "web"])`,
    whyItMatters:
      "Dictionaries model records and lookup tables, while sets eliminate duplicates in a single line.",
    taskPrompt: "Write a function merge_counts(a, b) that takes two dictionaries of {item: count} and returns a new dictionary with summed counts for all keys.",
    starterCode: `def merge_counts(a, b):\n    # Combine counts from a and b into a new dictionary\n    pass\n`,
    hint: "Copy a with dict(a), then loop for k, v in b.items(): result[k] = result.get(k, 0) + v.",
    expectedSummary: 'merge_counts({"a": 2, "b": 1}, {"b": 3, "c": 4}) == {"a": 2, "b": 4, "c": 4}',
    hiddenTests: `
assert callable(globals().get("merge_counts")), "Define merge_counts(a, b)."
res = merge_counts({"a": 2, "b": 1}, {"b": 3, "c": 4})
assert res == {"a": 2, "b": 4, "c": 4}, f"Expected combined dict, got {res}."
assert merge_counts({}, {"x": 5}) == {"x": 5}, "Should handle empty dictionaries."
`,
  },
  {
    id: "i3",
    moduleId: "intermediate",
    lessonNumber: 3,
    title: "Handling Errors with try / except",
    explanation:
      "Unexpected inputs—such as non-numeric text or dividing by zero—raise exceptions that crash a script unless handled. Wrapping risky code in a try block lets you catch specific exceptions in an except block and return a safe fallback. Always catch specific exception types like ValueError or ZeroDivisionError rather than a bare except.",
    syntaxExample: `def to_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None`,
    whyItMatters:
      "Defensive error handling prevents bad user input or missing data from bringing down an entire application.",
    taskPrompt: "Write a function safe_int_divide(a_str, b_str) that converts both strings to integers and returns a // b, or None if conversion fails or b is 0.",
    starterCode: `def safe_int_divide(a_str, b_str):\n    # Convert strings with int() and divide with // inside try/except\n    pass\n`,
    hint: "Wrap int(a_str) // int(b_str) in try:, and catch (ValueError, ZeroDivisionError, TypeError): return None.",
    expectedSummary: 'safe_int_divide("10", "2") == 5; invalid or zero returns None',
    hiddenTests: `
assert callable(globals().get("safe_int_divide")), "Define safe_int_divide(a_str, b_str)."
assert safe_int_divide("10", "2") == 5, "10 // 2 should return 5."
assert safe_int_divide("10", "0") is None, "Division by zero should return None."
assert safe_int_divide("abc", "2") is None, "Invalid integer text should return None."
`,
  },
  {
    id: "i4",
    moduleId: "intermediate",
    lessonNumber: 4,
    title: "Object-Oriented Programming: Classes",
    explanation:
      "A class is a blueprint for creating objects that bundle data (attributes) and behaviour (methods) together. The special __init__ method runs automatically when you instantiate an object, setting up initial attributes on self. Methods always accept self as their first parameter to read or update the instance's state.",
    syntaxExample: `class Light:\n    def __init__(self):\n        self.is_on = False\n    def toggle(self):\n        self.is_on = not self.is_on`,
    whyItMatters:
      "Classes keep stateful entities—like bank accounts, users, or game players—cleanly encapsulated.",
    taskPrompt: "Create a class Thermostat with __init__(self, temp=20), a method raise_temp(self, deg) adding deg to self.temp, and lower_temp(self, deg) subtracting deg.",
    starterCode: `class Thermostat:\n    # Implement __init__, raise_temp, and lower_temp\n    pass\n`,
    hint: "In __init__(self, temp=20): set self.temp = temp. Then self.temp += deg and self.temp -= deg.",
    expectedSummary: "Thermostat(18) -> raise_temp(4) -> 22 -> lower_temp(2) -> 20",
    hiddenTests: `
assert "Thermostat" in globals(), "Define a class named Thermostat."
t = Thermostat()
assert t.temp == 20, "Default temp should be 20."
t2 = Thermostat(18)
t2.raise_temp(4)
assert t2.temp == 22, "raise_temp(4) from 18 should give 22."
t2.lower_temp(2)
assert t2.temp == 20, "lower_temp(2) from 22 should give 20."
`,
  },
  {
    id: "i5",
    moduleId: "intermediate",
    lessonNumber: 5,
    title: "Working with JSON Data",
    explanation:
      "JSON (JavaScript Object Notation) is the universal format for exchanging structured data across web APIs and config files. Python's built-in json module parses a JSON string into native dictionaries and lists with json.loads(), and converts Python objects back to JSON text with json.dumps().",
    syntaxExample: `import json\nuser = json.loads('{"name": "Alex", "role": "editor"}')\nprint(user["name"])`,
    whyItMatters:
      "Almost every modern API integration requires parsing and generating JSON payloads safely.",
    taskPrompt: "Write a function active_usernames(json_str) that parses a JSON string representing a list of user dicts and returns a list of usernames where active is True.",
    starterCode: `import json\n\ndef active_usernames(json_str):\n    # Parse json_str and return names where user["active"] is True\n    pass\n`,
    hint: 'Use users = json.loads(json_str) and [u["username"] for u in users if u.get("active")].',
    expectedSummary: "Returns usernames with active == True from parsed JSON",
    hiddenTests: `
assert callable(globals().get("active_usernames")), "Define active_usernames(json_str)."
sample = '[{"username": "ada", "active": true}, {"username": "bob", "active": false}, {"username": "lin", "active": true}]'
assert active_usernames(sample) == ["ada", "lin"], "Should return ['ada', 'lin']."
assert active_usernames("[]") == [], "Empty JSON list should return []."
`,
  },
  {
    id: "i6",
    moduleId: "intermediate",
    lessonNumber: 6,
    title: "The collections Module (Counter & defaultdict)",
    explanation:
      "Python's collections module provides specialised containers that simplify common aggregation tasks. Counter automatically tallies item frequencies in any iterable and provides .most_common(n). defaultdict supplies a default factory (such as list or int) whenever a missing key is accessed.",
    syntaxExample: `from collections import Counter\ncounts = Counter(["a", "b", "a"])\nprint(counts.most_common(1))  # [('a', 2)]`,
    whyItMatters:
      "Using collections removes repetitive boilerplate when grouping records or counting events.",
    taskPrompt: "Write a function group_by_first_letter(words) using defaultdict(list) that returns a regular dict mapping each lowercased first letter to a list of matching words.",
    starterCode: `from collections import defaultdict\n\ndef group_by_first_letter(words):\n    # Group words by word[0].lower()\n    pass\n`,
    hint: "Create groups = defaultdict(list), append each word under w[0].lower(), and return dict(groups).",
    expectedSummary: 'group_by_first_letter(["Apple", "ant", "Bee"]) == {"a": ["Apple", "ant"], "b": ["Bee"]}',
    hiddenTests: `
assert callable(globals().get("group_by_first_letter")), "Define group_by_first_letter(words)."
res = group_by_first_letter(["Apple", "ant", "Bee"])
assert res == {"a": ["Apple", "ant"], "b": ["Bee"]}, f"Got {res}."
assert group_by_first_letter([]) == {}, "Empty input should return {}."
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
      "Functions in Python are first-class objects, meaning they can be passed into and returned from other functions. A decorator wraps an existing function to add cross-cutting behaviour—such as logging, caching, or formatting—without modifying the original function's body. Using *args and **kwargs ensures the wrapper works with any parameter signature.",
    syntaxExample: `def shout(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs).upper()\n    return wrapper`,
    whyItMatters:
      "Decorators power frameworks like Flask, FastAPI, and pytest (@app.route, @property, @lru_cache).",
    taskPrompt: "Write a decorator double_result(fn) that calls fn(*args, **kwargs) and returns its result multiplied by 2.",
    starterCode: `def double_result(fn):\n    # Return a wrapper function using *args, **kwargs\n    pass\n`,
    hint: "Define def wrapper(*args, **kwargs): return fn(*args, **kwargs) * 2 and return wrapper.",
    expectedSummary: "@double_result on add(2, 3) returns 10",
    hiddenTests: `
assert callable(globals().get("double_result")), "Define decorator double_result(fn)."
@double_result
def _sample_add(a, b):
    return a + b
assert _sample_add(2, 3) == 10, "Decorated add(2, 3) should return 10."
@double_result
def _sample_kw(x=4):
    return x
assert _sample_kw(x=7) == 14, "Decorator must support keyword arguments (**kwargs)."
`,
  },
  {
    id: "a2",
    moduleId: "advanced",
    lessonNumber: 2,
    title: "Generators and yield",
    explanation:
      "Unlike a normal function that computes and returns an entire list at once, a generator uses yield to pause and produce one item at a time. Each call to next() resumes right after the previous yield, keeping memory usage tiny even for huge or infinite sequences. Generators can be looped over directly with for.",
    syntaxExample: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1`,
    whyItMatters:
      "Generators allow streaming gigabytes of log lines or sensor readings without running out of RAM.",
    taskPrompt: "Write a generator function even_numbers(limit) that yields all even integers from 0 up to and including limit.",
    starterCode: `def even_numbers(limit):\n    # Use yield to emit even numbers from 0..limit\n    pass\n`,
    hint: "Loop for n in range(0, limit + 1, 2): yield n.",
    expectedSummary: "list(even_numbers(6)) == [0, 2, 4, 6] and returns a generator",
    hiddenTests: `
import types
assert callable(globals().get("even_numbers")), "Define even_numbers(limit)."
g = even_numbers(6)
assert isinstance(g, types.GeneratorType), "even_numbers must be a generator function using yield."
assert list(g) == [0, 2, 4, 6], "list(even_numbers(6)) should equal [0, 2, 4, 6]."
assert list(even_numbers(5)) == [0, 2, 4], "list(even_numbers(5)) should equal [0, 2, 4]."
`,
  },
  {
    id: "a3",
    moduleId: "advanced",
    lessonNumber: 3,
    title: "Context Managers and the with Statement",
    explanation:
      "A context manager guarantees that setup and cleanup code runs reliably—even if an exception occurs inside the block. Any class implementing __enter__ and __exit__ works with Python's with statement. __enter__ prepares the resource, while __exit__ performs teardown and receives any exception info.",
    syntaxExample: `class Session:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return False`,
    whyItMatters:
      "Context managers ensure files, database connections, and locks are always closed safely.",
    taskPrompt: "Create a context manager class TagTracker(log_list) that appends 'enter' on __enter__ (returning self) and appends 'exit' on __exit__.",
    starterCode: `class TagTracker:\n    def __init__(self, log_list):\n        self.log = log_list\n\n    # Implement __enter__ and __exit__\n`,
    hint: "In __enter__(self): append 'enter' to self.log and return self. In __exit__(self, exc_type, exc_val, exc_tb): append 'exit' and return False.",
    expectedSummary: "Using with TagTracker(logs): logs ['enter', ..., 'exit'] even on errors",
    hiddenTests: `
assert "TagTracker" in globals(), "Define class TagTracker."
logs = []
with TagTracker(logs):
    logs.append("work")
assert logs == ["enter", "work", "exit"], f"Expected ['enter', 'work', 'exit'], got {logs}."
logs2 = []
try:
    with TagTracker(logs2):
        raise RuntimeError("boom")
except RuntimeError:
    pass
assert logs2 == ["enter", "exit"], "__exit__ must still run when an exception is raised."
`,
  },
  {
    id: "a4",
    moduleId: "advanced",
    lessonNumber: 4,
    title: "Custom Iterators (__iter__ and __next__)",
    explanation:
      "Behind every for loop in Python is the iterator protocol: __iter__() returns the iterator object, and __next__() returns the next element or raises StopIteration when exhausted. Writing your own iterator class gives you full control over stateful traversal. Once StopIteration is raised, Python cleanly ends the loop.",
    syntaxExample: `class StepUp:\n    def __init__(self, max_val):\n        self.cur = 0\n        self.max_val = max_val\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.cur >= self.max_val:\n            raise StopIteration\n        self.cur += 1\n        return self.cur`,
    whyItMatters:
      "Understanding __iter__ and __next__ reveals how lazy pipelines, pagination cursors, and streams work under the hood.",
    taskPrompt: "Create an iterator class Countdown(start) that counts down from start to 1 (inclusive) and then raises StopIteration.",
    starterCode: `class Countdown:\n    def __init__(self, start):\n        self.current = start\n\n    # Implement __iter__ and __next__\n`,
    hint: "In __next__(self): if self.current <= 0: raise StopIteration; val = self.current; self.current -= 1; return val.",
    expectedSummary: "list(Countdown(3)) == [3, 2, 1]",
    hiddenTests: `
assert "Countdown" in globals(), "Define class Countdown."
assert list(Countdown(3)) == [3, 2, 1], "list(Countdown(3)) should equal [3, 2, 1]."
assert list(Countdown(0)) == [], "Countdown(0) should produce an empty sequence."
`,
  },
  {
    id: "a5",
    moduleId: "advanced",
    lessonNumber: 5,
    title: "Dataclasses for Clean Data Models",
    explanation:
      "The @dataclass decorator in Python's dataclasses module automatically generates __init__, __repr__, and equality (__eq__) methods from type-annotated class attributes. This eliminates repetitive boilerplate when modelling records, orders, or configuration objects. You can also attach helper methods directly on the dataclass.",
    syntaxExample: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float`,
    whyItMatters:
      "Dataclasses make structured domain models concise, readable, and easy to test.",
    taskPrompt: "Create a @dataclass named OrderItem with fields name: str, price: float, qty: int = 1, and a method total(self) returning price * qty.",
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass OrderItem:\n    # Define fields name, price, qty=1 and method total()\n    pass\n`,
    hint: "Add name: str, price: float, qty: int = 1, and def total(self): return self.price * self.qty.",
    expectedSummary: 'OrderItem("Book", 12.5, 2).total() == 25.0 and supports equality',
    hiddenTests: `
from dataclasses import is_dataclass
assert "OrderItem" in globals() and is_dataclass(OrderItem), "OrderItem must be decorated with @dataclass."
a = OrderItem("Book", 12.5, 2)
b = OrderItem("Book", 12.5, 2)
c = OrderItem("Pen", 1.5)
assert a == b, "Dataclass instances with equal fields should be equal."
assert a.total() == 25.0, "total() should return price * qty."
assert c.qty == 1 and c.total() == 1.5, "qty should default to 1."
`,
  },
  {
    id: "a6",
    moduleId: "advanced",
    lessonNumber: 6,
    title: "Algorithmic Problem-Solving: Two Sum",
    explanation:
      "Efficient algorithms turn slow O(n²) nested loops into fast O(n) single-pass solutions by trading a little memory for speed. Using a dictionary to remember values you have already seen lets you check for a complement in constant time. This hash-map pattern appears in caching, deduplication, and interview challenges.",
    syntaxExample: `seen = {}\nfor i, val in enumerate(nums):\n    need = target - val\n    if need in seen:\n        return (seen[need], i)\n    seen[val] = i`,
    whyItMatters:
      "Choosing the right data structure keeps data pipelines responsive as datasets scale.",
    taskPrompt: "Write a function find_pair(nums, target) that returns a tuple (i, j) of two distinct indices where nums[i] + nums[j] == target, or None if no pair exists.",
    starterCode: `def find_pair(nums, target):\n    # Return (i, j) with i < j where nums[i] + nums[j] == target\n    pass\n`,
    hint: "Store seen[val] = i in a dict as you iterate with enumerate(nums), checking if (target - val) in seen.",
    expectedSummary: "find_pair([2, 7, 11, 15], 9) == (0, 1)",
    hiddenTests: `
assert callable(globals().get("find_pair")), "Define find_pair(nums, target)."
assert find_pair([2, 7, 11, 15], 9) == (0, 1), "Expected (0, 1) for [2, 7, 11, 15] target 9."
assert find_pair([3, 2, 4], 6) == (1, 2), "Expected (1, 2) for [3, 2, 4] target 6."
assert find_pair([1, 2, 3], 10) is None, "Should return None when no pair matches."
`,
  },
];
