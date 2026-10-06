import type { Topic } from "../types";

export const heaps: Topic = {
  id: 9,
  slug: "heaps",
  title: "Heaps",
  accent: "purple",
  icon: "triangle",
  shortInvariants: [
    "A[parent] ≥ A[i] (max-heap)",
    "Root = global extremum",
    "Insert/sift: local fix propagates",
  ],
  applications: [
    "Top-K streaming",
    "Merge K sorted lists",
    "Median from data stream",
    "Dijkstra priority queue",
  ],
  abstraction: "Partial order tree with O(log n) extremum access",
  fundamentalIdea:
    "A heap is a complete binary tree stored in an array where each parent dominates its children. The root is always the max (or min) without sorting the whole array.",

  levels: [
    {
      id: "hp0",
      title: "Level 0 — Fundamental idea",
      problem: "Maintain the maximum (or minimum) of a dynamic set with fast insert and extract.",
      coreInvariant:
        "\\text{Max-heap: } A[\\lfloor(i-1)/2\\rfloor] \\ge A[i] \\text{ for all } i>0",
      whyTrue:
        "Parent ≥ both children ⇒ every node ≤ its ancestors ⇒ root is global max.",
      newIdea: "Heap property = local dominance ⇒ global extremum at root",
      related: [],
      complexity: { time: "O(log n) insert/extract", space: "O(n)" },
      formula:
        "\\text{parent}(i)=\\lfloor(i-1)/2\\rfloor,\\quad \\text{left}(i)=2i+1,\\quad \\text{right}(i)=2i+2",
    },
    {
      id: "hp1",
      title: "Level 1 — Build & sift",
      problem: "Insert into max-heap; extract-max; heapify an array.",
      coreInvariant: "After each op, heap property holds on all edges parent→child",
      whyTrue: "Sift-up/sift-down only swap along one root-to-leaf path, restoring dominance locally at each step.",
      newIdea: "Bubble extremum along one path — O(log n)",
      related: ["Last Stone Weight (1046)"],
      complexity: { time: "O(log n) per op; O(n) build", space: "O(1)" },
      proof: {
        invariant:
          "After k operations, ∀i>0: A[parent(i)] ≥ A[i] (max-heap property).",
        initialization:
          "Empty heap: vacuously true. Or Floyd build: start from last internal node, sift-down each — subtrees already valid before processing parent.",
        maintenance:
          "Insert: append at end, sift-up while A[i] > A[parent(i)]. Swap restores parent≥child at that edge; if child was smaller, parent still ≥ other child. Extract-max: swap root with last, pop, sift-down root — each swap picks larger child, so new parent ≥ both children.",
        progress: "Sift moves index toward root or leaf; height h = ⌊log₂ n⌋.",
        termination: "Sift stops when parent ≥ node or at root/leaf.",
        finalState: "Full array satisfies A[parent(i)] ≥ A[i] for all i>0.",
        correctness:
          "Induction on tree height: if subtrees satisfy heap property and parent dominates both children, entire tree satisfies it. Root is max.",
      },
      whyThisWorks: {
        maintained: "Heap property on all parent-child pairs",
        discarded: "Nothing — structure is in-place",
        whyDiscarded: "N/A",
        discardInvariant: "A[parent(i)] ≥ A[i]",
        progress: "Sift depth decreases toward fixpoint",
        finalState: "Root = max element",
      },
    },
    {
      id: "hp2",
      title: "Level 2 — Top-K with heap",
      problem: "Keep the K largest elements in a stream (see top-k topic).",
      coreInvariant: "\\text{Min-heap of size }K\\text{ holds the }K\\text{ largest seen}",
      whyTrue: "Smallest of the K largest sits at root; anything smaller is rejected.",
      newIdea: "Size-K min-heap for max top-K (dual for min top-K)",
      related: ["Kth Largest Element (215)", "Top K Frequent (347)"],
      complexity: { time: "O(n log k)", space: "O(k)" },
    },
    {
      id: "hp3",
      title: "Level 3 — Merge K sorted",
      problem: "Merge k sorted linked lists into one sorted list.",
      coreInvariant: "Min-heap holds the current head of each non-empty list",
      whyTrue: "Global minimum among remaining elements is always one of those k heads.",
      newIdea: "Heap = multi-way merge frontier",
      related: ["Merge k Sorted Lists (23)"],
      complexity: { time: "O(N log k)", space: "O(k)" },
      transition: {
        previousInvariant: "Single sorted stream",
        newConstraint: "k sorted sources",
        newInvariant: "Heap of k smallest front elements",
        whyNecessary: "Linear scan of k heads each step is O(kN); heap reduces to O(log k) per pop.",
      },
    },
    {
      id: "hp4",
      title: "Level 4 — Two heaps / median",
      problem: "Find median from a data stream.",
      coreInvariant:
        "\\text{maxHeap}_{\\le} \\text{ size diff } \\le 1 \\text{ with } \\text{maxHeap}_{\\le} \\ge \\text{minHeap}_{>}",
      whyTrue: "All lower half in max-heap, upper half in min-heap; tops bracket the median.",
      newIdea: "Dual heap balances two halves",
      related: ["Find Median from Data Stream (295)"],
      complexity: { time: "O(log n) add", space: "O(n)" },
    },
    {
      id: "hp5",
      title: "Level 5 — Heap + greedy / scheduling",
      problem: "Task scheduler, meeting rooms II, reorganize string, Dijkstra PQ.",
      coreInvariant: "Heap orders by next viable time / distance / frequency",
      whyTrue: "Greedy choice is always the most urgent (earliest deadline, smallest dist, highest freq).",
      newIdea: "Heap + greedy invariant on priority",
      related: [
        "Task Scheduler (621)",
        "Meeting Rooms II (253)",
        "Reorganize String (767)",
      ],
      complexity: { time: "O(n log k)", space: "O(k)" },
    },
  ],

  tree: `Heaps
│
├── Fundamental: A[parent] ≥ A[i] ⇒ root = max
├── Insert / extract / heapify
│   └── sift-up / sift-down
├── Top-K (size-k min-heap)
├── Merge k sorted
│   └── k-way merge frontier
├── Two heaps (median)
│   └── balance halves
└── Greedy scheduling + Dijkstra PQ`,

  complexityTable: [
    { problem: "Heap insert/extract", time: "O(log n)", space: "O(1)", mainInvariant: "Parent ≥ children", technique: "Sift" },
    { problem: "Build heap (Floyd)", time: "O(n)", space: "O(1)", mainInvariant: "Bottom-up sift-down", technique: "Heapify" },
    { problem: "Kth largest", time: "O(n log k)", space: "O(k)", mainInvariant: "Size-k min-heap", technique: "Top-K heap" },
    { problem: "Merge k lists", time: "O(N log k)", space: "O(k)", mainInvariant: "k smallest heads", technique: "Min-heap merge" },
    { problem: "Median stream", time: "O(log n)", space: "O(n)", mainInvariant: "Balanced two heaps", technique: "Dual heap" },
    { problem: "Dijkstra", time: "O((V+E) log V)", space: "O(V)", mainInvariant: "Min dist on extract", technique: "Priority queue" },
  ],

  interviewTricks: [
    "Need repeated min/max → heap (or sort once if static).",
    "Top-K streaming → size-K heap (min for K largest, max for K smallest).",
    "K sorted merges → min-heap of k pointers.",
    "Median / two halves → max-heap + min-heap, rebalance sizes.",
    "parent(i)=(i−1)//2, children 2i+1, 2i+2 — say it out loud.",
    "Floyd build is O(n), not O(n log n).",
  ],

  leetcode: [
    { name: "Last Stone Weight", number: 1046, slug: "last-stone-weight", invariant: "Max-heap of stones", prerequisite: "Heap basics", difficulty: "Easy", stage: "foundation" },
    { name: "Kth Largest Element in an Array", number: 215, slug: "kth-largest-element-in-an-array", invariant: "Size-k min-heap", prerequisite: "Top-K", difficulty: "Medium", stage: "foundation" },
    { name: "Merge k Sorted Lists", number: 23, slug: "merge-k-sorted-lists", invariant: "Min-heap of heads", prerequisite: "k-way merge", difficulty: "Hard", stage: "invariant" },
    { name: "Top K Frequent Elements", number: 347, slug: "top-k-frequent-elements", invariant: "Freq heap or bucket", prerequisite: "Top-K", difficulty: "Medium", stage: "invariant" },
    { name: "Find Median from Data Stream", number: 295, slug: "find-median-from-data-stream", invariant: "Two balanced heaps", prerequisite: "Dual heap", difficulty: "Hard", stage: "modification" },
    { name: "Task Scheduler", number: 621, slug: "task-scheduler", invariant: "Max-freq first + cooldown", prerequisite: "Greedy + heap", difficulty: "Medium", stage: "modification" },
    { name: "Meeting Rooms II", number: 253, slug: "meeting-rooms-ii", invariant: "Min-heap of end times", prerequisite: "Interval scheduling", difficulty: "Medium", stage: "modification" },
    { name: "Reorganize String", number: 767, slug: "reorganize-string", invariant: "Max-freq greedy", prerequisite: "Heap greedy", difficulty: "Medium", stage: "combination" },
    { name: "Network Delay Time", number: 743, slug: "network-delay-time", invariant: "Dijkstra min-heap", prerequisite: "Shortest path", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Heap property A[parent] ≥ A[i] on all edges",
    discarded: "Elements not at root during extract (moved to leaf then removed)",
    whyDiscarded: "Root is global max under heap property",
    discardInvariant: "Parent dominates children",
    progress: "Sift depth O(log n); each extract removes one max",
    finalState: "Root always current extremum",
  },
};
