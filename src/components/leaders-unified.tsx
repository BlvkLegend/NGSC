"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, UserRound, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";
import { asset } from "@/lib/asset";

const SIGNAL_COLOR: Record<string, string> = {
  good: "var(--signal-good)",
  mid:  "var(--signal-mid)",
  low:  "var(--signal-low)",
};

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = SIGNAL_COLOR[scoreToSignal(score)];
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono font-bold leading-none" style={{ fontSize: size < 36 ? 9 : 11, color }}>
        {score}
      </span>
    </div>
  );
}

function TrendBadge({ delta, trend }: { delta?: string; trend: "up" | "down" | "flat" }) {
  if (!delta || delta === "+0") return <Minus size={12} className="text-ink-muted" />;
  if (delta === "New")
    return <span className="font-mono text-[10px] font-bold text-cruise-500">NEW</span>;
  if (trend === "up")
    return <span className="flex items-center gap-0.5 font-mono text-[10px] font-bold text-signal-good"><TrendingUp size={10} />{delta}</span>;
  return <span className="flex items-center gap-0.5 font-mono text-[10px] font-bold text-signal-low"><TrendingDown size={10} />{delta}</span>;
}

const OFFICE_TYPES = ["All", "Governor", "Senator", "Local Government Chairman", "Minister"] as const;
type OfficeFilter = typeof OFFICE_TYPES[number];

// Ranking categories - user-facing discovery lenses, not governance sectors
const RANK_CATEGORIES = [
  "Most evaluated",
  "Least evaluated",
  "Highest score",
  "Lowest score",
  "Trending up",
  "Trending down",
] as const;
type RankCategory = typeof RANK_CATEGORIES[number];

export function LeadersUnified() {
  const { mode } = useMode();
  const [query, setQuery]               = useState("");
  const [officeFilter, setOfficeFilter] = useState<OfficeFilter>("All");
  const [rankCategory, setRankCategory] = useState<RankCategory>("Highest score");

  // 1. Filter by office type + search
  const filtered = useMemo(() => {
    let list = [...leaders];
    if (officeFilter !== "All") {
      list = list.filter((l) => l.role.toLowerCase().includes(officeFilter.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.jurisdiction.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.party.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, officeFilter]);

  // 2. Sort/filter by chosen ranking category
  const ranked = useMemo(() => {
    const base = [...filtered];
    switch (rankCategory) {
      case "Most evaluated":   return base.sort((a, b) => b.evaluations - a.evaluations);
      case "Least evaluated":  return base.sort((a, b) => a.evaluations - b.evaluations);
      case "Highest score":    return base.sort((a, b) => b.score - a.score);
      case "Lowest score":     return base.sort((a, b) => a.score - b.score);
      case "Trending up":      return base.filter((l) => l.trend === "up").sort((a, b) => b.score - a.score);
      case "Trending down":    return base.filter((l) => l.trend === "down").sort((a, b) => a.score - b.score);
      default:                 return base.sort((a, b) => b.score - a.score);
    }
  }, [filtered, rankCategory]);

  return (
    <div>
      {/* Hero photo band - -mx offsets bleed to container edge; pt-16 clears sticky nav */}
      <div className="relative -mx-6 overflow-hidden lg:-mx-10" style={{ height: "14rem" }}>
        <img
          src={asset("/leaders-hero.webp")}
          alt=""
          aria-hidden
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.80) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 pt-16 lg:px-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {mode === "cruise" ? "Who dey hold power?" : "Leaders & Rankings"}
          </h1>
          <p className="mt-1 text-[13px] text-white/65">
            {mode === "cruise"
              ? "Leaders wey citizens don score. See who dey deliver, who dey form."
              : "Search, filter, and rank by any category."}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* ── ROW 1: Search ── */}
        <div className="relative max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, state, party, or office"
            className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none focus-visible:border-forest-500"
          />
        </div>

        {/* ── ROW 2: Office type filter chips + Rank by dropdown (same row on desktop) ── */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {OFFICE_TYPES.map((o) => (
              <button
                key={o}
                onClick={() => setOfficeFilter(o)}
                className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                  officeFilter === o
                    ? "border-forest-500 bg-forest-500 text-white"
                    : "border-line bg-paper text-ink-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          {/* Rank by: dropdown - right side */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Rank by:
            </span>
            <select
              value={rankCategory}
              onChange={(e) => setRankCategory(e.target.value as RankCategory)}
              className="rounded-lg border border-line bg-paper-raised px-2.5 py-1 text-[12px] font-medium text-ink outline-none focus-visible:border-forest-500"
            >
              {RANK_CATEGORIES.map((cat) => {
                const cruiseLabel: Record<string, string> = {
                  "Most evaluated":  "Most evaluated",
                  "Least evaluated": "Least evaluated",
                  "Highest score":   "Who dey shine",
                  "Lowest score":    "Who dey fall",
                  "Trending up":     "On the rise",
                  "Trending down":   "On the drop",
                };
                return (
                  <option key={cat} value={cat}>
                    {mode === "cruise" ? cruiseLabel[cat] : cat}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* ── ROW 3: Ranking table ── */}
        <div className="overflow-hidden rounded-2xl border border-line">

          {ranked.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-ink-muted">
              {mode === "cruise" ? "Nobody match that search. Try another name." : "No officials match that search."}
            </div>
          ) : (
            ranked.map((leader, i) => {
              const catScore = (rankCategory === "Most evaluated" || rankCategory === "Least evaluated")
                ? leader.evaluations
                : leader.score;

              return (
                <Link
                  key={leader.slug}
                  href={`/leaders/${leader.slug}`}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-line bg-paper-raised px-4 py-3 last:border-b-0 transition-colors hover:bg-forest-tint/30 sm:grid-cols-[2.5rem_1fr_10rem_3.5rem]"
                >
                  {/* Rank + trend */}
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[13px] font-black leading-none text-ink">{i + 1}</span>
                    <TrendBadge delta={leader.trendDelta} trend={leader.trend} />
                  </div>

                  {/* Avatar + name block */}
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-line/40">
                      {leader.photoUrl ? (
                        <img src={asset(leader.photoUrl)} alt="" aria-hidden className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-ink-muted">
                          <UserRound size={15} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{leader.name}</p>
                      <p className="truncate text-[11px] text-ink-muted">
                        {leader.party} · {leader.evaluations.toLocaleString()} evals
                      </p>
                    </div>
                  </div>

                  {/* Role · state - desktop only */}
                  <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-[12px] text-ink">{leader.role}</p>
                    <p className="truncate text-[11px] text-ink-muted">{leader.jurisdiction}</p>
                  </div>

                  {/* Score ring */}
                  <div className="flex justify-end sm:justify-center">
                    <ScoreRing score={catScore} size={38} />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Results count */}
        <p className="text-[12px] text-ink-muted">
          {officeFilter !== "All" ? `${officeFilter}` : "All officials"}
          {query ? ` matching "${query}"` : ""}
          {" "}· ranked by {rankCategory.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
