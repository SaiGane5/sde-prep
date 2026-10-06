import type { Topic } from "../types";

export const greedy: Topic = {
  id: 15,
  slug: "greedy",
  title: "Greedy",
  accent: "purple",
  icon: "zap",
  shortInvariants: [
    "Local choice safe globally",
    "Sort / heap by dominance key",
    "Exchange or stays-ahead proof",
  ],
  applications: [
    "Interval scheduling",
    "Huffman coding",
    "Minimum coins (canonical)",
    "Jump game / gas station",
  ],
  abstraction: "Prove that one myopic rule never blocks a better future",
  fundamentalIdea:
    "At each step pick the locally best option — but only after proving that choice cannot be swapped out of any optimal solution (exchange argument) or that your partial solution stays ahead of any other (stays-ahead). Without that proof, greedy is a guess.",

  levels: [
    {
      id: "g0",
      title: "Level 0 — Fundamental idea",
      problem:
        "When can repeated local optimization reach a global optimum?",
      coreInvariant:
        "\\text{Each greedy pick preserves existence of some optimal solution}",
      whyTrue:
        "Exchange: replace first differing step in optimal with greedy — show cost does not increase. Stays-ahead: greedy partial is ≥ any other partial on a measure that only improves.",
      newIdea: "Greedy = invariant on optimality preservation, not a loop pattern",
      related: [],
      complexity: { time: "problem-dependent", space: "O(1)–O(n)" },
      formula:
        "\\text{safe} \\iff \\text{exchange or stays-ahead on sorted/dominance order}",
    },
    {
      id: "g1",
      title: "Level 1 — Activity selection / intervals",
      problem:
        "Maximize non-overlapping intervals; merge intervals; minimum arrows to burst balloons.",
      coreInvariant:
        "\\text{Pick interval with earliest finish among remaining}",
      whyTrue:
        "Exchange: let O pick first interval ending at f'. Greedy picks f ≤ f'. Swap O's first for greedy — frees time ≥ f', so rest of O still fits. Earliest finish dominates all later starts.",
      newIdea: "Sort by finish time → exchange on first conflict",
      related: [
        "Non-overlapping Intervals (435)",
        "Merge Intervals (56)",
        "Minimum Number of Arrows (452)",
      ],
      complexity: { time: "O(n log n)", space: "O(1)" },
      proof: {
        invariant:
          "After k picks, there exists an optimal solution whose first k intervals equal greedy picks.",
        initialization: "k = 0 — vacuous.",
        maintenance:
          "Greedy adds earliest-finishing compatible interval. Exchange swaps it into O without reducing |O|.",
        progress: "k increases; remaining pool shrinks.",
        termination: "No compatible interval left.",
        finalState: "Greedy count = |O|.",
        correctness: "Induction on k preserves optimality; termination is maximal.",
      },
      whyThisWorks: {
        maintained: "Optimality-preserving prefix of schedule",
        discarded: "Intervals that overlap greedy pick or end later than needed",
        whyDiscarded: "Later finish never enables more future picks than earliest finish",
        discardInvariant: "Earliest finish is exchange-safe",
        progress: "One interval committed per step",
        finalState: "Maximum cardinality schedule",
      },
    },
    {
      id: "g2",
      title: "Level 2 — Huffman / two-heap merge",
      problem:
        "Minimum cost to merge files; assign binary codes by frequency.",
      coreInvariant:
        "\\text{Always merge the two smallest remaining weights}",
      whyTrue:
        "Exchange: in any optimal tree, two least frequent symbols are deepest siblings — swapping them to be merged last cannot increase total cost (both depths decrease equally in the merge accounting).",
      newIdea: "Min-heap = repeated smallest pair → optimal merge tree",
      related: ["Minimum Cost to Connect Sticks (1167)", "Task Scheduler (621)"],
      complexity: { time: "O(n log n)", space: "O(n)" },
      formula: "\\text{cost} = \\sum \\text{merge}(w_1 + w_2)",
      transition: {
        previousInvariant: "Interval finish exchange",
        newConstraint: "Cost is sum of weighted depths",
        newInvariant: "Smallest two merged first (Huffman)",
        whyNecessary:
          "Finish-time order is interval-specific. Merge cost is additive on combined weights — dominance is on smallest pair, not sort order alone.",
      },
    },
    {
      id: "g3",
      title: "Level 3 — Canonical coin / change",
      problem:
        "Fewest coins for amount (when greedy is valid); fractional knapsack.",
      coreInvariant:
        "\\text{Take max denomination that fits (only if canonical)}",
      whyTrue:
        "US-style coins: exchange — any optimal using k of coin c can replace c smaller coins with one c without increasing count (canonical system). Non-canonical (e.g. {1,3,4}, amt=6): greedy 4+1+1 loses to 3+3 — must DP.",
      newIdea: "Greedy coins need proof; else unbounded knapsack DP",
      related: ["Coin Change (322)", "Gas Station (134)"],
      complexity: { time: "O(n) greedy / O(n·amt) DP", space: "O(1) / O(amt)" },
      approaches: [
        {
          name: "Greedy (canonical only)",
          invariant: "Largest fitting coin never hurts optimality",
          note: "Prove per denomination system; interview often traps on non-canonical.",
        },
        {
          name: "Fractional knapsack",
          invariant: "Sort by value/weight; take greedily — exchange on density",
          note: "Fractional: take highest ρ first; any swap lowers total value per unit capacity.",
        },
      ],
    },
    {
      id: "g4",
      title: "Level 4 — Jump game / scheduling with deadlines",
      problem:
        "Can reach last index; minimum jumps; max tasks with cooldown; meeting rooms II.",
      coreInvariant:
        "\\text{Farthest reachable / min heap of deadlines}",
      whyTrue:
        "Jump I: stays-ahead — maxReach after i is ≥ any path's reach; if maxReach ≥ n−1, some path exists. Jump II: BFS layers = min jumps when edges are i→[i+1..reach]. Task Scheduler: schedule most frequent first with slots — exchange idle slots.",
      newIdea: "Reachability invariant vs heap by deadline / frequency",
      related: [
        "Jump Game (55)",
        "Jump Game II (45)",
        "Task Scheduler (621)",
        "Meeting Rooms II (253)",
      ],
      complexity: { time: "O(n) / O(n log n)", space: "O(1) / O(n)" },
      proof: {
        invariant: "maxReach = farthest index reachable from any valid path prefix.",
        initialization: "maxReach = 0 at index 0.",
        maintenance:
          "At i, if i > maxReach fail. Else maxReach = max(maxReach, i + nums[i]).",
        progress: "i advances.",
        termination: "i = n−1 or fail.",
        finalState: "maxReach ≥ n−1 ⟺ reachable.",
        correctness:
          "Stays-ahead: greedy maxReach dominates every path's frontier; no jump needed for feasibility.",
      },
    },
    {
      id: "g5",
      title: "Level 5 — Greedy + structure (strings, graphs)",
      problem:
        "Remove k digits for smallest number; reconstruct queue by height; assign cookies; partition labels.",
      coreInvariant:
        "\\text{Monotonic stack / sort key removes dominated choices}",
      whyTrue:
        "Remove K Digits: exchange — removing a larger digit left of a smaller one strictly decreases number; stack keeps increasing suffix, pop while k>0 and top > next. Queue reconstruction: sort by (h desc, k asc); insert at index k — each person only blocks shorter people already placed.",
      newIdea: "Greedy often = sort + stack or multiset",
      related: [
        "Remove K Digits (402)",
        "Queue Reconstruction by Height (406)",
        "Assign Cookies (455)",
        "Partition Labels (763)",
      ],
      complexity: { time: "O(n log n)", space: "O(n)" },
      transition: {
        previousInvariant: "Single numeric reach or interval finish",
        newConstraint: "Lexicographic / permutation constraints",
        newInvariant: "Pop dominated / place by sorted key",
        whyNecessary:
          "Lex order needs local digit dominance, not global sort of whole string. Permutation needs insertion position invariant after sort.",
      },
    },
  ],

  tree: `Greedy
│
├── Fundamental: exchange / stays-ahead
├── Intervals
│   └── earliest finish (exchange)
├── Huffman / merge
│   └── two smallest (exchange on depths)
├── Coins / fractional knapsack
│   └── canonical proof vs DP
├── Jump / deadlines / heaps
│   └── maxReach / freq + slots
└── Stack + sort keys
    └── remove k digits / queue by height`,

  complexityTable: [
    {
      problem: "Non-overlapping Intervals",
      time: "O(n log n)",
      space: "O(1)",
      mainInvariant: "Earliest finish exchange-safe",
      technique: "Sort by end",
    },
    {
      problem: "Merge Intervals",
      time: "O(n log n)",
      space: "O(n)",
      mainInvariant: "Sort by start; merge overlapping",
      technique: "Sort + scan",
    },
    {
      problem: "Jump Game",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "maxReach stays-ahead",
      technique: "Greedy reach",
    },
    {
      problem: "Task Scheduler",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "Idle slots = f_max structure",
      technique: "Count + formula",
    },
    {
      problem: "Remove K Digits",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Mono stack; pop larger",
      technique: "Stack greedy",
    },
    {
      problem: "Meeting Rooms II",
      time: "O(n log n)",
      space: "O(n)",
      mainInvariant: "Min-heap of end times",
      technique: "Sweep + heap",
    },
  ],

  interviewTricks: [
    "Intervals → sort by finish (or start for merge); prove exchange on first pick.",
    "Merge / connect cost → min-heap of two smallest (Huffman pattern).",
    "Reach / jumps → track farthest index, not jump count first.",
    "Coin change → ask if greedy works; if not, DP.",
    "Lex smallest after removals → monotonic stack, not sort entire string.",
    "Always state the proof type: exchange, stays-ahead, or dominance — never 'greedy seems right'.",
  ],

  leetcode: [
    {
      name: "Assign Cookies",
      number: 455,
      slug: "assign-cookies",
      invariant: "Sort both; smallest sufficient cookie",
      prerequisite: "Two-pointer greedy",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Non-overlapping Intervals",
      number: 435,
      slug: "non-overlapping-intervals",
      invariant: "Earliest finish exchange",
      prerequisite: "Sort by end",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Jump Game",
      number: 55,
      slug: "jump-game",
      invariant: "maxReach ≥ i at each step",
      prerequisite: "Stays-ahead",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Merge Intervals",
      number: 56,
      slug: "merge-intervals",
      invariant: "Sorted starts; extend if overlap",
      prerequisite: "Sort + scan",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Gas Station",
      number: 134,
      slug: "gas-station",
      invariant: "Total surplus ≥ 0; start after global deficit",
      prerequisite: "Stays-ahead on tank",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Jump Game II",
      number: 45,
      slug: "jump-game-ii",
      invariant: "BFS layers on reach graph",
      prerequisite: "Jump Game I",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Task Scheduler",
      number: 621,
      slug: "task-scheduler",
      invariant: "Idle slots from max frequency",
      prerequisite: "Counting + structure",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Queue Reconstruction by Height",
      number: 406,
      slug: "queue-reconstruction-by-height",
      invariant: "Sort (h↓, k↑); insert at k",
      prerequisite: "Greedy placement",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Remove K Digits",
      number: 402,
      slug: "remove-k-digits",
      invariant: "Stack pop if top > next",
      prerequisite: "Exchange on lex order",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Minimum Number of Arrows to Burst Balloons",
      number: 452,
      slug: "minimum-number-of-arrows-to-burst-balloons",
      invariant: "Earliest end arrow (interval variant)",
      prerequisite: "Activity selection",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Partition Labels",
      number: 763,
      slug: "partition-labels",
      invariant: "Last occurrence defines segment end",
      prerequisite: "Scan + greedy extend",
      difficulty: "Medium",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "An optimal solution remains achievable after each greedy commit",
    discarded: "Choices dominated by exchange or stays-ahead measure",
    whyDiscarded: "Swapping greedy into optimal never worsens objective (when proof holds)",
    discardInvariant: "Local dominance key (finish, weight, reach, digit)",
    progress: "Problem size shrinks or measure strictly improves",
    finalState: "Greedy construction equals proven optimal",
  },
};
