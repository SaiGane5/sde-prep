import type { Topic } from "../types";

export const trie: Topic = {
  id: 20,
  slug: "trie",
  title: "Trie",
  accent: "green",
  icon: "folder-tree",
  shortInvariants: [
    "Path from root = prefix",
    "Node marks end of word",
    "Child map keyed by next char",
  ],
  applications: [
    "Autocomplete prefix",
    "Word dictionary",
    "XOR maximum pair",
    "Replace words / concat",
  ],
  abstraction: "Tree over alphabet where depth = prefix length",
  fundamentalIdea:
    "Each root-to-node path spells exactly one prefix of stored strings. Searching a word walks the path; prefix query stops at any node along the way. End-of-word flags distinguish 'app' from 'apple'.",

  levels: [
    {
      id: "tr0",
      title: "Level 0 — Fundamental idea",
      problem: "Store strings for prefix lookup faster than scanning all words.",
      coreInvariant:
        "\\text{Node at depth } d \\text{ represents prefix } s[0..d)",
      whyTrue:
        "Insert walks char by char, creating missing edges. Shared prefixes share nodes — compression of common fronts.",
      newIdea: "Prefix tree = explicit prefix invariant in structure",
      related: ["Implement Trie (208)"],
      complexity: { time: "O(L) per op", space: "O(total chars)" },
      formula:
        "\\text{insert}(w):\\; \\text{cur}=root;\\; \\forall c\\in w:\\; cur=cur.children[c]",
    },
    {
      id: "tr1",
      title: "Level 1 — Insert / search / startsWith",
      problem: "Standard trie API on lowercase words.",
      coreInvariant:
        "\\text{isEnd at node ⟺ some inserted word ends here}",
      whyTrue:
        "search walks full word — all chars exist and isEnd. startsWith walks prefix only — no isEnd required.",
      newIdea: "Separate prefix match from full word match",
      related: ["Implement Trie (Prefix Tree) (208)"],
      complexity: { time: "O(L)", space: "O(1) aux per walk" },
      proof: {
        invariant: "After inserts, node v at depth d is reachable iff prefix P of length d was inserted by some word.",
        initialization: "Empty trie: only root.",
        maintenance: "Insert creates path; sets isEnd at terminal.",
        progress: "Depth increases along word.",
        termination: "End of insert word.",
        finalState: "search/startsWith follow same paths.",
        correctness: "Path existence ⟺ prefix in set; isEnd ⟺ full word in set.",
      },
      whyThisWorks: {
        maintained: "Root-to-node path spells stored prefix",
        discarded: "Nothing during walk — branches not taken absent",
        whyDiscarded: "Missing child = no word with that continuation",
        discardInvariant: "One child per next character on path",
        progress: "Character index along query",
        finalState: "Found / not found / prefix ok",
      },
    },
    {
      id: "tr2",
      title: "Level 2 — Dictionary replace & word break",
      problem: "Replace words with roots; segment sentence with dictionary.",
      coreInvariant:
        "\\text{Trie holds dictionary; DFS/BFS uses prefix presence to prune}",
      whyTrue:
        "At i, try lengths while trie has prefix; on isEnd push segment. Word Break: dp[i] true if dp[j] and dict has s[j..i).",
      newIdea: "Trie accelerates 'is any dict word this prefix?'",
      related: [
        "Replace Words (648)",
        "Word Break (139)",
        "Longest Word in Dictionary (720)",
      ],
      complexity: { time: "O(n · L)", space: "O(dict)" },
      transition: {
        previousInvariant: "Single word lookup",
        newConstraint: "Many words; repeated prefix tests on same string",
        newInvariant: "Walk trie while extending substring",
        whyNecessary: "Hash set checks whole words only — trie shares prefix tests.",
      },
    },
    {
      id: "tr3",
      title: "Level 3 — Autocomplete & delete",
      problem: "Design add/search/delete with prefix counts.",
      coreInvariant:
        "\\text{count on node = # words passing through prefix}",
      whyTrue:
        "Insert ++ on path; delete -- if word existed. Prefix count at node = suggestions under subtree.",
      newIdea: "Augment nodes with frequency for ranking",
      related: ["Design Add and Search Words (211)"],
      complexity: { time: "O(L)", space: "O(nodes)" },
    },
    {
      id: "tr4",
      title: "Level 4 — Wildcard search (`.` dot)",
      problem: "Search with `.` matching any letter.",
      coreInvariant:
        "\\text{At `.`, branch all children; else single edge}",
      whyTrue:
        "DFS/backtrack on trie: dot multiplies branches; letter is normal descent. Prune dead branches.",
      newIdea: "Trie DFS when alphabet branch uncertain",
      related: ["Design Add and Search Words Data Structure (211)"],
      complexity: { time: "O(26^d · L) worst", space: "O(L)" },
      formula: "\\text{search}(i, node) \\text{ on pattern index } i",
    },
    {
      id: "tr5",
      title: "Level 5 — Binary trie (XOR) & grid words",
      problem: "Maximum XOR of two numbers; word search II on board.",
      coreInvariant:
        "\\text{Bit trie: path = bit prefix; max XOR greedily opposite bit}",
      whyTrue:
        "Insert 32-bit binary MSB-first. Query pick child with opposite bit when exists — stays-ahead on XOR digit. Board: trie of words + DFS with prune on trie node.",
      newIdea: "Trie on bits; multi-word grid = trie + visited undo",
      related: [
        "Maximum XOR of Two Numbers in an Array (421)",
        "Word Search II (212)",
      ],
      complexity: { time: "O(n·32) / O(mn·4^L)", space: "O(n·32)" },
      transition: {
        previousInvariant: "Char alphabet trie",
        newConstraint: "Numeric XOR or many words on grid",
        newInvariant: "Bit edges 0/1; end marks remove from search",
        whyNecessary: "XOR optimality is per-bit greedy with trie edges; grid needs batch dict + path undo.",
      },
    },
  ],

  tree: `Trie
│
├── Path = prefix
│   └── insert / search / startsWith
├── Dictionary on string
│   └── word break; replace roots
├── Augmented counts
│   └── prefix frequency
├── Wildcard dot (.)
│   └── DFS all children
└── Bit trie / grid
    └── max XOR; Word Search II`,

  complexityTable: [
    { problem: "Implement Trie", time: "O(L)", space: "O(N·L)", mainInvariant: "Path = prefix", technique: "Char trie" },
    { problem: "Replace Words", time: "O(n·L)", space: "O(dict)", mainInvariant: "Shortest root on path", technique: "Trie walk" },
    { problem: "Word Break", time: "O(n²)", space: "O(n)", mainInvariant: "dp + dict trie", technique: "DP / trie prune" },
    { problem: "Add and Search Words", time: "O(26^d)", space: "O(L)", mainInvariant: "Dot DFS branches", technique: "Trie DFS" },
    { problem: "Maximum XOR of Two Numbers", time: "O(n·32)", space: "O(n·32)", mainInvariant: "Opposite bit greedy", technique: "Bit trie" },
    { problem: "Word Search II", time: "O(mn·4^L)", space: "O(words)", mainInvariant: "Trie node + board DFS", technique: "Trie + backtrack" },
  ],

  interviewTricks: [
    "Prefix queries → trie beats hash set of full strings.",
    "isEnd vs child exists: 'app' in set with 'apple' also inserted.",
    "Use array[26] for lowercase; map for general alphabet.",
    "Word Search II: remove word from trie after found to dedupe.",
    "XOR max: 32-bit trie, prefer opposite bit at each level.",
    "Space: compress with map only when sparse.",
  ],

  leetcode: [
    { name: "Implement Trie (Prefix Tree)", number: 208, slug: "implement-trie-prefix-tree", invariant: "Path = prefix; isEnd", prerequisite: "Tree edges per char", difficulty: "Medium", stage: "foundation" },
    { name: "Longest Word in Dictionary", number: 720, slug: "longest-word-in-dictionary", invariant: "Buildable char-by-char in trie", prerequisite: "Trie + BFS/DFS", difficulty: "Medium", stage: "foundation" },
    { name: "Replace Words", number: 648, slug: "replace-words", invariant: "First root on walk wins", prerequisite: "Prefix stop", difficulty: "Medium", stage: "invariant" },
    { name: "Design Add and Search Words Data Structure", number: 211, slug: "design-add-and-search-words-data-structure", invariant: "Dot multi-branch DFS", prerequisite: "Wildcard search", difficulty: "Medium", stage: "invariant" },
    { name: "Map Sum Pairs", number: 677, slug: "map-sum-pairs", invariant: "Prefix sum at node", prerequisite: "Augmented trie", difficulty: "Medium", stage: "modification" },
    { name: "Word Break", number: 139, slug: "word-break", invariant: "dp[i] with dict trie", prerequisite: "Segmentation", difficulty: "Medium", stage: "modification" },
    { name: "Maximum XOR of Two Numbers in an Array", number: 421, slug: "maximum-xor-of-two-numbers-in-an-array", invariant: "Bit trie opposite choice", prerequisite: "Binary trie", difficulty: "Medium", stage: "combination" },
    { name: "Word Search II", number: 212, slug: "word-search-ii", invariant: "Board DFS + trie prune", prerequisite: "Backtrack + trie", difficulty: "Hard", stage: "combination" },
    { name: "Concatenated Words", number: 472, slug: "concatenated-words", invariant: "Trie + dp/word break per string", prerequisite: "Dictionary trie", difficulty: "Hard", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Current trie node matches query prefix read so far",
    discarded: "Subtrees absent when child for next char missing",
    whyDiscarded: "No inserted string continues that prefix",
    discardInvariant: "Path from root encodes exactly one prefix",
    progress: "Query index or board cell advances",
    finalState: "Word found, XOR max, or all board words collected",
  },
};
