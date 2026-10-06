import type { Topic } from "../types";

export const stacks: Topic = {
  id: 6,
  slug: "stacks",
  title: "Stacks",
  accent: "pink",
  icon: "layers",
  shortInvariants: [
    "LIFO order",
    "Top = last unmatched open",
    "Size changes by ±1",
  ],
  applications: [
    "Balanced parentheses",
    "Expression evaluation",
    "Monotonic stack",
    "Tree traversal",
  ],
  abstraction: "Nested structure / deferred matching",
  fundamentalIdea:
    "A stack stores unfinished nested contexts. The top is always the innermost open obligation. LIFO is not a convenience — it is the only order that matches nesting.",

  levels: [
    {
      id: "s1",
      title: "Level 1 — Balanced Parentheses",
      problem:
        "Given a string of (), [], {}, decide if every opening bracket has a correctly nested matching close.",
      coreInvariant:
        "\\text{Stack contains exactly the unmatched opening brackets}",
      whyTrue:
        "Each open creates a nested obligation. The most recent open must be closed first — that is exactly LIFO.",
      newIdea: "Matching = nested structure → stack",
      related: ["Valid Parentheses (20)"],
      complexity: { time: "O(n)", space: "O(n)" },
      formula: "\\text{valid} \\iff \\text{stack empty at end}",
      proof: {
        invariant:
          "After processing prefix s[0..k), the stack holds exactly the unmatched opens in that prefix, in order.",
        initialization:
          "Before any character, stack = ∅. Vacuously true: no unmatched opens.",
        maintenance:
          "Open c: push c. Unmatched opens grow by one. Close c: if top matches, pop; else reject. The new top is the previous unmatched open — LIFO restores the outer context. Empty stack on close → no open to match → invalid.",
        progress:
          "Each step consumes one character. Variant V = n − k decreases by 1.",
        termination: "After n characters, the scan ends.",
        finalState:
          "If stack empty, every open was matched. If non-empty, some open has no close.",
        correctness:
          "Final empty stack ⟺ every nested open was closed in LIFO order ⟺ string is valid.",
      },
      whyThisWorks: {
        maintained: "Unmatched opening brackets in nesting order",
        discarded: "Already-matched pairs",
        whyDiscarded:
          "A matched pair cannot affect validity of outer structure — nesting is closed.",
        discardInvariant: "Top of stack is the only candidate for the next close",
        progress: "Index advances through the string",
        finalState: "Empty stack means fully matched; non-empty means leftover opens",
      },
    },
    {
      id: "s2",
      title: "Level 2 — Wildcard `*`",
      problem:
        "Same as balanced parentheses, but `*` may be `(`, `)`, or ε (empty).",
      coreInvariant:
        "\\text{lo} \\le \\text{actual unmatched opens} \\le \\text{hi}",
      whyTrue:
        "One exact stack is no longer enough — `*` branches the possible worlds. We compress all possible stack heights into a contiguous range [lo, hi].",
      newIdea: "Exact state → set of states → compressed bounds (greedy range)",
      related: ["Valid Parenthesis String (678)"],
      complexity: { time: "O(n)", space: "O(1)" },
      formula:
        "\\text{valid} \\iff \\text{lo}=0 \\text{ at end and hi never }<0",
      transition: {
        previousInvariant: "Exact unmatched-open stack",
        newConstraint: "* ∈ {(, ), ε}",
        newInvariant: "lo ≤ unmatched opens ≤ hi",
        whyNecessary:
          "Each * multiplies possible interpretations. Tracking every stack is exponential; the set of reachable heights is always an interval, so two integers suffice.",
      },
      proof: {
        invariant:
          "After each char, some interpretation yields every unmatched-open count in [lo, hi], and no count outside.",
        initialization: "lo = hi = 0.",
        maintenance:
          "`(`: lo++, hi++. `)`: lo = max(0, lo−1), hi−−; if hi < 0 reject. `*`: lo = max(0, lo−1) (treat as ) or ε), hi++ (treat as (). Range stays contiguous.",
        progress: "One character per step.",
        termination: "End of string.",
        finalState: "Need lo = 0 (some interpretation fully matched) and hi ≥ 0 throughout.",
        correctness:
          "Interval compression preserves reachability because +1/−1/0 moves map intervals to intervals.",
      },
      whyThisWorks: {
        maintained: "Min/max possible unmatched-open counts",
        discarded: "Individual interpretation stacks",
        whyDiscarded: "Only extremal heights matter for future feasibility",
        discardInvariant: "Reachable heights form a contiguous interval",
        progress: "Scan left → right",
        finalState: "lo = 0 means at least one fully valid interpretation exists",
      },
    },
    {
      id: "s3",
      title: "Level 3 — Score of Parentheses",
      problem:
        "Score `()` = 1, `(A)` = 2·score(A), `A+B` = score(A)+score(B).",
      coreInvariant:
        "\\text{Stack stores scores of unfinished nested frames}",
      whyTrue:
        "Matching proved nesting. Now nesting carries a numeric value. The stack holds the score context of each open frame.",
      newIdea: "Matching → nesting → expression evaluation",
      related: ["Score of Parentheses (856)"],
      complexity: { time: "O(n)", space: "O(n)" },
      formula: "(A)\\rightarrow 2A,\\quad A+B\\rightarrow A+B,\\quad ()\\rightarrow 1",
      transition: {
        previousInvariant: "Unmatched opens (structure only)",
        newConstraint: "Assign scores to nested/concatenated groups",
        newInvariant: "Stack of partial scores per nesting depth",
        whyNecessary:
          "Structure alone doesn't compute value. Each open starts a new score accumulator; close folds it into the parent with ×2 (or 1 for `()`).",
      },
      proof: {
        invariant:
          "Stack[depth] equals the accumulated score of completed sibling groups at that depth so far.",
        initialization: "Push 0 (outer score).",
        maintenance:
          "`(`: push 0 (new frame). `)`: let v = pop(); if v = 0 then score = 1 else score = 2v; add score onto new top.",
        progress: "Consume one character.",
        termination: "One value left on stack.",
        finalState: "That value is the total score.",
        correctness:
          "Induction on nesting: `()` → 1; concatenation adds on same frame; wrapping multiplies by 2 when frame closes.",
      },
    },
    {
      id: "s4",
      title: "Level 4 — Different Bracket Types + Generate n Pairs",
      problem:
        "Generate all valid strings with n pairs of parentheses (and extend matching to multiple bracket types).",
      coreInvariant: "0 \\le \\text{close} \\le \\text{open} \\le n",
      whyTrue:
        "You can never close more than you've opened. You never open more than n. This is the Catalan decision space.",
      newIdea: "Stack discipline becomes recursive state (open, close)",
      related: ["Generate Parentheses (22)", "Valid Parentheses (20)"],
      complexity: { time: "O(C_n · n)", space: "O(n)" },
      formula: "C_n = \\frac{1}{n+1}\\binom{2n}{n}",
      transition: {
        previousInvariant: "Validate one string via stack",
        newConstraint: "Enumerate all valid strings of length 2n",
        newInvariant: "close ≤ open ≤ n at every prefix",
        whyNecessary:
          "Generation is the inverse of validation. The same nesting rule becomes a pruning constraint on the backtracking tree. Count of such strings is the Catalan number.",
      },
      proof: {
        invariant:
          "Every partial string built so far is a prefix of some valid parentheses string.",
        initialization: "open = close = 0, empty string.",
        maintenance:
          "Add `(` if open < n. Add `)` if close < open. Both preserve close ≤ open ≤ n.",
        progress: "String length increases; depth of recursion bounded by 2n.",
        termination: "Length 2n with open = close = n.",
        finalState: "All Catalan-valid strings of n pairs.",
        correctness:
          "Any valid string's every prefix satisfies #open ≥ #close, and total opens = n. Backtracking explores exactly those paths.",
      },
      whyThisWorks: {
        maintained: "Partial string with close ≤ open ≤ n",
        discarded: "Branches that would close too early or open too often",
        whyDiscarded: "No completion of those prefixes can be valid",
        discardInvariant: "close ≤ open at every prefix of a valid string",
        progress: "Recursion depth / string length → 2n",
        finalState: "Complete strings counted by C_n",
      },
    },
    {
      id: "s5",
      title: "Level 5 — Longest Valid Parentheses",
      problem:
        "Find the length of the longest well-formed parentheses substring.",
      coreInvariant:
        "\\text{Stack of indices marking boundaries of unfinished / invalid regions}",
      whyTrue:
        "Simple matching only says valid/invalid. Length needs positions: where the last unmatched region started.",
      newIdea: "Stack → index invariant → DP state → space optimization",
      related: [
        "Longest Valid Parentheses (32)",
        "Valid Parenthesis String (678)",
      ],
      complexity: { time: "O(n)", space: "O(n)" },
      formula: "\\text{len} = i - \\text{stack.top()}",
      transition: {
        previousInvariant: "close ≤ open (count / structure)",
        newConstraint: "Maximize length of a contiguous valid substring",
        newInvariant: "Stack stores indices of unmatched opens and base sentinels",
        whyNecessary:
          "Validity of a substring depends on a contiguous range. Indices turn matching events into measurable lengths.",
      },
      approaches: [
        {
          name: "Stack (indices)",
          invariant:
            "Stack bottom is the last invalid index; above it, unmatched `(` indices",
          note: "On match, length = i − top. On mismatch, push i as new base.",
        },
        {
          name: "DP",
          invariant:
            "dp[i] = length of longest valid ending at i",
          note: "If s[i]=')', look at s[i−1] and dp[i−1] to jump to the matching open.",
        },
        {
          name: "Two-pass counters",
          invariant:
            "Left→right and right→left balance counters; reset on negative",
          note: "Captures valid segments without stack; O(1) space.",
        },
      ],
      proof: {
        invariant:
          "Indices on the stack delimit the start of the current candidate valid region and unmatched opens.",
        initialization: "Push −1 as base sentinel.",
        maintenance:
          "`(` → push i. `)` → pop; if stack empty push i (new base); else update max = i − peek.",
        progress: "i from 0 to n−1.",
        termination: "End of string; max holds answer.",
        finalState: "max = length of longest valid substring seen.",
        correctness:
          "Each successful match measures distance to the nearest enclosing unmatched boundary — exactly the contiguous valid run.",
      },
      whyThisWorks: {
        maintained: "Boundary indices of unmatched / invalid positions",
        discarded: "Interior of already-closed valid segments (except their length)",
        whyDiscarded: "They can't extend past an unmatched boundary",
        discardInvariant: "Valid runs are contiguous and nest/concatenate cleanly",
        progress: "Index i advances",
        finalState: "Maximum i − boundary over all matches",
      },
    },
    {
      id: "s6",
      title: "Level 6 — Monotonic Stack + Combinations",
      problem:
        "Next Greater Element, Histogram Largest Rectangle, Min Stack, iterative inorder, Stack+DP.",
      coreInvariant:
        "\\text{Stack is monotonic: values increase (or decrease) from bottom to top}",
      whyTrue:
        "When a new element breaks monotonicity, all popped elements have found their next greater/smaller — safe elimination.",
      newIdea: "Stack + tree traversal · Stack + DP · Stack + geometry (histogram)",
      related: [
        "Next Greater Element I (496)",
        "Largest Rectangle in Histogram (84)",
        "Min Stack (155)",
        "Binary Tree Inorder Traversal (94)",
      ],
      complexity: { time: "O(n)", space: "O(n)" },
      formula:
        "\\text{each index pushed/popped at most once} \\Rightarrow O(n)",
      transition: {
        previousInvariant: "Nesting / index boundaries",
        newConstraint: "Answer depends on nearest greater/smaller neighbor",
        newInvariant: "Monotonic stack of candidates",
        whyNecessary:
          "Nested matching is one use of LIFO. Nearest-neighbor queries are another: the stack keeps the increasing (decreasing) frontier of unresolved elements.",
      },
      proof: {
        invariant:
          "For increasing mono-stack: values from bottom to top are strictly increasing; each waiting for next greater.",
        initialization: "Empty stack.",
        maintenance:
          "While top < current, pop and record current as next greater. Push current.",
        progress: "Each index pushed once, popped at most once.",
        termination: "End of array; remaining have no next greater.",
        finalState: "Next-greater map complete.",
        correctness:
          "Any element between a popped index and its next greater was smaller and already resolved — cannot be a closer greater candidate.",
      },
      whyThisWorks: {
        maintained: "Monotonic unresolved candidates",
        discarded: "Elements that already found next greater/smaller",
        whyDiscarded: "A later element cannot be a closer answer for them",
        discardInvariant: "Monotonicity of the stack",
        progress: "Each index enters/leaves stack ≤ once",
        finalState: "All nearest-neighbor relations resolved",
      },
    },
  ],

  tree: `Stacks
│
├── Fundamental: LIFO = nesting
│
├── Balanced Parentheses
│   └── Stack = unmatched opens
│
├── Wildcard *
│   └── [lo, hi] range of possible opens
│
├── Score of Parentheses
│   └── Stack = nested score frames
│
├── Generate n Pairs
│   └── close ≤ open ≤ n  (Catalan)
│
├── Longest Valid Parentheses
│   └── Index boundaries → DP → O(1) two-pass
│
└── Monotonic Stack + Tree + DP
    └── Next greater / Histogram / Inorder / Min Stack`,

  complexityTable: [
    {
      problem: "Balanced Parentheses",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Unmatched opens on stack",
      technique: "Stack",
    },
    {
      problem: "Wildcard *",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "lo ≤ opens ≤ hi",
      technique: "Greedy range",
    },
    {
      problem: "Score of Parentheses",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Nested score frames",
      technique: "Stack",
    },
    {
      problem: "Generate Parentheses",
      time: "O(C_n·n)",
      space: "O(n)",
      mainInvariant: "close ≤ open ≤ n",
      technique: "Backtracking",
    },
    {
      problem: "Longest Valid Parentheses",
      time: "O(n)",
      space: "O(n)/O(1)",
      mainInvariant: "Index boundaries / dp[i]",
      technique: "Stack / DP / two-pass",
    },
    {
      problem: "Next Greater Element",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Monotonic increasing stack",
      technique: "Monotonic stack",
    },
    {
      problem: "Largest Rectangle Histogram",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Increasing heights; width via indices",
      technique: "Monotonic stack",
    },
  ],

  interviewTricks: [
    "Nested structure / matching pairs → stack.",
    "Need previous unmatched opener → stack of chars or indices.",
    "Next greater / smaller in O(n) → monotonic stack.",
    "Iterative inorder/preorder → explicit stack simulating recursion.",
    "Running minimum with O(1) getMin → stack of (value, minSoFar).",
    "Expression / calculator → stack of operands + operators (or values + signs).",
    "Longest valid contiguous region → stack of indices or DP on endings.",
  ],

  leetcode: [
    {
      name: "Valid Parentheses",
      number: 20,
      slug: "valid-parentheses",
      invariant: "Stack = unmatched opens",
      prerequisite: "LIFO nesting",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Min Stack",
      number: 155,
      slug: "min-stack",
      invariant: "Each node stores min of suffix below it",
      prerequisite: "Stack basics",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Valid Parenthesis String",
      number: 678,
      slug: "valid-parenthesis-string",
      invariant: "lo ≤ opens ≤ hi",
      prerequisite: "Balanced parentheses",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Score of Parentheses",
      number: 856,
      slug: "score-of-parentheses",
      invariant: "Nested score frames",
      prerequisite: "Matching + nesting",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Generate Parentheses",
      number: 22,
      slug: "generate-parentheses",
      invariant: "close ≤ open ≤ n",
      prerequisite: "Backtracking + Catalan",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Decode String",
      number: 394,
      slug: "decode-string",
      invariant: "Stack of nested decode contexts",
      prerequisite: "Nested frames",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Next Greater Element I",
      number: 496,
      slug: "next-greater-element-i",
      invariant: "Monotonic decreasing candidates",
      prerequisite: "Monotonic stack",
      difficulty: "Easy",
      stage: "modification",
    },
    {
      name: "Daily Temperatures",
      number: 739,
      slug: "daily-temperatures",
      invariant: "Monotonic stack of indices",
      prerequisite: "Next greater",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Longest Valid Parentheses",
      number: 32,
      slug: "longest-valid-parentheses",
      invariant: "Index boundaries / dp endings",
      prerequisite: "Matching + positions",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "Largest Rectangle in Histogram",
      number: 84,
      slug: "largest-rectangle-in-histogram",
      invariant: "Increasing heights; width via nearest smaller",
      prerequisite: "Monotonic stack",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "Binary Tree Inorder Traversal",
      number: 94,
      slug: "binary-tree-inorder-traversal",
      invariant: "Stack = path from root to current",
      prerequisite: "Stack + tree",
      difficulty: "Easy",
      stage: "combination",
    },
    {
      name: "Basic Calculator II",
      number: 227,
      slug: "basic-calculator-ii",
      invariant: "Deferred ± terms; immediate */ fold",
      prerequisite: "Expression stack",
      difficulty: "Medium",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Unfinished nested contexts (opens, frames, mono candidates)",
    discarded: "Completed / resolved inner structures",
    whyDiscarded: "Nesting and nearest-neighbor relations make inner work irrelevant once closed",
    discardInvariant: "LIFO / monotonicity",
    progress: "Characters or indices processed; each pushed/popped ≤ once",
    finalState: "All obligations matched or all nearest neighbors resolved",
  },
};
