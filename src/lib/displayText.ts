/** Turn terse interview hints into fuller plain-English sentences (display only). */
export function elaborateInterviewTrick(trick: string): string {
  const t = trick.trim();
  if (t.includes("→")) {
    const [when, action] = t.split("→").map((s) => s.trim());
    const whenPlain = when.replace(/\.$/, "");
    const actionPlain = action.replace(/\.$/, "");
    return `When you notice ${whenPlain.toLowerCase()}, it often helps to ${actionPlain.toLowerCase()}.`;
  }
  if (!t.endsWith(".")) return `${t}.`;
  return t;
}

export const PROOF_STEP_HINT: Record<string, string> = {
  Invariant: "What must stay true after each step of the algorithm.",
  Initialization: "Why the rule holds before you process anything.",
  Maintenance: "Why one more step cannot break the rule.",
  "Progress / Variant": "What always moves forward so the loop cannot run forever.",
  Termination: "When the process stops and what that means.",
  "Final State": "What the invariant tells you at the end.",
  Correctness: "Why the final answer matches the problem.",
};

export const WHY_WORKS_LABELS: Record<string, string> = {
  Maintained: "Information the algorithm keeps on purpose",
  Discarded: "Information we stop tracking",
  "Why discardable": "Why dropping it cannot hide a better answer",
  "Discard invariant": "The rule that makes elimination safe",
  Progress: "What gets strictly better or smaller each step",
  "Final state": "What the end configuration represents",
};
