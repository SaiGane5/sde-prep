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
      <header>
        <h1 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">
          Study roadmap
        </h1>
        <p className="mt-4 max-w-3xl body-text-lg">
          This page shows how topics depend on each other. You do not have to
          follow it perfectly, but it helps to see why stacks come before monotonic
          tricks, or why recursion leads naturally into backtracking and DP.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="soft-card p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Recommended order
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
            A linear path from basics to advanced combinations.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-sm leading-relaxed text-[var(--text-muted)]">
            {masterRoadmap}
          </pre>
        </div>
        <div className="soft-card p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            How to use an interview question
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
            Train this loop instead of jumping straight to code.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-sm leading-relaxed text-[var(--text-muted)]">
            {recognitionLoop}
          </pre>
          <p className="mt-4 text-sm text-[var(--text-muted)] sm:text-base">
            Avoid the shortcut “see problem → recall memorized solution.” The
            invariant is what transfers to new questions.
          </p>
        </div>
      </section>

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Topic dependencies
        </h2>
        <p className="mt-2 body-text">
          Skills that unlock other skills—useful when you are deciding what to
          review next.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-sm leading-relaxed text-[var(--text-muted)]">
          {dependencyGraph}
        </pre>
      </section>

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Cross-connections
        </h2>
        <p className="mt-2 body-text">
          The same invariant often appears under different topic names. These
          links remind you where ideas reappear.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-sm leading-relaxed text-[var(--text-muted)]">
          {crossConnections}
        </pre>
      </section>

      <section className="soft-card p-6 text-center sm:p-8">
        <p className="body-text">
          For a full worked example—from parentheses matching to DP—read the
          Stacks topic next.
        </p>
        <Link
          href="/topics/stacks"
          className="mt-4 inline-block text-base font-medium text-[var(--text)] underline underline-offset-4 hover:opacity-80"
        >
          Open Stacks topic
        </Link>
      </section>
    </div>
  );
}
