"use client";

import katex from "katex";
import { useMemo } from "react";
import clsx from "clsx";

/** True math / LaTeX — must NOT be wrapped in \text{...}. */
function looksLikeMath(expr: string): boolean {
  if (/\\[a-zA-Z]+/.test(expr)) return true;
  if (/[_^]/.test(expr) || /[{}]/.test(expr)) return true;
  if (/[<>≤≥≠∈∉⊆⊇→←⇒⇔⟺]/.test(expr)) return true;
  if (/=/.test(expr) && !/\s/.test(expr)) return true;
  if (/^[OΘΩo]\([^)]*\)$/i.test(expr)) return true;
  // Bitwise / code-like math fragments
  if (/[&|~]/.test(expr) && /[A-Za-z0-9)]/.test(expr) && !/\s{2,}/.test(expr)) {
    return true;
  }
  return false;
}

function looksLikeProse(expr: string): boolean {
  if (looksLikeMath(expr)) return false;
  return /[A-Za-z]{2,}/.test(expr) && /\s/.test(expr);
}

/** Escape KaTeX-special chars that appear unescaped in math. */
function sanitizeMath(expr: string): string {
  return expr
    .replace(/(^|[^\\])&/g, "$1\\&")
    .replace(/(^|[^\\])#/g, "$1\\#");
}

function normalizeComplexity(expr: string): string | null {
  // O(n), Θ(n), O(n log n), O(n log k)
  const m = expr.match(/^([OΘΩo])\((.+)\)$/i);
  if (!m || expr.includes("\\")) return null;
  const letter = m[1];
  const inner = m[2]
    .replace(/\blog\b/gi, "\\log ")
    .replace(/\s+/g, " ")
    .trim();
  return `\\mathrm{${letter}}(${inner})`;
}

/**
 * Prepare a string for KaTeX.
 * - Real math (`C_{k+1}`, `V_{k+1}<V_k`, …) → sanitized, not wrapped
 * - Plain English → `\text{...}` so spaces survive
 */
export function prepareKatexExpr(expr: string): string {
  const trimmed = expr.trim();
  if (!trimmed) return trimmed;

  if (looksLikeMath(trimmed)) {
    const complexity = normalizeComplexity(trimmed);
    if (complexity) return sanitizeMath(complexity);
    return sanitizeMath(trimmed);
  }

  if (looksLikeProse(trimmed)) {
    const escaped = trimmed
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/([{}$#%&])/g, "\\$1");
    return `\\text{${escaped}}`;
  }

  return sanitizeMath(trimmed);
}

export function Math({
  expr,
  block = false,
  className,
}: {
  expr: string;
  block?: boolean;
  className?: string;
}) {
  const html = useMemo(() => {
    const prepared = prepareKatexExpr(expr);
    try {
      return katex.renderToString(prepared, {
        throwOnError: false,
        displayMode: block,
        strict: "ignore",
        trust: false,
      });
    } catch {
      return prepared
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  }, [expr, block]);

  return (
    <span
      className={clsx(block ? "block my-3 overflow-x-auto" : "inline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BoxedInvariant({
  expr,
  children,
}: {
  expr: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[color-mix(in_srgb,var(--topic)_40%,var(--border))] bg-[color-mix(in_srgb,var(--topic)_8%,var(--bg-elevated))] px-4 py-3">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--topic)]">
        Invariant
      </div>
      <Math expr={expr} block />
      {children}
    </div>
  );
}
