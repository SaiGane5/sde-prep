"use client";

import clsx from "clsx";
import type { Level } from "@/content/types";

export function InvariantTreeNav({
  levels,
  activeId,
  onSelect,
  accent,
}: {
  levels: Level[];
  activeId: string;
  onSelect: (id: string) => void;
  accent: string;
}) {
  return (
    <div className={clsx(`accent-${accent}`, "relative")}>
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
        Invariant Tree
      </div>
      <ol className="relative space-y-0">
        {levels.map((level, i) => {
          const active = level.id === activeId;
          const isLast = i === levels.length - 1;
          return (
            <li key={level.id} className="relative flex gap-3">
              <div className="flex w-6 flex-col items-center">
                <button
                  type="button"
                  onClick={() => onSelect(level.id)}
                  className={clsx(
                    "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono transition",
                    active
                      ? "border-[var(--topic)] bg-[var(--topic)] text-[var(--bg-deep)] shadow-[0_0_16px_color-mix(in_srgb,var(--topic)_50%,transparent)]"
                      : "border-[var(--border-bright)] bg-[var(--bg-elevated)] text-[var(--text-dim)] hover:border-[var(--topic)] hover:text-[var(--topic)]"
                  )}
                >
                  {i}
                </button>
                {!isLast && (
                  <div
                    className="w-px flex-1 bg-gradient-to-b from-[var(--border-bright)] to-transparent"
                    style={{ minHeight: 28 }}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => onSelect(level.id)}
                className={clsx(
                  "mb-3 w-full rounded-lg border px-3 py-2 text-left transition",
                  active
                    ? "border-[color-mix(in_srgb,var(--topic)_45%,var(--border))] bg-[color-mix(in_srgb,var(--topic)_10%,var(--bg-card))]"
                    : "border-transparent bg-transparent hover:border-[var(--border)] hover:bg-[var(--bg-card)]"
                )}
              >
                <div
                  className={clsx(
                    "text-xs font-medium",
                    active ? "text-[var(--topic)]" : "text-[var(--text)]"
                  )}
                >
                  {level.title.replace(/^Level \d+ — /, "")}
                </div>
                <div className="mt-0.5 line-clamp-1 font-mono text-[10px] text-[var(--text-dim)]">
                  {level.newIdea}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
