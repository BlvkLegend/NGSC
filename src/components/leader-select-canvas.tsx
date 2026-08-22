"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { asset } from "@/lib/asset";
import { useMode } from "@/lib/mode-context";
import { LeaderRow } from "@/components/leader-row";
import { EmptyState } from "@/components/empty-state";

export function LeaderSelectCanvas() {
  const { mode } = useMode();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (query.trim() === "") return leaders;
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.jurisdiction.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <span className="ledger-index text-[12px] text-forest-500">{mode === "cruise" ? "Pick your target" : "Choose your target"}</span>
      <h1 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
        {mode === "cruise" ? "Who you wan drag?" : "Select an official to evaluate"}
      </h1>
      <p className="mt-3 max-w-lg text-[14px] text-ink-muted">
        {mode === "cruise"
          ? "Tap a face. Ten quick questions dey wait for you."
          : "Ten structured questions follow, each scored against verifiable categories."}
      </p>

      <div className="relative mt-8 max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "cruise" ? "Search name or state" : "Search by name or state"}
          className="w-full rounded-full border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none placeholder:text-ink-muted focus-visible:border-forest-500"
        />
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <EmptyState
            title={mode === "cruise" ? "Nobody match that search" : "No one matches that search"}
            body={mode === "cruise" ? "Try another name or state." : "Try a different name or state."}
          />
        ) : mode === "cruise" ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((leader) => (
              <li key={leader.slug}>
                <Link
                  href={`/evaluate/${leader.slug}`}
                  className="flex w-full flex-col items-center gap-3 border border-line px-4 py-6 text-center transition-colors hover:border-cruise-500 hover:bg-cruise-tint/40"
                >
                  <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cruise-tint text-cruise-700">
                    {leader.photoUrl
                      ? <img src={asset(leader.photoUrl)} alt={leader.name} className="h-full w-full object-cover object-top" />
                      : <UserRound size={26} strokeWidth={1.5} />}
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-ink">{leader.name}</span>
                    <span className="block text-[12px] text-ink-muted">{leader.role}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-t border-line">
            {filtered.map((leader, i) => (
              <LeaderRow
                key={leader.slug}
                leader={leader}
                index={i}
                href={`/evaluate/${leader.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
