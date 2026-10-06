import type { Topic } from "../types";

export const binarySearch: Topic = {
  id: 11,
  slug: "binary-search",
  title: "Binary Search",
  accent: "blue",
  icon: "search",
  shortInvariants: ["low ≤ high", "Answer in interval", "Monotonic predicate"],
  applications: ["Exact", "Bounds", "Rotated", "Search on answer"],
  abstraction: "Halving a monotone search space",
  fundamentalIdea:
    "Maintain an interval that must contain the answer. Discard the half that the monotone predicate proves cannot contain it.",

  levels: [
    {
      id: "bs0",
      title: "Level 0 — Fundamental",
      problem: "Search on a sorted array / monotone boolean predicate.",
      coreInvariant: "\\text{answer remains inside }[low, high]",
      whyTrue: "Sortedness / monotonicity of P makes one side safe to discard.",
      newIdea: "Invariant on the search interval",
      related: [],
      complexity: { time: "O(\\log n)", space: "O(1)" },
    },
    {
      id: "bs1",
      title: "Level 1 — Exact search",
      problem: "Find target in sorted array; return index or −1.",
      coreInvariant: "\\text{If target exists, it is in }A[low..high]",
      whyTrue: "A[mid]<t ⇒ left half too small; A[mid]>t ⇒ right half too big.",
      newIdea: "Classic binary search",
      related: ["Binary Search (704)"],
      complexity: { time: "O(\\log n)", space: "O(1)" },
      proof: {
        invariant: "Target ∈ A[low..high] if it exists in A at all.",
        initialization: "low=0, high=n−1.",
        maintenance:
          "mid=⌊(low+high)/2⌋. A[mid]<t → low=mid+1 (left discarded safely). A[mid]>t → high=mid−1. Equal → found.",
        progress: "high−low shrinks.",
        termination: "low>high or found.",
        finalState: "Index or proof of absence.",
        correctness: "Discarded half cannot contain target by sorted order.",
      },
      whyThisWorks: {
        maintained: "Candidate index range",
        discarded: "Half that comparison rules out",
        whyDiscarded: "Sorted order",
        discardInvariant: "Answer ⊆ [low,high]",
        progress: "Interval length halves",
        finalState: "Singleton match or empty",
      },
    },
    {
      id: "bs2",
      title: "Level 2 — Lower / upper bound",
      problem: "First index with A[i]≥t; first with A[i]>t; first/last occurrence.",
      coreInvariant: "P(i)=[A[i]\\ge t]\\text{ is monotone false→true}",
      whyTrue: "Find leftmost true of a monotone predicate.",
      newIdea: "Binary search on predicate, not equality",
      related: ["Find First and Last Position (34)"],
      complexity: { time: "O(\\log n)", space: "O(1)" },
      transition: {
        previousInvariant: "Equality search",
        newConstraint: "Need boundary of a run of equals",
        newInvariant: "Search for first true of monotone P",
        whyNecessary: "Equality can land anywhere in a plateau; bounds need the edge.",
      },
    },
    {
      id: "bs3",
      title: "Level 3 — Rotated arrays",
      problem: "Search in rotated sorted array.",
      coreInvariant: "\\text{At least one of }[low,mid], [mid,high]\\text{ is sorted}",
      whyTrue: "Rotation preserves a sorted half; decide which half can contain target.",
      newIdea: "Identify sorted half each step",
      related: ["Search in Rotated Sorted Array (33)"],
      complexity: { time: "O(\\log n)", space: "O(1)" },
    },
    {
      id: "bs4",
      title: "Level 4 — Search on answer",
      problem: "Minimize max load / Koko eating bananas / split array largest sum.",
      coreInvariant: "P(x)=\\text{feasible with budget }x\\text{ is monotone}",
      whyTrue: "If x works, x+1 works. Binary search the minimal feasible x.",
      newIdea: "Binary search the answer space",
      related: ["Koko Eating Bananas (875)", "Split Array Largest Sum (410)"],
      complexity: { time: "O(n\\log M)", space: "O(1)" },
    },
    {
      id: "bs5",
      title: "Level 5 — Advanced combinations",
      problem: "Median of two sorted arrays; peak element; capacity to ship.",
      coreInvariant: "\\text{Partition / unimodal / feasibility predicates}",
      whyTrue: "Same interval invariant on a cleverly chosen monotone question.",
      newIdea: "BS + partition / unimodal / greedy check",
      related: ["Median of Two Sorted Arrays (4)", "Find Peak Element (162)"],
      complexity: { time: "O(\\log(m+n))", space: "O(1)" },
    },
  ],

  tree: `Binary Search
│
├── Answer ∈ [low, high]
├── Exact match
├── Lower/upper bound (monotone P)
├── Rotated (sorted half)
├── Search on answer
└── Partition / peak / dual arrays`,

  complexityTable: [
    { problem: "Binary Search", time: "O(log n)", space: "O(1)", mainInvariant: "Target in range", technique: "BS" },
    { problem: "First/Last Position", time: "O(log n)", space: "O(1)", mainInvariant: "Monotone P", technique: "Lower bound" },
    { problem: "Rotated Search", time: "O(log n)", space: "O(1)", mainInvariant: "Sorted half", technique: "BS variant" },
    { problem: "Koko Bananas", time: "O(n log M)", space: "O(1)", mainInvariant: "Feasible(x) monotone", technique: "BS on answer" },
  ],

  interviewTricks: [
    "Monotonic predicate → binary search.",
    "Minimize maximum / maximize minimum → BS on answer + greedy check.",
    "Sorted + first/last occurrence → lower/upper bound.",
    "Rotated sorted → identify sorted half.",
    "Unimodal array peak → compare mid with mid+1.",
  ],

  leetcode: [
    { name: "Binary Search", number: 704, slug: "binary-search", invariant: "Target in [lo,hi]", prerequisite: "Sorted", difficulty: "Easy", stage: "foundation" },
    { name: "Search Insert Position", number: 35, slug: "search-insert-position", invariant: "Lower bound", prerequisite: "Monotone P", difficulty: "Easy", stage: "foundation" },
    { name: "Find First and Last Position", number: 34, slug: "find-first-and-last-position-of-element-in-sorted-array", invariant: "Two bounds", prerequisite: "Lower/upper", difficulty: "Medium", stage: "invariant" },
    { name: "Search in Rotated Sorted Array", number: 33, slug: "search-in-rotated-sorted-array", invariant: "Sorted half", prerequisite: "Rotated", difficulty: "Medium", stage: "invariant" },
    { name: "Find Peak Element", number: 162, slug: "find-peak-element", invariant: "Climb toward peak", prerequisite: "Unimodal", difficulty: "Medium", stage: "modification" },
    { name: "Koko Eating Bananas", number: 875, slug: "koko-eating-bananas", invariant: "Feasible speed", prerequisite: "BS on answer", difficulty: "Medium", stage: "modification" },
    { name: "Split Array Largest Sum", number: 410, slug: "split-array-largest-sum", invariant: "Min max load", prerequisite: "BS + greedy", difficulty: "Hard", stage: "combination" },
    { name: "Median of Two Sorted Arrays", number: 4, slug: "median-of-two-sorted-arrays", invariant: "Correct partition", prerequisite: "BS partition", difficulty: "Hard", stage: "combination" },
  ],
};
