"use client";

import { useState } from "react";
import type { Topic } from "@/content/types";
import { leetcodeUrl } from "@/content/types";
import { InvariantTreeNav } from "./InvariantTreeNav";
import { NodeDetail } from "./NodeDetail";
import { TopicIcon } from "./TopicIcon";
import { Math } from "./Math";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";

const STAGE_LABEL = {
  foundation: "Easy foundation",
  invariant: "Medium invariant",
  modification: "Medium+ modification",
  combination: "Hard combination",
} as const;

export function TopicView({ topic }: { topic: Topic }) {
  const [activeId, setActiveId] = useState(topic.levels[0]?.id ?? "");
  const level = topic.levels.find((l) => l.id === activeId) ?? topic.levels[0];

  return (
    <div className={clsx(`accent-${topic.accent}`, "space-y-10")}>
      <header className="animate-fade-up">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--topic)_15%,transparent)] text-[var(--topic)]">
            <TopicIcon name={topic.icon} className="h-5 w-5" />
          </span>
          <div>
            <div className="font-mono text-xs text-[var(--text-dim)]">
              Topic {String(topic.id).padStart(2, "0")}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
              {topic.title}
            </h1>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
          {topic.fundamentalIdea}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs text-[var(--text-muted)]">
          <span className="text-[var(--text-dim)]">Abstraction</span>
          <span className="text-[var(--topic)]">{topic.abstraction}</span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <InvariantTreeNav
              levels={topic.levels}
              activeId={level.id}
              onSelect={setActiveId}
              accent={topic.accent}
            />
          </div>
        </aside>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6">
          {level && <NodeDetail level={level} topicSlug={topic.slug} />}
        </div>
      </div>

      {/* ASCII tree */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
          Compact invariant tree
        </h2>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--text-muted)]">
          {topic.tree}
        </pre>
      </section>

      {/* Complexity */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
          Complexity table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-dim)]">
                <th className="pb-2 font-medium">Problem</th>
                <th className="pb-2 font-medium">Time</th>
                <th className="pb-2 font-medium">Space</th>
                <th className="pb-2 font-medium">Main Invariant</th>
                <th className="pb-2 font-medium">Technique</th>
              </tr>
            </thead>
            <tbody>
              {topic.complexityTable.map((row) => (
                <tr key={row.problem} className="border-b border-[var(--border)]/60">
                  <td className="py-2.5 text-[var(--text)]">{row.problem}</td>
                  <td className="py-2.5 font-mono text-[var(--topic)]">
                    <Math expr={row.time} />
                  </td>
                  <td className="py-2.5 font-mono text-[var(--text-muted)]">
                    <Math expr={row.space} />
                  </td>
                  <td className="py-2.5 text-[var(--text-muted)]">{row.mainInvariant}</td>
                  <td className="py-2.5 text-[var(--text-dim)]">{row.technique}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {topic.whyThisWorks && (
        <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Technique — Why this works
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["What is maintained?", topic.whyThisWorks.maintained],
              ["What is discarded?", topic.whyThisWorks.discarded],
              ["Why discardable?", topic.whyThisWorks.whyDiscarded],
              ["Discard invariant", topic.whyThisWorks.discardInvariant],
              ["Monotonic progress", topic.whyThisWorks.progress],
              ["Final state means", topic.whyThisWorks.finalState],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
                <div className="text-[10px] text-[var(--text-dim)]">{q}</div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interview tricks */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
          Interview recognition tricks
        </h2>
        <ul className="space-y-2">
          {topic.interviewTricks.map((t) => (
            <li
              key={t}
              className="flex gap-2 rounded-lg border border-[var(--border)]/80 bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-muted)]"
            >
              <span className="text-[var(--topic)]">→</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* LeetCode */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
          LeetCode mapping
        </h2>
        <p className="mb-4 text-xs text-[var(--text-dim)]">
          Selected for invariant transitions — not volume.
        </p>
        <div className="space-y-6">
          {(["foundation", "invariant", "modification", "combination"] as const).map(
            (stage) => {
              const items = topic.leetcode.filter((p) => p.stage === stage);
              if (items.length === 0) return null;
              return (
                <div key={stage}>
                  <div className="mb-2 flex items-center gap-2 text-xs text-[var(--text-dim)]">
                    <span className="font-semibold text-[var(--text-muted)]">
                      {STAGE_LABEL[stage]}
                    </span>
                    <span className="h-px flex-1 bg-[var(--border)]" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {items.map((p) => (
                      <a
                        key={p.slug}
                        href={leetcodeUrl(p.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 transition hover:border-[color-mix(in_srgb,var(--topic)_40%,var(--border))]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--topic)]">
                            {p.number}. {p.name}
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--text-dim)]" />
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[10px]">
                          <span
                            className={clsx(
                              "rounded px-1.5 py-0.5",
                              p.difficulty === "Easy" && "bg-emerald-500/15 text-emerald-400",
                              p.difficulty === "Medium" && "bg-amber-500/15 text-amber-400",
                              p.difficulty === "Hard" && "bg-red-500/15 text-red-400"
                            )}
                          >
                            {p.difficulty}
                          </span>
                          <span className="text-[var(--text-dim)]">via {p.prerequisite}</span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--text-muted)]">
                          <span className="text-[var(--topic)]">Invariant: </span>
                          {p.invariant}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}
