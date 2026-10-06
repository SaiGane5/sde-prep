import Link from "next/link";
import { Binary, Map, Network } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-deep)_85%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 transition group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <Binary className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-[var(--text)]">
              DSA Invariants
            </div>
            <div className="text-[11px] text-[var(--text-dim)]">
              SDE-1 · Proof-first prep
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[var(--text-muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
          >
            <Network className="h-3.5 w-3.5" />
            Topics
          </Link>
          <Link
            href="/roadmap"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[var(--text-muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
          >
            <Map className="h-3.5 w-3.5" />
            Roadmap
          </Link>
          <Link
            href="/topics/stacks"
            className="ml-2 rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-medium text-pink-300 transition hover:border-pink-400/50 hover:bg-pink-500/20"
          >
            Canonical: Stacks
          </Link>
        </nav>
      </div>
    </header>
  );
}
