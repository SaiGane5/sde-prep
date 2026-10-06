"use client";

import clsx from "clsx";
import type { Level } from "@/content/types";

export function InvariantTreeNav({
  levels,
  activeId,
  onSelect,
}: {
  levels: Level[];
  activeId: string;
  onSelect: (id: string) => void;
  accent?: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[var(--text)]">Levels in this topic</p>
      <p className="mt-1 text-sm text-[var(--text-dim)]">
        Tap a step to read the problem, invariant, and code for that stage.
      </p>
      <ol className="mt-4 space-y-2">
        {levels.map((level, i) => {
          const active = level.id === activeId;
          const label = level.title.replace(/^Level \d+ — /, "");
          return (
            <li key={level.id}>
              <button
                type="button"
                onClick={() => onSelect(level.id)}
                className={clsx(
                  "w-full rounded-xl border px-4 py-3 text-left transition",
                  active
                    ? "border-[var(--border-bright)] bg-[var(--bg-deep)]"
                    : "border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)]"
                )}
              >
                <div className="flex gap-3">
                  <span
                    className={clsx(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                      active
                        ? "bg-[var(--text)] text-[var(--bg-card)]"
                        : "bg-[var(--bg-deep)] text-[var(--text-dim)]"
                    )}
                  >
                    {i}
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-medium text-[var(--text)]">
                      {label}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {level.newIdea}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
