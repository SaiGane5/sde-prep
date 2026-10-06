"use client";

import { useState } from "react";
import type { Topic } from "@/content/types";
import { leetcodeUrl } from "@/content/types";
import { InvariantTreeNav } from "./InvariantTreeNav";
import { NodeDetail } from "./NodeDetail";
import { Math } from "./Math";
import { elaborateInterviewTrick } from "@/lib/displayText";
import { ExternalLink } from "lucide-react";
import { TopicTreeDiagram } from "./TopicTreeDiagram";

const STAGE_LABEL = {
  foundation: "Easy foundation",
  invariant: "Medium — core invariant",
  modification: "Medium — one new twist",
  combination: "Hard — combined ideas",
} as const;

const STAGE_INTRO = {
  foundation:
    "Start here to learn the basic invariant before any tricky variations.",
  invariant:
    "These problems stress the main rule you must be able to state and defend.",
  modification:
    "Same idea as before, but one constraint changes—watch how the invariant shifts.",
  combination:
    "Interview-style problems that merge two or more techniques from this topic.",
} as const;

export function TopicView({ topic }: { topic: Topic }) {
  const [activeId, setActiveId] = useState(topic.levels[0]?.id ?? "");
  const level = topic.levels.find((l) => l.id === activeId) ?? topic.levels[0];

  return (
    <div className={`accent-${topic.accent} space-y-10`}>
      <header>
        <p className="text-sm text-[var(--text-dim)]">
          Topic {String(topic.id).padStart(2, "0")}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
          {topic.title}
        </h1>
        <p className="mt-4 max-w-3xl body-text-lg">{topic.fundamentalIdea}</p>
        <p className="mt-3 max-w-3xl body-text">
          <span className="font-medium text-[var(--text)]">Big picture: </span>
          {topic.abstraction}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-8">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="soft-card p-4 sm:p-5">
            <InvariantTreeNav
              levels={topic.levels}
              activeId={level.id}
              onSelect={setActiveId}
            />
          </div>
        </aside>

        <div className="soft-card p-5 sm:p-7 lg:p-8">
          {level && <NodeDetail level={level} topicSlug={topic.slug} />}
        </div>
      </div>

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Topic map (overview)
        </h2>
        <p className="mt-2 body-text">
          A one-page sketch of how the levels connect. Use it when you want the
          whole thread before diving into details.
        </p>
        <div className="mt-5">
          <TopicTreeDiagram tree={topic.tree} />
        </div>
      </section>

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Complexity at a glance
        </h2>
        <p className="mt-2 body-text">
          Typical time and space for representative problems, plus the invariant
          each one is really about.
        </p>
        <div className="mt-4 -mx-2 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[36rem] text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-dim)]">
                <th className="px-2 pb-3 font-medium">Problem</th>
                <th className="px-2 pb-3 font-medium">Time</th>
                <th className="px-2 pb-3 font-medium">Space</th>
                <th className="px-2 pb-3 font-medium">Main invariant</th>
                <th className="px-2 pb-3 font-medium">Technique</th>
              </tr>
            </thead>
            <tbody>
              {topic.complexityTable.map((row) => (
                <tr key={row.problem} className="border-b border-[var(--border)]">
                  <td className="px-2 py-3 text-[var(--text)]">{row.problem}</td>
                  <td className="px-2 py-3">
                    <Math expr={row.time} />
                  </td>
                  <td className="px-2 py-3">
                    <Math expr={row.space} />
                  </td>
                  <td className="px-2 py-3 text-[var(--text-muted)]">
                    {row.mainInvariant}
                  </td>
                  <td className="px-2 py-3 text-[var(--text-muted)]">
                    {row.technique}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {topic.whyThisWorks && (
        <section className="soft-card p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            How to think about this topic in an interview
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["What you keep track of", topic.whyThisWorks.maintained],
              ["What you can ignore", topic.whyThisWorks.discarded],
              ["Why ignoring is safe", topic.whyThisWorks.whyDiscarded],
              ["The safety rule", topic.whyThisWorks.discardInvariant],
              ["What improves each step", topic.whyThisWorks.progress],
              ["What “done” means", topic.whyThisWorks.finalState],
            ].map(([q, a]) => (
              <div
                key={q}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
              >
                <div className="text-sm font-medium text-[var(--text)]">{q}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Pattern recognition (plain English)
        </h2>
        <p className="mt-2 body-text">
          Short cues to connect problem wording to the invariant family you
          practiced above.
        </p>
        <ul className="mt-5 space-y-4">
          {topic.interviewTricks.map((t) => (
            <li
              key={t}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base"
            >
              {elaborateInterviewTrick(t)}
            </li>
          ))}
        </ul>
      </section>

      <section className="soft-card p-5 sm:p-7">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          LeetCode problems (by difficulty)
        </h2>
        <p className="mt-2 body-text">
          A small set chosen for learning—not for grinding. Each link names the
          invariant you should practice stating out loud.
        </p>
        <div className="mt-6 space-y-8">
          {(["foundation", "invariant", "modification", "combination"] as const).map(
            (stage) => {
              const items = topic.leetcode.filter((p) => p.stage === stage);
              if (items.length === 0) return null;
              return (
                <div key={stage}>
                  <h3 className="text-base font-semibold text-[var(--text)]">
                    {STAGE_LABEL[stage]}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-dim)]">
                    {STAGE_INTRO[stage]}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {items.map((p) => (
                      <a
                        key={p.slug}
                        href={leetcodeUrl(p.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition hover:border-[var(--border-bright)]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-base font-medium text-[var(--text)] group-hover:underline">
                            {p.number}. {p.name}
                          </div>
                          <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-dim)]" />
                        </div>
                        <p className="mt-2 text-sm text-[var(--text-dim)]">
                          {p.difficulty} · build on {p.prerequisite}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                          <span className="font-medium text-[var(--text)]">
                            Invariant to practice:{" "}
                          </span>
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
