"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { LeaderRow } from "@/components/leader-row";
import { EmptyState } from "@/components/empty-state";
import { leaders } from "@/lib/data";

const OFFICES = ["All offices", "Governor", "Senator", "Local Government Chairman"];

export function LeadersDirectory() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [office, setOffice] = useState("All offices");

  const filtered = useMemo(() => {
    return leaders.filter((l) => {
      const matchesQuery =
        query.trim() === "" ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.jurisdiction.toLowerCase().includes(query.toLowerCase());
      const matchesOffice = office === "All offices" || l.role === office;
      return matchesQuery && matchesOffice;
    });
  }, [query, office]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or state"
            className="w-full rounded-full border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none placeholder:text-ink-muted focus-visible:border-forest-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {OFFICES.map((o) => (
            <button
              key={o}
              onClick={() => setOffice(o)}
              className={`rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
                office === o
                  ? "border-forest-500 bg-forest-tint text-ink"
                  : "border-line text-ink-muted hover:border-line-strong"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <EmptyState
            title="No officials match that search"
            body="Try a different name, state, or office type. New officials are added to the register every week."
            action={
              <button
                onClick={() => {
                  setQuery("");
                  setOffice("All offices");
                }}
                className="rounded-full border border-line px-5 py-2 text-[13px] font-medium text-ink hover:border-line-strong"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="border-t border-line">
            {filtered.map((leader, i) => (
              <LeaderRow key={leader.slug} leader={leader} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
