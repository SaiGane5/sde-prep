"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Copy } from "lucide-react";

type Lang = "cpp" | "python";

export function CodeSnippets({
  cpp,
  python,
  compact = false,
}: {
  cpp: string;
  python: string;
  compact?: boolean;
}) {
  const [lang, setLang] = useState<Lang>("cpp");
  const [copied, setCopied] = useState(false);
  const code = lang === "cpp" ? cpp : python;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--code-bg)]",
        compact ? "mt-3" : "mt-4"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2">
        <div className="flex gap-1">
          {(["cpp", "python"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={clsx(
                "rounded-lg px-3 py-1.5 font-mono text-sm transition",
                lang === l
                  ? "bg-[var(--bg-card)] font-medium text-[var(--text)] shadow-sm"
                  : "text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              )}
            >
              {l === "cpp" ? "C++" : "Python"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-[var(--text-dim)] transition hover:bg-[var(--bg-card)] hover:text-[var(--text)]"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        className={clsx(
          "overflow-x-auto p-4 font-mono leading-relaxed text-[var(--text-muted)]",
          compact ? "max-h-64 text-sm" : "max-h-[28rem] text-sm sm:text-[0.9375rem]"
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
