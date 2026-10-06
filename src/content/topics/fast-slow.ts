import type { Topic } from "../types";

export const fastSlow: Topic = {
  id: 4,
  slug: "fast-slow",
  title: "Fast-Slow Pointers",
  accent: "purple",
  icon: "rabbit",
  shortInvariants: ["fast = 2× slow", "Meet in cycle", "Entry via reset"],
  applications: ["Middle", "Cycle", "Entry", "Happy number", "Duplicate"],
  abstraction: "Relative speed on a path/cycle",
  fundamentalIdea:
    "Two pointers at different speeds turn geometric facts about paths and cycles into meeting-time equations.",

  levels: [
    {
      id: "fs0",
      title: "Level 0 — Relative speed",
      problem: "Understand positions after t steps: slow=t, fast=2t (in nodes).",
      coreInvariant: "pos_f = 2\\cdot pos_s \\pmod{\\text{structure}}",
      whyTrue: "By construction of step counts.",
      newIdea: "Speed ratio encodes structure",
      related: [],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "fs1",
      title: "Level 1 — Find middle",
      problem: "Return middle node of singly linked list.",
      coreInvariant: "\\text{When fast ends, slow is at mid}",
      whyTrue: "Fast moves twice as far; when fast finishes length n, slow traveled ⌊n/2⌋.",
      newIdea: "Middle without counting length",
      related: ["Middle of the Linked List (876)"],
      complexity: { time: "O(n)", space: "O(1)" },
      proof: {
        invariant: "After k iterations, slow advanced k, fast 2k (or terminated).",
        initialization: "Both at head.",
        maintenance: "slow=slow.next; fast=fast.next.next when possible.",
        progress: "fast approaches end.",
        termination: "fast is null or fast.next is null.",
        finalState: "slow at middle.",
        correctness: "Distance relation on a finite path.",
      },
    },
    {
      id: "fs2",
      title: "Level 2 — Cycle detection",
      problem: "Does the list contain a cycle? (Floyd)",
      coreInvariant: "\\text{If cycle exists, fast eventually lands on slow}",
      whyTrue:
        "In cycle of length C, relative speed 1 ⇒ gap closes. Once both in cycle, meeting is inevitable.",
      newIdea: "Meeting ⟺ cycle",
      related: ["Linked List Cycle (141)"],
      complexity: { time: "O(n)", space: "O(1)" },
      transition: {
        previousInvariant: "Path midpoint",
        newConstraint: "Possible loop",
        newInvariant: "Meeting inside cycle if one exists",
        whyNecessary: "Path logic doesn't detect loops; relative speed in a circle does.",
      },
      proof: {
        invariant: "Before entry: positions on stem. After both in cycle: gap decreases by 1 each step.",
        initialization: "Both at head.",
        maintenance: "fast gains one node per iteration on slow inside the cycle.",
        progress: "Gap mod C decreases.",
        termination: "Meet or fast hits null.",
        finalState: "Meet ⇒ cycle; null ⇒ acyclic.",
        correctness: "Finite cycle + relative speed 1 ⇒ meeting.",
      },
    },
    {
      id: "fs3",
      title: "Level 3 — Cycle entry",
      problem: "Return the node where the cycle begins.",
      coreInvariant: "\\text{After meet: reset one to head; advance both at speed 1 → entry}",
      whyTrue:
        "Let L=stem, μ=meet offset in cycle. Meeting ⇒ 2(L+a)=L+a+kC ⇒ L+a=kC. Sync from head meets at entry.",
      newIdea: "Algebra of stem + cycle",
      related: ["Linked List Cycle II (142)"],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "fs4",
      title: "Level 4 — Happy number / duplicate",
      problem: "Happy number cycle in functional graph; find duplicate in 1..n array.",
      coreInvariant: "f(x)\\text{ iteration graph has cycle; Floyd applies}",
      whyTrue: "Duplicate induces cycle in next = nums[x] functional graph.",
      newIdea: "Floyd beyond linked lists",
      related: ["Happy Number (202)", "Find the Duplicate Number (287)"],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "fs5",
      title: "Level 5 — Palindrome list",
      problem: "Palindrome linked list via mid + reverse second half.",
      coreInvariant: "\\text{slow at mid; reverse(second) compared to first}",
      whyTrue: "Middle splits; reverse enables forward compare.",
      newIdea: "Fast-slow + reverse combination",
      related: ["Palindrome Linked List (234)"],
      complexity: { time: "O(n)", space: "O(1)" },
    },
  ],

  tree: `Fast-Slow
│
├── Speed ratio
├── Middle
├── Cycle detect (meet)
├── Cycle entry (algebra)
├── Functional graphs
└── Mid + reverse palindrome`,

  complexityTable: [
    { problem: "Middle", time: "O(n)", space: "O(1)", mainInvariant: "2× distance", technique: "Fast-slow" },
    { problem: "Cycle I", time: "O(n)", space: "O(1)", mainInvariant: "Meet in cycle", technique: "Floyd" },
    { problem: "Cycle II", time: "O(n)", space: "O(1)", mainInvariant: "Stem algebra", technique: "Floyd+" },
    { problem: "Duplicate Number", time: "O(n)", space: "O(1)", mainInvariant: "Functional cycle", technique: "Floyd" },
  ],

  interviewTricks: [
    "Linked list middle / cycle → fast-slow.",
    "Cycle start → meet, then reset one to head.",
    "Array duplicate with O(1) space → treat as functional graph + Floyd.",
    "Happy number → cycle in sum-of-squares.",
  ],

  leetcode: [
    { name: "Middle of the Linked List", number: 876, slug: "middle-of-the-linked-list", invariant: "2× distance", prerequisite: "Path", difficulty: "Easy", stage: "foundation" },
    { name: "Linked List Cycle", number: 141, slug: "linked-list-cycle", invariant: "Meet ⇒ cycle", prerequisite: "Floyd", difficulty: "Easy", stage: "foundation" },
    { name: "Linked List Cycle II", number: 142, slug: "linked-list-cycle-ii", invariant: "Entry algebra", prerequisite: "Cycle I", difficulty: "Medium", stage: "invariant" },
    { name: "Happy Number", number: 202, slug: "happy-number", invariant: "Functional cycle", prerequisite: "Floyd", difficulty: "Easy", stage: "invariant" },
    { name: "Find the Duplicate Number", number: 287, slug: "find-the-duplicate-number", invariant: "nums as next[]", prerequisite: "Cycle entry", difficulty: "Medium", stage: "modification" },
    { name: "Palindrome Linked List", number: 234, slug: "palindrome-linked-list", invariant: "Mid + reverse", prerequisite: "Middle", difficulty: "Easy", stage: "combination" },
  ],
};
