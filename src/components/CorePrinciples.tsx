import { Math } from "@/components/Math";

const PRINCIPLES = [
  {
    title: "Initialization",
    formula: "I(0)=\\mathrm{true}",
    blurb: "The invariant holds before the first step.",
  },
  {
    title: "Maintenance",
    formula: "I(k)\\Rightarrow I(k+1)",
    blurb: "Each operation preserves the invariant.",
  },
  {
    title: "Progress / Variant",
    formula: "V_{k+1}<V_k",
    blurb: "A quantity that moves toward termination.",
  },
  {
    title: "Termination",
    formula: "\\exists\\, n:\\; k=n",
    blurb: "The algorithm stops in finite steps.",
  },
  {
    title: "Correctness",
    formula: "\\text{final state satisfies the goal}",
    blurb: "When it stops, the answer is right.",
  },
];

export function CorePrinciples() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
      <div className="mb-5 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Core Invariant Principles
        </h2>
        <p className="mt-2 text-xs text-[var(--text-dim)]">
          Five universal steps behind almost every DSA algorithm
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.title}
            className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-center"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-cyan-500/30 bg-[var(--bg-card)] px-2 font-mono text-[10px] text-cyan-400">
              {i + 1}
            </div>
            <div className="mt-1 text-xs font-semibold text-[var(--text)]">{p.title}</div>
            <div className="my-2 min-h-[2rem]">
              <Math expr={p.formula} />
            </div>
            <p className="text-[11px] leading-snug text-[var(--text-dim)]">{p.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
