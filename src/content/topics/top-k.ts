import type { Topic } from "../types";

export const topK: Topic = {
  id: 10,
  slug: "top-k",
  title: "Top K",
  accent: "green",
  icon: "award",
  shortInvariants: [
    "Candidate set of size K",
    "Reject worse than K-th best",
    "Heap / quickselect / bucket",
  ],
  applications: [
    "Kth largest / smallest",
    "K most frequent",
    "K closest points",
    "Streaming extremal stats",
  ],
  abstraction: "Maintain a threshold — only K best survive",
  fundamentalIdea:
    "You never need the full ranking. Keep a bounded candidate set of size K; anything worse than the K-th best is safely discarded.",

  levels: [
    {
      id: "tk0",
      title: "Level 0 — Fundamental idea",
      problem: "From n items, retain the K best under a total order (or frequency / distance).",
      coreInvariant:
        "\\text{Answer set } S,\\ |S|\\le K,\\ \\forall x\\in S,\\ y\\notin S:\\ \\text{rank}(x)\\le K \\Rightarrow \\text{score}(x)\\ge \\text{score}(y)",
      whyTrue: "Only K slots matter; the K-th threshold separates keep from discard.",
      newIdea: "Threshold thinking beats full sort when K ≪ n",
      related: [],
      complexity: { time: "O(n log K) typical", space: "O(K)" },
      formula: "\\text{discard } y \\text{ if } |S|=K \\text{ and } \\text{score}(y) \\text{ worse than worst in } S",
    },
    {
      id: "tk1",
      title: "Level 1 — Size-K heap",
      problem: "Kth largest element in an array; top K frequent (heap version).",
      coreInvariant:
        "\\text{Min-heap of size }K\\text{ holds the }K\\text{ largest values; root = K-th largest}",
      whyTrue: "If heap full and x ≤ root, x cannot beat all K current members.",
      newIdea: "Min-heap for top-K largest (max-heap for top-K smallest)",
      related: ["Kth Largest Element (215)", "Top K Frequent (347)"],
      complexity: { time: "O(n log k)", space: "O(k)" },
      proof: {
        invariant: "After processing prefix, heap H contains the k largest elements of that prefix (|H| ≤ k).",
        initialization: "Empty heap.",
        maintenance:
          "Push x; if |H| > k, pop min. The popped element is not among the k largest of the prefix.",
        progress: "One element per step.",
        termination: "End of array.",
        finalState: "Root = k-th largest overall (if |H| = k).",
        correctness:
          "Induction: invariant holds; any element smaller than the k-th largest in H is never kept when heap is full.",
      },
      whyThisWorks: {
        maintained: "K largest seen so far",
        discarded: "Elements ≤ current K-th threshold",
        whyDiscarded: "At least k elements strictly better exist in heap",
        discardInvariant: "Root = weakest survivor",
        progress: "Scan index increases",
        finalState: "Heap root or size-k contents",
      },
    },
    {
      id: "tk2",
      title: "Level 2 — Quickselect",
      problem: "Kth largest in O(n) average without maintaining full heap.",
      coreInvariant:
        "\\text{Pivot partition: } \\text{rank}(p)=q \\Rightarrow \\text{answer in known side}",
      whyTrue: "Partition places pivot at its sorted rank; recurse only on the side containing k.",
      newIdea: "Partition = partial sort; discard entire half",
      related: ["Kth Largest Element (215)"],
      complexity: { time: "O(n) avg, O(n²) worst", space: "O(1)" },
      formula: "E[\\text{recursion}] = n + n/2 + n/4 + \\cdots = O(n)",
    },
    {
      id: "tk3",
      title: "Level 3 — Bucket / counting",
      problem: "Top K frequent elements when frequencies bounded.",
      coreInvariant: "Bucket[i] = elements with frequency i; scan buckets high → low",
      whyTrue: "Frequency range is small ⇒ O(n) bucket fill + O(F) scan, F = max freq.",
      newIdea: "Index by score when universe is bounded",
      related: ["Top K Frequent Elements (347)", "Sort Characters By Frequency (451)"],
      complexity: { time: "O(n + F)", space: "O(n)" },
      transition: {
        previousInvariant: "Comparison-based heap",
        newConstraint: "Integer frequencies / small range",
        newInvariant: "Direct bucket by frequency",
        whyNecessary: "Avoid log factor when keys map to array indices.",
      },
    },
    {
      id: "tk4",
      title: "Level 4 — K closest / K pairs",
      problem: "K closest points to origin; find K pairs with smallest sums.",
      coreInvariant: "Heap or two-pointer on sorted structure trims to K best",
      whyTrue: "Distance / sum order lets you stop after K extractions or bound search.",
      newIdea: "Geometry + priority queue for multi-candidate expansion",
      related: ["K Closest Points to Origin (973)", "Find K Pairs with Smallest Sums (373)"],
      complexity: { time: "O(n log k) or O(k log k)", space: "O(k)" },
    },
    {
      id: "tk5",
      title: "Level 5 — Stream & combine",
      problem: "Top K in sliding window, merge K sorted streams, multi-criteria top K.",
      coreInvariant: "Deque mono + heap for window; heap merge for streams",
      whyTrue: "Window evicts expired indices; merge heap always picks global min among fronts.",
      newIdea: "Top-K + monotonic deque / multi-way merge",
      related: ["Sliding Window Maximum (239)", "Merge k Sorted Lists (23)"],
      complexity: { time: "O(n log k)", space: "O(k)" },
    },
  ],

  tree: `Top K
│
├── Fundamental: K-slot threshold
├── Size-K heap
│   └── min-heap for K largest
├── Quickselect
│   └── partition discard half
├── Bucket / counting
│   └── bounded frequency
├── K closest / K pairs
│   └── heap on distance / sum
└── Stream + window + merge
    └── deque + k-way heap`,

  complexityTable: [
    { problem: "Kth largest (heap)", time: "O(n log k)", space: "O(k)", mainInvariant: "Size-k min-heap", technique: "Heap" },
    { problem: "Kth largest (quickselect)", time: "O(n) avg", space: "O(1)", mainInvariant: "Pivot rank", technique: "Quickselect" },
    { problem: "Top K frequent (bucket)", time: "O(n)", space: "O(n)", mainInvariant: "Freq buckets", technique: "Counting" },
    { problem: "K closest points", time: "O(n log k)", space: "O(k)", mainInvariant: "Max-heap size k", technique: "Heap" },
    { problem: "Sliding window max", time: "O(n)", space: "O(k)", mainInvariant: "Mono deque + evict", technique: "Deque" },
  ],

  interviewTricks: [
    "K largest → size-K min-heap; K smallest → size-K max-heap.",
    "One-off k-th → quickselect if O(n) average OK.",
    "Frequency top-K → buckets when freq ≤ n.",
    "K ≪ n → never full sort O(n log n) unless simpler.",
    "Clarify: k-th vs top-k distinct vs ties.",
    "Closest / pairs → heap of candidates; lazy expand neighbors.",
  ],

  leetcode: [
    { name: "Kth Largest Element in an Array", number: 215, slug: "kth-largest-element-in-an-array", invariant: "Size-k heap or quickselect", prerequisite: "Partition / heap", difficulty: "Medium", stage: "foundation" },
    { name: "Top K Frequent Elements", number: 347, slug: "top-k-frequent-elements", invariant: "Heap or freq buckets", prerequisite: "Top-K", difficulty: "Medium", stage: "foundation" },
    { name: "Kth Smallest Element in a Sorted Matrix", number: 378, slug: "kth-smallest-element-in-a-sorted-matrix", invariant: "Binary search on value + count", prerequisite: "Search + count", difficulty: "Medium", stage: "invariant" },
    { name: "Sort Characters By Frequency", number: 451, slug: "sort-characters-by-frequency", invariant: "Bucket by frequency", prerequisite: "Counting", difficulty: "Medium", stage: "invariant" },
    { name: "K Closest Points to Origin", number: 973, slug: "k-closest-points-to-origin", invariant: "Size-k max-heap by dist²", prerequisite: "Heap", difficulty: "Medium", stage: "modification" },
    { name: "Find K Pairs with Smallest Sums", number: 373, slug: "find-k-pairs-with-smallest-sums", invariant: "Min-heap of pair sums", prerequisite: "Heap expansion", difficulty: "Medium", stage: "modification" },
    { name: "Sliding Window Maximum", number: 239, slug: "sliding-window-maximum", invariant: "Mono deque top-K window", prerequisite: "Deque", difficulty: "Hard", stage: "combination" },
    { name: "Merge k Sorted Lists", number: 23, slug: "merge-k-sorted-lists", invariant: "Heap of k heads", prerequisite: "k-way merge", difficulty: "Hard", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Set of at most K best candidates + explicit threshold",
    discarded: "Elements worse than current K-th survivor",
    whyDiscarded: "K better elements already known",
    discardInvariant: "Heap root or partition side",
    progress: "Each item processed once; heap size ≤ K",
    finalState: "K elements or k-th statistic identified",
  },
};
