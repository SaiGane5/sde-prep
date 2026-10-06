"use client";

import katex from "katex";
import { useMemo } from "react";
import clsx from "clsx";

function looksLikeMath(expr: string): boolean {
  if (/\\[a-zA-Z]+/.test(expr)) return true;
  if (/[_^]/.test(expr) || /[{}]/.test(expr)) return true;
  if (/[<>≤≥≠∈∉⊆⊇→←⇒⇔⟺]/.test(expr)) return true;
  if (/=/.test(expr) && !/\s/.test(expr)) return true;
  if (/^[OΘΩo]\([^)]*\)$/i.test(expr)) return true;
  if (/[&|~]/.test(expr) && /[A-Za-z0-9)]/.test(expr) && !/\s{2,}/.test(expr)) {
    return true;
  }
  return false;
}

function looksLikeProse(expr: string): boolean {
  if (looksLikeMath(expr)) return false;
  return /[A-Za-z]{2,}/.test(expr) && /\s/.test(expr);
}

function sanitizeMath(expr: string): string {
  return expr
    .replace(/(^|[^\\])&/g, "$1\\&")
    .replace(/(^|[^\\])#/g, "$1\\#");
}

function normalizeComplexity(expr: string): string | null {
  const m = expr.match(/^([OΘΩo])\((.+)\)$/i);
  if (!m || expr.includes("\\")) return null;
  const inner = m[2]
    .replace(/\blog\b/gi, "\\log ")
    .replace(/\s+/g, " ")
    .trim();
  return `\\mathrm{${m[1]}}(${inner})`;
}

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
      className={clsx(block ? "my-3 block overflow-x-auto" : "inline", className)}
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
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4">
      <p className="text-sm font-medium text-[var(--text)]">
        Core invariant (what you keep true while the algorithm runs)
      </p>
      <div className="mt-3">
        <Math expr={expr} block />
      </div>
      {children}
    </div>
  );
}
