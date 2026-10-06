"use client";

import type { Level, WhyThisWorks } from "@/content/types";
import { BoxedInvariant, Math } from "./Math";
import { CodeSnippets } from "./CodeSnippets";
import { getLevelSnippets } from "@/content/snippets";
import { PROOF_STEP_HINT, WHY_WORKS_LABELS } from "@/lib/displayText";
import { ExternalLink, ArrowDown } from "lucide-react";

function ProofBlock({ proof }: { proof: NonNullable<Level["proof"]> }) {
  const steps = [
    { label: "Invariant", body: proof.invariant },
    { label: "Initialization", body: proof.initialization },
    { label: "Maintenance", body: proof.maintenance },
    { label: "Progress / Variant", body: proof.progress },
    { label: "Termination", body: proof.termination },
    { label: "Final State", body: proof.finalState },
    { label: "Correctness", body: proof.correctness },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold text-[var(--text)]">Proof outline</h3>
      <p className="mt-2 body-text">
        A short correctness argument. You do not need perfect formality in an
        interview, but you should be able to hit each of these points in plain
        language.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {steps.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
          >
            <div className="text-base font-semibold text-[var(--text)]">
              {s.label}
            </div>
            {PROOF_STEP_HINT[s.label] && (
              <p className="mt-1 text-sm text-[var(--text-dim)]">
                {PROOF_STEP_HINT[s.label]}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyBlock({ why }: { why: WhyThisWorks }) {
  const rows = [
    ["Maintained", why.maintained],
    ["Discarded", why.discarded],
    ["Why discardable", why.whyDiscarded],
    ["Discard invariant", why.discardInvariant],
    ["Progress", why.progress],
    ["Final state", why.finalState],
  ] as const;
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-[var(--text)]">
        Why this approach works
      </h3>
      <p className="mt-2 body-text">
        Every good algorithm answers three questions: what you remember, what you
        can forget safely, and what always improves until you stop.
      </p>
      <p className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-center text-sm text-[var(--text-muted)] sm:text-base">
        Invariant + safe elimination + progress → a complete algorithm
      </p>
      <dl className="mt-5 space-y-4">
        {rows.map(([k, v]) => (
          <div key={k} className="border-b border-[var(--border)] pb-4 last:border-0">
            <dt className="text-sm font-medium text-[var(--text)]">
              {WHY_WORKS_LABELS[k] ?? k}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function NodeDetail({
  level,
  topicSlug,
}: {
  level: Level;
  topicSlug: string;
}) {
  const snippets =
    level.code ??
    getLevelSnippets(topicSlug, level.id, {
      title: level.title,
      problem: level.problem,
      coreInvariant: level.coreInvariant,
    });

  return (
    <article className="space-y-8">
      <header>
        <h2 className="text-xl font-semibold leading-snug text-[var(--text)] sm:text-2xl">
          {level.title}
        </h2>
        <p className="mt-3 body-text-lg">{level.problem}</p>
      </header>

      <BoxedInvariant expr={level.coreInvariant}>
        <p className="mt-4 text-sm text-[var(--text-dim)]">
          Sample code that maintains the invariant above:
        </p>
        <CodeSnippets cpp={snippets.cpp} python={snippets.python} compact />
      </BoxedInvariant>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
          <h3 className="text-base font-semibold text-[var(--text)]">
            Why this invariant is believable
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {level.whyTrue}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
          <h3 className="text-base font-semibold text-[var(--text)]">
            New idea at this level
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {level.newIdea}
          </p>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-[var(--text-dim)]">
            <span>
              Time:{" "}
              <span className="font-medium text-[var(--text)]">
                <Math expr={level.complexity.time} />
              </span>
            </span>
            <span>
              Space:{" "}
              <span className="font-medium text-[var(--text)]">
                <Math expr={level.complexity.space} />
              </span>
            </span>
          </div>
        </div>
      </div>

      {level.formula && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4">
          <h3 className="text-base font-semibold text-[var(--text)]">
            Useful formula
          </h3>
          <div className="mt-3">
            <Math expr={level.formula} block />
          </div>
        </div>
      )}

      {level.transition && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-[var(--text)]">
            How this level builds on the last
          </h3>
          <p className="mt-2 body-text">
            We keep the old invariant in mind, add one new constraint, and derive
            a stronger rule that still fits everything we already proved.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
              <p className="text-sm text-[var(--text-dim)]">
                Previous invariant <Math expr="I_k" />
              </p>
              <div className="mt-2">
                <Math expr={level.transition.previousInvariant} />
              </div>
            </div>
            <div className="flex justify-center text-[var(--text-dim)]">
              <ArrowDown className="h-5 w-5" aria-hidden />
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
              <p className="text-sm text-[var(--text-dim)]">
                New constraint <Math expr="C_{k+1}" />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                {level.transition.newConstraint}
              </p>
            </div>
            <div className="flex justify-center text-[var(--text-dim)]">
              <ArrowDown className="h-5 w-5" aria-hidden />
            </div>
            <div className="rounded-xl border border-[var(--border-bright)] bg-[var(--bg-card)] px-4 py-3">
              <p className="text-sm font-medium text-[var(--text)]">
                New invariant <Math expr="I_{k+1}" />
              </p>
              <div className="mt-2">
                <Math expr={level.transition.newInvariant} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            <span className="font-medium text-[var(--text)]">Why we need this: </span>
            {level.transition.whyNecessary}
          </p>
        </div>
      )}

      {level.proof && <ProofBlock proof={level.proof} />}

      {level.approaches && level.approaches.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">
            Different ways to solve the same problem
          </h3>
          <p className="mt-2 body-text">
            Each method keeps a different invariant. Pick the one that is easiest
            to explain under interview time pressure.
          </p>
          <div className="mt-4 grid gap-4">
            {level.approaches.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
              >
                <div className="text-base font-semibold text-[var(--text)]">
                  {a.name}
                </div>
                <div className="mt-2 text-sm text-[var(--text-muted)]">
                  <Math expr={a.invariant} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {a.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {level.whyThisWorks && <WhyBlock why={level.whyThisWorks} />}

      {level.related.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-[var(--text)]">
            Related problems
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {level.related.map((r) => (
              <li
                key={r}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm text-[var(--text-muted)]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[var(--text-dim)]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
