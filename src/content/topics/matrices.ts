import type { Topic } from "../types";

export const matrices: Topic = {
  id: 19,
  slug: "matrices",
  title: "Matrices",
  accent: "purple",
  icon: "grid-3x3",
  shortInvariants: [
    "Row/col bounds on every step",
    "In-place: read order preserves meaning",
    "Transpose / spiral = index map",
  ],
  applications: [
    "Rotate image",
    "Search row-column sorted matrix",
    "Set matrix zeroes",
    "Spiral / diagonal traversal",
  ],
  abstraction: "2D index invariants — neighbors, layers, and staged writes",
  fundamentalIdea:
    "A matrix is a graph on cells (r,c). Every technique fixes who may be read/written when: spiral peels layers; sorted matrix search eliminates a row or column; in-place tricks use sentinel bits in first row/col.",

  levels: [
    {
      id: "mx0",
      title: "Level 0 — Fundamental idea",
      problem: "Navigate m×n grid with consistent boundary rules.",
      coreInvariant:
        "0 \\le r < m,\\; 0 \\le c < n \\text{ for every accessed cell}",
      whyTrue:
        "Off-by-one breaks spirals and DP. Direction arrays (dr,dc) plus bounds checks define valid moves.",
      newIdea: "Matrix problems = invariant on (r,c) and visit order",
      related: [],
      complexity: { time: "O(mn)", space: "O(1)–O(mn)" },
    },
    {
      id: "mx1",
      title: "Level 1 — Row/column sorted search",
      problem: "Search target in row-sorted, col-sorted matrix; find peak.",
      coreInvariant:
        "\\text{Start top-right (or bottom-left); eliminate one row or col per step}",
      whyTrue:
        "At (r,c): if target > mat[r][c], c-- removes smaller column; else r++ removes smaller row. Monotone elimination like two pointers.",
      newIdea: "Sorted matrix → corner pointer, not binary search on whole",
      related: [
        "Search a 2D Matrix II (240)",
        "Search a 2D Matrix (74)",
      ],
      complexity: { time: "O(m+n)", space: "O(1)" },
      proof: {
        invariant: "Target, if present, lies in the remaining submatrix.",
        initialization: "Start top-right of full matrix.",
        maintenance: "Each step removes a row or column that cannot contain target.",
        progress: "m+n steps max.",
        termination: "Found or submatrix empty.",
        finalState: "Correct yes/no.",
        correctness: "Eliminated region: all values too small or too large by sort order.",
      },
      whyThisWorks: {
        maintained: "Remaining submatrix still contains target if anywhere",
        discarded: "One row or column per comparison",
        whyDiscarded: "Sort order makes entire strip impossible",
        discardInvariant: "Corner compares row min and col max role",
        progress: "r+c moves toward corner",
        finalState: "Hit target or empty region",
      },
    },
    {
      id: "mx2",
      title: "Level 2 — In-place marking (zeroes)",
      problem: "Set entire row/col to 0 if any cell was 0; use O(1) extra space.",
      coreInvariant:
        "\\text{First row/col + two flags store which lines need zero}",
      whyTrue:
        "Pass 1: mark mat[r][0], mat[0][c] if zero seen. Pass 2: zero rows/cols from flags. Handle row0/col0 overlap with separate booleans.",
      newIdea: "Sentinel row/col replaces auxiliary sets",
      related: ["Set Matrix Zeroes (73)"],
      complexity: { time: "O(mn)", space: "O(1)" },
      transition: {
        previousInvariant: "Read-only search elimination",
        newConstraint: "Mutate matrix; O(1) space",
        newInvariant: "Staged marks then bulk zero",
        whyNecessary: "Immediate zero destroys information about other zeros in same line.",
      },
    },
    {
      id: "mx3",
      title: "Level 3 — Rotate & transpose",
      problem: "Rotate image 90°; transpose; flip horizontal.",
      coreInvariant:
        "\\text{90° CW = transpose then reverse each row}",
      whyTrue:
        "(r,c) → (c, n−1−r) composes as swap across diagonal then mirror row. In-place rotate layers swap 4 cells at once.",
      newIdea: "Index map decomposition reduces to transpose + reverse",
      related: ["Rotate Image (48)", "Transpose Matrix (867)"],
      complexity: { time: "O(n²)", space: "O(1)" },
      formula: "(r,c) \\xrightarrow{90°} (c,\\, n-1-r)",
    },
    {
      id: "mx4",
      title: "Level 4 — Spiral & simulation",
      problem: "Spiral order; spiral matrix II; game of life; islands in grid.",
      coreInvariant:
        "\\text{Layer } k \\text{ walks top→right→bottom→left with bounds } [k, m-1-k] \\times [k, n-1-k]",
      whyTrue:
        "Four boundaries shrink after each side. Direction + turn when next cell invalid or visited.",
      newIdea: "Simulation = state machine on (r,c,dir)",
      related: [
        "Spiral Matrix (54)",
        "Spiral Matrix II (59)",
        "Game of Life (289)",
      ],
      complexity: { time: "O(mn)", space: "O(1)" },
    },
    {
      id: "mx5",
      title: "Level 5 — Prefix on grid & max rectangle",
      problem: "Maximal rectangle of 1s; range sum query 2D; count submatrices.",
      coreInvariant:
        "\\text{Histogram height}[c] \\text{ at row } r = \\text{consecutive 1s upward}",
      whyTrue:
        "Each row extends histogram; largest rectangle in histogram (monotonic stack) per row → O(mn). 2D prefix: P[r][c] = sum of subrect from origin.",
      newIdea: "Reduce 2D to 1D histogram or prefix DP",
      related: [
        "Maximal Rectangle (85)",
        "Count Submatrices With All Ones (1277)",
      ],
      complexity: { time: "O(mn)", space: "O(n)" },
      transition: {
        previousInvariant: "Local cell traversal",
        newConstraint: "Aggregate over all subrectangles",
        newInvariant: "Row-wise histogram + stack",
        whyNecessary: "Naive O(m²n²) needs compressed 1D structure per row.",
      },
    },
  ],

  tree: `Matrices
│
├── Bounds & neighbors
│   └── (r,c) valid range
├── Sorted search
│   └── corner eliminate row/col
├── In-place zeroes
│   └── first row/col sentinels
├── Rotate / transpose
│   └── transpose + reverse
├── Spiral / simulate
│   └── layer or dir FSM
└── Histogram / prefix
    └── max rectangle; 2D sum`,

  complexityTable: [
    { problem: "Search a 2D Matrix II", time: "O(m+n)", space: "O(1)", mainInvariant: "Corner strips impossible", technique: "Elimination" },
    { problem: "Set Matrix Zeroes", time: "O(mn)", space: "O(1)", mainInvariant: "Mark then apply", technique: "Sentinel rows/cols" },
    { problem: "Rotate Image", time: "O(n²)", space: "O(1)", mainInvariant: "Layer 4-swap or transpose", technique: "Index map" },
    { problem: "Spiral Matrix", time: "O(mn)", space: "O(1)", mainInvariant: "Shrinking bounds", technique: "Simulation" },
    { problem: "Maximal Rectangle", time: "O(mn)", space: "O(n)", mainInvariant: "Row histogram + stack", technique: "Reduce 2D→1D" },
    { problem: "Number of Islands", time: "O(mn)", space: "O(mn)", mainInvariant: "DFS/BFS on grid", technique: "Search on matrix" },
  ],

  interviewTricks: [
    "Row+column sorted → start top-right or bottom-left.",
    "Fully sorted flattened → treat as 1D binary search (74).",
    "Zero row/col → mark in first line, apply later.",
    "Rotate 90° → transpose + reverse row (square).",
    "Spiral → while top≤bottom && left≤right.",
    "Max rectangle of 1s → histogram per row + monotonic stack.",
    "In-place Game of Life → copy board or bit-pack next state.",
  ],

  leetcode: [
    { name: "Transpose Matrix", number: 867, slug: "transpose-matrix", invariant: "Swap (r,c) → (c,r)", prerequisite: "Index map", difficulty: "Easy", stage: "foundation" },
    { name: "Search a 2D Matrix", number: 74, slug: "search-a-2d-matrix", invariant: "1D binary on row-major sorted", prerequisite: "Virtual 1D", difficulty: "Medium", stage: "foundation" },
    { name: "Set Matrix Zeroes", number: 73, slug: "set-matrix-zeroes", invariant: "First row/col flags", prerequisite: "Two-pass mark", difficulty: "Medium", stage: "invariant" },
    { name: "Search a 2D Matrix II", number: 240, slug: "search-a-2d-matrix-ii", invariant: "Corner elimination", prerequisite: "Sorted strips", difficulty: "Medium", stage: "invariant" },
    { name: "Rotate Image", number: 48, slug: "rotate-image", invariant: "Transpose + reverse", prerequisite: "Layer swap", difficulty: "Medium", stage: "modification" },
    { name: "Spiral Matrix", number: 54, slug: "spiral-matrix", invariant: "Four boundaries shrink", prerequisite: "Simulation", difficulty: "Medium", stage: "modification" },
    { name: "Spiral Matrix II", number: 59, slug: "spiral-matrix-ii", invariant: "Fill by spiral order", prerequisite: "Spiral Matrix", difficulty: "Medium", stage: "modification" },
    { name: "Game of Life", number: 289, slug: "game-of-life", invariant: "8-neighbor count; staged write", prerequisite: "In-place sim", difficulty: "Medium", stage: "combination" },
    { name: "Maximal Rectangle", number: 85, slug: "maximal-rectangle", invariant: "Histogram per row", prerequisite: "Monotonic stack", difficulty: "Hard", stage: "combination" },
    { name: "Valid Sudoku", number: 36, slug: "valid-sudoku", invariant: "Row/col/box sets", prerequisite: "Grid indexing", difficulty: "Medium", stage: "combination" },
  ],

  whyThisWorks: {
    maintained: "Active submatrix or layer still contains answer / valid cells",
    discarded: "Rows, cols, or layers proven irrelevant",
    whyDiscarded: "Sort order, marks, or spiral bounds exclude them",
    discardInvariant: "Index map or sentinel never loses needed info before apply",
    progress: "Pointer moves or layer k increases",
    finalState: "Target found, matrix transformed, or aggregate computed",
  },
};
