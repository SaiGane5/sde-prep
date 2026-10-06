import type { Topic } from "../types";

export const unionFind: Topic = {
  id: 22,
  slug: "union-find",
  title: "Union-Find",
  accent: "red",
  icon: "merge",
  shortInvariants: [
    "parent[x] → representative",
    "Find returns root; path compressed",
    "Union merges roots by rank/size",
  ],
  applications: [
    "Dynamic connectivity",
    "Kruskal MST",
    "Cycle detection in undirected graphs",
    "Component counting",
  ],
  abstraction: "Partition of elements into disjoint sets with near-constant merge/query",
  fundamentalIdea:
    "Each set is a tree rooted at its representative. Find walks to the root; Union links two roots. Path compression and union by rank make the trees shallow — amortized α(n) per op.",

  levels: [
    {
      id: "uf0",
      title: "Level 0 — Fundamental idea",
      problem:
        "Maintain a partition of {0,…,n−1} under merge and same-set queries.",
      coreInvariant:
        "parent[i] \\text{ points toward root; root has } parent[r]=r",
      whyTrue:
        "Following parent pointers from any node must reach exactly one root — the set id.",
      newIdea: "Forest of trees = dynamic equivalence classes",
      related: [],
      complexity: { time: "O(n) naive find", space: "O(n)" },
      formula: "\\text{sameSet}(a,b) \\iff find(a)=find(b)",
    },
    {
      id: "uf1",
      title: "Level 1 — Find & Union (naive)",
      problem: "Implement find and union; detect redundant edge (cycle).",
      coreInvariant:
        "After union(a,b), all nodes in both old components share one root",
      whyTrue:
        "Union attaches one root under another; find still reaches the unique root of the merged tree.",
      newIdea: "Redundant undirected edge ⟺ same component before adding",
      related: ["Redundant Connection (684)", "Graph Valid Tree (261)"],
      complexity: { time: "O(n) per op worst case", space: "O(n)" },
      proof: {
        invariant:
          "Each node lies on exactly one root-to-node path; components are exactly the trees.",
        initialization: "parent[i]=i for all i.",
        maintenance:
          "find(x): walk to root. union(a,b): ra=find(a), rb=find(b); if ra≠rb set parent[ra]=rb.",
        progress: "Number of distinct roots decreases on successful union.",
        termination: "Queries answered when find completes.",
        finalState: "Connectivity relation equals transitive closure of unions.",
        correctness:
          "Induction on unions: initially distinct; merging roots merges exactly the two sets.",
      },
      whyThisWorks: {
        maintained: "Single root per component",
        discarded: "Nothing — only pointers change",
        whyDiscarded: "N/A",
        discardInvariant: "find(x) returns component representative",
        progress: "Fewer roots after merges",
        finalState: "Equivalence classes match union history",
      },
    },
    {
      id: "uf2",
      title: "Level 2 — Path compression",
      problem: "Why flatten paths on find; prove amortized efficiency improves.",
      coreInvariant:
        "After find(x), \\forall y \\text{ on path } parent[y]=root",
      whyTrue:
        "Future finds from any node on the path are O(1) hops to root — work is charged to rare long paths.",
      newIdea: "Pay once to shorten future searches",
      related: ["Number of Provinces (547)"],
      complexity: { time: "O(\\log n) per op with PC", space: "O(n)" },
      formula:
        "\\text{find}(x):\\; p=\\text{find}(parent[x]);\\; parent[x]\\leftarrow p;\\; return\\; p",
      transition: {
        previousInvariant: "Correct but deep trees",
        newConstraint: "Many repeated finds on same paths",
        newInvariant: "Path nodes point directly to root after find",
        whyNecessary: "Naive chains of n make find O(n); compression bounds height.",
      },
      proof: {
        invariant:
          "Path compression does not change which pairs share a root — only pointer shortcuts.",
        initialization: "Standard UF invariants hold.",
        maintenance:
          "find returns same root r as before compression; only assigns parent[v]=r for v on path.",
        progress: "Tree height along compressed paths becomes 1.",
        termination: "find returns root.",
        finalState: "Same partition, shallower trees.",
        correctness:
          "All nodes on path to r were already in r's set; pointing to r preserves component membership.",
      },
    },
    {
      id: "uf3",
      title: "Level 3 — Union by rank / size",
      problem: "Keep trees balanced when merging; combine with path compression.",
      coreInvariant:
        "Attach smaller tree under larger (rank++ only when equal rank)",
      whyTrue:
        "Height increases only when two equal-rank roots merge ⇒ height ≤ ⌊log n⌋ without compression; with PC, amortized inverse Ackermann.",
      newIdea: "Union discipline + compression ⇒ α(n) amortized",
      related: ["Accounts Merge (721)", "Most Stones Removed (947)"],
      complexity: { time: "O(\\alpha(n)) amortized", space: "O(n)" },
      formula:
        "rank[r] \\approx \\lfloor \\log_2(\\text{size of tree}) \\rfloor",
      transition: {
        previousInvariant: "Path compression alone",
        newConstraint: "Worst-case union order can still build bad shapes without rank",
        newInvariant: "Union by rank (or size) limits height before compression",
        whyNecessary: "Pairing compression with balanced unions gives the classical bound.",
      },
      proof: {
        invariant:
          "With union by rank, tree height h satisfies n ≥ 2^h (each level at least doubles nodes at merge).",
        initialization: "rank[i]=0, parent[i]=i.",
        maintenance:
          "Union ra, rb: if rank[ra]<rank[rb] parent[ra]=rb; elif > swap; else parent[rb]=ra, rank[ra]++.",
        progress: "At most n−1 successful unions.",
        termination: "Structure supports m finds/unions.",
        finalState: "Amortized O(α(n)) per op with both heuristics.",
        correctness:
          "Standard union-find analysis: rank bound + path compression ⇒ inverse Ackermann amortized cost.",
      },
    },
    {
      id: "uf4",
      title: "Level 4 — Kruskal MST",
      problem: "Connect all nodes with minimum total edge weight.",
      coreInvariant:
        "Accept edge (u,v) iff find(u)≠find(v); then union — never creates cycle",
      whyTrue:
        "Lightest safe edge across a cut; UF tracks components so cycle iff same component.",
      newIdea: "Sort edges + UF = Kruskal",
      related: ["Connecting Cities With Minimum Cost (1135)"],
      complexity: { time: "O(E \\log E)", space: "O(V)" },
      formula: "\\text{MST has exactly } V-1 \\text{ accepted edges}",
      transition: {
        previousInvariant: "Dynamic connectivity queries",
        newConstraint: "Minimize sum of chosen edges spanning all vertices",
        newInvariant: "Greedy on sorted weights; UF rejects cycle edges",
        whyNecessary: "MST is the canonical greedy application of connectivity tracking.",
      },
    },
    {
      id: "uf5",
      title: "Level 5 — Combinations & weighted variants",
      problem:
        "Provinces, stones removed, percolation, smallest string with swaps — UF + sort + graph.",
      coreInvariant:
        "Equivalence classes encode mergeable / connected / same-label groups",
      whyTrue:
        "Once abstracted to components, counting and optimization reduce to root counts and merge order.",
      newIdea: "Union-find as hidden state in graph problems",
      related: [
        "Number of Provinces (547)",
        "Most Stones Removed with Same Row or Column (947)",
        "Smallest String With Swaps (1202)",
      ],
      complexity: { time: "O(n \\alpha(n)) typical", space: "O(n)" },
    },
  ],

  tree: `Union-Find
│
├── Fundamental: parent → root
│
├── Find / Union
│   └── redundant edge ⇔ same root
│
├── Path compression
│   └── flatten on find
│
├── Union by rank / size
│   └── shallow trees + α(n)
│
├── Kruskal MST
│   └── sort edges + reject cycles
│
└── Combinations
    └── provinces, stones, swaps`,

  complexityTable: [
    {
      problem: "Naive UF",
      time: "O(n) find",
      space: "O(n)",
      mainInvariant: "Root = set id",
      technique: "Parent array",
    },
    {
      problem: "Path compression",
      time: "O(log n) amortized",
      space: "O(n)",
      mainInvariant: "Flat paths after find",
      technique: "Halving / full PC",
    },
    {
      problem: "Rank + PC",
      time: "O(α(n)) amortized",
      space: "O(n)",
      mainInvariant: "Balanced merge",
      technique: "Union by rank",
    },
    {
      problem: "Kruskal",
      time: "O(E log E)",
      space: "O(V)",
      mainInvariant: "Lightest non-cycle edge",
      technique: "Sort + UF",
    },
    {
      problem: "Connected components",
      time: "O(n α(n))",
      space: "O(n)",
      mainInvariant: "Count distinct roots",
      technique: "UF on edges",
    },
  ],

  interviewTricks: [
    "Undirected cycle on add edge → find(u)==find(v) before union.",
    "Always say path compression + union by rank for near-constant time.",
    "Kruskal: sort edges first; UF only rejects cycles.",
    "Grid problems: union row/col indices or cell ids.",
    "Count components = number of i with parent[i]==i after all unions.",
    "Don't use UF for directed reachability — use graph search.",
  ],

  leetcode: [
    {
      name: "Number of Provinces",
      number: 547,
      slug: "number-of-provinces",
      invariant: "UF on adjacency matrix",
      prerequisite: "Find / union",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Graph Valid Tree",
      number: 261,
      slug: "graph-valid-tree",
      invariant: "n−1 edges + no cycle",
      prerequisite: "UF cycle check",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Redundant Connection",
      number: 684,
      slug: "redundant-connection",
      invariant: "First edge with same root",
      prerequisite: "Connectivity",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Accounts Merge",
      number: 721,
      slug: "accounts-merge",
      invariant: "Union emails + names",
      prerequisite: "UF on indices",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Connecting Cities With Minimum Cost",
      number: 1135,
      slug: "connecting-cities-with-minimum-cost",
      invariant: "Kruskal greedy",
      prerequisite: "Sort + UF",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Most Stones Removed with Same Row or Column",
      number: 947,
      slug: "most-stones-removed-with-same-row-or-column",
      invariant: "Union row with col nodes",
      prerequisite: "Implicit UF graph",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Smallest String With Swaps",
      number: 1202,
      slug: "smallest-string-with-swaps",
      invariant: "Sort within components",
      prerequisite: "UF + greedy sort",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Min Cost to Connect All Points",
      number: 1584,
      slug: "min-cost-to-connect-all-points",
      invariant: "MST via Kruskal/Prim",
      prerequisite: "Kruskal",
      difficulty: "Medium",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Partition of elements into disjoint sets (roots)",
    discarded: "Deep paths after compression (shortcut away)",
    whyDiscarded: "Only representative identity matters for connectivity",
    discardInvariant: "find(x) returns unique root of x's component",
    progress: "Merges reduce root count; compression reduces future walk length",
    finalState: "Correct same-set answers; Kruskal builds MST",
  },
};
