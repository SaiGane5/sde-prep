import type { Topic } from "../types";

export const intervals: Topic = {
  id: 2,
  slug: "intervals",
  title: "Intervals",
  accent: "cyan",
  icon: "between-horizontal",
  shortInvariants: ["start ≤ end", "Processed are merged", "Sweep line status"],
  applications: ["Merge", "Insert", "Meeting rooms", "Scheduling", "Diff array"],
  abstraction: "Ordered coverage on a line",
  fundamentalIdea:
    "An interval is a closed/half-open segment. Sorting by start (or end) turns geometric overlap into a linear scan with a clear processed-prefix invariant.",

  levels: [
    {
      id: "iv0",
      title: "Level 0 — Representation",
      problem: "Normalize intervals so start ≤ end; choose half-open [s,e) when helpful.",
      coreInvariant: "start \\le end",
      whyTrue: "Without normalization, overlap tests are ill-defined.",
      newIdea: "Interval as ordered pair",
      related: [],
      complexity: { time: "O(1)", space: "O(1)" },
    },
    {
      id: "iv1",
      title: "Level 1 — Overlap detection",
      problem: "Do [a,b] and [c,d] overlap?",
      coreInvariant: "\\neg(b<c \\lor d<a) \\iff \\text{overlap}",
      whyTrue: "Disjoint iff one completely left of the other.",
      newIdea: "Boolean overlap from endpoints",
      related: ["Meeting Rooms (252)"],
      complexity: { time: "O(1)", space: "O(1)" },
      proof: {
        invariant: "Two closed intervals overlap iff each start ≤ other end.",
        initialization: "Given normalized intervals.",
        maintenance: "N/A — closed form.",
        progress: "N/A",
        termination: "N/A",
        finalState: "Boolean overlap.",
        correctness: "Complement of total order separation.",
      },
    },
    {
      id: "iv2",
      title: "Level 2 — Merge intervals",
      problem: "Merge all overlapping intervals.",
      coreInvariant: "\\text{emitted intervals are pairwise disjoint and maximal}",
      whyTrue: "Sort by start; extend current end while next.start ≤ current.end.",
      newIdea: "Sorted scan + running merged end",
      related: ["Merge Intervals (56)"],
      complexity: { time: "O(n\\log n)", space: "O(n)" },
      transition: {
        previousInvariant: "Pairwise overlap test",
        newConstraint: "n intervals; produce canonical cover",
        newInvariant: "Processed prefix fully merged",
        whyNecessary: "Local pairwise checks don't yield global non-overlapping form.",
      },
    },
    {
      id: "iv3",
      title: "Level 3 — Insert / Meeting rooms",
      problem: "Insert interval into sorted merged list; can one attend all meetings?",
      coreInvariant: "\\text{After sort by start: no overlap} \\iff \\forall i:\\, end_i \\le start_{i+1}",
      whyTrue: "Adjacent check after sorting suffices for a single resource.",
      newIdea: "Conflict = overlap after ordering",
      related: ["Insert Interval (57)", "Meeting Rooms (252)"],
      complexity: { time: "O(n\\log n)", space: "O(1)" },
    },
    {
      id: "iv4",
      title: "Level 4 — Meeting Rooms II / sweep",
      problem: "Minimum rooms = maximum concurrent intervals.",
      coreInvariant: "\\text{After +1 at start, −1 at end: max prefix = rooms}",
      whyTrue: "Sweep line: status count is number of active intervals.",
      newIdea: "Difference array / sweep line",
      related: ["Meeting Rooms II (253)"],
      complexity: { time: "O(n\\log n)", space: "O(n)" },
      whyThisWorks: {
        maintained: "Active count along the sorted event line",
        discarded: "Resolved past events",
        whyDiscarded: "Only active concurrency matters for room count",
        discardInvariant: "Events processed in time order",
        progress: "2n events",
        finalState: "Maximum active count",
      },
    },
    {
      id: "iv5",
      title: "Level 5 — Interval scheduling (greedy)",
      problem: "Maximum number of non-overlapping intervals.",
      coreInvariant: "\\text{Pick earliest finishing feasible interval}",
      whyTrue: "Exchange argument: earliest end leaves maximal room for the rest.",
      newIdea: "Greedy by end time = optimal scheduling",
      related: ["Non-overlapping Intervals (435)", "Minimum Arrows (452)"],
      complexity: { time: "O(n\\log n)", space: "O(1)" },
    },
  ],

  tree: `Intervals
│
├── start ≤ end
├── Overlap predicate
├── Merge (sorted scan)
├── Insert / single-resource conflicts
├── Sweep / Meeting Rooms II
└── Greedy earliest-end scheduling`,

  complexityTable: [
    { problem: "Merge Intervals", time: "O(n log n)", space: "O(n)", mainInvariant: "Merged processed prefix", technique: "Sort + scan" },
    { problem: "Meeting Rooms", time: "O(n log n)", space: "O(1)", mainInvariant: "Adjacent non-overlap", technique: "Sort" },
    { problem: "Meeting Rooms II", time: "O(n log n)", space: "O(n)", mainInvariant: "Max active count", technique: "Sweep" },
    { problem: "Non-overlapping", time: "O(n log n)", space: "O(1)", mainInvariant: "Earliest end greedy", technique: "Greedy" },
  ],

  interviewTricks: [
    "Overlap / merge → sort by start.",
    "Min rooms / max concurrency → sweep line.",
    "Max non-overlapping → sort by end, greedy take.",
    "Range updates → difference array.",
    "Insert into merged list → binary search + splice merge.",
  ],

  leetcode: [
    { name: "Merge Intervals", number: 56, slug: "merge-intervals", invariant: "Merged prefix", prerequisite: "Sort + scan", difficulty: "Medium", stage: "foundation" },
    { name: "Insert Interval", number: 57, slug: "insert-interval", invariant: "Three-way split merge", prerequisite: "Merge", difficulty: "Medium", stage: "foundation" },
    { name: "Non-overlapping Intervals", number: 435, slug: "non-overlapping-intervals", invariant: "Earliest end", prerequisite: "Greedy scheduling", difficulty: "Medium", stage: "invariant" },
    { name: "Minimum Number of Arrows", number: 452, slug: "minimum-number-of-arrows-to-burst-balloons", invariant: "Shared end clustering", prerequisite: "Greedy by end", difficulty: "Medium", stage: "invariant" },
    { name: "Car Pooling", number: 1094, slug: "car-pooling", invariant: "Diff array capacity", prerequisite: "Sweep", difficulty: "Medium", stage: "modification" },
    { name: "My Calendar I", number: 729, slug: "my-calendar-i", invariant: "No overlap store", prerequisite: "Ordered set", difficulty: "Medium", stage: "modification" },
    { name: "Employee Free Time", number: 759, slug: "employee-free-time", invariant: "Merge all then gaps", prerequisite: "Merge", difficulty: "Hard", stage: "combination" },
    { name: "The Skyline Problem", number: 218, slug: "the-skyline-problem", invariant: "Sweep + multiset heights", prerequisite: "Sweep + heap", difficulty: "Hard", stage: "combination" },
  ],
};
