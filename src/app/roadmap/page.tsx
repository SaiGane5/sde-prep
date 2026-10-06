import {
  crossConnections,
  dependencyGraph,
  masterRoadmap,
  recognitionLoop,
} from "@/content/roadmap";
import Link from "next/link";

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <header className="animate-fade-up">
        <p className="font-mono text-xs tracking-widest text-cyan-400/80">
          MASTER ROADMAP
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text)]">
          How SDE-1 prep evolves
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)]">
          Optimize for reusable invariants, not problem count. The goal is
          recognition: same invariant, new costume.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Linear progression
          </h2>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--text-muted)]">
            {masterRoadmap}
          </pre>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Recognition loop
          </h2>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300/90">
            {recognitionLoop}
          </pre>
          <p className="mt-4 text-xs text-[var(--text-dim)]">
            Not: Problem → Memorized Solution.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">
          Cross-topic dependency graph
        </h2>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--text-muted)]">
          {dependencyGraph}
        </pre>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400">
          Cross-connections
        </h2>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--text-muted)]">
          {crossConnections}
        </pre>
      </section>

      <section className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          Canonical deep dive — Stacks progression from matching to DP
        </p>
        <Link
          href="/topics/stacks"
          className="mt-3 inline-block text-sm font-semibold text-cyan-400 hover:underline"
        >
          Open Stacks invariant tree →
        </Link>
      </section>
    </div>
  );
}
