"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Link2, Share2, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { CallCardVisual } from "@/components/call-card-visual";
import { GradeBadge } from "@/components/grade-badge";
import { scoreToGrade } from "@/lib/utils";
import type { Leader } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const PUBLIC_AVERAGE = 58;

export function CallCardResult({ leader }: { leader: Leader }) {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const rawScore = searchParams.get("s");
  const parsed = rawScore ? parseInt(rawScore, 10) : NaN;
  const score = Number.isNaN(parsed) ? leader.score : Math.max(0, Math.min(100, parsed));
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const resolvedLeader = useMemo<Leader>(
    () => ({ ...leader, score }),
    [leader, score]
  );

  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 2);
  const weaknesses = sorted.slice(-2).reverse();
  const diff = score - PUBLIC_AVERAGE;

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
      });
      const link = document.createElement("a");
      link.download = `${leader.slug}-ngsc-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Environment without canvas support, silently no-op
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      await navigator.clipboard.writeText(`${origin}/card/${leader.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function handleShare() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/card/${leader.slug}`;
    const shareText = `${leader.name} scored ${score}/100 on NGSC.`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "NGSC", text: shareText, url: shareUrl });
      } catch {}
    } else {
      handleCopyLink();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ledger-index text-[12px] text-forest-500"
      >
        {mode === "cruise" ? "NGSC verdict filed." : "Nigeria Governance Scorecard evaluation filed."}
      </motion.span>

      <div className="mt-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: the physical card artifact */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div ref={cardRef} className="rotate-[-2deg]">
            <CallCardVisual leader={resolvedLeader} />
          </div>
        </motion.div>

        {/* Right: score narrative */}
        <div>
          <div className="flex items-center gap-5">
            <GradeBadge score={score} size="lg" />
            <div>
              <div className="font-display text-lg font-medium text-ink">{leader.name}</div>
              <p className="text-[13px] text-ink-muted">
                {leader.role} · {leader.jurisdiction}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 border-t border-line pt-6"
          >
            <p className="text-[13px] uppercase tracking-wide text-ink-muted">{mode === "cruise" ? "Score oga get" : "Governance score"}</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono text-5xl font-medium text-ink">{score}</span>
              <span className="text-lg text-ink-muted">/ 100 · {mode === "cruise" ? "grade" : "grade"} {scoreToGrade(score)}</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[13px]">
              {diff >= 0 ? (
                <TrendingUp size={15} className="text-signal-good" />
              ) : (
                <TrendingDown size={15} className="text-signal-low" />
              )}
              <span className={diff >= 0 ? "text-signal-good" : "text-signal-low"}>
                {Math.abs(diff)} {mode === "cruise" ? (diff >= 0 ? "points pass public average" : "points below public average") : `points ${diff >= 0 ? "above" : "below"} the public average of ${PUBLIC_AVERAGE}`}
              </span>
            </div>

            <div className="mt-3 h-[6px] w-full max-w-sm overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-line-strong" style={{ width: `${PUBLIC_AVERAGE}%` }} />
              <div
                className="-mt-[6px] h-full rounded-full bg-forest-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </motion.div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-signal-good">
                Strengths
              </h3>
              <ul className="mt-3 space-y-2">
                {strengths.map((s) => (
                  <li key={s.label} className="flex items-center justify-between text-[14px]">
                    <span className="text-ink">{s.label}</span>
                    <span className="font-mono text-ink-muted">{s.score}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-signal-low">
                Needs attention
              </h3>
              <ul className="mt-3 space-y-2">
                {weaknesses.map((w) => (
                  <li key={w.label} className="flex items-center justify-between text-[14px]">
                    <span className="text-ink">{w.label}</span>
                    <span className="font-mono text-ink-muted">{w.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 rounded-full bg-forest-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-forest-700 disabled:opacity-60"
            >
              <Download size={15} /> {downloading ? "Preparing…" : "Download image"}
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-line-strong"
            >
              <Link2 size={15} /> {copied ? "Link copied" : "Copy link"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-line-strong"
            >
              <Share2 size={15} /> {mode === "cruise" ? "Share am" : "Share"}
            </button>
            <a
              href={`/compare?leader=${leader.slug}`}
              className="ml-auto flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-forest-500"
            >
              {mode === "cruise" ? "Compare dem" : "Compare with others"} <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
