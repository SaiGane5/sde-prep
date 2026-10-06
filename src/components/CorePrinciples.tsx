import { Math } from "@/components/Math";

const PRINCIPLES = [
  {
    title: "Initialization",
    formula: "I(0)=\\mathrm{true}",
    blurb:
      "Before the algorithm runs, the statement you care about should already hold (often trivially).",
  },
  {
    title: "Maintenance",
    formula: "I(k)\\Rightarrow I(k+1)",
    blurb:
      "If the statement is true now, one valid step should keep it true for the next state.",
  },
  {
    title: "Progress",
    formula: "V_{k+1}<V_k",
    blurb:
      "Some measure—index, window size, remaining work—must move toward finishing.",
  },
  {
    title: "Termination",
    formula: "\\exists\\, n:\\; k=n",
    blurb: "The process cannot loop forever; it stops after a bounded number of steps.",
  },
  {
    title: "Correctness",
    formula: "\\text{final state satisfies the goal}",
    blurb:
      "When it stops, the invariant plus the problem definition implies the answer is correct.",
  },
];

export function CorePrinciples() {
  return (
    <section className="soft-card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[var(--text)] sm:text-xl">
        Core invariant principles
      </h2>
      <p className="mt-2 max-w-3xl body-text">
        Almost every technique on this site can be explained with the same five
        steps. You do not need to memorize them as jargon—think of them as a
        checklist when you justify why your code works.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
          >
            <div className="text-sm font-medium text-[var(--text-dim)]">
              Step {i + 1}
            </div>
            <div className="mt-1 text-base font-semibold text-[var(--text)]">
              {p.title}
            </div>
            <div className="my-3 min-h-[2.5rem] text-[var(--text)]">
              <Math expr={p.formula} />
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {p.blurb}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
