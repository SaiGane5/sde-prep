import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-card)_92%,transparent)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="text-base font-semibold text-[var(--text)] sm:text-lg">
            DSA Invariants
          </span>
          <span className="text-sm text-[var(--text-dim)]">
            SDE-1 interview prep · proof-first
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-deep)] hover:text-[var(--text)]"
          >
            Topics
          </Link>
          <Link
            href="/roadmap"
            className="rounded-lg px-3 py-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-deep)] hover:text-[var(--text)]"
          >
            Roadmap
          </Link>
          <Link
            href="/topics/stacks"
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 font-medium text-[var(--text)] transition hover:bg-[var(--bg-deep)]"
          >
            Start: Stacks
          </Link>
        </nav>
      </div>
    </header>
  );
}
