import type { Topic } from "../types";

export const dynamicProgramming: Topic = {
  id: 16,
  slug: "dynamic-programming",
  title: "Dynamic Programming",
  accent: "green",
  icon: "brain",
  shortInvariants: ["Optimal substructure", "Overlapping subproblems", "Valid transitions"],
  applications: ["Knapsack", "LCS", "LIS", "Grid", "Interval", "Bitmask"],
  abstraction: "State-space compression of recursion",
  fundamentalIdea:
    "Define a state that captures all decisions needed for the future. Prove every transition considers all possibilities. Order evaluation so dependencies are ready.",

  levels: [
    {
      id: "dp0",
      title: "Level 0 — Recursion",
      problem: "Fibonacci / climbing stairs as naive recursion.",
      coreInvariant: "f(n)=f(n-1)+f(n-2)",
      whyTrue: "Last step is 1 or 2; optimal substructure is trivial.",
      newIdea: "Break into subproblems",
      related: ["Climbing Stairs (70)"],
      complexity: { time: "O(2^n)", space: "O(n)" },
    },
    {
      id: "dp1",
      title: "Level 1 — Overlap → Memoization",
      problem: "Same recurrence with memo map.",
      coreInvariant: "\\text{memo}[s]=\\text{opt}(s)\\text{ once computed}",
      whyTrue: "Identical states repeat; cache preserves correctness.",
      newIdea: "Overlapping subproblems",
      related: ["Fibonacci Number (509)"],
      complexity: { time: "O(n)", space: "O(n)" },
      transition: {
        previousInvariant: "Tree recursion correctness",
        newConstraint: "Exponential duplicate calls",
        newInvariant: "Each state computed once",
        whyNecessary: "Without memo, DAG of subproblems is explored as a tree.",
      },
      proof: {
        invariant: "If memo[s] set, it equals the true optimum for s.",
        initialization: "memo empty; bases filled.",
        maintenance: "Compute via transition using already-correct children; store.",
        progress: "Number of unset states decreases.",
        termination: "Root state filled.",
        finalState: "memo[root] = answer.",
        correctness: "Induction on state dependency DAG.",
      },
    },
    {
      id: "dp2",
      title: "Level 2 — State / Transition / Base / Order",
      problem: "House Robber — define dp[i] explicitly.",
      coreInvariant: "dp[i]=\\max(dp[i-1],\\, dp[i-2]+A[i])",
      whyTrue: "Either skip i or take i (forcing skip i−1). Exhaustive cases.",
      newIdea: "Tabulation with dependency order",
      related: ["House Robber (198)"],
      complexity: { time: "O(n)", space: "O(n)" },
      formula:
        "\\textbf{State }dp[i],\\;\\textbf{Base }dp[0],dp[1],\\;\\textbf{Answer }dp[n-1]",
    },
    {
      id: "dp3",
      title: "Level 3 — Classic patterns",
      problem: "0/1 Knapsack, Coin Change, LCS, LIS, Grid path.",
      coreInvariant: "dp[i][w]=\\max(dp[i-1][w],\\, v_i+dp[i-1][w-w_i])",
      whyTrue: "Item i in or out; coins: unbounded transitions; LCS: match/skip.",
      newIdea: "2D state spaces",
      related: ["Coin Change (322)", "Longest Common Subsequence (1143)", "LIS (300)"],
      complexity: { time: "O(nW)/O(nm)/O(n\\log n)", space: "O(nW)" },
    },
    {
      id: "dp4",
      title: "Level 4 — Space optimization & interval DP",
      problem: "Rolling arrays; burst balloons / matrix chain style.",
      coreInvariant: "\\text{Only previous row/layer needed; length-increasing intervals}",
      whyTrue: "Dependency width is local; interval DP grows by length.",
      newIdea: "Compress space; order by interval length",
      related: ["Burst Balloons (312)", "Unique Paths (62)"],
      complexity: { time: "O(n^3)", space: "O(n^2)" },
    },
    {
      id: "dp5",
      title: "Level 5 — Tree DP / Bitmask DP",
      problem: "House Robber III; TSP / subset DP on masks.",
      coreInvariant: "dp[u][take];\\quad dp[mask][v]=\\min\\dots",
      whyTrue: "Tree: children independent given parent choice. Bitmask: subset of visited.",
      newIdea: "Structure-shaped state",
      related: ["House Robber III (337)", "Shortest Path Visiting All Nodes (847)"],
      complexity: { time: "O(n)/O(2^n n^2)", space: "O(n)/O(2^n n)" },
      whyThisWorks: {
        maintained: "Optimal value for each state",
        discarded: "Inferior partial decisions dominated within a state",
        whyDiscarded: "Optimal substructure: only best for that state matters later",
        discardInvariant: "State definition is sufficient for future decisions",
        progress: "Evaluate states in dependency order",
        finalState: "Root / full-mask / end index holds answer",
      },
    },
  ],

  tree: `Dynamic Programming
│
├── Recursion
├── Overlap → Memo
├── State / Transition / Base / Order
├── Knapsack / LCS / LIS / Grid
├── Space opt / Interval DP
└── Tree DP / Bitmask DP`,

  complexityTable: [
    { problem: "Climbing Stairs", time: "O(n)", space: "O(1)", mainInvariant: "dp[i]=dp[i-1]+dp[i-2]", technique: "1D DP" },
    { problem: "House Robber", time: "O(n)", space: "O(1)", mainInvariant: "take/skip", technique: "1D DP" },
    { problem: "Coin Change", time: "O(n·amount)", space: "O(amount)", mainInvariant: "min coins for a", technique: "Unbounded" },
    { problem: "LCS", time: "O(nm)", space: "O(nm)", mainInvariant: "LCS of prefixes", technique: "2D DP" },
    { problem: "LIS", time: "O(n log n)", space: "O(n)", mainInvariant: "Tails of length k", technique: "Patience" },
  ],

  interviewTricks: [
    "Repeated states in recursion → DP.",
    "Ask: what do I need to know about the past to decide the future? → state.",
    "Can I take or skip? → 0/1 knapsack pattern.",
    "Subsequence match → LCS-style 2D.",
    "Subsets of n≤20 → bitmask DP.",
    "Tree with independent subtrees → tree DP.",
  ],

  leetcode: [
    { name: "Climbing Stairs", number: 70, slug: "climbing-stairs", invariant: "Last step 1 or 2", prerequisite: "Fib", difficulty: "Easy", stage: "foundation" },
    { name: "House Robber", number: 198, slug: "house-robber", invariant: "Take/skip", prerequisite: "1D DP", difficulty: "Medium", stage: "foundation" },
    { name: "Coin Change", number: 322, slug: "coin-change", invariant: "Min coins for amount", prerequisite: "Unbounded", difficulty: "Medium", stage: "invariant" },
    { name: "Longest Common Subsequence", number: 1143, slug: "longest-common-subsequence", invariant: "Prefix LCS", prerequisite: "2D DP", difficulty: "Medium", stage: "invariant" },
    { name: "Longest Increasing Subsequence", number: 300, slug: "longest-increasing-subsequence", invariant: "Tails array", prerequisite: "Patience BS", difficulty: "Medium", stage: "modification" },
    { name: "Unique Paths", number: 62, slug: "unique-paths", invariant: "Grid sum from top/left", prerequisite: "Grid DP", difficulty: "Medium", stage: "modification" },
    { name: "House Robber III", number: 337, slug: "house-robber-iii", invariant: "Tree take/skip", prerequisite: "Tree DP", difficulty: "Medium", stage: "combination" },
    { name: "Burst Balloons", number: 312, slug: "burst-balloons", invariant: "Interval last burst", prerequisite: "Interval DP", difficulty: "Hard", stage: "combination" },
  ],
};
