export type Difficulty = "Easy" | "Medium" | "Hard";

export type AccentColor =
  | "green"
  | "cyan"
  | "orange"
  | "purple"
  | "teal"
  | "pink"
  | "yellow"
  | "blue"
  | "red"
  | "emerald";

export interface Proof {
  invariant: string;
  initialization: string;
  maintenance: string;
  progress: string;
  termination: string;
  finalState: string;
  correctness: string;
}

export interface Transition {
  previousInvariant: string;
  newConstraint: string;
  newInvariant: string;
  whyNecessary: string;
}

export interface WhyThisWorks {
  maintained: string;
  discarded: string;
  whyDiscarded: string;
  discardInvariant: string;
  progress: string;
  finalState: string;
}

export interface ComplexityRow {
  problem: string;
  time: string;
  space: string;
  mainInvariant: string;
  technique: string;
}

export interface LeetCodeProblem {
  name: string;
  number: number;
  slug: string;
  invariant: string;
  prerequisite: string;
  difficulty: Difficulty;
  stage: "foundation" | "invariant" | "modification" | "combination";
}

export interface CodeSnippets {
  cpp: string;
  python: string;
}

export interface Level {
  id: string;
  title: string;
  problem: string;
  coreInvariant: string;
  whyTrue: string;
  proof?: Proof;
  formula?: string;
  complexity: { time: string; space: string };
  newIdea: string;
  related: string[];
  transition?: Transition;
  whyThisWorks?: WhyThisWorks;
  approaches?: { name: string; invariant: string; note: string }[];
  /** Optional curated snippets; UI also falls back to snippets registry. */
  code?: CodeSnippets;
}

export interface TopicMeta {
  id: number;
  slug: string;
  title: string;
  accent: AccentColor;
  icon: string;
  shortInvariants: string[];
  applications: string[];
  abstraction: string;
}

export interface Topic extends TopicMeta {
  fundamentalIdea: string;
  levels: Level[];
  tree: string;
  complexityTable: ComplexityRow[];
  interviewTricks: string[];
  leetcode: LeetCodeProblem[];
  whyThisWorks?: WhyThisWorks;
}

export function leetcodeUrl(slug: string): string {
  return `https://leetcode.com/problems/${slug}/`;
}
