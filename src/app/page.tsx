import { CorePrinciples } from "@/components/CorePrinciples";
import { TopicCard } from "@/components/TopicCard";
import { topicCatalog } from "@/content/catalog";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <section className="soft-card px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-sm font-medium text-[var(--text-dim)]">
          SDE-1 interview preparation
        </p>
        <h1 className="mt-2 text-2xl font-semibold leading-snug text-[var(--text)] sm:text-3xl md:text-4xl">
          Learn DSA as a chain of invariants
        </h1>
        <p className="mt-4 max-w-3xl body-text-lg">
          Instead of memorizing dozens of unrelated LeetCode solutions, you follow
          one idea at a time. Each step adds a small new rule, explains why that
          rule is true, and shows how it connects to the next problem.
        </p>
        <p className="mt-3 max-w-3xl body-text">
          The goal is recognition: when a new question looks unfamiliar, you
          still spot the same underlying invariant you have already proved.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/topics/stacks"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--text)] px-5 py-3 text-base font-medium text-[var(--bg-deep)] transition hover:opacity-90"
          >
            Begin with Stacks (full walkthrough)
          </Link>
          <Link
            href="/roadmap"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-3 text-base text-[var(--text)] transition hover:bg-[var(--bg-deep)]"
          >
            See the full roadmap
          </Link>
        </div>

        <p className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          Typical learning path: simple logic → state an invariant → change one
          constraint → strengthen the invariant → add a data structure → combine
          techniques → interview-level problems.
        </p>
      </section>

      <CorePrinciples />

      <section>
        <h2 className="text-xl font-semibold text-[var(--text)] sm:text-2xl">
          All 24 topics
        </h2>
        <p className="mt-2 max-w-2xl body-text">
          Pick any topic below. Inside each one, levels build on each other like
          a short textbook chapter—not a random problem list.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topicCatalog.map((t) => (
            <TopicCard key={t.slug} topic={t} />
          ))}
        </div>
      </section>

      <section className="soft-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          How the curriculum grows
        </h2>
        <p className="mt-3 body-text">
          You move from basic control flow to loops, then to explicit invariants,
          then to pointers, stacks, queues, hashing, trees, heaps, graphs,
          recursion, backtracking, greedy methods, dynamic programming, and
          finally mixed interview problems. The same proof habits apply at every
          stage—only the data and constraints change.
        </p>
      </section>
    </div>
  );
}
