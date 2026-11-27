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
    subtitle: "Gentle first steps: printing text, variables, f-strings, lists, if/else, and loops.",
  },
  {
    id: "intermediate",
    number: 2,
    title: "Module 2: Intermediate Python",
    subtitle: "Small functions, list comprehensions, dictionaries, try/except, classes, and JSON.",
  },
  {
    id: "advanced",
    number: 3,
    title: "Module 3: Advanced Python",
    subtitle: "Decorators, yield generators, with blocks, iterators, dataclasses, and sets.",
  },
];

export const COURSE_LESSONS: CourseLesson[] = [
  // =========================================================================
  // MODULE 1: BEGINNER PYTHON (6 BABY-STEP LESSONS)
  // =========================================================================
  {
    id: "b1",
    moduleId: "beginner",
    lessonNumber: 1,
    title: "Your First Line with print()",
    explanation:
      "Every programmer starts by showing a message on the screen. In Python, print() displays whatever text you put inside quotation marks. You are just one word away from running your first Python programme!",
    syntaxExample: `print("Welcome!")\nprint("I am learning Python")`,
    whyItMatters:
      "print() lets you see straight away what your code is doing on screen.",
    taskPrompt: 'Type Hello! inside the quotes in print("") below, then click Run Code.',
    starterCode: `# Put Hello! inside the quotes\nprint("")\n`,
    hint: 'Change the line so it looks like this: print("Hello!")',
    solution: `print("Hello!")`,
    expectedSummary: "Console prints Hello!",
    hiddenTests: `
assert __captured_stdout__.strip() == "Hello!", f"Expected 'Hello!' in output, got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b2",
    moduleId: "beginner",
    lessonNumber: 2,
    title: "Variables and Simple Maths",
    explanation:
      "A variable is like a labelled box that holds a value, such as price = 5. Once a number is in a variable, you can use normal maths symbols like + (add), - (subtract), and * (multiply) with it.",
    syntaxExample: `price = 5\ntotal = price + 2\nprint(total)  # prints 7`,
    whyItMatters:
      "Variables let you store values once and reuse or update them easily.",
    taskPrompt: "Change total = 0 so it adds 3 to price (write price + 3), then click Run Code.",
    starterCode: `price = 5\n\n# Replace 0 with price + 3\ntotal = 0\nprint(total)\n`,
    hint: "Change total = 0 to total = price + 3.",
    solution: `price = 5\n\ntotal = price + 3\nprint(total)`,
    expectedSummary: "total == 8 and console prints 8",
    hiddenTests: `
assert "total" in globals(), "Keep the variable named total."
assert total == 8, f"Expected total to be 8, got {total}."
assert __captured_stdout__.strip() == "8", "Make sure print(total) runs."
`,
  },
  {
    id: "b3",
    moduleId: "beginner",
    lessonNumber: 3,
    title: "Putting Variables into Text (f-strings)",
    explanation:
      "An f-string lets you drop a variable straight inside a sentence. Put the letter f right before the opening quote, and wrap the variable name in curly brackets like {name}.",
    syntaxExample: `name = "Alex"\nprint(f"Hi, {name}!")  # Hi, Alex!`,
    whyItMatters:
      "f-strings are the easiest way to build friendly messages and greetings.",
    taskPrompt: 'Given name = "Sam", put Hi, {name}! inside print(f"") so it prints Hi, Sam!.',
    starterCode: `name = "Sam"\n\n# Type Hi, {name}! inside the quotes\nprint(f"")\n`,
    hint: 'Update the line to print(f"Hi, {name}!").',
    solution: `name = "Sam"\n\nprint(f"Hi, {name}!")`,
    expectedSummary: "Console prints Hi, Sam!",
    hiddenTests: `
assert __captured_stdout__.strip() == "Hi, Sam!", f"Expected 'Hi, Sam!', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b4",
    moduleId: "beginner",
    lessonNumber: 4,
    title: "Simple Lists",
    explanation:
      "A list stores several items together inside square brackets [ ]. Python starts counting positions from 0, so the first item in a list is always at position [0].",
    syntaxExample: `pets = ["cat", "dog", "bird"]\nprint(pets[0])  # prints cat`,
    whyItMatters:
      "Lists let you keep related items—like names, tasks, or scores—in one neat place.",
    taskPrompt: 'Given fruits = ["apple", "banana", "cherry"], print the first fruit using fruits[0].',
    starterCode: `fruits = ["apple", "banana", "cherry"]\n\n# Put fruits[0] inside print()\nprint()\n`,
    hint: "Update the last line to print(fruits[0]).",
    solution: `fruits = ["apple", "banana", "cherry"]\n\nprint(fruits[0])`,
    expectedSummary: "Console prints apple",
    hiddenTests: `
assert __captured_stdout__.strip() == "apple", f"Expected 'apple', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b5",
    moduleId: "beginner",
    lessonNumber: 5,
    title: "Making Simple Choices with if / else",
    explanation:
      "An if / else block lets your code make a yes-or-no choice. Use >= for 'greater than or equal to', end the if and else lines with a colon (:), and indent the lines inside by 4 spaces.",
    syntaxExample: `temp = 25\nif temp >= 20:\n    print("Warm")\nelse:\n    print("Cool")`,
    whyItMatters:
      "if / else lets your code react differently depending on the numbers or text it sees.",
    taskPrompt: 'Given age = 20, replace pass under if age >= 18: with print("Adult").',
    starterCode: `age = 20\n\nif age >= 18:\n    # Replace pass with print("Adult") (keep the 4 spaces!)\n    pass\nelse:\n    print("Young")\n`,
    hint: 'Delete pass and type print("Adult") with 4 spaces at the start of the line.',
    solution: `age = 20\n\nif age >= 18:\n    print("Adult")\nelse:\n    print("Young")`,
    expectedSummary: "Console prints Adult",
    hiddenTests: `
assert "if " in __user_code__ or "if(" in __user_code__, "Keep the if / else block."
assert __captured_stdout__.strip() == "Adult", f"Expected 'Adult', got '{__captured_stdout__.strip()}'."
`,
  },
  {
    id: "b6",
    moduleId: "beginner",
    lessonNumber: 6,
    title: "Repeating Steps with a for Loop",
    explanation:
      "A for loop goes through a list one item at a time and runs the indented line once for each item. This saves you from writing the same print() line over and over again.",
    syntaxExample: `colours = ["red", "blue"]\nfor c in colours:\n    print(c)`,
    whyItMatters:
      "Loops are how programmes work through shopping lists, messages, and data automatically.",
    taskPrompt: "Replace pass inside the for loop with print(pet) to print every pet in the list.",
    starterCode: `pets = ["cat", "dog"]\n\nfor pet in pets:\n    # Replace pass with print(pet) (keep the 4 spaces!)\n    pass\n`,
    hint: "Delete pass and write print(pet) indented by 4 spaces.",
    solution: `pets = ["cat", "dog"]\n\nfor pet in pets:\n    print(pet)`,
    expectedSummary: "Prints cat on line 1 and dog on line 2",
    hiddenTests: `
lines = [l.strip() for l in __captured_stdout__.strip().splitlines() if l.strip()]
assert lines == ["cat", "dog"], f"Expected ['cat', 'dog'], got {lines}."
`,
  },

  // =========================================================================
  // MODULE 2: INTERMEDIATE PYTHON (6 GENTLE STEP-BY-STEP LESSONS)
  // =========================================================================
  {
    id: "i1",
    moduleId: "intermediate",
    lessonNumber: 1,
    title: "Functions and List Comprehensions",
    explanation:
      "A function (starting with def) is a mini recipe that takes an input and sends back an answer with return. A list comprehension like [n + 1 for n in nums] transforms every number in a list in one neat line.",
    syntaxExample: `def double_all(nums):\n    return [n * 2 for n in nums]`,
    whyItMatters:
      "Functions let you reuse code easily, and list comprehensions keep list changes short and clear.",
    taskPrompt: "Inside add_one(nums), replace [] with [n + 1 for n in nums] so every number goes up by 1.",
    starterCode: `def add_one(nums):\n    # Replace [] with [n + 1 for n in nums]\n    return []\n`,
    hint: "Change return [] to return [n + 1 for n in nums].",
    solution: `def add_one(nums):\n    return [n + 1 for n in nums]`,
    expectedSummary: "add_one([1, 2, 3]) == [2, 3, 4]",
    hiddenTests: `
assert callable(globals().get("add_one")), "Keep the function named add_one(nums)."
assert add_one([1, 2, 3]) == [2, 3, 4], "Expected [2, 3, 4]."
assert add_one([]) == [], "Empty list should return []."
`,
  },
  {
    id: "i2",
    moduleId: "intermediate",
    lessonNumber: 2,
    title: "Dictionaries and Safe Lookups (.get)",
    explanation:
      "A dictionary pairs labels (keys) with values inside curly braces, like {\"Alex\": 12}. Using .get(name, 0) looks up a key safely and gives back 0 instead of an error if that name is not there.",
    syntaxExample: `ages = {"Alex": 12, "Sam": 14}\nprint(ages.get("Alex", 0))  # 12\nprint(ages.get("Mia", 0))   # 0`,
    whyItMatters:
      "Safe dictionary lookups stop your code from crashing when a name or item is missing.",
    taskPrompt: "Inside get_age(ages, name), replace 0 with ages.get(name, 0).",
    starterCode: `def get_age(ages, name):\n    # Replace 0 with ages.get(name, 0)\n    return 0\n`,
    hint: "Change return 0 to return ages.get(name, 0).",
    solution: `def get_age(ages, name):\n    return ages.get(name, 0)`,
    expectedSummary: 'get_age({"Alex": 12}, "Alex") == 12; missing name returns 0',
    hiddenTests: `
assert callable(globals().get("get_age")), "Keep the function named get_age(ages, name)."
assert get_age({"Alex": 12, "Sam": 14}, "Alex") == 12, "Should return 12 for Alex."
assert get_age({"Alex": 12}, "Mia") == 0, "Missing name should return 0."
`,
  },
  {
    id: "i3",
    moduleId: "intermediate",
    lessonNumber: 3,
    title: "Catching Zero Division with try / except",
    explanation:
      "Dividing by zero stops a programme with an error. Putting the division inside try: and catching ZeroDivisionError with except: lets you return a safe fallback number like 0 instead.",
    syntaxExample: `def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    whyItMatters:
      "try / except keeps your programme calm and working even when bad numbers show up.",
    taskPrompt: "Finish safe_divide(a, b) by replacing pass with return 0 inside the except block.",
    starterCode: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        # Replace pass with return 0\n        pass\n`,
    hint: "Delete pass and type return 0 (indented to line up with the comment).",
    solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 0`,
    expectedSummary: "safe_divide(10, 2) == 5.0 and safe_divide(10, 0) == 0",
    hiddenTests: `
assert callable(globals().get("safe_divide")), "Keep the function named safe_divide(a, b)."
assert safe_divide(10, 2) == 5.0, "safe_divide(10, 2) should return 5.0."
assert safe_divide(10, 0) == 0, "Division by zero should return 0."
`,
  },
  {
    id: "i4",
    moduleId: "intermediate",
    lessonNumber: 4,
    title: "Creating Simple Objects with class",
    explanation:
      "A class is a template for creating objects, like a Pet or a Book. The __init__ function runs automatically when you create a new object and saves information onto self.",
    syntaxExample: `class Book:\n    def __init__(self, title):\n        self.title = title`,
    whyItMatters:
      "Classes let you bundle related details—like a pet's name or a user's details—together cleanly.",
    taskPrompt: "Finish the Pet class by replacing pass with self.name = name inside __init__.",
    starterCode: `class Pet:\n    def __init__(self, name):\n        # Replace pass with self.name = name\n        pass\n`,
    hint: "Delete pass and type self.name = name.",
    solution: `class Pet:\n    def __init__(self, name):\n        self.name = name`,
    expectedSummary: 'Pet("Bella").name == "Bella"',
    hiddenTests: `
assert "Pet" in globals(), "Keep the class named Pet."
p = Pet("Bella")
assert getattr(p, "name", None) == "Bella", 'Pet("Bella").name should equal "Bella".'
`,
  },
  {
    id: "i5",
    moduleId: "intermediate",
    lessonNumber: 5,
    title: "Reading JSON Data",
    explanation:
      "JSON is a popular text format for sharing information between websites and apps. Python's json.loads() turns a JSON text string into a normal Python dictionary so you can read keys like data[\"city\"].",
    syntaxExample: `import json\ninfo = json.loads('{"city": "Leeds"}')\nprint(info["city"])  # Leeds`,
    whyItMatters:
      "Almost every web service sends data in JSON, so reading it takes just one line in Python.",
    taskPrompt: 'Finish get_city(json_text) by replacing "" with data["city"].',
    starterCode: `import json\n\ndef get_city(json_text):\n    data = json.loads(json_text)\n    # Replace "" with data["city"]\n    return ""\n`,
    hint: 'Change return "" to return data["city"].',
    solution: `import json\n\ndef get_city(json_text):\n    data = json.loads(json_text)\n    return data["city"]`,
    expectedSummary: 'get_city(\'{"city": "Leeds"}\') == "Leeds"',
    hiddenTests: `
assert callable(globals().get("get_city")), "Keep the function named get_city(json_text)."
assert get_city('{"city": "Leeds"}') == "Leeds", "Should return 'Leeds'."
assert get_city('{"city": "York"}') == "York", "Should return 'York'."
`,
  },
  {
    id: "i6",
    moduleId: "intermediate",
    lessonNumber: 6,
    title: "Counting Items with Counter",
    explanation:
      "Python's built-in Counter automatically counts how many times each word or item appears in a list. You don't have to write a counting loop yourself!",
    syntaxExample: `from collections import Counter\ncounts = Counter(["cat", "dog", "cat"])\nprint(counts["cat"])  # 2`,
    whyItMatters:
      "Counter turns tedious counting tasks into a single, easy-to-read line.",
    taskPrompt: "Inside count_words(words), replace {} with Counter(words).",
    starterCode: `from collections import Counter\n\ndef count_words(words):\n    # Replace {} with Counter(words)\n    return {}\n`,
    hint: "Change return {} to return Counter(words).",
    solution: `from collections import Counter\n\ndef count_words(words):\n    return Counter(words)`,
    expectedSummary: 'count_words(["a", "b", "a"]) == {"a": 2, "b": 1}',
    hiddenTests: `
assert callable(globals().get("count_words")), "Keep the function named count_words(words)."
assert count_words(["a", "b", "a"]) == {"a": 2, "b": 1}, "Should match {'a': 2, 'b': 1}."
assert count_words([]) == {}, "Empty list should return {}."
`,
  },

  // =========================================================================
  // MODULE 3: ADVANCED PYTHON (6 GENTLE STEP-BY-STEP LESSONS)
  // =========================================================================
  {
    id: "a1",
    moduleId: "advanced",
    lessonNumber: 1,
    title: "Simple Function Decorators",
    explanation:
      "A decorator wraps an existing function so it can tweak what the function returns without editing the original code. Think of it like gift-wrapping a result before handing it back.",
    syntaxExample: `def shout(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper`,
    whyItMatters:
      "Decorators let you add extra polish—like formatting or logging—to any function cleanly.",
    taskPrompt: 'Inside wrapper(), replace "" with fn().upper() so the wrapped text comes back in UPPERCASE.',
    starterCode: `def shout(fn):\n    def wrapper():\n        # Replace "" with fn().upper()\n        return ""\n    return wrapper\n`,
    hint: 'Change return "" to return fn().upper().',
    solution: `def shout(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper`,
    expectedSummary: '@shout on a function returning "hello" returns "HELLO"',
    hiddenTests: `
assert callable(globals().get("shout")), "Keep decorator shout(fn)."
@shout
def _say_hi():
    return "hello"
assert _say_hi() == "HELLO", "Decorated function should return 'HELLO'."
`,
  },
  {
    id: "a2",
    moduleId: "advanced",
    lessonNumber: 2,
    title: "Producing Values One by One (yield)",
    explanation:
      "Instead of returning a whole list at once, a generator function uses yield to hand out one item at a time. Each time a loop asks for the next item, it picks up right where it left off.",
    syntaxExample: `def two_words():\n    for word in ["hi", "bye"]:\n        yield word`,
    whyItMatters:
      "Generators save memory when working with long lists or live streams of items.",
    taskPrompt: "Inside give_numbers(), replace pass with yield n so it yields 1, 2, and 3 one by one.",
    starterCode: `def give_numbers():\n    for n in [1, 2, 3]:\n        # Replace pass with yield n\n        pass\n`,
    hint: "Delete pass and write yield n.",
    solution: `def give_numbers():\n    for n in [1, 2, 3]:\n        yield n`,
    expectedSummary: "list(give_numbers()) == [1, 2, 3]",
    hiddenTests: `
import types
assert callable(globals().get("give_numbers")), "Keep function give_numbers()."
g = give_numbers()
assert isinstance(g, types.GeneratorType), "give_numbers must use yield."
assert list(g) == [1, 2, 3], "list(give_numbers()) should equal [1, 2, 3]."
`,
  },
  {
    id: "a3",
    moduleId: "advanced",
    lessonNumber: 3,
    title: "Setup & Cleanup with Context Managers (with)",
    explanation:
      "A context manager works with Python's with keyword to run setup code at the start (__enter__) and cleanup code at the end (__exit__) automatically, just like opening and closing a door.",
    syntaxExample: `with Door(log):\n    log.append("walk")`,
    whyItMatters:
      "Using with ensures files and connections are always closed neatly when you finish.",
    taskPrompt: 'Look at how __exit__ records "close". Add self.log.append("open") inside __enter__ right above return self.',
    starterCode: `class Door:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        # Add self.log.append("open") below\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("close")\n        return False\n`,
    hint: 'Add self.log.append("open") on its own line inside __enter__, lined up with return self.',
    solution: `class Door:\n    def __init__(self, log):\n        self.log = log\n\n    def __enter__(self):\n        self.log.append("open")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.log.append("close")\n        return False`,
    expectedSummary: "with Door(logs): records ['open', ..., 'close']",
    hiddenTests: `
assert "Door" in globals(), "Keep class Door."
logs = []
with Door(logs):
    logs.append("walk")
assert logs == ["open", "walk", "close"], f"Expected ['open', 'walk', 'close'], got {logs}."
`,
  },
  {
    id: "a4",
    moduleId: "advanced",
    lessonNumber: 4,
    title: "Stepping Through Items with an Iterator",
    explanation:
      "Behind every for loop, Python uses __next__() to ask for the next value and stops cleanly when StopIteration is raised. You can build your own counter by adding 1 to self.current and returning it.",
    syntaxExample: `def __next__(self):\n    if self.current >= self.max_val:\n        raise StopIteration\n    self.current += 1\n    return self.current`,
    whyItMatters:
      "Knowing how __next__ works helps you understand what Python loops do behind the scenes.",
    taskPrompt: "Inside __next__(self), replace the second raise StopIteration with self.current += 1 and return self.current.",
    starterCode: `class CountUp:\n    def __init__(self, max_val):\n        self.current = 0\n        self.max_val = max_val\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.max_val:\n            raise StopIteration\n        # Replace raise StopIteration below with self.current += 1 and return self.current\n        raise StopIteration\n`,
    hint: "Replace the second raise StopIteration with two lines:\nself.current += 1\nreturn self.current",
    solution: `class CountUp:\n    def __init__(self, max_val):\n        self.current = 0\n        self.max_val = max_val\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.max_val:\n            raise StopIteration\n        self.current += 1\n        return self.current`,
    expectedSummary: "list(CountUp(3)) == [1, 2, 3]",
    hiddenTests: `
assert "CountUp" in globals(), "Keep class CountUp."
assert list(CountUp(3)) == [1, 2, 3], "list(CountUp(3)) should equal [1, 2, 3]."
assert list(CountUp(0)) == [], "CountUp(0) should produce []."
`,
  },
  {
    id: "a5",
    moduleId: "advanced",
    lessonNumber: 5,
    title: "Quick Data Classes with @dataclass",
    explanation:
      "Adding @dataclass above a class tells Python to write __init__ and equality checks for you automatically. You just list the field names and their types, like name: str and age: int.",
    syntaxExample: `from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float`,
    whyItMatters:
      "Dataclasses save typing and keep simple data records neat and easy to read.",
    taskPrompt: "Look at name: str in the Pet dataclass. Add age: int right underneath it.",
    starterCode: `from dataclasses import dataclass\n\n@dataclass\nclass Pet:\n    name: str\n    # Add age: int below\n`,
    hint: "Add age: int on the next line, lined up directly under name: str.",
    solution: `from dataclasses import dataclass\n\n@dataclass\nclass Pet:\n    name: str\n    age: int`,
    expectedSummary: 'Pet("Rex", 4).age == 4',
    hiddenTests: `
from dataclasses import is_dataclass
assert "Pet" in globals() and is_dataclass(Pet), "Pet must keep @dataclass."
p1 = Pet("Rex", 4)
p2 = Pet("Rex", 4)
assert p1.name == "Rex" and p1.age == 4, "Pet should store name and age."
assert p1 == p2, "Equal Pet dataclasses should match."
`,
  },
  {
    id: "a6",
    moduleId: "advanced",
    lessonNumber: 6,
    title: "Removing Duplicates with set()",
    explanation:
      "A Python set only keeps unique items—any repeats are removed automatically! Wrapping a list in list(set(items)) gives you back a clean list with no duplicates.",
    syntaxExample: `nums = [1, 1, 2, 3, 3]\nunique = list(set(nums))  # [1, 2, 3]`,
    whyItMatters:
      "Sets let you clean up repeated entries in a single readable line without writing nested loops.",
    taskPrompt: "Inside unique_items(items), replace [] with list(set(items)).",
    starterCode: `def unique_items(items):\n    # Replace [] with list(set(items))\n    return []\n`,
    hint: "Change return [] to return list(set(items)).",
    solution: `def unique_items(items):\n    return list(set(items))`,
    expectedSummary: "unique_items([1, 2, 2, 3]) contains 1, 2, and 3 once each",
    hiddenTests: `
assert callable(globals().get("unique_items")), "Keep function unique_items(items)."
res = unique_items([1, 2, 2, 3])
assert isinstance(res, (list, set)), "Return a list or set of unique items."
assert len(res) == 3 and set(res) == {1, 2, 3}, "Should contain {1, 2, 3} with no duplicates."
assert list(unique_items([])) == [], "Empty list should return empty."
`,
  },
];
