import type { Topic } from "../types";

export const backtracking: Topic = {
  id: 17,
  slug: "backtracking",
  title: "Backtracking",
  accent: "blue",
  icon: "git-branch",
  shortInvariants: [
    "Path = valid partial solution",
    "Choose → explore → undo",
    "Prune when partial cannot complete",
  ],
  applications: [
    "Subsets & permutations",
    "N-Queens / Sudoku",
    "Combination sum",
    "Word search / palindrome partition",
  ],
  abstraction: "DFS over decision tree with explicit undo to restore state",
  fundamentalIdea:
    "Extend a path one choice at a time. The path invariant: every prefix satisfies the problem's partial constraints. Undo (pop / unmark) restores the exact state before the choice so sibling branches see a clean board.",

  levels: [
    {
      id: "bt0",
      title: "Level 0 — Fundamental idea",
      problem: "Enumerate all solutions by building candidates incrementally.",
      coreInvariant:
        "\\text{path}[0..k) \\text{ is a valid partial solution}",
      whyTrue:
        "Only extend when constraints still satisfiable. Undo removes last choice — state identical to pre-choice for other branches.",
      newIdea: "Template: push choice → recurse → pop choice",
      related: [],
      complexity: { time: "O(output · branch)", space: "O(depth)" },
      formula:
        "\\text{undo}(\\text{make}(state)) \\Rightarrow state \\text{ unchanged for siblings}",
    },
    {
      id: "bt1",
      title: "Level 1 — Subsets & combinations",
      problem: "All subsets; combination sum I/II; letter combinations.",
      coreInvariant:
        "\\text{path built with start index; no reuse in comb sum I}",
      whyTrue:
        "Fix start to avoid duplicate subsets. Combination sum: include nums[i] → recurse at i (reuse) or i+1 (no reuse). Path always sums ≤ target until leaf.",
      newIdea: "Index discipline prevents permutations of same set",
      related: [
        "Subsets (78)",
        "Combinations (77)",
        "Combination Sum (39)",
      ],
      complexity: { time: "O(2^n)", space: "O(n)" },
      proof: {
        invariant: "path is a valid subset/combination prefix; sum ≤ target.",
        initialization: "Empty path, start = 0.",
        maintenance: "Add nums[i], recurse, remove nums[i] — sum restored.",
        progress: "Depth or start advances; finite array.",
        termination: "start = n or sum = target.",
        finalState: "All valid combinations collected.",
        correctness: "Each leaf is built by unique index sequence; undo preserves enumeration of siblings.",
      },
      whyThisWorks: {
        maintained: "Valid partial subset / sum",
        discarded: "Branches with sum > target or duplicate index order",
        whyDiscarded: "Prune early; start index skips permutations",
        discardInvariant: "Monotonic start index",
        progress: "Depth or index increases toward n",
        finalState: "Complete valid combinations in result",
      },
    },
    {
      id: "bt2",
      title: "Level 2 — Permutations",
      problem: "All permutations; permutations II with duplicates.",
      coreInvariant:
        "\\text{used}[i] \\text{ marks taken; path length } = k \\Rightarrow k \\text{ distinct picks}",
      whyTrue:
        "Swap-based or used-array: each level picks an unused element. Duplicates: sort + skip used[i−1] if same value and previous not used (same-level duplicate prune).",
      newIdea: "Complete path length n; duplicate skip on sorted nums",
      related: ["Permutations (46)", "Permutations II (47)"],
      complexity: { time: "O(n·n!)", space: "O(n)" },
      transition: {
        previousInvariant: "Subsets via start index",
        newConstraint: "Order matters; use all elements once",
        newInvariant: "used[] + full length path",
        whyNecessary: "Index-only discipline allows reuse order; permutations need occupancy tracking.",
      },
    },
    {
      id: "bt3",
      title: "Level 3 — Constraint grids (N-Queens, Sudoku)",
      problem: "Place n queens with no attacks; fill 9×9 Sudoku.",
      coreInvariant:
        "\\text{Each placement maintains row/col/diag conflict sets}",
      whyTrue:
        "Try (r,c); if safe, mark cols/diags, recurse row+1, unmark. Sudoku: try digit 1–9 in empty cell; check box/row/col; undo digit on backtrack.",
      newIdea: "Bitmask or boolean arrays for O(1) conflict check",
      related: ["N-Queens (51)", "Sudoku Solver (37)"],
      complexity: { time: "O(n!) / O(9^m)", space: "O(n)" },
      formula:
        "\\text{safe}(r,c) \\iff \\neg col[c] \\land \\neg diag[r+c] \\land \\neg anti[r-c+n]",
    },
    {
      id: "bt4",
      title: "Level 4 — String / path in matrix",
      problem: "Word search; palindrome partitioning; restore IP addresses.",
      coreInvariant:
        "\\text{Visited cells / cut positions mark active partial}",
      whyTrue:
        "Word search: mark cell, 4-dir DFS, unmark on return — same cell not reused in one path. Partition: cut after valid prefix palindrome; undo = shrink path.",
      newIdea: "Spatial undo = unmark; string undo = pop last segment",
      related: [
        "Word Search (79)",
        "Palindrome Partitioning (131)",
        "Restore IP Addresses (93)",
      ],
      complexity: { time: "O(n·4^L) / O(n·2^n)", space: "O(n)" },
    },
    {
      id: "bt5",
      title: "Level 5 — Advanced prune & ordering",
      problem: "Remove invalid parentheses; graph coloring; split strings.",
      coreInvariant:
        "\\text{Prune when diff(open,close) invalid or max removals exceeded}",
      whyTrue:
        "BFS layer0 = min removals can find shortest fix; backtrack tracks l/r removed caps. Ordering choices (try '(' first) reduces duplicate work.",
      newIdea: "Backtracking + global bounds; sometimes BFS for min edits",
      related: [
        "Generate Parentheses (22)",
        "Remove Invalid Parentheses (301)",
        "Word Break II (140)",
      ],
      complexity: { time: "exponential", space: "O(n)" },
      transition: {
        previousInvariant: "Exact constraint satisfaction",
        newConstraint: "Minimize edits or generate structured strings",
        newInvariant: "Budget counters + prefix validity",
        whyNecessary: "Feasibility alone is not enough — track remaining allowance on path.",
      },
    },
  ],

  tree: `Backtracking
│
├── Fundamental: path valid + undo
├── Subsets / combinations
│   └── start index; reuse flag
├── Permutations
│   └── used[]; dup skip
├── Grids (N-Queens, Sudoku)
│   └── mark safe; unmark backtrack
├── Word search / partition
│   └── visit mark; cut pop
└── Budgeted prune
    └── removals / close≤open`,

  complexityTable: [
    { problem: "Subsets", time: "O(n·2^n)", space: "O(n)", mainInvariant: "path ⊆ nums via start", technique: "Include/exclude" },
    { problem: "Permutations", time: "O(n·n!)", space: "O(n)", mainInvariant: "used marks; len=n", technique: "Swap / used[]" },
    { problem: "Combination Sum", time: "O(2^target)", space: "O(target)", mainInvariant: "sum ≤ target", technique: "Reuse at i" },
    { problem: "N-Queens", time: "O(n!)", space: "O(n)", mainInvariant: "No col/diag conflict", technique: "Row DFS + undo" },
    { problem: "Word Search", time: "O(mn·4^L)", space: "O(L)", mainInvariant: "Visited per path", technique: "Grid DFS undo" },
    { problem: "Sudoku Solver", time: "O(9^m)", space: "O(1)", mainInvariant: "Row/col/box valid", technique: "Cell DFS undo" },
  ],

  interviewTricks: [
    "Always say: push → recurse → pop (undo).",
    "Subsets/combos: start index to avoid duplicate sets.",
    "Permutations: used array; sort + skip equal neighbors.",
    "Grid DFS: mark visited on entry, unmark on exit.",
    "Prune before recurse when partial violates constraint.",
    "Copy path when recording answer (path is mutable).",
    "Min-removal problems: consider BFS for shortest layer.",
  ],

  leetcode: [
    { name: "Subsets", number: 78, slug: "subsets", invariant: "path via start index", prerequisite: "Include/exclude", difficulty: "Medium", stage: "foundation" },
    { name: "Combinations", number: 77, slug: "combinations", invariant: "k picks, increasing start", prerequisite: "Subsets", difficulty: "Medium", stage: "foundation" },
    { name: "Permutations", number: 46, slug: "permutations", invariant: "used[] full length", prerequisite: "Occupancy", difficulty: "Medium", stage: "invariant" },
    { name: "Combination Sum", number: 39, slug: "combination-sum", invariant: "Reuse at i; sum target", prerequisite: "Subsets + prune", difficulty: "Medium", stage: "invariant" },
    { name: "Generate Parentheses", number: 22, slug: "generate-parentheses", invariant: "close ≤ open ≤ n", prerequisite: "Prefix validity", difficulty: "Medium", stage: "modification" },
    { name: "Permutations II", number: 47, slug: "permutations-ii", invariant: "Sort; skip dup branch", prerequisite: "Permutations", difficulty: "Medium", stage: "modification" },
    { name: "N-Queens", number: 51, slug: "n-queens", invariant: "Col/diag sets + undo", prerequisite: "Grid constraints", difficulty: "Hard", stage: "modification" },
    { name: "Word Search", number: 79, slug: "word-search", invariant: "Mark/unmark cell", prerequisite: "Grid DFS", difficulty: "Medium", stage: "combination" },
    { name: "Palindrome Partitioning", number: 131, slug: "palindrome-partitioning", invariant: "Cut after valid prefix", prerequisite: "String path", difficulty: "Medium", stage: "combination" },
    { name: "Sudoku Solver", number: 37, slug: "sudoku-solver", invariant: "Box/row/col on place/undo", prerequisite: "Constraint propagation", difficulty: "Hard", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Path satisfies all partial constraints at every depth",
    discarded: "Branches pruned when partial cannot extend to full solution",
    whyDiscarded: "Constraint violation or budget exceeded — no valid completion below",
    discardInvariant: "Valid partial ⟹ only valid children explored",
    progress: "Depth or unassigned cells decrease toward terminal",
    finalState: "All leaves are complete solutions; undo leaves no stale marks",
  },
};
