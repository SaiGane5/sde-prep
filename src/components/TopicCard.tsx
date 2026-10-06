import Link from "next/link";
import type { TopicMeta } from "@/content/types";

export function TopicCard({ topic }: { topic: TopicMeta }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--border-bright)] hover:bg-[var(--bg-card-hover)]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-[var(--text)] group-hover:underline">
          {topic.title}
        </h3>
        <span className="shrink-0 text-sm text-[var(--text-dim)]">
          #{String(topic.id).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 text-sm text-[var(--text-dim)]">{topic.abstraction}</p>

      <div className="mt-4">
        <p className="text-sm font-medium text-[var(--text)]">Key invariants</p>
        <ul className="mt-2 space-y-2">
          {topic.shortInvariants.map((inv) => (
            <li
              key={inv}
              className="text-sm leading-relaxed text-[var(--text-muted)]"
            >
              {inv}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text-muted)]">
        <span className="font-medium text-[var(--text)]">Used for: </span>
        {topic.applications.join(", ")}.
      </p>
    </Link>
  );
}
