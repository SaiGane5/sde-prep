import Link from "next/link";
import clsx from "clsx";
import type { TopicMeta } from "@/content/types";
import { TopicIcon } from "./TopicIcon";

export function TopicCard({ topic, index }: { topic: TopicMeta; index: number }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={clsx(
        `accent-${topic.accent}`,
        "glow-card group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-all duration-300",
        "hover:border-[color-mix(in_srgb,var(--topic)_50%,var(--border))] hover:bg-[var(--bg-card-hover)]",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index * 30, 600)}ms` }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--topic)_15%,transparent)] text-[var(--topic)]">
            <TopicIcon name={topic.icon} className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[10px] font-mono text-[var(--text-dim)]">
              {String(topic.id).padStart(2, "0")}
            </div>
            <h3 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--topic)]">
              {topic.title}
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-dim)]">
          {topic.abstraction.split("/")[0].trim()}
        </span>
      </div>

      <div className="mb-3 space-y-1">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--topic)]">
          Invariants
        </div>
        {topic.shortInvariants.slice(0, 3).map((inv) => (
          <div key={inv} className="flex gap-2 text-xs text-[var(--text-muted)]">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--topic)]" />
            <span>{inv}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-[var(--border)] pt-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
          Applications
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
          {topic.applications.join(" · ")}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, var(--topic), transparent)`,
        }}
      />
    </Link>
  );
}
