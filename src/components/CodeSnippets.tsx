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
        "overflow-hidden rounded-lg border border-[var(--border)] bg-[#0a0e17]",
        compact ? "mt-3" : "mt-4"
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-1.5">
        <div className="flex gap-1">
          {(["cpp", "python"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={clsx(
                "rounded px-2.5 py-1 font-mono text-[11px] transition",
                lang === l
                  ? "bg-[color-mix(in_srgb,var(--topic)_20%,transparent)] text-[var(--topic)]"
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
          className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text-muted)]"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        className={clsx(
          "overflow-x-auto p-3 font-mono leading-relaxed text-[var(--text-muted)]",
          compact ? "max-h-56 text-[10px]" : "max-h-96 text-[11px]"
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
