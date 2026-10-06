import type { Topic } from "../types";

export const mathGeometry: Topic = {
  id: 24,
  slug: "math-geometry",
  title: "Math & Geometry",
  accent: "purple",
  icon: "calculator",
  shortInvariants: [
    "gcd(a,b) = gcd(b, a mod b); b strictly decreases",
    "Sieve marks multiples from p²",
    "Cross > 0 ⇔ counterclockwise turn",
  ],
  applications: [
    "Number theory (GCD, primes)",
    "Modular exponentiation",
    "Computational geometry",
    "Grid / line problems",
  ],
  abstraction: "Integer structure + spatial orientation invariants",
  fundamentalIdea:
    "Euclidean GCD preserves the common-divisor set while shrinking the larger argument. Geometry reduces to sign tests (cross product) and convex hull wraps points with consistent turn direction.",

  levels: [
    {
      id: "mg0",
      title: "Level 0 — Fundamental idea",
      problem: "Compute gcd(a,b); extended gcd; lcm from gcd.",
      coreInvariant:
        "\\gcd(a,b)=\\gcd(b,\\, a\\bmod b),\\quad b \\text{ decreases each step}",
      whyTrue:
        "Any d | a and d | b also divides a−qb; remainder r=a−qb ⇒ d | r. Same common divisors, smaller second argument.",
      newIdea: "Invariant = set of common divisors unchanged",
      related: [],
      complexity: { time: "O(\\log \\min(a,b))", space: "O(1)" },
      formula:
        "\\gcd(a,b)=\\gcd(b,a\\bmod b),\\quad \\text{lcm}(a,b)=\\frac{ab}{\\gcd(a,b)}",
      proof: {
        invariant: "gcd(a,b) constant over steps; b strictly decreases.",
        initialization: "a,b given.",
        maintenance: "Replace (a,b) with (b, a mod b); same gcd.",
        progress: "b → a mod b < b (for b>0).",
        termination: "b = 0 ⇒ gcd = a.",
        finalState: "gcd(a₀,b₀) computed.",
        correctness:
          "Standard Euclidean algorithm; at most O(log min(a,b)) steps (Lamé / Fibonacci worst case).",
      },
    },
    {
      id: "mg1",
      title: "Level 1 — Sieve & primality",
      problem: "All primes ≤ n; check prime; factor small n.",
      coreInvariant:
        "If p prime, mark multiples from p²; unmarked ≥2 are prime",
      whyTrue:
        "Composite m = p·q with p ≤ √m is struck when processing p; smallest factor ≤ √n suffices.",
      newIdea: "Elimination invariant on [2,n]",
      related: ["Count Primes (204)"],
      complexity: { time: "O(n \\log \\log n)", space: "O(n)" },
      formula:
        "\\text{Mark } j=p^2,p^2+p,\\ldots \\le n",
    },
    {
      id: "mg2",
      title: "Level 2 — Modular exponentiation",
      problem: "Compute a^b mod m; modular inverse when gcd(a,m)=1.",
      coreInvariant:
        "a^b \\bmod m = (a^{b/2})^2 \\cdot a^{b\\bmod 2} \\bmod m",
      whyTrue:
        "Binary exponentiation halves exponent each step — O(log b) multiplies.",
      newIdea: "Square-and-multiply preserves value mod m",
      related: ["Pow(x, n) (50)"],
      complexity: { time: "O(\\log b)", space: "O(1)" },
      formula:
        "a^b \\equiv \\prod_{i: b_i=1} a^{2^i} \\pmod m",
      proof: {
        invariant: "res · a^b ≡ target (mod m) throughout.",
        initialization: "res=1, base=a, exp=b.",
        maintenance:
          "If exp odd: res = res*base mod m. base = base² mod m; exp = exp/2.",
        progress: "exp halved (floor).",
        termination: "exp = 0 ⇒ res ≡ a^b₀.",
        finalState: "Correct modular power.",
        correctness: "Induction on exponent bits.",
      },
    },
    {
      id: "mg3",
      title: "Level 3 — Vectors, cross product, orientation",
      problem: "Collinear points; convex turn; segment intersection tests.",
      coreInvariant:
        "\\vec{AB} \\times \\vec{AC} = (B_x-A_x)(C_y-A_y)-(B_y-A_y)(C_x-A_x)",
      whyTrue:
        "Sign of cross = signed area of parallelogram ⇒ left/right turn or collinearity.",
      newIdea: ">0 CCW, <0 CW, =0 collinear — O(1) orientation",
      related: ["Max Points on a Line (149)"],
      complexity: { time: "O(1) per test", space: "O(1)" },
      formula:
        "cross(\\vec u,\\vec v)=u_x v_y-u_y v_x",
      transition: {
        previousInvariant: "Integer arithmetic",
        newConstraint: "Spatial order of triples of points",
        newInvariant: "Sign(cross) classifies turn",
        whyNecessary: "Geometry problems need orientation, not distance alone.",
      },
    },
    {
      id: "mg4",
      title: "Level 4 — Convex hull (brief)",
      problem: "Andrew monotone chain or Graham scan; minimum enclosing polygon.",
      coreInvariant:
        "Hull stack maintains CCW turn; pop while non-left turn",
      whyTrue:
        "Points inside the wedge formed by consecutive hull edges can be discarded — they cannot be extreme.",
      newIdea: "Sort + stack = hull boundary",
      related: ["Erect the Fence (587)"],
      complexity: { time: "O(n \\log n)", space: "O(n)" },
      formula:
        "\\text{Pop while } cross(p_{k-2},p_{k-1},p_k) \\le 0",
    },
    {
      id: "mg5",
      title: "Level 5 — Combinations",
      problem: "GCD in fractions; combinatorics + mod; geometry + sweep.",
      coreInvariant: "Reduce with gcd; combine cross tests with sorting / maps",
      whyTrue: "Same invariants compose: exact rationals via gcd=1 denominator; hull + binary search on answer.",
      newIdea: "Math reduces search space before algorithmic structure",
      related: [
        "Max Points on a Line (149)",
        "Valid Perfect Square (367)",
        "Random Pick with Blacklist (710)",
      ],
      complexity: { time: "problem-dependent", space: "O(n)" },
    },
  ],

  tree: `Math & Geometry
│
├── GCD / Euclidean
│   └── gcd(a,b)=gcd(b,a mod b)
│
├── Sieve of Eratosthenes
│   └── mark from p²
│
├── Modexp
│   └── binary exponentiation
│
├── Cross product
│   └── sign = turn / collinear
│
├── Convex hull
│   └── monotone chain / Graham
│
└── Combinations
    └── lines, mod arithmetic`,

  complexityTable: [
    {
      problem: "GCD (Euclidean)",
      time: "O(log min(a,b))",
      space: "O(1)",
      mainInvariant: "gcd unchanged",
      technique: "Mod recurrence",
    },
    {
      problem: "Sieve",
      time: "O(n log log n)",
      space: "O(n)",
      mainInvariant: "Multiples marked",
      technique: "Eratosthenes",
    },
    {
      problem: "Modexp",
      time: "O(log b)",
      space: "O(1)",
      mainInvariant: "res·a^exp ≡ target",
      technique: "Square-multiply",
    },
    {
      problem: "Orientation",
      time: "O(1)",
      space: "O(1)",
      mainInvariant: "sign(cross)",
      technique: "2D cross",
    },
    {
      problem: "Convex hull",
      time: "O(n log n)",
      space: "O(n)",
      mainInvariant: "CCW stack",
      technique: "Monotone chain",
    },
    {
      problem: "Max points on line",
      time: "O(n²) or O(n log n)",
      space: "O(n)",
      mainInvariant: "Slope/gcd pair canonical",
      technique: "Map + gcd",
    },
  ],

  interviewTricks: [
    "gcd(a,b): while (b) (a,b)=(b,a%b); lcm = a/gcd*b avoids overflow.",
    "Prime sieve to 10⁶; check √n trial division for one-off.",
    "a^b mod m: fast pow; mod negative carefully in Java/C++.",
    "Cross product for 2D only — say formula once.",
    "Hull: sort by x then y; upper + lower chains.",
    "Line slope as reduced (dx,dy) via gcd to avoid float.",
  ],

  leetcode: [
    {
      name: "Count Primes",
      number: 204,
      slug: "count-primes",
      invariant: "Sieve marks composites",
      prerequisite: "Eratosthenes",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Pow(x, n)",
      number: 50,
      slug: "powx-n",
      invariant: "Binary exponentiation",
      prerequisite: "Modexp pattern",
      difficulty: "Medium",
      stage: "foundation",
    },
    {
      name: "Valid Perfect Square",
      number: 367,
      slug: "valid-perfect-square",
      invariant: "Binary search on √n",
      prerequisite: "Integer sqrt",
      difficulty: "Easy",
      stage: "invariant",
    },
    {
      name: "Max Points on a Line",
      number: 149,
      slug: "max-points-on-a-line",
      invariant: "Canonical slope via gcd",
      prerequisite: "GCD + map",
      difficulty: "Hard",
      stage: "invariant",
    },
    {
      name: "Erect the Fence",
      number: 587,
      slug: "erect-the-fence",
      invariant: "Convex hull stack",
      prerequisite: "Cross product",
      difficulty: "Hard",
      stage: "modification",
    },
    {
      name: "Random Pick with Blacklist",
      number: 710,
      slug: "random-pick-with-blacklist",
      invariant: "Remap via mod / hash",
      prerequisite: "Mod arithmetic",
      difficulty: "Hard",
      stage: "modification",
    },
    {
      name: "Super Pow",
      number: 372,
      slug: "super-pow",
      invariant: "Modexp on digit array",
      prerequisite: "Pow mod",
      difficulty: "Medium",
      stage: "combination",
    },
    {
      name: "Self Crossing",
      number: 335,
      slug: "self-crossing",
      invariant: "Case analysis geometry",
      prerequisite: "Orientation",
      difficulty: "Hard",
      stage: "combination",
    },
  ],

  whyThisWorks: {
    maintained: "gcd value / unmarked primes / modular equivalence / CCW hull",
    discarded: "Larger arguments in gcd; composite multiples; non-extreme hull points",
    whyDiscarded: "Euclidean step and cross ≤0 pop preserve answer sets",
    discardInvariant: "Common divisors fixed; hull vertices remain extreme",
    progress: "b decreases; more sieved; exp halved; stack grows hull",
    finalState: "gcd, prime table, a^b mod m, hull polygon, line counts",
  },
};
