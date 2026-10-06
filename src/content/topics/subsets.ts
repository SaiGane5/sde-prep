import type { Topic } from "../types";

export const subsets: Topic = {
  id: 13,
  slug: "subsets",
  title: "Subsets",
  accent: "green",
  icon: "boxes",
  shortInvariants: [
    "Each element: take or skip",
    "Partial set ⊆ final universe",
    "No duplicate branches (sort+skip)",
  ],
  applications: [
    "Power set",
    "Subset sum / target",
    "Combination sum",
    "Bitmask enumeration",
  ],
  abstraction: "Explore 2^n choices with pruning when order of pick doesn't matter",
  fundamentalIdea:
    "Build a set one element at a time. At each step the current subset is valid; each unused element is either included or excluded — combinations, not permutations.",

  levels: [
    {
      id: "sb0",
      title: "Level 0 — Fundamental idea",
      problem: "Enumerate all subsets of {1,…,n} or all k-combinations.",
      coreInvariant: "\\text{Current subset } S \\subseteq \\text{universe; each element decided once}",
      whyTrue: "Take/skip at index i fixes status of element i forever — no reordering.",
      newIdea: "Decision tree depth n; leaves = 2^n subsets",
      related: [],
      complexity: { time: "O(n · 2^n)", space: "O(n)" },
      formula: "|\\mathcal{P}(\\{1..n\\})| = 2^n",
    },
    {
      id: "sb1",
      title: "Level 1 — Subsets I",
      problem: "Return all subsets of distinct integers.",
      coreInvariant: "path = elements with take decision; index only moves forward",
      whyTrue: "Forward index prevents duplicate sets from different pick orders.",
      newIdea: "Backtrack: push on take, pop on undo",
      related: ["Subsets (78)"],
      complexity: { time: "O(n · 2^n)", space: "O(n)" },
      proof: {
        invariant: "After processing index i, path contains exactly the take/skip choices for indices < i.",
        initialization: "path = [], start = 0.",
        maintenance: "Record path at each node. At i: take nums[i] and recurse i+1; skip and recurse i+1.",
        progress: "start increases; recursion depth ≤ n.",
        termination: "start = n.",
        finalState: "All 2^n subsets recorded.",
        correctness: "Bijection between binary take/skip vectors and subsets.",
      },
      whyThisWorks: {
        maintained: "Valid partial subset + next index",
        discarded: "Branches that revisit same set via different order (prevented by index rule)",
        whyDiscarded: "Fixed enumeration order",
        discardInvariant: "Only indices ≥ start considered",
        progress: "start → n",
        finalState: "Complete power set",
      },
    },
    {
      id: "sb2",
      title: "Level 2 — Subsets II (duplicates)",
      problem: "Subsets when nums may contain duplicates; unique subsets only.",
      coreInvariant: "Sort nums; skip nums[i] if i > start and nums[i] = nums[i−1]",
      whyTrue: "Same value at same tree level would duplicate the subset — skip second branch.",
      newIdea: "Sort + same-level dedup",
      related: ["Subsets II (90)"],
      complexity: { time: "O(n · 2^n) worst", space: "O(n)" },
      transition: {
        previousInvariant: "Distinct elements",
        newConstraint: "Duplicate values",
        newInvariant: "Sorted + skip equal siblings at level",
        whyNecessary: "Take/skip alone generates duplicate sets {1,2} vs {2,1} collapsed — need value-level dedup.",
      },
    },
    {
      id: "sb3",
      title: "Level 3 — Combination sum",
      problem: "Combinations that sum to target; reuse allowed or not.",
      coreInvariant:
        "remaining = target − sum(path); only candidates ≥ last used (non-decreasing picks)",
      whyTrue: "Non-decreasing pick order avoids permutations of same multiset.",
      newIdea: "Subset + constraint pruning",
      related: ["Combination Sum (39)", "Combination Sum II (40)"],
      complexity: { time: "O(2^n) pruned", space: "O(target)" },
      formula: "\\text{prune when remaining }<0 \\text{ or sorted tail too large}",
    },
    {
      id: "sb4",
      title: "Level 4 — Subset sum / partition",
      problem: "Can array partition into equal sum? Target subset sum?",
      coreInvariant: "dp[s] = some subset sums to s (or backtrack with memo)",
      whyTrue: "Each element extends reachable sums by +nums[i] or not.",
      newIdea: "Subset space → DP on sum state",
      related: ["Partition Equal Subset Sum (416)", "Target Sum (494)"],
      complexity: { time: "O(n · sum)", space: "O(sum)" },
    },
    {
      id: "sb5",
      title: "Level 5 — Bitmask & meet-in-middle",
      problem: "Enumerate via bitmask; split array for large n subset sum.",
      coreInvariant: "mask ∈ [0, 2^n): bit i = include nums[i]",
      whyTrue: "Bijection between n-bit masks and subsets; meet-in-middle merges half-subsets.",
      newIdea: "Iterative 2^n or divide search space",
      related: ["Maximum Length of a Concatenated String (1239)", "Split Array With Same Average (805)"],
      complexity: { time: "O(2^{n/2})", space: "O(2^{n/2})" },
    },
  ],

  tree: `Subsets
│
├── Fundamental: take / skip per index
├── Subsets I
│   └── forward index backtrack
├── Subsets II
│   └── sort + skip dup level
├── Combination sum
│   └── non-decreasing + prune
├── Subset sum DP
│   └── reachable sums
└── Bitmask / meet-in-middle
    └── 2^n enumeration`,

  complexityTable: [
    { problem: "Subsets", time: "O(n·2^n)", space: "O(n)", mainInvariant: "Take/skip tree", technique: "Backtrack" },
    { problem: "Subsets II", time: "O(n·2^n)", space: "O(n)", mainInvariant: "Skip dup at level", technique: "Sort + BT" },
    { problem: "Combination Sum", time: "O(2^n)", space: "O(target)", mainInvariant: "Non-decreasing picks", technique: "Pruned BT" },
    { problem: "Partition Equal Subset", time: "O(n·sum)", space: "O(sum)", mainInvariant: "dp[s] reachable", technique: "0/1 knapsack" },
    { problem: "Bitmask subsets", time: "O(n·2^n)", space: "O(1)", mainInvariant: "mask ↔ subset", technique: "Iteration" },
  ],

  interviewTricks: [
    "All subsets → backtrack take/skip or bitmask loop.",
    "Duplicates → sort first, skip nums[i]==nums[i−1] at same depth.",
    "Combination not permutation → start index or non-decreasing picks.",
    "Sum target → prune when remaining < 0; sort to prune early.",
    "2^n too big? → DP on sum or meet-in-middle.",
    "C(n,k): choose k elements — same tree, stop at depth k.",
  ],

  leetcode: [
    { name: "Subsets", number: 78, slug: "subsets", invariant: "Take/skip forward index", prerequisite: "Backtracking", difficulty: "Medium", stage: "foundation" },
    { name: "Subsets II", number: 90, slug: "subsets-ii", invariant: "Skip duplicate level", prerequisite: "Subsets I", difficulty: "Medium", stage: "foundation" },
    { name: "Combination Sum", number: 39, slug: "combination-sum", invariant: "Reuse + non-decreasing", prerequisite: "Subsets + prune", difficulty: "Medium", stage: "invariant" },
    { name: "Combination Sum II", number: 40, slug: "combination-sum-ii", invariant: "No reuse + dup skip", prerequisite: "Combination Sum", difficulty: "Medium", stage: "invariant" },
    { name: "Combination Sum III", number: 216, slug: "combination-sum-iii", invariant: "Exactly k numbers 1–9", prerequisite: "Fixed depth BT", difficulty: "Medium", stage: "modification" },
    { name: "Partition Equal Subset Sum", number: 416, slug: "partition-equal-subset-sum", invariant: "Subset sum = total/2", prerequisite: "0/1 DP", difficulty: "Medium", stage: "modification" },
    { name: "Target Sum", number: 494, slug: "target-sum", invariant: "± assignments = subset sum", prerequisite: "DP transform", difficulty: "Medium", stage: "modification" },
    { name: "Letter Combinations of a Phone Number", number: 17, slug: "letter-combinations-of-a-phone-number", invariant: "Cartesian backtrack", prerequisite: "Multi-set choose", difficulty: "Medium", stage: "combination" },
    { name: "Maximum Length of a Concatenated String with Unique Characters", number: 1239, slug: "maximum-length-of-a-concatenated-string-with-unique-chars", invariant: "Bitmask valid charset", prerequisite: "Bitmask subset", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Partial subset + unprocessed suffix",
    discarded: "Branches pruned by sum / dup / depth limit",
    whyDiscarded: "Cannot extend to valid full subset",
    discardInvariant: "Forward index / skip-dup rule",
    progress: "Index or mask increases toward full decision",
    finalState: "All valid subsets or yes/no for target sum",
  },
};
