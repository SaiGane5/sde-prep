import type { Topic } from "../types";

export const search: Topic = {
  id: 18,
  slug: "search",
  title: "Search",
  accent: "orange",
  icon: "network",
  shortInvariants: [
    "BFS: frontier = next layer",
    "DFS: explored / on-stack discipline",
    "BST inorder → sorted order",
  ],
  applications: [
    "Shortest path unweighted",
    "Connected components",
    "Topological order",
    "BST search & kth smallest",
  ],
  abstraction: "Systematic exploration with explicit visited/frontier invariants",
  fundamentalIdea:
    "BFS: the queue holds exactly the frontier — nodes at distance d waiting to expand; distance increases by layer. DFS: mark explored when finished (or on-stack for cycles) so each state is expanded once. BST inorder visits keys in sorted order — that is the invariant that replaces linear scan.",

  levels: [
    {
      id: "sr0",
      title: "Level 0 — Fundamental idea",
      problem: "Graph/tree traversal: when BFS vs DFS?",
      coreInvariant:
        "\\text{BFS queue} = \\{v : d(v)=d_{\\text{cur}}+1 \\text{ pending}\\}.\\quad \\text{DFS: backtrack restores path}",
      whyTrue:
        "Unweighted shortest path = first time BFS dequeues node. DFS explores deep first — stack/recursion; path valid until unwind.",
      newIdea: "Frontier (BFS) vs depth path (DFS)",
      related: [],
      complexity: { time: "O(V+E)", space: "O(V)" },
    },
    {
      id: "sr1",
      title: "Level 1 — BFS layers",
      problem: "Shortest path in grid; rotting oranges; word ladder.",
      coreInvariant:
        "\\text{Queue contains all nodes at current BFS distance}",
      whyTrue:
        "Enqueue neighbors not yet seen; process entire level before distance++. First visit = minimum edges.",
      newIdea: "visited on enqueue (or dequeue) — never re-expand",
      related: [
        "Shortest Path in Binary Matrix (1091)",
        "Rotting Oranges (994)",
        "Word Ladder (127)",
      ],
      complexity: { time: "O(V+E)", space: "O(V)" },
      proof: {
        invariant: "When processing level L, all nodes at distance L are in queue; none at >L processed.",
        initialization: "Source enqueued, dist=0.",
        maintenance: "Only unvisited neighbors enqueued; each vertex once.",
        progress: "Queue shrinks per finite graph.",
        termination: "Queue empty or target dequeued.",
        finalState: "First dequeue of target = shortest distance.",
        correctness: "BFS layers are non-decreasing distance; first hit is minimal.",
      },
      whyThisWorks: {
        maintained: "Frontier = exact next distance layer",
        discarded: "Already visited nodes",
        whyDiscarded: "Revisit cannot shorten unweighted path",
        discardInvariant: "First visit distance is minimal",
        progress: "Level count or queue size toward empty",
        finalState: "Shortest path length or −1",
      },
    },
    {
      id: "sr2",
      title: "Level 2 — DFS explored set",
      problem: "Number of islands; flood fill; path existence.",
      coreInvariant:
        "\\text{visited}(v) \\text{ after processing } v \\text{ — each cell once}",
      whyTrue:
        "Mark on entry (grid) or exit (graph cycle detection). Undo only when path must be reused (backtracking), not for component counting.",
      newIdea: "Component = one DFS seed covers all reachable unvisited",
      related: [
        "Number of Islands (200)",
        "Flood Fill (733)",
        "Clone Graph (133)",
      ],
      complexity: { time: "O(V+E)", space: "O(V)" },
      transition: {
        previousInvariant: "BFS shortest layer",
        newConstraint: "Count components / mutate grid",
        newInvariant: "DFS marks entire component per start",
        whyNecessary: "No shortest-path requirement — depth-first stack suffices; mark permanent.",
      },
    },
    {
      id: "sr3",
      title: "Level 3 — BST search & inorder",
      problem: "Search BST; validate BST; kth smallest; range sum.",
      coreInvariant:
        "\\text{Inorder traversal yields strictly increasing keys (valid BST)}",
      whyTrue:
        "Left < root < right recursively ⇒ inorder sorted. Search: go left if target < root else right — O(h). Kth: inorder count.",
      newIdea: "BST = sorted order embedded in tree shape",
      related: [
        "Search in a Binary Search Tree (700)",
        "Validate Binary Search Tree (98)",
        "Kth Smallest Element in a BST (230)",
      ],
      complexity: { time: "O(h) search / O(n) inorder", space: "O(h)" },
      formula:
        "\\text{valid}(node) \\iff max(left) < node.val < min(right)",
    },
    {
      id: "sr4",
      title: "Level 4 — Topological sort & cycle detect",
      problem: "Course schedule; alien dictionary; rebuild order.",
      coreInvariant:
        "\\text{DFS finish time descending = topological order; back-edge ⇒ cycle}",
      whyTrue:
        "On stack set detects back-edge (cycle). Kahn BFS: queue indegree 0; if count < n, cycle.",
      newIdea: "Directed acyclic ⇒ linear extension of partial order",
      related: [
        "Course Schedule (207)",
        "Course Schedule II (210)",
        "Alien Dictionary (269)",
      ],
      complexity: { time: "O(V+E)", space: "O(V)" },
      approaches: [
        { name: "Kahn BFS", invariant: "Queue = nodes with indegree 0", note: "Process layer peels DAG." },
        { name: "DFS postorder", invariant: "Push on finish; reverse = topo", note: "Gray/black for cycle." },
      ],
    },
    {
      id: "sr5",
      title: "Level 5 — Multi-source BFS & bidirectional",
      problem: "01 BFS; walls and gates; word ladder II; nearest exit.",
      coreInvariant:
        "\\text{Deque: weight-0 front, weight-1 back; or two BFS fronts meet}",
      whyTrue:
        "0-1 BFS: first pop minimizes dist because 0 edges preserve layer. Bidirectional: expand smaller frontier — meeting halves diameter.",
      newIdea: "BFS generalizes to weighted 0/1 and two-front meet",
      related: [
        "01 Matrix (542)",
        "Walls and Gates (286)",
        "Word Ladder II (126)",
      ],
      complexity: { time: "O(V+E)", space: "O(V)" },
      transition: {
        previousInvariant: "Unit edge BFS",
        newConstraint: "0/1 weights or minimize meeting point",
        newInvariant: "Deque discipline or two visited maps",
        whyNecessary: "Standard queue fails when edges have two costs; bidirectional cuts search space.",
      },
    },
  ],

  tree: `Search
│
├── BFS frontier
│   └── shortest unweighted; multi-source
├── DFS explored
│   └── components; flood fill
├── BST inorder
│   └── sorted; search O(h)
├── Topological
│   └── Kahn / DFS finish
└── 0-1 BFS / bidirectional
    └── deque / two fronts`,

  complexityTable: [
    { problem: "Number of Islands", time: "O(mn)", space: "O(mn)", mainInvariant: "DFS marks component", technique: "Grid DFS" },
    { problem: "Rotting Oranges", time: "O(mn)", space: "O(mn)", mainInvariant: "Multi-source BFS layers", technique: "BFS" },
    { problem: "Word Ladder", time: "O(n·L²)", space: "O(n)", mainInvariant: "BFS on word graph", technique: "BFS" },
    { problem: "Validate BST", time: "O(n)", space: "O(h)", mainInvariant: "Inorder increasing", technique: "DFS bounds" },
    { problem: "Course Schedule", time: "O(V+E)", space: "O(V)", mainInvariant: "Indegree 0 queue", technique: "Kahn" },
    { problem: "01 Matrix", time: "O(mn)", space: "O(mn)", mainInvariant: "0-edge deque front", technique: "0-1 BFS" },
  ],

  interviewTricks: [
    "Unweighted shortest path → BFS, not DFS.",
    "Mark visited on enqueue to avoid duplicate queue entries.",
    "Grid neighbors: 4 vs 8 dir; bounds check.",
    "BST → think inorder sorted; pass (min,max) bounds on DFS.",
    "DAG order → Kahn or DFS postorder reverse.",
    "Many sources → enqueue all sources at dist 0.",
    "State = (cell, mask) → BFS on expanded graph.",
  ],

  leetcode: [
    { name: "Binary Tree Level Order Traversal", number: 102, slug: "binary-tree-level-order-traversal", invariant: "Queue = one level", prerequisite: "BFS layers", difficulty: "Medium", stage: "foundation" },
    { name: "Search in a Binary Search Tree", number: 700, slug: "search-in-a-binary-search-tree", invariant: "Compare root; go left/right", prerequisite: "BST property", difficulty: "Easy", stage: "foundation" },
    { name: "Number of Islands", number: 200, slug: "number-of-islands", invariant: "DFS floods component", prerequisite: "visited grid", difficulty: "Medium", stage: "invariant" },
    { name: "Validate Binary Search Tree", number: 98, slug: "validate-binary-search-tree", invariant: "Inorder / (min,max)", prerequisite: "BST", difficulty: "Medium", stage: "invariant" },
    { name: "Rotting Oranges", number: 994, slug: "rotting-oranges", invariant: "Multi-source BFS time", prerequisite: "BFS layers", difficulty: "Medium", stage: "modification" },
    { name: "Kth Smallest Element in a BST", number: 230, slug: "kth-smallest-element-in-a-bst", invariant: "Inorder count k", prerequisite: "Inorder", difficulty: "Medium", stage: "modification" },
    { name: "Course Schedule", number: 207, slug: "course-schedule", invariant: "Topo exists ⟺ no cycle", prerequisite: "Kahn/DFS", difficulty: "Medium", stage: "modification" },
    { name: "Word Ladder", number: 127, slug: "word-ladder", invariant: "BFS shortest transforms", prerequisite: "BFS", difficulty: "Hard", stage: "combination" },
    { name: "01 Matrix", number: 542, slug: "01-matrix", invariant: "0-1 BFS deque", prerequisite: "Multi-source", difficulty: "Medium", stage: "combination" },
    { name: "Course Schedule II", number: 210, slug: "course-schedule-ii", invariant: "Topo ordering output", prerequisite: "Course Schedule", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "BFS frontier at fixed distance; DFS complete exploration per policy",
    discarded: "Visited states cannot improve first-found BFS distance",
    whyDiscarded: "Unweighted edges: longer revisit paths are not shorter",
    discardInvariant: "First visit (BFS) or finished mark (DFS count)",
    progress: "Queue/stack empties over finite state space",
    finalState: "Shortest dist, full count, or sorted BST walk",
  },
};
