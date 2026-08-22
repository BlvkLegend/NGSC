"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import { asset } from "@/lib/asset";
import type { Leader } from "@/lib/data";

// Trend delta rendering: New = orange, +N = green (no arrow, colour is enough), -N = red
function TrendDelta({ delta, trend }: { delta?: string; trend: Leader["trend"] }) {
  if (!delta) return null;

  if (delta === "New") {
    return (
      <span className="font-mono text-[11px] font-semibold text-cruise-500">New</span>
    );
  }
  if (trend === "up") {
    return (
      <span className="font-mono text-[11px] font-semibold text-signal-good">{delta}</span>
    );
  }
  if (trend === "down") {
    return (
      <span className="font-mono text-[11px] font-semibold text-signal-low">{delta}</span>
    );
  }
  return null;
}

export function LeaderRow({
  leader,
  index,
  href,
}: {
  leader: Leader;
  index: number;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/leaders/${leader.slug}`}
      className="group grid grid-cols-[2.5rem_auto_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-forest-tint/40 sm:gap-5 sm:py-4"
    >
      {/* Rank number + delta stacked below it */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[1.1rem] font-black leading-none text-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
        <TrendDelta delta={leader.trendDelta} trend={leader.trend} />
      </div>

      {/* Photo */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-forest-tint sm:h-11 sm:w-11">
        {leader.photoUrl ? (
          <img src={asset(leader.photoUrl)} alt={leader.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-forest-500">
            <UserRound size={18} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Name + role */}
      <div className="min-w-0">
        <h3 className="truncate text-[1.0rem] font-semibold text-ink group-hover:underline">
          {leader.name}
        </h3>
        <p className="mt-0.5 truncate text-[12px] text-ink-muted">
          {leader.role} · {leader.jurisdiction}
        </p>
      </div>

      {/* Score ring - number inside, filled to score % */}
      <ScoreRing score={leader.score} size={48} stroke={4} />
    </Link>
  );
}
