"use client";

import { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";
import { asset } from "@/lib/asset";

const SIGNAL_COLOR: Record<string, string> = {
  good: "var(--signal-good)",
  mid:  "var(--signal-mid)",
  low:  "var(--signal-low)",
};



function ScoreRing({ score }: { score: number }) {
  const size = 34;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = SIGNAL_COLOR[scoreToSignal(score)];

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono text-[9px] font-bold leading-none" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

export function LeaderboardWidget() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode } = useMode();
  const ranked = [...leaders].sort((a, b) => b.score - a.score);
  const accent = mode === "cruise" ? "bg-cruise-500" : "bg-forest-500";

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 120); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close after 20 seconds of no action
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 20_000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-72 overflow-hidden rounded-xl border border-line-strong bg-paper-raised/95 shadow-card backdrop-blur-md">
          <div className="border-b border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">
                {mode === "cruise" ? "Who dey lead" : "Rankings"}
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close leaderboard"
                className="text-ink-muted hover:text-ink">
                <X size={15} />
              </button>
            </div>
            <p className="mt-0.5 text-[11px] text-ink-muted">Avg score out of 100</p>
          </div>

          <ul className="divide-y divide-line">
            {ranked.slice(0, 5).map((l, i) => {
              const photo = l.photoUrl ? asset(l.photoUrl) : undefined;
              return (
                <li key={l.slug} className="flex items-center gap-2.5 px-4 py-2.5">
                  {/* 1. Rank number */}
                  <span className="w-4 shrink-0 font-mono text-[13px] font-black text-ink leading-none">
                    {i + 1}
                  </span>

                  {/* 2. Photo */}
                  <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-line/50">
                    {photo ? (
                      <img src={photo} alt="" aria-hidden className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink-muted text-[10px] font-bold">
                        {l.name[0]}
                      </div>
                    )}
                  </div>

                  {/* 3. Name */}
                  <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-ink">
                    {l.name.split(" ")[0]}
                  </span>

                  {/* 4. Grade circle - number inside, filled to score % */}
                  <ScoreRing score={l.score} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open leaderboard"
          className={`flex items-center gap-1.5 rounded-full ${accent} text-white shadow-card transition-all duration-300 ${
            scrolled ? "h-10 w-10 justify-center p-0" : "px-3.5 py-2 text-[12px] font-medium"
          }`}
        >
          <Trophy size={scrolled ? 16 : 13} />
          {!scrolled && "Leaderboard"}
        </button>
      )}
    </div>
  );
}
