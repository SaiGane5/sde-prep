import type { Topic } from "../types";

export const permutations: Topic = {
  id: 14,
  slug: "permutations",
  title: "Permutations",
  accent: "pink",
  icon: "shuffle",
  shortInvariants: [
    "Each index used once",
    "Order matters",
    "Swap / used[] / fix position",
  ],
  applications: [
    "All orderings",
    "Next permutation",
    "String permutations with dup",
    "Assignment / scheduling order",
  ],
  abstraction: "Arrange n distinct slots — position i chooses from remaining unused elements",
  fundamentalIdea:
    "Permutations count orderings: P(n,n)=n!. Subsets choose who is in the set; permutations choose who sits in each slot. Combinations C(n,k) ignore order; permutations P(n,k) do not.",

  levels: [
    {
      id: "pm0",
      title: "Level 0 — Fundamental idea",
      problem: "Distinguish combinations vs permutations; count ordered vs unordered selections.",
      coreInvariant:
        "\\text{Permutation: bijection from positions } \\{1..k\\} \\to \\text{chosen }k\\text{ elements}",
      whyTrue: "Swapping two positions yields a different permutation but the same combination.",
      newIdea: "Order matters ⇒ arrange, don't just select",
      related: [],
      complexity: { time: "O(k! · n) gen", space: "O(k)" },
      formula:
        "P(n,k)=\\dfrac{n!}{(n-k)!} \\quad \\text{(ordered }k\\text{-tuples of distinct picks)} \\quad C(n,k)=\\binom{n}{k}=\\dfrac{n!}{k!(n-k)!} \\quad \\text{(unordered)}",
    },
    {
      id: "pm1",
      title: "Level 1 — Permutations I",
      problem: "Return all permutations of distinct nums.",
      coreInvariant: "path has no repeated index; |path| = n at leaf",
      whyTrue: "Fix position i by choosing any unused element — each full path is one ordering.",
      newIdea: "Backtrack with used[] or swap-in-place",
      related: ["Permutations (46)"],
      complexity: { time: "O(n · n!)", space: "O(n)" },
      proof: {
        invariant: "path is an ordered list of distinct elements from nums; |path| = d unused = n − d.",
        initialization: "path = [], all unused.",
        maintenance: "For each unused x at depth d: append x, recurse, remove x.",
        progress: "Depth d increases to n.",
        termination: "|path| = n.",
        finalState: "All n! permutations listed.",
        correctness: "Bijection between leaves and elements of S_n.",
      },
      whyThisWorks: {
        maintained: "Partial permutation — no duplicate index in path",
        discarded: "Already-used elements at this depth",
        whyDiscarded: "Each element appears exactly once in a permutation",
        discardInvariant: "used[i] false only for free elements",
        progress: "Depth → n",
        finalState: "n! orderings",
      },
    },
    {
      id: "pm2",
      title: "Level 2 — Permutations II (duplicates)",
      problem: "Unique permutations when nums has duplicates.",
      coreInvariant: "Sort; skip nums[i] if used[i−1] and !used[i−1] (same-level dedup)",
      whyTrue: "Identical values at same depth would mirror branches — skip redundant first.",
      newIdea: "Same dedup pattern as subsets, on used tree",
      related: ["Permutations II (47)"],
      complexity: { time: "O(n · n! / dup)", space: "O(n)" },
      transition: {
        previousInvariant: "Distinct elements",
        newConstraint: "Duplicate values",
        newInvariant: "Sorted + skip if prev equal unused",
        whyNecessary: "Swap-based enumeration would double-count {1,1,2}.",
      },
    },
    {
      id: "pm3",
      title: "Level 3 — Next permutation",
      problem: "Lexicographic next ordering in O(n); is array a permutation of set?",
      coreInvariant: "Find rightmost ascent i; swap i with smallest nums[j]>nums[i] for j>i; reverse suffix",
      whyTrue: "Lex order: minimal change after prefix — bump pivot, sort tail ascending.",
      newIdea: "In-place O(n) successor without full enumeration",
      related: ["Next Permutation (31)"],
      complexity: { time: "O(n)", space: "O(1)" },
      formula: "\\text{lex order on sequences } a_1..a_n",
    },
    {
      id: "pm4",
      title: "Level 4 — String permutations & constraints",
      problem: "Palindrome permutation; permute with match/remove; letter case combos.",
      coreInvariant: "Char freq multiset fixed; palindrome ⇔ at most one odd count",
      whyTrue: "Permutation of string = rearrange counts; palindrome pairs evens at both ends.",
      newIdea: "Frequency table + place or swap under constraint",
      related: ["Permutation in String (567)", "Palindrome Permutation (266)"],
      complexity: { time: "O(n! ) or O(n)", space: "O(n)" },
    },
    {
      id: "pm5",
      title: "Level 5 — P(n,k) arrangements & search",
      problem: "Permutation sequence (k-th); arrange k of n; DFS + memo on state.",
      coreInvariant: "Choose k positions or k elements in order — count P(n,k), stop at depth k",
      whyTrue: "k-permutation = first k slots filled, same used invariant.",
      newIdea: "Truncated permutation tree; rank via factorial number system",
      related: ["Permutation Sequence (60)", "Beautiful Arrangement (526)"],
      complexity: { time: "O(n! / (n-k)!)", space: "O(k)" },
      formula: "P(n,k)=\\dfrac{n!}{(n-k)!} \\neq C(n,k) \\text{ when } k>1",
    },
  ],

  tree: `Permutations
│
├── Fundamental: order matters — P(n,k) vs C(n,k)
├── Permutations I
│   └── used[] backtrack → n!
├── Permutations II
│   └── sort + skip dup branch
├── Next permutation
│   └── lex successor O(n)
├── String / constraint permute
│   └── freq / palindrome
└── k-permutations / rank
    └── depth k, P(n,k) count`,

  complexityTable: [
    { problem: "Permutations", time: "O(n·n!)", space: "O(n)", mainInvariant: "No reuse in path", technique: "Backtrack" },
    { problem: "Permutations II", time: "O(n·n!)", space: "O(n)", mainInvariant: "Skip dup branch", technique: "Sort + BT" },
    { problem: "Next Permutation", time: "O(n)", space: "O(1)", mainInvariant: "Ascent + suffix min", technique: "In-place" },
    { problem: "Permutation in String", time: "O(n)", space: "O(1)", mainInvariant: "Fixed freq window", technique: "Sliding window" },
    { problem: "Permutation Sequence", time: "O(n²)", space: "O(n)", mainInvariant: "Factorial rank", technique: "Count per slot" },
    { problem: "Beautiful Arrangement", time: "O(k)", space: "O(n)", mainInvariant: "Divisibility prune", technique: "BT + memo" },
  ],

  interviewTricks: [
    "Order matters → permutation; only membership → subset / C(n,k).",
    "P(n,k) = n·(n−1)…(n−k+1); C(n,k) = P(n,k)/k!.",
    "Duplicates → sort + skip same value at same depth (check used[i−1]).",
    "Next perm → find i, swap, reverse suffix — know the template.",
    "In-place permute → swap nums[start] with each j ≥ start.",
    "Check perm of string → sort both or count frequencies.",
  ],

  leetcode: [
    { name: "Permutations", number: 46, slug: "permutations", invariant: "used[] no repeat", prerequisite: "Backtracking", difficulty: "Medium", stage: "foundation" },
    { name: "Permutations II", number: 47, slug: "permutations-ii", invariant: "Skip duplicate branch", prerequisite: "Permutations I", difficulty: "Medium", stage: "foundation" },
    { name: "Next Permutation", number: 31, slug: "next-permutation", invariant: "Lexicographic successor", prerequisite: "In-place", difficulty: "Medium", stage: "invariant" },
    { name: "Permutation Sequence", number: 60, slug: "permutation-sequence", invariant: "k-th via factorial", prerequisite: "Ranking", difficulty: "Hard", stage: "invariant" },
    { name: "Permutation in String", number: 567, slug: "permutation-in-string", invariant: "Freq match window", prerequisite: "Anagram window", difficulty: "Medium", stage: "modification" },
    { name: "Number of Squareful Arrays", number: 996, slug: "number-of-squareful-arrays", invariant: "Permute + adj sum square", prerequisite: "Permutations II", difficulty: "Hard", stage: "modification" },
    { name: "Beautiful Arrangement", number: 526, slug: "beautiful-arrangement", invariant: "pos divides value", prerequisite: "Pruned permute", difficulty: "Medium", stage: "modification" },
    { name: "Letter Tile Possibilities", number: 1079, slug: "letter-tile-possibilities", invariant: "Freq backtrack count", prerequisite: "Dup permute", difficulty: "Medium", stage: "combination" },
    { name: "Android Unlock Patterns", number: 351, slug: "android-unlock-patterns", invariant: "Grid perm with jump rule", prerequisite: "Constrained path", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Partial order — distinct used elements per prefix",
    discarded: "Used elements; dup branches; failed constraint extensions",
    whyDiscarded: "Cannot complete to valid permutation",
    discardInvariant: "Each element at most once per path",
    progress: "Depth increases toward n (or k)",
    finalState: "All orderings or next lex successor",
  },
};
