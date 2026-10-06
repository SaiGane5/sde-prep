import type { Topic } from "../types";

export const twoPointers: Topic = {
  id: 1,
  slug: "two-pointers",
  title: "Two Pointers",
  accent: "green",
  icon: "git-commit-horizontal",
  shortInvariants: [
    "i ≤ j",
    "Discarded region has no optimal answer",
    "Monotonic pointer movement",
  ],
  applications: ["Pair sum", "3Sum", "Palindrome", "Container water"],
  abstraction: "Safe elimination on ordered / partitionable domains",
  fundamentalIdea:
    "Two indices move through a structure. Each move discards a region that cannot contain a better answer — the discard must be proven safe.",

  levels: [
    {
      id: "tp0",
      title: "Level 0 — Fundamental idea",
      problem: "Understand that pointers carve the array into processed / candidate / discarded regions.",
      coreInvariant: "i \\le j \\quad\\text{and discarded sides cannot hold the answer}",
      whyTrue: "On a sorted array, monotonicity of A[i]+A[j] justifies which side to shrink.",
      newIdea: "Replace O(n²) enumeration with proven elimination",
      related: [],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "tp1",
      title: "Level 1 — Pair Sum (opposite direction)",
      problem: "Sorted array: find two numbers that sum to target.",
      coreInvariant: "\\text{If }A[i]+A[j]>t\\text{ then }j\\text{ is useless with any }i'\\ge i",
      whyTrue: "A is sorted ⇒ increasing i only increases the sum further past target.",
      newIdea: "Opposite-direction pointers + sum monotonicity",
      related: ["Two Sum II (167)"],
      complexity: { time: "O(n)", space: "O(1)" },
      proof: {
        invariant: "Answer, if it exists involving remaining indices, lies in [i, j].",
        initialization: "i = 0, j = n−1. Full array is candidate.",
        maintenance:
          "Sum too big → j−− (all pairs with this j and ≥i are too big). Sum too small → i++. Equal → found.",
        progress: "j−i decreases each step.",
        termination: "i ≥ j or pair found.",
        finalState: "Either a valid pair or proof none exists in original array.",
        correctness: "Every discarded index is dominated by the sorted sum argument.",
      },
      whyThisWorks: {
        maintained: "Candidate interval [i, j]",
        discarded: "Indices outside [i, j]",
        whyDiscarded: "Sorted sum monotonicity",
        discardInvariant: "No optimal pair uses a discarded index with any remaining partner",
        progress: "j − i decreases",
        finalState: "Pair found or interval empty",
      },
    },
    {
      id: "tp2",
      title: "Level 2 — Same-direction / remove duplicates",
      problem: "Remove duplicates in-place from sorted array; return new length.",
      coreInvariant: "A[0..slow]\\text{ is the compacted unique prefix}",
      whyTrue: "fast scans; slow writes only when a new value appears.",
      newIdea: "Read pointer ≠ write pointer (partitioning pattern)",
      related: ["Remove Duplicates (26)", "Move Zeroes (283)"],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Opposite ends shrink toward center",
        newConstraint: "Must rewrite array / partition in one pass",
        newInvariant: "slow marks boundary of satisfied region",
        whyNecessary:
          "Opposite pointers find pairs. Same-direction pointers maintain a processed prefix invariant while scanning ahead.",
      },
    },
    {
      id: "tp3",
      title: "Level 3 — 3Sum / 4Sum",
      problem: "Find all unique triplets summing to 0 (then extend to 4Sum).",
      coreInvariant: "\\text{Fix }i;\\text{ two-pointer on }(i+1,n)\\text{ with skip-duplicates}",
      whyTrue: "After sorting, each fixed i reduces to pair-sum; duplicate skips preserve uniqueness.",
      newIdea: "k-Sum = fix one + recurse to (k−1)-Sum",
      related: ["3Sum (15)", "4Sum (18)"],
      complexity: { time: "O(n²)", space: "O(1)" },
      transition: {
        previousInvariant: "Pair sum on sorted array",
        newConstraint: "Three (four) values; unique tuples",
        newInvariant: "Sorted + fixed prefix + two-pointer remainder",
        whyNecessary: "Extra variables need fixing to restore a 2-pointer subproblem.",
      },
    },
    {
      id: "tp4",
      title: "Level 4 — Palindrome & containers",
      problem: "Validate palindrome; max area container; trapping rain patterns.",
      coreInvariant: "\\text{Outside }[i,j]\\text{ cannot improve area/palindrome check}",
      whyTrue: "Palindrome: ends must match. Container: move the shorter line — width shrinks, only taller height can compensate.",
      newIdea: "Geometric / symmetry invariants on endpoints",
      related: ["Valid Palindrome (125)", "Container With Most Water (11)"],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "tp5",
      title: "Level 5 — Multi-pointer optimization",
      problem: "Trapping Rain Water, Dutch National Flag, n-pointer merges.",
      coreInvariant: "\\text{LeftMax/RightMax bound water; 3-way partition colors}",
      whyTrue: "Water at i = max(0, min(Lmax,Rmax)−A[i]). DNF: [0..lo) zeros, (hi..n] twos.",
      newIdea: "Two pointers + precomputed bounds / 3-way partition",
      related: ["Trapping Rain Water (42)", "Sort Colors (75)"],
      complexity: { time: "O(n)", space: "O(1)" },
    },
  ],

  tree: `Two Pointers
│
├── Fundamental: safe discard
├── Pair sum (opposite)
│   └── sum monotonicity
├── Same-direction / partition
│   └── slow/fast write boundary
├── 3Sum / 4Sum
│   └── fix + two-pointer
├── Palindrome / Container
│   └── endpoint symmetry / shorter-line move
└── Rain water / Dutch flag
    └── bounds + 3-way partition`,

  complexityTable: [
    { problem: "Two Sum II", time: "O(n)", space: "O(1)", mainInvariant: "Answer in [i,j]", technique: "Opposite pointers" },
    { problem: "Remove Duplicates", time: "O(n)", space: "O(1)", mainInvariant: "Unique prefix", technique: "Slow/fast" },
    { problem: "3Sum", time: "O(n²)", space: "O(1)", mainInvariant: "Fixed i + pair sum", technique: "Sort + 2P" },
    { problem: "Container Water", time: "O(n)", space: "O(1)", mainInvariant: "Move shorter side", technique: "Opposite pointers" },
    { problem: "Trapping Rain Water", time: "O(n)", space: "O(1)", mainInvariant: "Lmax/Rmax bounds", technique: "Two pointers" },
  ],

  interviewTricks: [
    "Sorted + pair relationship → two pointers.",
    "In-place partition / compact → slow & fast.",
    "Palindrome / symmetric ends → opposite pointers.",
    "k-Sum → sort, fix k−2, two-pointer the rest.",
    "Max area between lines → move the limiting (shorter) pointer.",
  ],

  leetcode: [
    { name: "Two Sum II", number: 167, slug: "two-sum-ii-input-array-is-sorted", invariant: "Answer in [i,j]", prerequisite: "Sorted array", difficulty: "Medium", stage: "foundation" },
    { name: "Valid Palindrome", number: 125, slug: "valid-palindrome", invariant: "Ends must match", prerequisite: "Opposite pointers", difficulty: "Easy", stage: "foundation" },
    { name: "Remove Duplicates from Sorted Array", number: 26, slug: "remove-duplicates-from-sorted-array", invariant: "Unique prefix at slow", prerequisite: "Slow/fast", difficulty: "Easy", stage: "invariant" },
    { name: "Move Zeroes", number: 283, slug: "move-zeroes", invariant: "Non-zeros packed left", prerequisite: "Partition", difficulty: "Easy", stage: "invariant" },
    { name: "3Sum", number: 15, slug: "3sum", invariant: "Fix + pair sum + skip dups", prerequisite: "Two Sum II", difficulty: "Medium", stage: "modification" },
    { name: "Container With Most Water", number: 11, slug: "container-with-most-water", invariant: "Move shorter line", prerequisite: "Opposite pointers", difficulty: "Medium", stage: "modification" },
    { name: "4Sum", number: 18, slug: "4sum", invariant: "k-Sum reduction", prerequisite: "3Sum", difficulty: "Medium", stage: "modification" },
    { name: "Sort Colors", number: 75, slug: "sort-colors", invariant: "3-way partition", prerequisite: "Dutch flag", difficulty: "Medium", stage: "combination" },
    { name: "Trapping Rain Water", number: 42, slug: "trapping-rain-water", invariant: "min(Lmax,Rmax)−h", prerequisite: "Two pointers + bounds", difficulty: "Hard", stage: "combination" },
  ],
};
