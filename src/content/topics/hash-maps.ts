import type { Topic } from "../types";

export const hashMaps: Topic = {
  id: 8,
  slug: "hash-maps",
  title: "Hash Maps",
  accent: "blue",
  icon: "hash",
  shortInvariants: [
    "key → bucket via h(k) mod m",
    "Expected O(1) if load α bounded",
    "Complement / count lookups",
  ],
  applications: [
    "Two sum complement",
    "Frequency counting",
    "Anagram grouping",
    "Subarray sum equals k",
  ],
  abstraction: "Random access on keys — trade memory for time",
  fundamentalIdea:
    "Hash maps answer “have I seen the value needed?” in expected O(1). Algorithmically: store witnesses (indices, counts) while scanning. Structurally: hash h(k) indexes a bucket; collisions resolved by chaining or open addressing; keep load factor α = n/m below a threshold to preserve O(1) expected time.",

  levels: [
    {
      id: "hm0",
      title: "Level 0 — Fundamental idea",
      problem:
        "Map keys to values with insert, lookup, delete. Average O(1) when load is bounded and hash spreads keys.",
      coreInvariant:
        "\\text{Stored at bucket } h(k) \\bmod m \\text{ (or probe chain from there)}",
      whyTrue:
        "Uniform h spreads keys across m buckets; expected chain/probe length stays O(1) when α = n/m is constant.",
      newIdea: "Space-time trade: O(n) memory for O(1) queries",
      related: [],
      complexity: { time: "O(1) avg", space: "O(n)" },
      whyThisWorks: {
        maintained: "Correct key→value association for inserted keys",
        discarded: "Keys never inserted (lookup miss)",
        whyDiscarded: "Only stored keys participate in invariant",
        discardInvariant: "Load factor triggers resize/rehash",
        progress: "Operations touch O(1) buckets in expectation",
        finalState: "Map reflects all inserts/deletes",
      },
    },
    {
      id: "hm1",
      title: "Level 1 — Complement lookup (Two Sum)",
      problem: "Find indices i,j with A[i]+A[j]=target in one pass.",
      coreInvariant:
        "\\text{Map: value } v \\mapsto \\text{index; seek } \\text{target}-A[i] \\text{ before insert}",
      whyTrue:
        "For each i, the needed partner is fixed; past indices are exactly the map contents.",
      newIdea: "Scan + remember seen values",
      related: ["Two Sum (1)"],
      complexity: { time: "O(n)", space: "O(n)" },
      proof: {
        invariant: "Map contains all values A[0..i−1] with their indices.",
        initialization: "Empty map.",
        maintenance:
          "If target−A[i] in map, return pair; else map[A[i]]=i.",
        progress: "i increases.",
        termination: "Found or i=n.",
        finalState: "Valid pair or none.",
        correctness: "Any valid pair's later index finds earlier complement in map.",
      },
      whyThisWorks: {
        maintained: "Seen values with indices",
        discarded: "Future indices (not yet scanned)",
        whyDiscarded: "Partner must be from past for one-pass",
        discardInvariant: "Insert after lookup at i",
        progress: "Single left→right pass",
        finalState: "Complement pair",
      },
    },
    {
      id: "hm2",
      title: "Level 2 — Frequency counting",
      problem:
        "First unique character; top k frequent elements; ransom note feasibility.",
      coreInvariant:
        "\\text{count}[x] = \\text{ occurrences of } x \\text{ in scanned prefix}",
      whyTrue:
        "Increment on see; answers read off counts or heap on map entries.",
      newIdea: "Map as multiset compressor",
      related: ["First Unique Character (387)", "Top K Frequent Elements (347)"],
      complexity: { time: "O(n)", space: "O(k)" },
      transition: {
        previousInvariant: "Value → last index",
        newConstraint: "Need multiplicity, not position",
        newInvariant: "Key → frequency",
        whyNecessary: "Many problems ask how often — aggregate by key.",
      },
    },
    {
      id: "hm3",
      title: "Level 3 — Canonical keys / grouping",
      problem:
        "Group anagrams; isomorphic strings; design hash map with chaining API.",
      coreInvariant:
        "\\text{Anagram key} = \\text{sorted string or 26-count signature}",
      whyTrue:
        "Permutation-invariant signature collides exactly anagram classes — bucket by key.",
      newIdea: "Hash the derived canonical form",
      related: ["Group Anagrams (49)", "Isomorphic Strings (205)"],
      complexity: { time: "O(n · L)", space: "O(n)" },
      transition: {
        previousInvariant: "Raw element as key",
        newConstraint: "Equivalence class, not raw value",
        newInvariant: "Key = invariant signature under group action",
        whyNecessary: "Anagram/isomorphism is equality of signatures, not strings.",
      },
    },
    {
      id: "hm4",
      title: "Level 4 — Collision theory & probing",
      problem:
        "Understand chaining vs open addressing, load factor, rehashing — why Java HashMap doubles buckets.",
      coreInvariant:
        "\\text{Expected probes} \\approx \\frac{1}{1-\\alpha} \\text{ (open addr)} \\;\\text{or}\\; \\alpha \\text{ (chaining)}",
      whyTrue:
        "Birthday paradox avoided when m ∝ n; resize when α > threshold (e.g. 0.75) keeps expectation O(1).",
      newIdea: "Engineering hash tables, not only algorithmic map usage",
      related: [],
      complexity: { time: "O(1) avg, O(n) worst", space: "O(m)" },
      formula:
        "\\alpha = n/m,\\quad \\text{chaining: } E[\\text{chain}] = \\alpha",
      transition: {
        previousInvariant: "Map as black-box O(1)",
        newConstraint: "Worst-case collisions, memory layout",
        newInvariant: "Separate chaining OR linear/quadratic probing",
        whyNecessary:
          "Interview systems questions and amortized analysis depend on collision resolution and rehash.",
      },
      proof: {
        invariant:
          "After rehash to 2m buckets, α halves; all keys reinserted at new h(k) mod 2m.",
        initialization: "m buckets, α small.",
        maintenance:
          "Chaining: bucket is list; insert O(1). Open addressing: probe until empty; delete tombstone. Insert if α > λ → double m, rehash all.",
        progress: "Amortized O(1) over geometric resizes.",
        termination: "Stable α bound.",
        finalState: "Expected O(1) lookup under simple uniform hashing assumption.",
        correctness:
          "SUH: each key equally likely per bucket; chain length α; probing clusters grow with α but kept constant by resize.",
      },
      whyThisWorks: {
        maintained: "All keys findable via h(k) and collision rule",
        discarded: "Old table after rehash",
        whyDiscarded: "Rehash rebuilds clean distribution",
        discardInvariant: "Load factor cap",
        progress: "Doubling table rare — amortized",
        finalState: "Bounded α ⇒ bounded expected probe",
      },
      approaches: [
        {
          name: "Separate chaining",
          invariant: "Bucket i holds list of keys with h(k)≡i (mod m)",
          note: "Simple; handles α>1; pointer overhead.",
        },
        {
          name: "Open addressing",
          invariant: "Single array; probe sequence i, i+1, … (linear) or +j² (quadratic)",
          note: "Cache-friendly; clustering; needs low α.",
        },
        {
          name: "Rehash on resize",
          invariant: "New m′=2m; reinsert every key",
          note: "Amortized O(1) insert over geometric series.",
        },
      ],
    },
    {
      id: "hm5",
      title: "Level 5 — Prefix sum + hash (subarray problems)",
      problem:
        "Subarray sum equals k; longest consecutive sequence; LRU cache (map + list).",
      coreInvariant:
        "\\text{prefix}[j]-\\text{prefix}[i]=k \\iff \\text{map stores prefix sums seen}",
      whyTrue:
        "For each j, count how many i<j have prefix[i]=prefix[j]−k; map accumulates frequencies of prefix sums.",
      newIdea: "Hash transforms O(n²) range queries to O(n) scan",
      related: [
        "Subarray Sum Equals K (560)",
        "Longest Consecutive Sequence (128)",
        "LRU Cache (146)",
      ],
      complexity: { time: "O(n)", space: "O(n)" },
      transition: {
        previousInvariant: "Key = array element or signature",
        newConstraint: "Range sum / existence on implicit intervals",
        newInvariant: "Key = cumulative prefix value",
        whyNecessary:
          "Subarray sum is difference of prefixes — store prefix counts, not just elements.",
      },
      proof: {
        invariant: "Map holds counts of prefix sums for indices < current j.",
        initialization: "map[0]=1.",
        maintenance:
          "Add A[j] to running sum s; ans += map[s−k]; map[s]++.",
        progress: "j advances.",
        termination: "End of array.",
        finalState: "Total subarrays with sum k.",
        correctness: "Each valid i corresponds to stored prefix s−k before update at j.",
      },
    },
  ],

  tree: `Hash Maps
│
├── Fundamental: h(k) mod m, load α
│
├── Two Sum complement
│   └── seen → index
│
├── Frequency map
│   └── count[x]++
│
├── Canonical key / group
│   └── anagram signature
│
├── Collisions & probing
│   └── chaining · open addr · rehash
│
└── Prefix sum map
    └── subarray sum k · consecutive set`,

  complexityTable: [
    {
      problem: "Two Sum",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Complement in seen map",
      technique: "Hash lookup",
    },
    {
      problem: "Group Anagrams",
      time: "O(n·L)",
      space: "O(n)",
      mainInvariant: "Signature key",
      technique: "Bucket hash",
    },
    {
      problem: "Subarray Sum Equals K",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Prefix sum counts",
      technique: "Prefix + map",
    },
    {
      problem: "Longest Consecutive Sequence",
      time: "O(n)",
      space: "O(n)",
      mainInvariant: "Set membership O(1)",
      technique: "Hash set",
    },
    {
      problem: "Chaining lookup",
      time: "O(1+α) avg",
      space: "O(n+m)",
      mainInvariant: "Bucket chain length α",
      technique: "Separate chaining",
    },
    {
      problem: "Open addressing",
      time: "O((1−α)⁻¹) avg",
      space: "O(m)",
      mainInvariant: "Probe until empty",
      technique: "Linear probing",
    },
    {
      problem: "LRU Cache",
      time: "O(1)",
      space: "O(cap)",
      mainInvariant: "Map + DLL order",
      technique: "Hash + linked list",
    },
  ],

  interviewTricks: [
    "Need partner value? → complement hash while scanning.",
    "Count / frequency → map[key]++ or map.getOrDefault.",
    "Anagram / multiset → 26-count array or sorted key.",
    "Subarray sum k → prefix sum frequency map (include map[0]=1).",
    "Consecutive sequence → hash set; only start from sequence min (no repeat work).",
    "Chaining vs probing: chaining simpler; probing better cache, needs low α.",
    "Rehash when α ≈ 0.75 — amortized O(1) insert.",
    "Worst-case O(n) if all keys collide — mention SUH assumption.",
  ],

  leetcode: [
    {
      name: "Two Sum",
      number: 1,
      slug: "two-sum",
      invariant: "Complement lookup",
      prerequisite: "Hash map basics",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Valid Anagram",
      number: 242,
      slug: "valid-anagram",
      invariant: "Char frequency",
      prerequisite: "Count map",
      difficulty: "Easy",
      stage: "foundation",
    },
    {
      name: "Group Anagrams",
      number: 49,
      slug: "group-anagrams",
      invariant: "Signature bucket",
      prerequisite: "Canonical key",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Top K Frequent Elements",
      number: 347,
      slug: "top-k-frequent-elements",
      invariant: "Freq map + heap",
      prerequisite: "Frequency map",
      difficulty: "Medium",
      stage: "invariant",
    },
    {
      name: "Subarray Sum Equals K",
      number: 560,
      slug: "subarray-sum-equals-k",
      invariant: "Prefix sum counts",
      prerequisite: "Prefix hash",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Longest Consecutive Sequence",
      number: 128,
      slug: "longest-consecutive-sequence",
      invariant: "Set + start only at min",
      prerequisite: "Hash set",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Contiguous Array",
      number: 525,
      slug: "contiguous-array",
      invariant: "Prefix balance map",
      prerequisite: "Prefix + first index",
      difficulty: "Medium",
      stage: "modification",
    },
    {
      name: "Design HashMap",
      number: 706,
      slug: "design-hashmap",
      invariant: "Chaining buckets",
      prerequisite: "Collision theory",
      difficulty: "Easy",
      stage: "modification",
    },
    {
      name: "LRU Cache",
      number: 146,
      slug: "lru-cache",
      invariant: "Map + DLL",
      prerequisite: "O(1) move",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Insert Delete GetRandom O(1)",
      number: 380,
      slug: "insert-delete-getrandom-o1",
      invariant: "Map + vector swap-delete",
      prerequisite: "Index map",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Minimum Window Substring",
      number: 76,
      slug: "minimum-window-substring",
      invariant: "Need/have char map",
      prerequisite: "Freq + window",
      difficulty: "Hard",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "Keys indexed for expected O(1) retrieval",
    discarded: "Empty buckets / unresolved probes skipped",
    whyDiscarded: "Hash directs search to O(α) region only",
    discardInvariant: "Load factor bound + rehash",
    progress: "Scan with map updates",
    finalState: "Answer from complement, count, or prefix",
  },
};
