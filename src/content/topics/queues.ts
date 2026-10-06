import type { Topic } from "../types";

export const queues: Topic = {
  id: 7,
  slug: "queues",
  title: "Queues",
  accent: "yellow",
  icon: "list-ordered",
  shortInvariants: [
    "FIFO order",
    "Front = oldest pending",
    "BFS layers expand by depth",
  ],
  applications: [
    "BFS shortest path",
    "Level-order traversal",
    "Task scheduling",
    "Monotonic deque window max",
  ],
  abstraction: "Time-ordered processing — first arrived, first served",
  fundamentalIdea:
    "A queue holds work in arrival order. Dequeue from the front processes the oldest item. BFS is queue + visited: nodes enter when discovered and leave when expanded — layer by layer for unweighted shortest paths.",

  levels: [
    {
      id: "q0",
      title: "Level 0 — Fundamental idea",
      problem:
        "Queue operations: enqueue back, dequeue front. FIFO is the invariant that matches fair scheduling and breadth-first exploration.",
      coreInvariant:
        "\\text{If } a \\text{ enqueued before } b \\text{, then } a \\text{ dequeues before } b",
      whyTrue:
        "Single-ended insert + single-ended remove enforces total order of service.",
      newIdea: "FIFO vs LIFO (stack) — choose by problem geometry",
      related: [],
      complexity: { time: "O(1)", space: "O(n)" },
      whyThisWorks: {
        maintained: "Pending items in discovery/time order",
        discarded: "Dequeued items (marked visited or processed)",
        whyDiscarded: "BFS: once expanded at shortest depth, re-expansion is redundant",
        discardInvariant: "Visited set when graphs have cycles",
        progress: "Queue size drains as graph is explored",
        finalState: "All reachable states processed in BFS order",
      },
    },
    {
      id: "q1",
      title: "Level 1 — BFS on graphs / trees",
      problem:
        "Shortest path in unweighted graph; binary tree level-order traversal.",
      coreInvariant:
        "\\text{Queue holds frontier of nodes at current BFS depth}",
      whyTrue:
        "All nodes at distance d enqueued before any at d+1 — first dequeue of target gives shortest path.",
      newIdea: "Queue + visited / level size for layers",
      related: ["Binary Tree Level Order Traversal (102)", "Number of Islands (200)"],
      complexity: { time: "O(V+E)", space: "O(V)" },
      proof: {
        invariant: "When node u is dequeued, dist[u] is minimum possible.",
        initialization: "Enqueue source with dist 0.",
        maintenance:
          "Dequeue u; for each unvisited neighbor v, set dist[v]=dist[u]+1, enqueue v.",
        progress: "Each vertex enqueued at most once.",
        termination: "Queue empty.",
        finalState: "Shortest distances on unweighted graph.",
        correctness:
          "Induction on layers: all distance-d nodes processed before d+1 — no shorter path exists.",
      },
      whyThisWorks: {
        maintained: "Non-decreasing distance layers",
        discarded: "Nodes already visited with shorter depth",
        whyDiscarded: "Unweighted edges ⇒ first visit is shortest",
        discardInvariant: "visited[v] on first enqueue",
        progress: "Each vertex/edge O(1) amortized",
        finalState: "BFS tree / level lists",
      },
    },
    {
      id: "q2",
      title: "Level 2 — Deque / monotonic queue",
      problem:
        "Sliding window maximum; BFS with 0-1 weights (deque for 0-cost front).",
      coreInvariant:
        "\\text{Deque stores useful candidates in decreasing order (window max)}",
      whyTrue:
        "Smaller values behind a larger value never become max before the larger expires — pop back.",
      newIdea: "Queue generalization — push/pop both ends",
      related: ["Sliding Window Maximum (239)", "Shortest Path in Binary Matrix (1091)"],
      complexity: { time: "O(n)", space: "O(k)" },
      transition: {
        previousInvariant: "Plain FIFO BFS",
        newConstraint: "Need max in window or 0-weight priority",
        newInvariant: "Monotonic deque of indices / 0-1 BFS deque",
        whyNecessary:
          "FIFO alone drops dominance information; deque keeps only non-dominated candidates.",
      },
    },
    {
      id: "q3",
      title: "Level 3 — Scheduling with queues",
      problem:
        "Task Scheduler — minimum idle intervals with cooldown n; design circular queue.",
      coreInvariant:
        "\\text{Ready tasks in max-heap; cooldown queue holds (task, availableTime)}",
      whyTrue:
        "Always run highest remaining count; after run, re-enter cooldown FIFO until time + n.",
      newIdea: "Queue of delayed work + heap of ready work",
      related: ["Task Scheduler (621)", "Design Circular Queue (622)"],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Graph BFS",
        newConstraint: "Time-based reactivation of tasks",
        newInvariant: "Cooldown FIFO paired with greedy max-count",
        whyNecessary: "Tasks return to eligibility in time order — queue tracks future ready events.",
      },
    },
    {
      id: "q4",
      title: "Level 4 — Multi-source BFS / grid",
      problem:
        "Rotting oranges; walls and gates; shortest bridge between islands.",
      coreInvariant:
        "\\text{Enqueue all sources at t=0; BFS expands uniformly}",
      whyTrue:
        "Multi-source BFS is one BFS with super-source — same layer invariant.",
      newIdea: "Initialize queue with entire frontier (multiple seeds)",
      related: ["Rotting Oranges (994)", "01 Matrix (542)"],
      complexity: { time: "O(mn)", space: "O(mn)" },
      transition: {
        previousInvariant: "Single-source BFS",
        newConstraint: "Many sources, min time to nearest",
        newInvariant: "Simultaneous wave from all sources",
        whyNecessary: "Distance to nearest rotten/orange/gate is multi-source, not repeated single BFS.",
      },
      proof: {
        invariant: "Cell distance when first dequeued equals min steps from any source.",
        initialization: "All sources enqueued with dist 0.",
        maintenance: "Standard 4-neighbor BFS; skip if already has smaller dist.",
        progress: "Each cell enqueued once.",
        termination: "Queue empty.",
        finalState: "Min distance field.",
        correctness: "First layer reaching cell is shortest among all sources.",
      },
    },
    {
      id: "q5",
      title: "Level 5 — Hard combinations",
      problem:
        "Word ladder; open the lock; shortest path with constraints; serialize tree level-order.",
      coreInvariant:
        "\\text{State = node + constraint; BFS on implicit graph}",
      whyTrue:
        "Each transformation is an edge; queue explores states in increasing step count.",
      newIdea: "BFS on state space · queue as level serializer",
      related: [
        "Word Ladder (127)",
        "Open the Lock (752)",
        "Serialize and Deserialize Binary Tree (297)",
      ],
      complexity: { time: "O(states · degree)", space: "O(states)" },
      transition: {
        previousInvariant: "Grid/graph with explicit nodes",
        newConstraint: "Implicit states (strings, combinations)",
        newInvariant: "Visited on full state key",
        whyNecessary: "Branching factor × depth explodes — BFS guarantees minimum steps when edges unweighted.",
      },
      approaches: [
        {
          name: "Word ladder",
          invariant: "Queue of words; 26 edits per char",
          note: "Bidirectional BFS halves depth.",
        },
        {
          name: "Open lock",
          invariant: "4-wheel BFS with deadends set",
          note: "0000 start; 10 moves per state.",
        },
      ],
    },
  ],

  tree: `Queues
│
├── Fundamental: FIFO
│
├── BFS tree/graph
│   └── frontier = current depth
│
├── Monotonic deque
│   └── window max / 0-1 BFS
│
├── Task scheduler
│   └── cooldown queue + max-heap
│
├── Multi-source BFS
│   └── super-source on grid
│
└── Implicit state BFS
    └── word ladder / lock`,

  complexityTable: [
    {
      problem: "Level Order Traversal",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "FIFO by depth",
      technique: "BFS + level size",
    },
    {
      problem: "Number of Islands",
      time: "O(mn)",
      space: "O(mn)",
      mainInvariant: "Grid BFS flood",
      technique: "Queue BFS",
    },
    {
      problem: "Sliding Window Maximum",
      time: "O(n)",
      space: "O(k)",
      mainInvariant: "Monotonic deque",
      technique: "Deque",
    },
    {
      problem: "Task Scheduler",
      time: "O(n)",
      space: "O(26)",
      mainInvariant: "Cooldown FIFO",
      technique: "Heap + queue",
    },
    {
      problem: "01 Matrix",
      time: "O(mn)",
      space: "O(mn)",
      mainInvariant: "Multi-source BFS",
      technique: "Grid BFS",
    },
    {
      problem: "Word Ladder",
      time: "O(N·L²)",
      space: "O(N)",
      mainInvariant: "Shortest edit path",
      technique: "BFS states",
    },
  ],

  interviewTricks: [
    "Unweighted shortest path → BFS, not DFS.",
    "Level order → queue + record size per layer.",
    "Multi-source min distance → enqueue all sources first.",
    "Window max in O(n) → deque, not heap.",
    "Task cooldown → queue of (task, readyTime) + max-heap of ready counts.",
    "Bidirectional BFS when target known — two queues meet in middle.",
    "Circular queue design: modulo capacity with front/rear indices.",
  ],

  leetcode: [
    {
      name: "Binary Tree Level Order Traversal",
      number: 102,
      slug: "binary-tree-level-order-traversal",
      invariant: "FIFO by depth",
      prerequisite: "Queue BFS",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Number of Islands",
      number: 200,
      slug: "number-of-islands",
      invariant: "Flood BFS/DFS",
      prerequisite: "Grid traversal",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Design Circular Queue",
      number: 622,
      slug: "design-circular-queue",
      invariant: "Modulo ring buffer",
      prerequisite: "FIFO array",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Rotting Oranges",
      number: 994,
      slug: "rotting-oranges",
      invariant: "Multi-source BFS time",
      prerequisite: "Grid BFS",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "01 Matrix",
      number: 542,
      slug: "01-matrix",
      invariant: "Multi-source dist to 0",
      prerequisite: "Multi-source BFS",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Task Scheduler",
      number: 621,
      slug: "task-scheduler",
      invariant: "Cooldown queue",
      prerequisite: "Heap + queue",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Sliding Window Maximum",
      number: 239,
      slug: "sliding-window-maximum",
      invariant: "Monotonic deque",
      prerequisite: "Deque",
      difficulty: "Hard",
      stage: "modification",
    },
    {
      name: "Word Ladder",
      number: 127,
      slug: "word-ladder",
      invariant: "BFS on words",
      prerequisite: "State BFS",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "Open the Lock",
      number: 752,
      slug: "open-the-lock",
      invariant: "4-wheel BFS",
      prerequisite: "Implicit graph",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Perfect Squares",
      number: 279,
      slug: "perfect-squares",
      invariant: "BFS on sum states",
      prerequisite: "Unweighted shortest",
      difficulty: "Medium",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "FIFO order of pending work / BFS frontier",
    discarded: "Processed nodes with optimal depth recorded",
    whyDiscarded: "Unweighted BFS — first visit is shortest",
    discardInvariant: "visited on enqueue",
    progress: "Queue drains; each state once",
    finalState: "Shortest layers / schedule / distances",
  },
};
