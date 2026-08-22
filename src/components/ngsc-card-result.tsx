"use client";
// cruise-aware

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download, Link2, Share2, ArrowRight,
  Building2, Eye, ShieldAlert, HeartPulse, GraduationCap,
  Zap, Briefcase, ShoppingBasket, Scale, Users, UserRound,
} from "lucide-react";
import { scoreToGrade } from "@/lib/utils";
import { getLandmark, landmarkVariant } from "@/lib/landmarks";
import { route, asset } from "@/lib/asset";
import type { Leader } from "@/lib/data";
import { getRankTitle, getRankSubtext } from "@/lib/data";

const CAT_ICON: Record<string, React.ReactNode> = {
  Infrastructure:   <Building2 size={13} />,
  Transparency:     <Eye size={13} />,
  Security:         <ShieldAlert size={13} />,
  Healthcare:       <HeartPulse size={13} />,
  Education:        <GraduationCap size={13} />,
  "Power Supply":   <Zap size={13} />,
  "Job Creation":   <Briefcase size={13} />,
  "Cost of Living": <ShoppingBasket size={13} />,
  Economy:          <ShoppingBasket size={13} />,
  Accountability:   <Scale size={13} />,
  Responsiveness:   <Users size={13} />,
};

const PUBLIC_AVERAGE = 58;

const GRADE_COLOR: Record<string, string> = {
  A: "text-signal-good border-signal-good",
  B: "text-forest-500 border-forest-500",
  C: "text-signal-mid border-signal-mid",
  D: "text-cruise-500 border-cruise-500",
  F: "text-signal-low border-signal-low",
};

import { useMode } from "@/lib/mode-context";
export function NgscCardResult({ leader }: { leader: Leader }) {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const rawScore = searchParams.get("s");
  const parsed = rawScore ? parseInt(rawScore, 10) : NaN;
  const score = Number.isNaN(parsed) ? leader.score : Math.max(0, Math.min(100, parsed));
  const rankTitle = getRankTitle(score, mode);
  const rankSub = getRankSubtext(score, mode);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const grade = scoreToGrade(score);
  const diff = score - PUBLIC_AVERAGE;
  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);

  // Landmark background - same deterministic variant as the scorecard
  const bgVariant = landmarkVariant(`${leader.slug}-${score}`);
  const bgPhoto   = getLandmark(leader.jurisdiction, bgVariant);

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 3 });
      const link = document.createElement("a");
      link.download = `${leader.slug}-ngsc-record.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {}
    finally { setDownloading(false); }
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
    const url = `${origin}/card/${leader.slug}`;
    const text = `${leader.name} scored ${score}/100 on NGSC.`;
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: "NGSC", text, url }); } catch {}
    } else { handleCopyLink(); }
  }

  // Compare link - use route() helper to respect basePath
  const compareHref = route(`/compare?leader=${leader.slug}`);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Landmark background */}
      <img src={bgPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.90) 80%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300"
        >
          {mode === "cruise" ? "Verdict filed · NGSC card ready · Nigeria Governance Scorecard" : "Evaluation filed · NGSC card ready · Nigeria Governance Scorecard"}
        </motion.span>

        {/* Report card artifact */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Header strip - landmark photo behind name, matching Browse Leaders treatment */}
          <div className="relative overflow-hidden">
            <img src={bgPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.20) 100%)" }}
            />
            <div className="relative flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                {/* Photo placeholder - matches expanded Browse Leaders style */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 text-white">
                  <UserRound size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {mode === "cruise" ? "NGSC · Agbado Cruise" : "Nigeria Governance Scorecard"}
                  </p>
                  <p className="mt-0.5 text-[1.15rem] font-bold text-white">{leader.name}</p>
                  <p className="text-[12px] text-white/60">{leader.role} · {leader.jurisdiction}</p>
                </div>
              </div>
              {/* Overall grade stamp */}
              <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 bg-paper/10 backdrop-blur-sm ${GRADE_COLOR[grade]}`}>
                <span className={`font-mono text-[2.6rem] font-black leading-none ${GRADE_COLOR[grade].split(" ")[0]}`}>
                  {grade}
                </span>
                <span className="font-mono text-[9px] text-white/60">{score}/100</span>
              </div>
            </div>
          </div>

          {/* Subject table */}
          <div className="bg-paper">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-paper">
                  <th className="px-6 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">{mode === "cruise" ? "Area" : "Category"}</th>
                  <th className="px-4 py-2.5 text-right font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">Score</th>
                  <th className="w-32 px-4 py-2.5 text-right font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">Grade</th>
                  <th className="w-28 px-6 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sorted.map((cat, i) => {
                  const catGrade = scoreToGrade(cat.score);
                  return (
                    <motion.tr
                      key={cat.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="bg-paper"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
                          <span className="text-ink-muted">{CAT_ICON[cat.label] ?? <Building2 size={13} />}</span>
                          {cat.label}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[13px] text-ink">{cat.score}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${GRADE_COLOR[catGrade]}`}>
                          {catGrade}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.score}%` }}
                            transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              cat.score >= 70 ? "bg-signal-good" :
                              cat.score >= 50 ? "bg-signal-mid" : "bg-signal-low"
                            }`}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {/* Result footer */}
            <div className="border-t border-line px-6 py-5">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">{mode === "cruise" ? "Final verdict" : "Overall result"}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-black text-ink">{score}</span>
                    <span className="text-[13px] text-ink-muted">/ 100</span>
                    <span className={`ml-1 text-[13px] font-medium ${diff >= 0 ? "text-signal-good" : "text-signal-low"}`}>
                      {diff >= 0 ? "+" : ""}{diff} {mode === "cruise" ? "pass public avg" : "vs public avg"}
                    </span>
                  </div>
                </div>
                <div className={`shrink-0 rounded-lg border px-4 py-2 text-center ${GRADE_COLOR[grade]}`}>
                  <p className="font-mono text-[10px] uppercase tracking-wide opacity-70">{mode === "cruise" ? "Verdict" : "Remark"}</p>
                  <p className="mt-0.5 text-[13px] font-bold">
                    {rankTitle}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12px] italic text-ink-muted">{rankSub}</p>
              <div className="mt-4 border-t border-line pt-4 font-mono text-[10px] text-ink-muted">
                <span className="mr-4">Key: A=80-100 / B=65-79 / C=50-64 / D=35-49 / F=0-34</span>
                <span>{mode === "cruise" ? "NGSC citizen evaluation. Na your verdict, not government record." : "NGSC citizen evaluation. Not an official government record."}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 rounded-full bg-forest-500 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-forest-700 disabled:opacity-60"
          >
            <Download size={15} /> {downloading ? "Preparing..." : "Download"}
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:border-white/60"
          >
            <Link2 size={15} /> {copied ? "Copied" : "Copy link"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:border-white/60"
          >
            <Share2 size={15} /> Share
          </button>
          {/* Compare link */}
          <Link
            href={compareHref}
            className="flex items-center gap-1.5 text-[14px] font-medium text-white/70 hover:text-white"
          >
            Compare dem <ArrowRight size={15} />
          </Link>
          {/* Evaluate someone else */}
          <Link
            href="/select"
            className="ml-auto flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-[14px] font-medium text-white/70 hover:border-white/50 hover:text-white"
          >
            {mode === "cruise" ? "Evaluate another leader" : "Evaluate someone else"} <ArrowRight size={15} />
          </Link>
        </div>

        {/* NGSC logo bottom-right branding */}
        <div className="mt-6 flex justify-end">
          <img src={asset("/ngsc-logo.png")} alt="NGSC" className="h-8 w-auto opacity-60" />
        </div>
      </div>
    </div>
  );
}
