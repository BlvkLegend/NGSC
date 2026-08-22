"use client";

import { motion } from "framer-motion";
import { scoreToSignal } from "@/lib/utils";

const SIGNAL_VAR: Record<string, string> = {
  good: "var(--signal-good)",
  mid: "var(--signal-mid)",
  low: "var(--signal-low)",
};

export function ScoreRing({
  score,
  size = 88,
  stroke = 6,
  label,
}: {
  score: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = SIGNAL_VAR[scoreToSignal(score)];

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-[1.1rem] font-medium leading-none text-ink">{score}</span>
        {label && <span className="mt-1 text-[9px] uppercase tracking-wide text-ink-muted">{label}</span>}
      </div>
    </div>
  );
}
