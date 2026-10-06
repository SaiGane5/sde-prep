import type { Topic } from "../types";

export const slidingWindow: Topic = {
  id: 3,
  slug: "sliding-window",
  title: "Sliding Window",
  accent: "orange",
  icon: "app-window",
  shortInvariants: ["left ≤ right", "Window property maintained", "Shrink is safe"],
  applications: ["Fixed/variable window", "At-most K", "Min window", "Mono deque"],
  abstraction: "Contiguous subarray under a constraint",
  fundamentalIdea:
    "A window [left, right] is a contiguous candidate. Expand right to gain feasibility/coverage; shrink left when the constraint breaks — but only when shrinking cannot destroy an optimal answer.",

  levels: [
    {
      id: "sw0",
      title: "Level 0 — Fundamental idea",
      problem: "Contiguous segment + constraint ⇒ maintain a window, not all O(n²) subarrays.",
      coreInvariant: "left \\le right",
      whyTrue: "Empty or invalid windows are handled by the shrink/expand rules; indices never cross.",
      newIdea: "Replace nested loops with two moving boundaries",
      related: [],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "sw1",
      title: "Level 1 — Fixed window",
      problem: "Maximum sum of any subarray of length k.",
      coreInvariant: "\\text{window length}=k;\\; S=\\sum A[left..right]",
      whyTrue: "Slide by −A[left]+A[right+1]; each element enters/leaves once.",
      newIdea: "Constant-size window → O(1) update",
      related: ["Maximum Average Subarray I (643)"],
      complexity: { time: "O(n)", space: "O(1)" },
      proof: {
        invariant: "S equals sum of A[left..left+k).",
        initialization: "Sum first k elements.",
        maintenance: "S ← S − A[left] + A[left+k]; left++.",
        progress: "left advances to n−k.",
        termination: "All windows of size k considered.",
        finalState: "Tracked maximum S.",
        correctness: "Every length-k subarray is visited exactly once.",
      },
    },
    {
      id: "sw2",
      title: "Level 2 — Variable window + sum",
      problem: "Longest / shortest subarray with sum ≥ target (positives).",
      coreInvariant: "\\text{If positives: shrinking left never creates a new longer valid window skipped}",
      whyTrue: "With non-negative numbers, once sum is too small after shrink, extending left further only worsens sum.",
      newIdea: "Variable size — expand until valid, shrink while valid",
      related: ["Minimum Size Subarray Sum (209)"],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Fixed length k",
        newConstraint: "Length becomes decision variable under sum constraint",
        newInvariant: "Maintain current sum; move left only when sum too large (or track min length)",
        whyNecessary: "Fixed k can't express 'shortest with sum ≥ t'.",
      },
    },
    {
      id: "sw3",
      title: "Level 3 — Frequency / distinct / at-most K",
      problem: "Longest substring with at most K distinct characters; exactly K via at-most.",
      coreInvariant: "freq\\text{ map of }A[left..right]\\text{ is accurate; }|keys|\\le K",
      whyTrue: "When distinct > K, advance left until valid. exactly(K)=atMost(K)−atMost(K−1).",
      newIdea: "Frequency invariant + inclusion of counts",
      related: ["Longest Substring Without Repeating (3)", "Subarrays with K Different (992)"],
      complexity: { time: "O(n)", space: "O(|Σ|)" },
      whyThisWorks: {
        maintained: "Character/item frequencies inside [left,right]",
        discarded: "Prefixes that violate the distinct/freq constraint",
        whyDiscarded: "Any subarray starting further left still includes the violator",
        discardInvariant: "Constraint is monotone in window growth for these problems",
        progress: "right moves n times; left never decreases",
        finalState: "Best window length / count among all valid windows",
      },
    },
    {
      id: "sw4",
      title: "Level 4 — Minimum window covering",
      problem: "Smallest window in s covering all characters of t.",
      coreInvariant: "need/have counters; window is covering iff have=need",
      whyTrue: "Expand until covering; then shrink to minimal covering ending at right.",
      newIdea: "Coverage counters — dual of at-most constraints",
      related: ["Minimum Window Substring (76)"],
      complexity: { time: "O(n)", space: "O(|Σ|)" },
    },
    {
      id: "sw5",
      title: "Level 5 — Monotonic deque",
      problem: "Sliding window maximum.",
      coreInvariant: "\\text{Deque stores indices with decreasing }A[\\cdot]\\text{; front = max}",
      whyTrue: "Pop back if ≤ new; pop front if out of window. Dominated elements never become max.",
      newIdea: "Window + monotonic structure for range extrema",
      related: ["Sliding Window Maximum (239)"],
      complexity: { time: "O(n)", space: "O(k)" },
    },
  ],

  tree: `Sliding Window
│
├── left ≤ right
├── Fixed window sum
├── Variable sum constraint
├── Frequency / at-most / exactly K
├── Minimum covering window
└── Monotonic deque extrema`,

  complexityTable: [
    { problem: "Fixed window sum", time: "O(n)", space: "O(1)", mainInvariant: "Sum of length k", technique: "Slide" },
    { problem: "Min size sum ≥ t", time: "O(n)", space: "O(1)", mainInvariant: "Expand/shrink sum", technique: "Variable window" },
    { problem: "No repeat substring", time: "O(n)", space: "O(|Σ|)", mainInvariant: "Unique chars in window", technique: "Freq map" },
    { problem: "Min window substring", time: "O(n)", space: "O(|Σ|)", mainInvariant: "have = need", technique: "Coverage" },
    { problem: "Window maximum", time: "O(n)", space: "O(k)", mainInvariant: "Mono deque front", technique: "Deque" },
  ],

  interviewTricks: [
    "Contiguous subarray + constraint → sliding window.",
    "At most K → shrink when violated; exactly K = atMost(K)−atMost(K−1).",
    "Need min/max in moving window → monotonic deque.",
    "All positive + sum → classic expand/shrink.",
    "Negatives in sum constraints → usually prefix sums / not plain window.",
  ],

  leetcode: [
    { name: "Maximum Average Subarray I", number: 643, slug: "maximum-average-subarray-i", invariant: "Fixed window sum", prerequisite: "Fixed window", difficulty: "Easy", stage: "foundation" },
    { name: "Longest Substring Without Repeating Characters", number: 3, slug: "longest-substring-without-repeating-characters", invariant: "Unique set in window", prerequisite: "Variable + freq", difficulty: "Medium", stage: "foundation" },
    { name: "Minimum Size Subarray Sum", number: 209, slug: "minimum-size-subarray-sum", invariant: "Shrink while sum ≥ t", prerequisite: "Variable sum", difficulty: "Medium", stage: "invariant" },
    { name: "Fruit Into Baskets", number: 904, slug: "fruit-into-baskets", invariant: "At most 2 types", prerequisite: "At-most K", difficulty: "Medium", stage: "invariant" },
    { name: "Longest Repeating Character Replacement", number: 424, slug: "longest-repeating-character-replacement", invariant: "window − maxFreq ≤ k", prerequisite: "Freq window", difficulty: "Medium", stage: "modification" },
    { name: "Subarrays with K Different Integers", number: 992, slug: "subarrays-with-k-different-integers", invariant: "exactly = atMost diff", prerequisite: "At-most K", difficulty: "Hard", stage: "modification" },
    { name: "Minimum Window Substring", number: 76, slug: "minimum-window-substring", invariant: "have = need", prerequisite: "Coverage counters", difficulty: "Hard", stage: "combination" },
    { name: "Sliding Window Maximum", number: 239, slug: "sliding-window-maximum", invariant: "Mono deque", prerequisite: "Window + deque", difficulty: "Hard", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Window [left,right] and its aggregate (sum/freq/coverage)",
    discarded: "Indices before left",
    whyDiscarded: "Monotone constraint: extending further left cannot help once violated",
    discardInvariant: "left only increases",
    progress: "right and left each move at most n times → O(n)",
    finalState: "Best window among all contiguous candidates",
  },
};
