import type { Topic } from "../types";

export const sorting: Topic = {
  id: 12,
  slug: "sorting",
  title: "Sorting",
  accent: "orange",
  icon: "arrow-up-down",
  shortInvariants: [
    "Processed prefix sorted",
    "Pivot / merge partition correct",
    "DAG order for topo",
  ],
  applications: [
    "Enable two-pointer / BS",
    "K-way merge",
    "Custom comparators",
    "Schedule with dependencies",
  ],
  abstraction: "Establish total order (or partial order) via repeated local fixes",
  fundamentalIdea:
    "Each algorithm maintains a structural invariant about what is already ordered. Progress shrinks the unsorted region or merges sorted pieces until the whole array satisfies A[i] ≤ A[i+1].",

  levels: [
    {
      id: "so0",
      title: "Level 0 — Fundamental idea",
      problem: "Transform array into non-decreasing order; know comparison-based Ω(n log n) limit.",
      coreInvariant: "A[0..k)\\text{ sorted and } \\forall i<k, j\\ge k:\\ A[i]\\le A[j] \\text{ (when applicable)}",
      whyTrue: "Sorting = extend a sorted prefix or merge sorted runs until k = n.",
      newIdea: "Pick an invariant; each pass extends ordered region",
      related: [],
      complexity: { time: "O(n log n) optimal compare", space: "O(1)–O(n)" },
      formula: "\\text{compare sort lower bound: } \\Omega(n\\log n)",
    },
    {
      id: "so1",
      title: "Level 1 — Bubble & insertion",
      problem: "Simple O(n²) sorts; understand local swap invariants.",
      coreInvariant:
        "\\boxed{\\text{Bubble: after pass }p,\\ A[n-p..n)\\text{ are the }p\\text{ largest in final position}} \\quad \\boxed{\\text{Insertion: }A[0..i)\\text{ sorted after processing }A[i]}",
      whyTrue:
        "Bubble: adjacent swaps bubble max to end each pass. Insertion: insert A[i] into sorted prefix by shifting.",
      newIdea: "Adjacent fix vs insert into sorted left part",
      related: ["Sort an Array (912) — small n)"],
      complexity: { time: "O(n²)", space: "O(1)" },
      proof: {
        invariant: "Insertion: after i−1 steps, A[0..i) is sorted.",
        initialization: "i = 1: single element sorted.",
        maintenance: "Place A[i] by scanning left; shift larger elements; insert — prefix stays sorted.",
        progress: "i increases by 1.",
        termination: "i = n.",
        finalState: "Full array sorted.",
        correctness: "Induction on prefix length.",
      },
    },
    {
      id: "so2",
      title: "Level 2 — Merge sort",
      problem: "Stable O(n log n) via divide and conquer.",
      coreInvariant:
        "\\boxed{\\text{Merge: }A[l..m)\\text{ and }A[m..r)\\text{ sorted } \\Rightarrow \\text{ merge writes sorted }A[l..r)}",
      whyTrue: "Two-finger merge always takes the smaller front — output sorted.",
      newIdea: "Sorted halves → linear merge",
      related: ["Sort an Array (912)", "Merge Sorted Array (88)"],
      complexity: { time: "O(n log n)", space: "O(n)" },
      formula: "T(n)=2T(n/2)+O(n) \\Rightarrow O(n\\log n)",
    },
    {
      id: "so3",
      title: "Level 3 — Quick sort",
      problem: "In-place partition around pivot.",
      coreInvariant:
        "\\boxed{\\text{Partition: } \\forall i<p,\\ A[i]\\le pivot;\\ \\forall i>p,\\ A[i]\\ge pivot}",
      whyTrue: "Lomuto/Hoare scan maintains two regions; pivot lands in final rank.",
      newIdea: "Partition invariant → recurse on sides",
      related: ["Sort Colors (75)", "Kth Largest (215)"],
      complexity: { time: "O(n log n) avg", space: "O(log n) stack" },
      whyThisWorks: {
        maintained: "Elements ≤ pivot left; ≥ pivot right",
        discarded: "Nothing — pivot placed correctly",
        whyDiscarded: "Pivot index fixed in sorted order",
        discardInvariant: "Pivot final position",
        progress: "Subproblem size decreases",
        finalState: "All partitions size 1",
      },
    },
    {
      id: "so4",
      title: "Level 4 — Topological sort",
      problem: "Linear order of DAG nodes respecting all edges u → v.",
      coreInvariant:
        "\\boxed{\\text{Topo: output list }\\pi\\text{ with } u\\to v \\Rightarrow u\\text{ before }v\\text{ in }\\pi}",
      whyTrue: "Repeatedly remove source (in-degree 0); only nodes with no unprocessed predecessors go next.",
      newIdea: "Partial order → Kahn BFS or DFS finish times",
      related: ["Course Schedule (207)", "Course Schedule II (210)"],
      complexity: { time: "O(V+E)", space: "O(V)" },
      formula: "\\text{DAG } \\iff \\text{ no cycle } \\iff \\text{ topo exists}",
    },
    {
      id: "so5",
      title: "Level 5 — Custom & counting",
      problem: "Sort by custom comparator; non-comparison sorts; interval / meeting room ordering.",
      coreInvariant: "Comparator defines total order; counting sort: stable by digit/freq index",
      whyTrue: "Valid comparator is transitive + antisymmetric; buckets place keys in rank order.",
      newIdea: "Sort as preprocessing for greedy / sweep",
      related: [
        "Merge Intervals (56)",
        "Largest Number (179)",
        "Wiggle Sort II (324)",
      ],
      complexity: { time: "O(n log n) or O(n+k)", space: "O(1)–O(n)" },
      transition: {
        previousInvariant: "Numeric ascending order",
        newConstraint: "Custom order / bounded keys",
        newInvariant: "Comparator or bucket index defines rank",
        whyNecessary: "Real problems sort by deadline, start time, or string concat rule.",
      },
    },
  ],

  tree: `Sorting
│
├── Fundamental: grow sorted region
├── Bubble / Insertion
│   └── suffix max / sorted prefix
├── Merge sort
│   └── merge two sorted halves
├── Quick sort
│   └── partition around pivot
├── Topological sort
│   └── in-degree 0 sources
└── Custom comparator / counting
    └── preprocess for greedy`,

  complexityTable: [
    { problem: "Bubble sort", time: "O(n²)", space: "O(1)", mainInvariant: "Suffix largest fixed", technique: "Adjacent swap" },
    { problem: "Insertion sort", time: "O(n²)", space: "O(1)", mainInvariant: "Prefix sorted", technique: "Insert" },
    { problem: "Merge sort", time: "O(n log n)", space: "O(n)", mainInvariant: "Merge sorted halves", technique: "Divide conquer" },
    { problem: "Quick sort", time: "O(n log n) avg", space: "O(log n)", mainInvariant: "Pivot partition", technique: "Partition" },
    { problem: "Topological sort", time: "O(V+E)", space: "O(V)", mainInvariant: "Edge order in output", technique: "Kahn / DFS" },
    { problem: "Counting sort", time: "O(n+k)", space: "O(k)", mainInvariant: "Stable bucket rank", technique: "Non-compare" },
  ],

  interviewTricks: [
    "Sort first → unlock two-pointer, BS, greedy on order.",
    "Custom sort: (a+b) vs (b+a) for Largest Number.",
    "Intervals: sort by start (merge) or end (room scheduling).",
    "Topo: cycle detection = no answer; Kahn for explicit order.",
    "Stable needed → merge sort or careful counting.",
    "Quickselect = partition only, no full sort.",
  ],

  leetcode: [
    { name: "Sort an Array", number: 912, slug: "sort-an-array", invariant: "Merge / quick partition", prerequisite: "Classic sorts", difficulty: "Medium", stage: "foundation" },
    { name: "Merge Sorted Array", number: 88, slug: "merge-sorted-array", invariant: "Two-finger merge", prerequisite: "Merge", difficulty: "Easy", stage: "foundation" },
    { name: "Sort Colors", number: 75, slug: "sort-colors", invariant: "3-way partition", prerequisite: "Dutch flag", difficulty: "Medium", stage: "invariant" },
    { name: "Course Schedule", number: 207, slug: "course-schedule", invariant: "Topo / cycle detect", prerequisite: "DAG", difficulty: "Medium", stage: "invariant" },
    { name: "Course Schedule II", number: 210, slug: "course-schedule-ii", invariant: "Kahn order", prerequisite: "Topo sort", difficulty: "Medium", stage: "modification" },
    { name: "Merge Intervals", number: 56, slug: "merge-intervals", invariant: "Sort by start", prerequisite: "Sort + sweep", difficulty: "Medium", stage: "modification" },
    { name: "Largest Number", number: 179, slug: "largest-number", invariant: "Custom comparator", prerequisite: "Sort by rule", difficulty: "Medium", stage: "modification" },
    { name: "Wiggle Sort II", number: 324, slug: "wiggle-sort-ii", invariant: "Median partition placement", prerequisite: "Quickselect + index", difficulty: "Medium", stage: "combination" },
    { name: "Minimum Number of Arrows to Burst Balloons", number: 452, slug: "minimum-number-of-arrows-to-burst-balloons", invariant: "Sort by end greedy", prerequisite: "Interval sort", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Sorted prefix / suffix / partition sides / topo order",
    discarded: "Misordered elements moved to correct region",
    whyDiscarded: "Invariant forces them into final rank class",
    discardInvariant: "Per-algorithm boxed invariant",
    progress: "Unsorted region shrinks or subproblems split",
    finalState: "Total order (or valid linear extension of DAG)",
  },
};
