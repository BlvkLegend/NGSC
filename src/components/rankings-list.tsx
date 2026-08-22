"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserRound, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const TABS = ["Top rated", "Lowest rated"] as const;
type Tab = (typeof TABS)[number];

// Deterministic delta: ensures top-ranked people mostly show + and bottom - (not random)
function getDelta(score: number, rank: number): { label: string; dir: "up" | "down" | "flat" } {
  // Hash from score and rank gives a small spread, but biased by position
  const seed = (score * 7 + rank * 13) % 100;
  if (rank <= 2) {
    // Top 2: mostly rising or flat
    const v = seed % 4;
    if (v === 0) return { label: "flat", dir: "flat" };
    return { label: `+${(v % 2) + 1}`, dir: "up" };
  }
  if (rank >= 5) {
    // Bottom: mostly falling or flat
    const v = seed % 4;
    if (v === 0) return { label: "flat", dir: "flat" };
    return { label: `-${(v % 2) + 1}`, dir: "down" };
  }
  const v = seed % 5;
  if (v <= 1) return { label: `+${v + 1}`, dir: "up" };
  if (v === 2) return { label: "flat", dir: "flat" };
  return { label: `-${v - 2}`, dir: "down" };
}

const GRADE_RING: Record<string, string> = {
  A: "ring-signal-good text-signal-good",
  B: "ring-forest-500 text-forest-500",
  C: "ring-signal-mid text-signal-mid",
  D: "ring-cruise-500 text-cruise-500",
  F: "ring-signal-low text-signal-low",
};

function gradeFromScore(score: number) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function RankingsList() {
  const [tab, setTab] = useState<Tab>("Top rated");
  const { mode } = useMode();

  const sorted = useMemo(() => {
    const copy = [...leaders];
    if (tab === "Lowest rated") return copy.sort((a, b) => a.score - b.score);
    return copy.sort((a, b) => b.score - a.score);
  }, [tab]);

  return (
    <div>
      {/* One clean title, one short line */}
      <div className="mb-6 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[1.6rem] font-bold text-ink">
            {mode === "cruise" ? "NGSC Hotlist" : "Rankings"}
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-muted">
            {mode === "cruise" ? "Who perform, who dey form" : "Ranked by average governance score out of 100"}
          </p>
        </div>
        <div className="flex gap-1.5">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                tab === t ? "bg-forest-500 text-white" : "text-ink-muted hover:text-ink"
              }`}>
              {mode === "cruise"
                ? t === "Top rated" ? "Who dey shine" : "Who dey fall"
                : t}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="mb-1 grid grid-cols-[3rem_3rem_1fr_3.5rem] items-center gap-3 px-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted sm:grid-cols-[3.5rem_3.5rem_1fr_4rem]">
        <span>Rank</span>
        <span />
        <span>Name</span>
        <span className="text-right">Grade</span>
      </div>

      <div className="divide-y divide-line">
        {sorted.map((leader, i) => {
          const rank = i + 1;
          const grade = gradeFromScore(leader.score);
          const delta = getDelta(leader.score, rank);

          return (
            <Link key={leader.slug} href={`/leaders/${leader.slug}`}
              className="group grid grid-cols-[3rem_3rem_1fr_3.5rem] items-center gap-3 py-3.5 transition-colors hover:bg-forest-tint/30 sm:grid-cols-[3.5rem_3.5rem_1fr_4rem]">

              {/* Rank + delta stacked */}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[1.5rem] font-black leading-none text-ink">{rank}</span>
                <span className={`mt-0.5 flex items-center gap-0.5 font-mono text-[10px] font-bold ${
                  delta.dir === "up" ? "text-signal-good" :
                  delta.dir === "down" ? "text-signal-low" : "text-ink-muted"
                }`}>
                  {delta.dir === "up" && <ArrowUp size={9} />}
                  {delta.dir === "down" && <ArrowDown size={9} />}
                  {delta.dir === "flat" && <Minus size={9} />}
                  {delta.label !== "flat" && delta.label}
                </span>
              </div>

              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-line/40 text-ink-muted">
                <UserRound size={20} strokeWidth={1.5} />
              </div>

              {/* Name + role */}
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink group-hover:underline">{leader.name}</p>
                <p className="truncate text-[12px] text-ink-muted">{leader.role} · {leader.jurisdiction}</p>
              </div>

              {/* Circular gradient grade: no score number below */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 font-mono text-[1.1rem] font-black ${GRADE_RING[grade]}`}>
                {grade}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
