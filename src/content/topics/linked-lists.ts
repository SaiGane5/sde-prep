import type { Topic } from "../types";

export const linkedLists: Topic = {
  id: 5,
  slug: "linked-lists",
  title: "Linked Lists",
  accent: "teal",
  icon: "link",
  shortInvariants: [
    "next (and prev) pointers define order",
    "Dummy head simplifies inserts",
    "Invariants on local rewiring",
  ],
  applications: [
    "Reverse / merge sorted",
    "Remove nth from end",
    "Reorder / partition",
    "LRU cache (list + map)",
  ],
  abstraction: "Explicit pointer graph — local surgery preserves global structure",
  fundamentalIdea:
    "A list is defined by head and local next (optional prev) links. Algorithms prove a loop invariant on a prefix/suffix split, then rewire three pointers at a time. Dummy nodes remove edge cases at the head.",

  levels: [
    {
      id: "ll0",
      title: "Level 0 — Fundamental idea",
      problem:
        "Understand that list algorithms are invariant-driven pointer assignments — draw before/after for each edge change.",
      coreInvariant:
        "\\text{All nodes reachable from head form exactly one path; no orphan cycles unless intended}",
      whyTrue:
        "Each operation preserves reachability: old edges replaced deliberately; lost edges must already be captured elsewhere.",
      newIdea: "Local rewiring with a dummy sentinel",
      related: [],
      complexity: { time: "O(n)", space: "O(1)" },
      whyThisWorks: {
        maintained: "Processed prefix as valid list; remainder unchanged",
        discarded: "Old pointer directions after reassignment",
        whyDiscarded: "They are superseded by the new linkage proof",
        discardInvariant: "Never lose the tail of the unprocessed suffix",
        progress: "Pointer moves along list",
        finalState: "Whole list satisfies goal property",
      },
    },
    {
      id: "ll1",
      title: "Level 1 — Reverse linked list",
      problem: "Reverse a singly linked list in-place.",
      coreInvariant:
        "\\text{rev prefix points backward; } \\text{curr}\\text{ is first node of unreversed suffix}",
      whyTrue:
        "Each step: curr.next → prev, advance prev and curr. Unreversed suffix stays attached at curr.",
      newIdea: "Three pointers: prev, curr, next",
      related: ["Reverse Linked List (206)"],
      complexity: { time: "O(n)", space: "O(1)" },
      proof: {
        invariant: "List prev→…→head_rev is reversed; curr→… is original tail.",
        initialization: "prev = null, curr = head.",
        maintenance: "Save next = curr.next; curr.next = prev; shift prev, curr.",
        progress: "curr advances toward null.",
        termination: "curr = null; prev is new head.",
        finalState: "Fully reversed list.",
        correctness: "Induction: one more node reversed each step without dropping suffix.",
      },
      whyThisWorks: {
        maintained: "Reversed prefix + intact suffix",
        discarded: "Forward edges from reversed prefix",
        whyDiscarded: "Replaced by backward edges",
        discardInvariant: "next saved before overwrite",
        progress: "curr → null",
        finalState: "prev = new head",
      },
    },
    {
      id: "ll2",
      title: "Level 2 — Merge two sorted lists",
      problem: "Merge two ascending linked lists into one sorted list.",
      coreInvariant:
        "\\text{Tail of output links to smaller head of l1/l2; advance that list}",
      whyTrue:
        "Same merge logic as merge sort on arrays — compare fronts, attach min, move pointer.",
      newIdea: "Dummy head + tail pointer",
      related: ["Merge Two Sorted Lists (21)"],
      complexity: { time: "O(n+m)", space: "O(1)" },
      transition: {
        previousInvariant: "Single-list local reverse",
        newConstraint: "Two input streams interleaved by order",
        newInvariant: "Output sorted; each input pointer monotone",
        whyNecessary: "Must choose min of two fronts — tail dummy avoids empty-head cases.",
      },
    },
    {
      id: "ll3",
      title: "Level 3 — Remove nth from end",
      problem: "Remove the nth node from the end in one pass.",
      coreInvariant:
        "\\text{Gap of } n+1 \\text{ between slow and fast after fast leads by } n+1",
      whyTrue:
        "When fast hits null, slow is before the node to delete — one pass with two pointers.",
      newIdea: "Dummy + fast/slow gap (not speed 2 — fixed offset)",
      related: ["Remove Nth Node From End (19)"],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Merge / reverse local",
        newConstraint: "Position from tail, single traversal",
        newInvariant: "Maintain fixed distance n+1",
        whyNecessary: "Count from end without knowing length upfront — offset simulates two passes.",
      },
      proof: {
        invariant: "fast is k nodes ahead of slow ⇒ when fast at null, slow is n+1 from tail.",
        initialization: "Dummy → head; advance fast n+1 steps.",
        maintenance: "slow++, fast++ together.",
        progress: "Both pointers advance; remaining distance to end shrinks.",
        termination: "fast null.",
        finalState: "slow.next removed.",
        correctness: "Gap preserved ⇒ slow is predecessor of target.",
      },
    },
    {
      id: "ll4",
      title: "Level 4 — Partition / reorder / add numbers",
      problem:
        "Partition list around x; add two numbers stored in reverse digit order; copy list with random pointer.",
      coreInvariant:
        "\\text{Two dummy lists for } <x \\text{ and } \\ge x \\text{; digit carry like grade-school add}",
      whyTrue:
        "Partition: append to two tails, concat. Add: reverse digit lists or add with carry from heads.",
      newIdea: "Multi-list dummy technique · arithmetic on lists",
      related: [
        "Partition List (86)",
        "Add Two Numbers (2)",
        "Copy List with Random Pointer (138)",
      ],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Single sorted merge",
        newConstraint: "Stable partition or positional digit math",
        newInvariant: "Separate chains then splice; carry digit ≤ 1 per place",
        whyNecessary: "One pass partition needs two output streams; addition reuses merge pattern with sum/carry.",
      },
    },
    {
      id: "ll5",
      title: "Level 5 — Hard combinations",
      problem:
        "Merge k lists, LRU cache, reverse nodes in k-group, sort list O(n log n).",
      coreInvariant:
        "\\text{Doubly linked + hash for LRU; heap for k-merge; mid split for sort}",
      whyTrue:
        "LRU: map key→node, list order = recency. K-merge: min-heap of heads. Sort: merge sort with fast/slow split.",
      newIdea: "List as order backbone for O(1) splice + external structure",
      related: [
        "Merge k Sorted Lists (23)",
        "LRU Cache (146)",
        "Reverse Nodes in k-Group (25)",
        "Sort List (148)",
      ],
      complexity: { time: "O(n \\log k)", space: "O(k)" },
      transition: {
        previousInvariant: "Linear singly linked tricks",
        newConstraint: "Log-time global order or O(1) eviction",
        newInvariant: "Heap / DLL + map composite structures",
        whyNecessary: "Pure linked list can't binary search — pair with heap or hash for complexity targets.",
      },
      approaches: [
        {
          name: "K-merge",
          invariant: "Heap min of list heads",
          note: "Pop min, push that list's next.",
        },
        {
          name: "LRU",
          invariant: "Map + DLL: get moves to front; evict tail",
          note: "List stores recency; map stores location.",
        },
        {
          name: "K-group reverse",
          invariant: "Count k, reverse block, connect tails",
          note: "Dummy eases head changes between groups.",
        },
      ],
    },
  ],

  tree: `Linked Lists
│
├── Fundamental: local pointer invariants
│
├── Reverse
│   └── prev / curr / next
│
├── Merge two sorted
│   └── dummy tail + compare fronts
│
├── Remove nth from end
│   └── gap n+1 (dummy + two pointers)
│
├── Partition / Add numbers
│   └── dual dummy · carry merge
│
└── K-merge / LRU / k-group / sort
    └── heap · DLL+map · block reverse`,

  complexityTable: [
    {
      problem: "Reverse Linked List",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "Reversed prefix + suffix",
      technique: "Iterative reverse",
    },
    {
      problem: "Merge Two Sorted",
      time: "O(n+m)",
      space: "O(1)",
      mainInvariant: "Min of two fronts",
      technique: "Dummy merge",
    },
    {
      problem: "Remove Nth From End",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "Gap n+1",
      technique: "Two pointers",
    },
    {
      problem: "Add Two Numbers",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "Digit carry",
      technique: "Merge with sum",
    },
    {
      problem: "Merge k Sorted Lists",
      time: "O(N log k)",
      space: "O(k)",
      mainInvariant: "Min heap of heads",
      technique: "Heap",
    },
    {
      problem: "LRU Cache",
      time: "O(1)",
      space: "O(cap)",
      mainInvariant: "DLL order + map",
      technique: "Hash + doubly linked",
    },
    {
      problem: "Sort List",
      time: "O(n log n)",
      space: "O(log n)",
      mainInvariant: "Mid split merge sort",
      technique: "Fast/slow + merge",
    },
  ],

  interviewTricks: [
    "Dummy node before head — almost always worth it.",
    "Draw pointer arrows before and after each assignment.",
    "Remove nth: gap n+1, not fast×2 speed.",
    "Partition → two dummies, concat at end (stable).",
    "Cycle / mid → see Fast & Slow topic; still list-native.",
    "LRU = hash map for lookup + doubly linked list for order.",
    "Recursive reverse is O(n) stack — prefer iterative in interviews unless asked.",
  ],

  leetcode: [
    {
      name: "Reverse Linked List",
      number: 206,
      slug: "reverse-linked-list",
      invariant: "Reversed prefix",
      prerequisite: "Pointer basics",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Merge Two Sorted Lists",
      number: 21,
      slug: "merge-two-sorted-lists",
      invariant: "Compare fronts",
      prerequisite: "Dummy merge",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Linked List Cycle",
      number: 141,
      slug: "linked-list-cycle",
      invariant: "Floyd meet",
      prerequisite: "Fast/slow",
      difficulty: "Easy",
      stage: "invariant",
    },
    {
      name: "Remove Nth Node From End of List",
      number: 19,
      slug: "remove-nth-node-from-end-of-list",
      invariant: "Gap n+1",
      prerequisite: "Dummy + two pointers",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Add Two Numbers",
      number: 2,
      slug: "add-two-numbers",
      invariant: "Carry merge",
      prerequisite: "Merge pattern",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Partition List",
      number: 86,
      slug: "partition-list",
      invariant: "Two chains <x and ≥x",
      prerequisite: "Dual dummy",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Copy List with Random Pointer",
      number: 138,
      slug: "copy-list-with-random-pointer",
      invariant: "Clone + map old→new",
      prerequisite: "Interleave / hash",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Reverse Nodes in k-Group",
      number: 25,
      slug: "reverse-nodes-in-k-group",
      invariant: "Block reverse + connect",
      prerequisite: "Reverse + count",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "Merge k Sorted Lists",
      number: 23,
      slug: "merge-k-sorted-lists",
      invariant: "Heap of heads",
      prerequisite: "Merge two",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "LRU Cache",
      number: 146,
      slug: "lru-cache",
      invariant: "Map + DLL recency",
      prerequisite: "Doubly linked",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Reorder List",
      number: 143,
      slug: "reorder-list",
      invariant: "Mid split + reverse weave",
      prerequisite: "Fast/slow",
      difficulty: "Medium",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Valid linkage on processed region; monotone scan on inputs",
    discarded: "Old edges explicitly replaced",
    whyDiscarded: "Rewiring proof shows no node lost",
    discardInvariant: "Save next before overwrite",
    progress: "Pointers advance along lists",
    finalState: "Global property (sorted, reversed, trimmed)",
  },
};
