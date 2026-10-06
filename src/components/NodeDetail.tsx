"use client";

import type { Level, WhyThisWorks } from "@/content/types";
import { BoxedInvariant, Math } from "./Math";
import { CodeSnippets } from "./CodeSnippets";
import { getLevelSnippets } from "@/content/snippets";
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
    <div className="space-y-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
        Proof
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {steps.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3"
          >
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
              {s.label}
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{s.body}</p>
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
  ];
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Why this works
      </div>
      <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-center font-mono text-xs text-emerald-300">
        Invariant + Safe elimination + Progress = Algorithm
      </div>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-2 text-xs">
            <dt className="text-[var(--text-dim)]">{k}</dt>
            <dd className="text-[var(--text-muted)]">{v}</dd>
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
    <article className="animate-fade-up space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-[var(--text)]">{level.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {level.problem}
        </p>
      </header>

      <BoxedInvariant expr={level.coreInvariant}>
        <div className="mt-1 border-t border-[color-mix(in_srgb,var(--topic)_20%,var(--border))] pt-1">
          <div className="mb-0 mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Reference implementation
          </div>
          <CodeSnippets cpp={snippets.cpp} python={snippets.python} />
        </div>
      </BoxedInvariant>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
            Why true
          </div>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">{level.whyTrue}</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
            New idea introduced
          </div>
          <p className="text-xs leading-relaxed text-[var(--topic)]">{level.newIdea}</p>
          <div className="mt-3 flex gap-4 font-mono text-[11px] text-[var(--text-dim)]">
            <span>
              Time <span className="text-[var(--text)]">
                <Math expr={level.complexity.time} />
              </span>
            </span>
            <span>
              Space <span className="text-[var(--text)]">
                <Math expr={level.complexity.space} />
              </span>
            </span>
          </div>
        </div>
      </div>

      {level.formula && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
            Formula
          </div>
          <Math expr={level.formula} block />
        </div>
      )}

      {level.transition && (
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">
            Transition
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <div className="rounded-md bg-[var(--bg-elevated)] px-3 py-2">
              <div className="mb-1 text-[10px] text-[var(--text-dim)]">
                Previous <Math expr="I_k" />
              </div>
              <Math expr={level.transition.previousInvariant} />
            </div>
            <div className="flex justify-center text-orange-400">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div className="rounded-md bg-[var(--bg-elevated)] px-3 py-2">
              <div className="mb-1 text-[10px] text-[var(--text-dim)]">
                New constraint <Math expr="C_{k+1}" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">{level.transition.newConstraint}</p>
            </div>
            <div className="flex justify-center text-orange-400">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div className="rounded-md border border-orange-500/30 bg-[var(--bg-elevated)] px-3 py-2">
              <div className="mb-1 text-[10px] text-orange-400">
                New invariant <Math expr="I_{k+1}" />
              </div>
              <Math expr={level.transition.newInvariant} />
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            <span className="text-orange-300">Why necessary: </span>
            {level.transition.whyNecessary}
          </p>
        </div>
      )}

      {level.proof && <ProofBlock proof={level.proof} />}

      {level.approaches && level.approaches.length > 0 && (
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
            Approach comparison
          </div>
          <div className="grid gap-2">
            {level.approaches.map((a) => (
              <div
                key={a.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3"
              >
                <div className="text-xs font-semibold text-[var(--text)]">{a.name}</div>
                <div className="mt-1 text-[11px] text-[var(--topic)]">
                  <Math expr={a.invariant} />
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {level.whyThisWorks && <WhyBlock why={level.whyThisWorks} />}

      {level.related.length > 0 && (
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
            Related
          </div>
          <div className="flex flex-wrap gap-2">
            {level.related.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]"
              >
                <ExternalLink className="h-3 w-3 text-[var(--text-dim)]" />
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
