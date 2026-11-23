export interface PythonQuestion {
  id: number;
  topic: string;
  title: string;
  prompt: string;
  starterCode: string;
  starterVariables: string[];
  expectedOutput: string;
  sampleSolution: string;
  solutionExplanation: string;
  requiredSymbols?: {
    variableName?: string;
    functionName?: string;
    functionCallCheck?: string;
    friendlyMissingMessage?: string;
  };
}

export const PYTHON_QUESTIONS: PythonQuestion[] = [
  {
    id: 1,
    topic: "Print Output",
    title: "Say Hi",
    prompt: 'Type print("Hi") to show Hi on the screen.',
    starterCode: `# Type print("Hi") below\n`,
    starterVariables: [],
    expectedOutput: "Hi",
    sampleSolution: `print("Hi")`,
    solutionExplanation:
      'Putting "Hi" inside print() displays the text Hi in the console.',
  },
  {
    id: 2,
    topic: "Variables & Math",
    title: "Add Two Numbers",
    prompt: "Given a = 2 and b = 3, print a + b.",
    starterCode: `a = 2\nb = 3\n\n# Print a + b below\n`,
    starterVariables: ["a = 2", "b = 3"],
    expectedOutput: "5",
    sampleSolution: `a = 2\nb = 3\nprint(a + b)`,
    solutionExplanation:
      "Python adds the values stored in a (2) and b (3) and print(a + b) displays 5.",
  },
  {
    id: 3,
    topic: "Strings",
    title: "Greet Someone by Name",
    prompt: 'Given name = "Sam", print Hello Sam.',
    starterCode: `name = "Sam"\n\n# Print "Hello" and name together\n`,
    starterVariables: ['name = "Sam"'],
    expectedOutput: "Hello Sam",
    sampleSolution: `name = "Sam"\nprint("Hello", name)`,
    solutionExplanation:
      'Using a comma inside print("Hello", name) joins "Hello" and the name variable with a space in between.',
  },
  {
    id: 4,
    topic: "Lists & Indexing",
    title: "Pick the First Colour",
    prompt: 'Given the colours list below, print the first colour ("red").',
    starterCode: `colours = ["red", "blue", "green"]\n\n# Print colours[0] below\n`,
    starterVariables: ['colours = ["red", "blue", "green"]'],
    expectedOutput: "red",
    sampleSolution: `colours = ["red", "blue", "green"]\nprint(colours[0])`,
    solutionExplanation:
      "Python starts counting list positions at 0, so colours[0] picks the very first colour: red.",
  },
  {
    id: 5,
    topic: "List Length",
    title: "Count Items with len()",
    prompt: "Given the pets list below, print how many pets are in the list using len(pets).",
    starterCode: `pets = ["cat", "dog", "fish"]\n\n# Print len(pets) below\n`,
    starterVariables: ['pets = ["cat", "dog", "fish"]'],
    expectedOutput: "3",
    sampleSolution: `pets = ["cat", "dog", "fish"]\nprint(len(pets))`,
    solutionExplanation:
      "len(pets) counts how many items are in the list (3), and print() shows that number.",
  },
  {
    id: 6,
    topic: "Conditional if / else",
    title: "Check a Score",
    prompt: 'Given score = 10, finish the if / else check to print Pass if score >= 5, otherwise print Try again.',
    starterCode: `score = 10\n\nif score >= 5:\n    # Print "Pass" here\nelse:\n    # Print "Try again" here\n`,
    starterVariables: ["score = 10"],
    expectedOutput: "Pass",
    sampleSolution: `score = 10\nif score >= 5:\n    print("Pass")\nelse:\n    print("Try again")`,
    solutionExplanation:
      'Because score is 10 (which is >= 5), Python runs the indented print("Pass") line under if.',
  },
  {
    id: 7,
    topic: "Basic for Loop",
    title: "Loop Through Numbers",
    prompt: "Given nums = [1, 2, 3], finish the for loop to print each number.",
    starterCode: `nums = [1, 2, 3]\n\nfor n in nums:\n    # Print n here\n`,
    starterVariables: ["nums = [1, 2, 3]"],
    expectedOutput: "1\n2\n3",
    sampleSolution: `nums = [1, 2, 3]\nfor n in nums:\n    print(n)`,
    solutionExplanation:
      "The for loop repeats the indented print(n) line once for each number in nums.",
  },
  {
    id: 8,
    topic: "Loop with Filter",
    title: "Print Bigger Numbers",
    prompt: "Given nums = [2, 10, 8], finish the code to print only numbers bigger than 5 (> 5).",
    starterCode: `nums = [2, 10, 8]\n\nfor n in nums:\n    if n > 5:\n        # Print n here\n`,
    starterVariables: ["nums = [2, 10, 8]"],
    expectedOutput: "10\n8",
    sampleSolution: `nums = [2, 10, 8]\nfor n in nums:\n    if n > 5:\n        print(n)`,
    solutionExplanation:
      "Inside the loop, if n > 5 only lets numbers bigger than 5 reach the print(n) line.",
  },
  {
    id: 9,
    topic: "Dictionaries",
    title: "Read a Dictionary",
    prompt: 'Given the pet dictionary below, print pet["name"].',
    starterCode: `pet = {"name": "Milo"}\n\n# Print pet["name"] below\n`,
    starterVariables: ['pet = {"name": "Milo"}'],
    expectedOutput: "Milo",
    sampleSolution: `pet = {"name": "Milo"}\nprint(pet["name"])`,
    solutionExplanation:
      'Using square brackets with the key — pet["name"] — looks up and prints "Milo".',
  },
  {
    id: 10,
    topic: "Simple Function",
    title: "Finish a Function",
    prompt: "Finish the add_one(n) function so it returns n + 1, then run it to print 5.",
    starterCode: `def add_one(n):\n    # Return n + 1 here\n\nprint(add_one(4))\n`,
    starterVariables: [],
    expectedOutput: "5",
    sampleSolution: `def add_one(n):\n    return n + 1\n\nprint(add_one(4))`,
    solutionExplanation:
      "Writing return n + 1 sends back 5 when add_one(4) is called inside print().",
    requiredSymbols: {
      functionName: "add_one",
      functionCallCheck: "add_one(4) == 5",
      friendlyMissingMessage: "Make sure add_one(n) returns n + 1.",
    },
  },
];
