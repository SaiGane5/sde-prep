import type { Topic } from "../types";

export const graphs: Topic = {
  id: 21,
  slug: "graphs",
  title: "Graphs",
  accent: "blue",
  icon: "share-2",
  shortInvariants: [
    "Visited marks finished exploration",
    "BFS: dist = layer depth",
    "Relaxation improves shortest estimates",
  ],
  applications: [
    "Reachability & components",
    "Shortest paths",
    "Scheduling (topo)",
    "MST & connectivity",
  ],
  abstraction: "Vertices + relations; search propagates invariants along edges",
  fundamentalIdea:
    "A graph is a set of states and moves. Every algorithm maintains a partition: unknown / frontier / settled — and only moves vertices across when a local rule proves it safe.",

  levels: [
    {
      id: "g0",
      title: "Level 0 — Fundamental idea",
      problem:
        "Represent G = (V, E); traverse neighbors; detect cycles in undirected vs directed graphs.",
      coreInvariant:
        "\\text{Adj}[v] \\text{ lists exactly the neighbors of } v",
      whyTrue:
        "Lists or matrices encode the same relation; traversal is defined by following edges from the frontier.",
      newIdea: "Graph = implicit state machine; edge = transition",
      related: [],
      complexity: { time: "O(V+E) scan", space: "O(V+E)" },
      formula:
        "|E| \\text{ undirected counts each edge once in adjacency if stored twice}",
    },
    {
      id: "g1",
      title: "Level 1 — BFS & DFS",
      problem:
        "Reach all nodes from s; shortest steps in unweighted graph; detect cycle; count islands.",
      coreInvariant:
        "\\text{BFS: } \\text{dist}[v]=\\text{dist}[u]+1 \\text{ on tree edges; DFS: back edge } \\Rightarrow \\text{ cycle}",
      whyTrue:
        "BFS expands by non-decreasing distance — first visit is shortest in unweighted graphs. DFS: an edge to an ancestor in the recursion stack is a back edge.",
      newIdea: "Queue = uniform-cost frontier; stack/recursion = depth-first probe",
      related: ["Number of Islands (200)", "Rotting Oranges (994)"],
      complexity: { time: "O(V+E)", space: "O(V)" },
      proof: {
        invariant:
          "After BFS processes layer d, every vertex at graph distance ≤ d is visited with correct dist.",
        initialization: "Queue {s}, dist[s]=0, visited={s}.",
        maintenance:
          "Dequeue u, enqueue unvisited neighbors v with dist[v]=dist[u]+1. Only first enqueue sets dist.",
        progress: "Each vertex enqueued at most once.",
        termination: "Queue empty ⇒ all reachable vertices settled.",
        finalState: "dist[v] = shortest unweighted path length from s.",
        correctness:
          "Induction on layers: all vertices at distance d are dequeued before any at d+1, so first visit cannot be via a longer path.",
      },
      whyThisWorks: {
        maintained: "Visited set + distance / DFS colors (white/gray/black)",
        discarded: "Vertices already settled with correct dist (BFS) or fully explored subtree (DFS)",
        whyDiscarded: "Re-visiting cannot shorten unweighted distance or add new DFS info",
        discardInvariant: "First visit in BFS is optimal in unweighted graphs",
        progress: "|visited| increases each step",
        finalState: "All reachable vertices classified",
      },
    },
    {
      id: "g2",
      title: "Level 2 — Bipartite & DAG / topological sort",
      problem:
        "2-color a graph; detect odd cycle; order DAG vertices; course prerequisites.",
      coreInvariant:
        "G \\text{ bipartite } \\iff G \\text{ has no odd cycle } \\iff \\text{ 2-coloring exists}",
      whyTrue:
        "Along any cycle, colors must alternate ⇒ even length. Conversely, BFS/DFS 2-coloring assigns opposite colors on tree edges; conflict on a non-tree edge ⇒ odd cycle.",
      newIdea: "Coloring invariant = parity along paths; DAG ⇒ no back edges in topo order",
      related: [
        "Is Graph Bipartite? (785)",
        "Course Schedule (207)",
        "Course Schedule II (210)",
      ],
      complexity: { time: "O(V+E)", space: "O(V)" },
      formula:
        "\\text{DAG } \\Rightarrow \\text{ topo order } v_1,\\ldots,v_n \\text{ with edges } v_i \\to v_j \\Rightarrow i<j",
      transition: {
        previousInvariant: "Visited / distance",
        newConstraint: "Global parity or acyclic direction",
        newInvariant: "color[v] ∈ {0,1} and color[u]≠color[v] on edges; or inDegree→0 queue for DAG",
        whyNecessary:
          "Reachability ignores edge direction semantics. Bipartite and scheduling need stronger edge constraints.",
      },
      proof: {
        invariant:
          "If 2-coloring exists, every cycle has even length (colors alternate ⇒ return to start requires even steps).",
        initialization:
          "For coloring: assign color 0 to start component. For topo: inDegree counts, queue nodes with inDegree 0.",
        maintenance:
          "Coloring: on edge u—v, if v uncolored set opposite; if same color ⇒ odd cycle closed on that path + edge. Topo: pop u, reduce inDegree of successors; push when 0.",
        progress: "Vertices colored or removed from DAG.",
        termination: "All components processed or conflict found.",
        finalState:
          "Valid 2-coloring ⟺ no odd cycle; topo list length V ⟺ DAG (else cycle).",
        correctness:
          "Odd cycle ⟹ no 2-coloring (parity contradiction). No odd cycle ⟹ BFS 2-coloring succeeds. Kahn: each edge u→v counted once when u removed ⇒ v before successors in order.",
      },
      whyThisWorks: {
        maintained: "Consistent parity / decreasing inDegree on remaining DAG",
        discarded: "Vertices already colored or placed in topo order",
        whyDiscarded: "Their edges are already satisfied toward the invariant",
        discardInvariant: "No odd cycle / no directed cycle",
        progress: "More vertices fixed in order or color",
        finalState: "Full coloring or full topo or proved impossibility",
      },
    },
    {
      id: "g3",
      title: "Level 3 — Shortest paths (Dijkstra, Bellman–Ford, Floyd)",
      problem:
        "Non-negative weights: single-source shortest. Negative edges: detect negative cycle. All-pairs small V.",
      coreInvariant:
        "\\text{Dijkstra: on extract, } dist[u] \\text{ is final; relax } dist[v] \\leftarrow \\min(dist[v], dist[u]+w)",
      whyTrue:
        "Non-negative weights ⇒ unsettled vertices have dist ≥ settled; min-heap extract is truly minimal. Bellman–Ford: V−1 rounds suffice if no negative cycle (simple path ≤ V−1 edges).",
      newIdea: "Relaxation = safe improvement; Dijkstra = greedy settlement; −∞ propagation = negative cycle",
      related: [
        "Network Delay Time (743)",
        "Cheapest Flights Within K Stops (787)",
        "Find the City With the Smallest Number of Neighbors at a Threshold Distance (1334)",
      ],
      complexity: {
        time: "O((V+E)\\log V) / O(VE) / O(V³)",
        space: "O(V) / O(V) / O(V²)",
      },
      formula:
        "dist[v] \\le dist[u]+w(u,v) \\text{ at optimality; BF: } dist^{(k)} \\text{ = best with } \\le k \\text{ edges}",
      transition: {
        previousInvariant: "Unit-length BFS layers",
        newConstraint: "Weighted edges; possibly negative",
        newInvariant: "dist[] upper bounds that only decrease via relaxation",
        whyNecessary: "Layer BFS fails when edge weights differ.",
      },
      approaches: [
        {
          name: "Dijkstra (min-heap)",
          invariant: "Extract-min u has final dist if w ≥ 0",
          note: "Stale heap entries skipped when dist[v] already better.",
        },
        {
          name: "Bellman–Ford",
          invariant: "After i rounds, best path using ≤ i edges",
          note: "Round V: if any relax, negative cycle reachable.",
        },
        {
          name: "Floyd–Warshall",
          invariant: "dp[k][i][j] = path using vertices {1..k}",
          note: "Allow k as intermediate; O(V³) all-pairs.",
        },
      ],
      proof: {
        invariant:
          "Dijkstra: set S of settled nodes; for u next extracted, ∀v∉S, dist[u] ≤ dist[v] (non-neg weights).",
        initialization: "dist[s]=0, others ∞.",
        maintenance:
          "Extract u, relax neighbors. Any shorter path to u would go through unsettled w with dist[w]+… < dist[u], contradicting minimality of extract.",
        progress: "|S| increases.",
        termination: "All reachable settled.",
        finalState: "dist = true shortest path lengths (w ≥ 0).",
        correctness:
          "Standard cut argument: shortest path to u cannot leave S and re-enter cheaper.",
      },
    },
    {
      id: "g4",
      title: "Level 4 — Bridges & strongly connected components",
      problem:
        "Find bridge edges; find SCCs; critical connections in network.",
      coreInvariant:
        "\\text{Bridge } (u,v) \\iff \\text{ no back edge from subtree of } v \\text{ to ancestor of } u",
      whyTrue:
        "Tarjan low-link: low[v] = min reachable discovery index via tree edge + one back edge. low[v] > disc[u] ⇒ separating u|v.",
      newIdea: "DFS tree + lowlink; SCC = collapse by finishing order / min-on-stack",
      related: ["Critical Connections in a Network (1192)"],
      complexity: { time: "O(V+E)", space: "O(V)" },
      formula:
        "low[v]=\\min(disc[v],\\, low[child],\\, disc[back])",
      transition: {
        previousInvariant: "Global traversal / shortest paths",
        newConstraint: "Cut edges and maximal cyclic reachability",
        newInvariant: "disc/low timestamps; stack of partial SCC on directed DFS",
        whyNecessary:
          "Connectivity structure is orthogonal to distance — needs DFS tree anatomy.",
      },
      proof: {
        invariant:
          "For undirected bridge test: edge (u,v) with v child in DFS tree is bridge iff no back edge from subtree(v) to u or above.",
        initialization: "disc=low=−1, timer=0.",
        maintenance:
          "On tree edge u→v: recurse v; low[u]=min(low[u],low[v]). Back edge u→w: low[u]=min(low[u],disc[w]). Bridge if low[v]>disc[u].",
        progress: "Timer increases; more nodes get disc.",
        termination: "Full DFS completes.",
        finalState: "All bridges listed; SCCs via Kosaraju (finish order + reverse) or Tarjan pop.",
        correctness:
          "Any alternate u–v path provides back edge raising low[v]; absence separates components.",
      },
      whyThisWorks: {
        maintained: "DFS tree edges + best back-link index per subtree",
        discarded: "Processed subtrees whose low-link is finalized",
        whyDiscarded: "Bridge/SCC status depends only on descendent back links",
        discardInvariant: "low[v] captures all back edges from subtree(v)",
        progress: "DFS time increases",
        finalState: "Bridges and SCC partition identified",
      },
    },
    {
      id: "g5",
      title: "Level 5 — MST (Kruskal, Prim) & combinations",
      problem:
        "Minimum weight spanning tree; connect all points; graph + heap + UF combos.",
      coreInvariant:
        "\\text{Kruskal: greedy on sorted edges; safe if endpoints in different components}",
      whyTrue:
        "Cut property: minimum edge crossing any cut is in some MST. Kruskal adds lightest non-cycle edge; Prim grows one tree with min frontier edge.",
      newIdea: "MST = union-find (Kruskal) or min-heap frontier (Prim)",
      related: [
        "Min Cost to Connect All Points (1584)",
        "Connecting Cities With Minimum Cost (1135)",
        "Swim in Rising Water (778)",
      ],
      complexity: { time: "O(E\\log E) / O(E\\log V)", space: "O(V)" },
      formula:
        "|T|=V-1 \\text{ for tree; cut } (S,\\overline{S}) \\Rightarrow \\min \\text{ crossing edge safe}",
      transition: {
        previousInvariant: "Shortest paths / connectivity structure",
        newConstraint: "Minimize total weight connecting all vertices",
        newInvariant: "Forest grows acyclically; Prim: min edge from tree to outside",
        whyNecessary:
          "Shortest paths optimize path length, not spanning weight — greedy cut invariant differs.",
      },
      approaches: [
        {
          name: "Kruskal + union-find",
          invariant: "Components merge only on lightest safe edges",
          note: "Sort edges; skip if find(u)=find(v).",
        },
        {
          name: "Prim + min-heap",
          invariant: "Tree T; heap holds min w(u,v) with u∈T, v∉T",
          note: "Each pop adds one vertex; lazy decrease via duplicate keys OK.",
        },
      ],
      proof: {
        invariant:
          "Let S be vertices spanned so far. Lightest edge e with exactly one endpoint in S is safe (cut property).",
        initialization: "S = {any vertex} (Prim) or empty forest (Kruskal).",
        maintenance:
          "Add safe edge; never create cycle (Kruskal UF) or always attach new vertex (Prim).",
        progress: "Components merge until |T|=V−1.",
        termination: "V−1 edges chosen or graph disconnected.",
        finalState: "MST weight minimal among spanning trees.",
        correctness:
          "Exchange argument: if e not in MST, swap with heavier edge on cycle — contradiction.",
      },
      whyThisWorks: {
        maintained: "Acyclic spanning structure / cut-min edge choice",
        discarded: "Heavy edges that would close a cycle or lose to lighter cut edge",
        whyDiscarded: "Cut property proves they cannot belong to any MST",
        discardInvariant: "Minimum weight edge crossing (S, S̄)",
        progress: "More vertices connected",
        finalState: "V−1 edges, minimum total weight",
      },
    },
  ],

  tree: `Graphs
│
├── Fundamental: V, E, adjacency
│
├── BFS / DFS
│   ├── BFS: first visit = min hops (unweighted)
│   └── DFS: back edge ⇔ cycle (directed: cross/back)
│
├── Bipartite & DAG
│   ├── Bipartite ⇔ no odd cycle ⇔ 2-coloring
│   └── Topo sort ⇔ DAG (Kahn / DFS finish)
│
├── Shortest paths
│   ├── Dijkstra (w ≥ 0, heap)
│   ├── Bellman–Ford (+ neg cycle)
│   └── Floyd–Warshall (all-pairs)
│
├── Structure
│   ├── Bridges: low[v] > disc[u]
│   └── SCC: Kosaraju / Tarjan
│
└── MST
    ├── Kruskal + union-find
    └── Prim + min-heap`,

  complexityTable: [
    {
      problem: "BFS / DFS",
      time: "O(V+E)",
      space: "O(V)",
      mainInvariant: "Visited frontier",
      technique: "Queue / stack",
    },
    {
      problem: "Bipartite check",
      time: "O(V+E)",
      space: "O(V)",
      mainInvariant: "2-color, no odd cycle",
      technique: "BFS coloring",
    },
    {
      problem: "Topological sort",
      time: "O(V+E)",
      space: "O(V)",
      mainInvariant: "inDegree 0 queue",
      technique: "Kahn / DFS",
    },
    {
      problem: "Dijkstra",
      time: "O((V+E) log V)",
      space: "O(V)",
      mainInvariant: "Extract = final dist",
      technique: "Min-heap",
    },
    {
      problem: "Bellman–Ford",
      time: "O(VE)",
      space: "O(V)",
      mainInvariant: "≤ i-edge paths",
      technique: "V−1 relax rounds",
    },
    {
      problem: "Floyd–Warshall",
      time: "O(V³)",
      space: "O(V²)",
      mainInvariant: "Allow k intermediate",
      technique: "DP triple loop",
    },
    {
      problem: "Bridges / Tarjan",
      time: "O(V+E)",
      space: "O(V)",
      mainInvariant: "disc / low",
      technique: "DFS lowlink",
    },
    {
      problem: "Kruskal MST",
      time: "O(E log E)",
      space: "O(V)",
      mainInvariant: "Lightest safe edge",
      technique: "Sort + UF",
    },
    {
      problem: "Prim MST",
      time: "O(E log V)",
      space: "O(V)",
      mainInvariant: "Min cut edge",
      technique: "Heap frontier",
    },
  ],

  interviewTricks: [
    "Unweighted shortest path → BFS, not Dijkstra.",
    "DAG + order / prerequisites → topo sort + cycle check.",
    "Bipartite / odd-length cycle → 2-color BFS.",
    "Non-negative weights → Dijkstra; negative edges → Bellman–Ford.",
    "All-pairs, V ≤ 400 → Floyd–Warshall.",
    "Bridge / articulation → Tarjan disc/low.",
    "MST → Kruskal (sparse, edges given) or Prim (dense / matrix).",
    "Grid as graph → 4/8 neighbors; multi-source BFS from all seeds.",
  ],

  leetcode: [
    {
      name: "Number of Islands",
      number: 200,
      slug: "number-of-islands",
      invariant: "DFS/BFS floods component",
      prerequisite: "Grid traversal",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Rotting Oranges",
      number: 994,
      slug: "rotting-oranges",
      invariant: "Multi-source BFS layers",
      prerequisite: "BFS",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Course Schedule",
      number: 207,
      slug: "course-schedule",
      invariant: "Topo / cycle in directed graph",
      prerequisite: "DAG detection",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Course Schedule II",
      number: 210,
      slug: "course-schedule-ii",
      invariant: "Kahn topo order",
      prerequisite: "Course Schedule",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Is Graph Bipartite?",
      number: 785,
      slug: "is-graph-bipartite",
      invariant: "2-color ⇔ no odd cycle",
      prerequisite: "BFS coloring",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Network Delay Time",
      number: 743,
      slug: "network-delay-time",
      invariant: "Dijkstra extract-min final",
      prerequisite: "Weighted SSSP",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Cheapest Flights Within K Stops",
      number: 787,
      slug: "cheapest-flights-within-k-stops",
      invariant: "Bellman–Ford ≤ K+1 rounds",
      prerequisite: "Relaxation",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
      number: 1334,
      slug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
      invariant: "Floyd or Dijkstra from each node",
      prerequisite: "All-pairs / SSSP",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Critical Connections in a Network",
      number: 1192,
      slug: "critical-connections-in-a-network",
      invariant: "Bridge via low > disc",
      prerequisite: "Tarjan lowlink",
      difficulty: "Hard",
      stage: "combination",
    },
    {
      name: "Min Cost to Connect All Points",
      number: 1584,
      slug: "min-cost-to-connect-all-points",
      invariant: "MST on complete graph",
      prerequisite: "Prim / Kruskal",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Connecting Cities With Minimum Cost",
      number: 1135,
      slug: "connecting-cities-with-minimum-cost",
      invariant: "Kruskal greedy safe edges",
      prerequisite: "Union-find",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Swim in Rising Water",
      number: 778,
      slug: "swim-in-rising-water",
      invariant: "Minimax path / Kruskal on grid",
      prerequisite: "BFS + MST idea",
      difficulty: "Hard",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Frontier of known / settled states with proven local optimum",
    discarded: "Vertices or edges proven suboptimal or already satisfied",
    whyDiscarded:
      "BFS first visit, Dijkstra settlement, cut property, and parity coloring are all one-way invariants",
    discardInvariant: "No shorter unweighted path / no lighter crossing edge / no odd cycle",
    progress: "Visited count grows; dist decreases; forest edges increase",
    finalState: "Reachability, shortest paths, order, cuts, or MST weight",
  },
};
