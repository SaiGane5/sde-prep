import type { Topic } from "../types";

export const bitManipulation: Topic = {
  id: 23,
  slug: "bit-manipulation",
  title: "Bit Manipulation",
  accent: "teal",
  icon: "binary",
  shortInvariants: [
    "x ⊕ x = 0, x ⊕ 0 = x",
    "x & (x−1) clears lowest set bit",
    "Bitmask encodes subset membership",
  ],
  applications: [
    "Single / missing number",
    "Population count",
    "Subset enumeration",
    "Parity & flags",
  ],
  abstraction: "Integers as fixed-width bit vectors; XOR/AND as algebra on flags",
  fundamentalIdea:
    "Bits compose with Boolean algebra. XOR cancels duplicates; AND with x−1 strips the lowest 1 — both are O(1) word operations that replace loops over bits when the invariant is local.",

  levels: [
    {
      id: "bm0",
      title: "Level 0 — Fundamental idea",
      problem: "Prove XOR identities; use parity; cancel paired values.",
      coreInvariant:
        "a \\oplus a = 0,\\quad a \\oplus 0 = a,\\quad \\oplus \\text{ is commutative and associative}",
      whyTrue:
        "Bit-wise: 1⊕1=0, 0⊕0=0, 1⊕0=1 at each position independently; reordering pairs cancels.",
      newIdea: "XOR = symmetric difference of sets of bits",
      related: ["Single Number (136)"],
      complexity: { time: "O(1) word ops", space: "O(1)" },
      formula:
        "x \\oplus x = 0,\\quad x \\oplus 0 = x,\\quad \\bigoplus_i a_i = 0 \\text{ if every value appears twice}",
      proof: {
        invariant: "XOR of multiset equals XOR of values with odd multiplicity.",
        initialization: "acc = 0.",
        maintenance: "acc ← acc ⊕ x; each pair x,x zeroes acc at all bit positions.",
        progress: "One element processed per step.",
        termination: "After all elements.",
        finalState: "acc = unique element (if exactly one odd count).",
        correctness:
          "Associativity lets group equal pairs to 0; remainder is the single unpaired value.",
      },
    },
    {
      id: "bm1",
      title: "Level 1 — Lowest set bit & Kernighan",
      problem: "Count set bits; clear bits one by one; power-of-two test.",
      coreInvariant:
        "x \\& (x-1) \\text{ clears the lowest 1-bit of } x",
      whyTrue:
        "If lowest set bit is 2^k, then x−1 flips that bit and clears lower bits ⇒ AND removes exactly that 1.",
      newIdea: "Kernighan: while (x) { x &= x−1; count++; }",
      related: ["Number of 1 Bits (191)", "Counting Bits (338)"],
      complexity: { time: "O(\\#\\text{set bits})", space: "O(1)" },
      formula:
        "x \\& (x-1) < x \\text{ iff } x>0;\\quad x \\&( -x) = \\text{lowest set bit}",
      proof: {
        invariant:
          "Each iteration removes exactly one set bit; count equals popcount(x₀).",
        initialization: "count=0, x given.",
        maintenance:
          "x > 0 ⇒ x & (x−1) has one fewer 1 than x (lowest cleared). count++.",
        progress: "Number of 1-bits decreases.",
        termination: "x = 0.",
        finalState: "count = popcount(original).",
        correctness:
          "Lowest 1 in binary: ...1000...0; subtract 1 borrows through trailing 0s, AND zeroes that 1 only.",
      },
      whyThisWorks: {
        maintained: "Remaining set bits in x",
        discarded: "Lowest 1 cleared each step",
        whyDiscarded: "Counted and removed from x",
        discardInvariant: "x & (x−1) strictly decreases positive x",
        progress: "popcount remaining decreases",
        finalState: "count = total 1-bits",
      },
    },
    {
      id: "bm2",
      title: "Level 2 — Bitmasks for subsets",
      problem: "Enumerate subsets; DP over mask; assign tasks to subsets.",
      coreInvariant:
        "mask \\in [0, 2^n) \\text{ encodes } S \\subseteq \\{0,\\ldots,n-1\\}",
      whyTrue:
        "Bit i is 1 iff i ∈ S; submask iteration via (sub = (mask−1) & mask) visits all submasks.",
      newIdea: "Exponential state space compressed into one integer",
      related: [
        "Partition to K Equal Sum Subsets (698)",
        "Maximum Product of Word Lengths (318)",
      ],
      complexity: { time: "O(2^n) or O(n 2^n)", space: "O(2^n)" },
      formula:
        "mask \\mid (1<<i) \\neq 0 \\iff i \\in S;\\quad submask\\; loop:\\; sub=(sub-1)\\&mask",
      transition: {
        previousInvariant: "Single-word bit tricks",
        newConstraint: "State = which subset of n items",
        newInvariant: "mask indexes DP / search over 2^n configurations",
        whyNecessary: "n ≤ 20 problems need explicit subset encoding.",
      },
    },
    {
      id: "bm3",
      title: "Level 3 — Powers of two & missing duplicates",
      problem: "Check power of 2; find missing / duplicate in array; reverse bits.",
      coreInvariant:
        "x>0 \\text{ power of 2 } \\iff x \\&(x-1)=0",
      whyTrue: "Single 1-bit ⇔ clearing lowest 1 yields 0.",
      newIdea: "Bit patterns characterize global structure (one hot, etc.)",
      related: [
        "Power of Two (231)",
        "Missing Number (268)",
        "Reverse Bits (190)",
      ],
      complexity: { time: "O(n) or O(1)", space: "O(1)" },
    },
    {
      id: "bm4",
      title: "Level 4 — XOR / AND design patterns",
      problem: "Single Number II/III; sum without +; divide; bit DP.",
      coreInvariant:
        "Track bit counts mod k; or XOR in groups by bit position",
      whyTrue:
        "Linearity of XOR over bits; carry logic mimics addition at each bit.",
      newIdea: "Per-bit finite state instead of whole-number algebra",
      related: ["Single Number II (137)", "Sum of Two Integers (371)"],
      complexity: { time: "O(32n)", space: "O(1)" },
      transition: {
        previousInvariant: "Pair cancellation XOR",
        newConstraint: "Every element appears 3 times (or two uniques)",
        newInvariant: "ones/twos registers mod 3",
        whyNecessary: "Global XOR fails when multiplicity > 2.",
      },
    },
    {
      id: "bm5",
      title: "Level 5 — Combinations",
      problem: "Bitmask + graph/DP; UTF-8 / hamming style; greedy bit ordering.",
      coreInvariant: "Combine mask transitions with problem graph invariant",
      whyTrue: "Mask is state; edges flip bits or advance assignment — same reachability proofs as graph DP.",
      newIdea: "Bit DP + pruning (meet-in-middle for n≈40)",
      related: [
        "Shortest Path Visiting All Nodes (847)",
        "Maximum Length of a Concatenated String with Unique Characters (1239)",
      ],
      complexity: { time: "O(n 2^n) typical", space: "O(2^n)" },
    },
  ],

  tree: `Bit Manipulation
│
├── Fundamental: XOR algebra
│   ├── x ⊕ x = 0, x ⊕ 0 = x
│   └── cancel pairs → unique
│
├── x & (x−1), Kernighan
│   └── popcount / power of 2
│
├── Bitmasks
│   └── subset DP / submask loop
│
├── Multiplicity / add without +
│   └── mod-3 counters, bit carry
│
└── Combinations
    └── TSP bitmask, word subsets`,

  complexityTable: [
    {
      problem: "Single Number",
      time: "O(n)",
      space: "O(1)",
      mainInvariant: "XOR cancels pairs",
      technique: "XOR scan",
    },
    {
      problem: "Number of 1 Bits",
      time: "O(k) k=#1s",
      space: "O(1)",
      mainInvariant: "x & (x−1) clears low 1",
      technique: "Kernighan",
    },
    {
      problem: "Counting Bits",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "dp[i]=dp[i>>1]+(i&1)",
      technique: "DP + low bit",
    },
    {
      problem: "Subset DP",
      time: "O(n 2^n)",
      space: "O(2^n)",
      mainInvariant: "mask = chosen set",
      technique: "Bitmask DP",
    },
    {
      problem: "Single Number II",
      time: "O(32n)",
      space: "O(1)",
      mainInvariant: "ones/twos mod 3",
      technique: "Bit FSM",
    },
    {
      problem: "Sum of Two Integers",
      time: "O(32)",
      space: "O(1)",
      mainInvariant: "XOR sum, AND carry",
      technique: "Bit add",
    },
  ],

  interviewTricks: [
    "Cancel duplicates → XOR all numbers.",
    "Remove lowest set bit → x & (x−1); isolate it → x & (−x).",
    "Power of 2 (x>0) → (x & (x−1)) === 0.",
    "n ≤ 20 subset problems → mask 0..2^n−1.",
    "Submask iteration: for (sub=mask; sub; sub=(sub−1)&mask).",
    "Missing in 0..n → XOR index and value together.",
    "Mod-3 appearance → ones/twos bit registers.",
  ],

  leetcode: [
    {
      name: "Single Number",
      number: 136,
      slug: "single-number",
      invariant: "XOR cancels pairs",
      prerequisite: "XOR identities",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Number of 1 Bits",
      number: 191,
      slug: "number-of-1-bits",
      invariant: "Kernighan clear low bit",
      prerequisite: "x & (x−1)",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Counting Bits",
      number: 338,
      slug: "counting-bits",
      invariant: "dp[i]=dp[i>>1]+(i&1)",
      prerequisite: "Low bit",
      difficulty: "Easy",
      stage: "invariant",
    },
    {
      name: "Reverse Bits",
      number: 190,
      slug: "reverse-bits",
      invariant: "Shift/build per bit",
      prerequisite: "Bit iteration",
      difficulty: "Easy",
      stage: "invariant",
    },
    {
      name: "Missing Number",
      number: 268,
      slug: "missing-number",
      invariant: "XOR indices and values",
      prerequisite: "XOR",
      difficulty: "Easy",
      stage: "invariant",
    },
    {
      name: "Power of Two",
      number: 231,
      slug: "power-of-two",
      invariant: "x & (x−1) = 0",
      prerequisite: "Low bit clear",
      difficulty: "Easy",
      stage: "modification",
    },
    {
      name: "Single Number II",
      number: 137,
      slug: "single-number-ii",
      invariant: "ones/twos mod 3",
      prerequisite: "Bit FSM",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Sum of Two Integers",
      number: 371,
      slug: "sum-of-two-integers",
      invariant: "XOR + carry AND",
      prerequisite: "Bit add",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Maximum Product of Word Lengths",
      number: 318,
      slug: "maximum-product-of-word-lengths",
      invariant: "Mask disjoint ⇒ no shared letters",
      prerequisite: "Bitmask",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Shortest Path Visiting All Nodes",
      number: 847,
      slug: "shortest-path-visiting-all-nodes",
      invariant: "BFS on (node, mask)",
      prerequisite: "Bitmask + BFS",
      difficulty: "Hard",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Correct residual XOR / remaining set bits / mask state",
    discarded: "Cancelled pairs, cleared 1-bits, assigned subset bits",
    whyDiscarded: "XOR and AND-with-x−1 are irreversible eliminations proven safe per bit",
    discardInvariant: "Odd-multiplicity bits survive XOR; x & (x−1) < x",
    progress: "Fewer unpaired values / fewer 1s / more bits set in mask",
    finalState: "Unique, popcount, subset optimum, or bit-sum",
  },
};
