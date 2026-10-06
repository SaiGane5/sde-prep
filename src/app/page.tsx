import { CorePrinciples } from "@/components/CorePrinciples";
import { TopicCard } from "@/components/TopicCard";
import { topicCatalog } from "@/content/catalog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="animate-fade-up relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-10 sm:px-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

        <p className="font-mono text-xs tracking-widest text-cyan-400/80">
          SDE-1 INTERVIEW PREPARATION
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
          DSA Invariants Tree
        </h1>
        <p className="mt-2 text-lg text-[var(--text-muted)]">
          From Fundamentals to Advanced Applications
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          Do not learn DSA as a collection of problems. Learn it as a{" "}
          <span className="text-cyan-300">progression of invariants</span>. Each
          node adds one constraint, one proof step, one reusable idea.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/topics/stacks"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Start with Stacks (canonical)
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-bright)] bg-white/5 px-4 py-2.5 text-sm text-[var(--text)] transition hover:bg-white/10"
          >
            Master roadmap
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-[11px] leading-relaxed text-[var(--text-dim)] sm:text-xs">
          <span className="text-emerald-400">Simple Logic</span>
          {" → "}
          <span className="text-cyan-400">Invariant</span>
          {" → "}
          <span className="text-orange-400">Modification</span>
          {" → "}
          <span className="text-pink-400">Stronger Invariant</span>
          {" → "}
          <span className="text-purple-400">Data Structure</span>
          {" → "}
          <span className="text-yellow-400">Recursion</span>
          {" → "}
          <span className="text-blue-400">DP</span>
          {" → "}
          <span className="text-[var(--text)]">Interview</span>
        </div>
      </section>

      <CorePrinciples />

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">
              24 Topic Nodes
            </h2>
            <p className="text-sm text-[var(--text-dim)]">
              Progressive invariant trees — click any node to explore
            </p>
          </div>
          <span className="font-mono text-xs text-[var(--text-dim)]">4 × 6</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topicCatalog.map((t, i) => (
            <TopicCard key={t.slug} topic={t} index={i} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-dim)]">
          Macro progression
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {[
            "Basic Patterns",
            "Data Structures",
            "Advanced Techniques",
            "Problem Solving",
          ].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--text-dim)]">→</span>}
              <span className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[var(--text-muted)]">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-[var(--text-dim)]">
          The same invariant thinking applies everywhere — only the structure and
          constraints change.
        </p>
      </section>
    </div>
  );
}
