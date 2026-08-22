"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Share2, Copy, ArrowRight, UserRound, Check } from "lucide-react";
import { getRankTitle, getRankSubtext, leaders } from "@/lib/data";
import { postToFeed, updateCaption } from "@/lib/community";
import { scoreToSignal, scoreToGrade, cn } from "@/lib/utils";
import { useMode } from "@/lib/mode-context";
import { MicrophoneRoom } from "@/components/microphone-room";
import { getLandmark, landmarkVariant } from "@/lib/landmarks";
import { asset } from "@/lib/asset";
import type { Leader } from "@/lib/data";

// ─────────────────────────────────────────────
// TAXPAYER: 5 textile pattern variants
// No gradients, no gradient borders - pattern fills card
// ─────────────────────────────────────────────
const TEXTILE_VARIANTS = [
  {
    id: "ankara",
    label: "Ankara",
    src: asset("/pattern-ankara.jpg"),
    // Warm red/gold - use dark ink overlay + white text
    overlay: "rgba(0,0,0,0.55)",
    swatch: "bg-[#b84a18]",
    textDark: false,
  },
  {
    id: "adire",
    label: "Adire",
    src: asset("/pattern-adire.jpg"),
    // Teal/magenta - dark overlay
    overlay: "rgba(0,0,0,0.52)",
    swatch: "bg-[#0e8a8a]",
    textDark: false,
  },
  {
    id: "tiedye",
    label: "Tie-dye",
    src: asset("/pattern-tiedye.jpg"),
    // Teal stars - dark overlay
    overlay: "rgba(0,0,0,0.50)",
    swatch: "bg-[#00a89d]",
    textDark: false,
  },
  {
    id: "asooke",
    label: "Aso-oke",
    src: asset("/pattern-asooke.jpg"),
    // Blue/white/black - dark overlay
    overlay: "rgba(0,0,0,0.54)",
    swatch: "bg-[#1a35c2]",
    textDark: false,
  },
  {
    id: "kente",
    label: "Kente",
    src: asset("/pattern-kente.webp"),
    // Orange/gold - dark overlay
    overlay: "rgba(0,0,0,0.52)",
    swatch: "bg-[#c84a00]",
    textDark: false,
  },
] as const;

type TextileId = typeof TEXTILE_VARIANTS[number]["id"];

// ─────────────────────────────────────────────
// CRUISE: 5 Nigerian landmark variants
// Liquid-crystal frosted panels, dark gradient overlay
// ─────────────────────────────────────────────
const CRUISE_VARIANTS = [
  {
    id: "lekki",
    label: "Lekki",
    src: asset("/landmark-lekki.jpg"),
    // Night bridge - dark overlay
    overlay: "rgba(0,0,0,0.62)",
    swatch: "bg-[#1a2f5a]",
  },
  {
    id: "waterfall",
    label: "Waterfall",
    src: asset("/landmark-waterfall.jpg"),
    // Bright day - stronger overlay
    overlay: "rgba(0,0,0,0.58)",
    swatch: "bg-[#1a5a2a]",
  },
  {
    id: "mosque",
    label: "North",
    src: asset("/landmark-mosque.jpg"),
    // Warm terracotta - dark overlay
    overlay: "rgba(0,0,0,0.55)",
    swatch: "bg-[#8a3a00]",
  },
  {
    id: "kano",
    label: "Kano",
    src: asset("/landmark-kano.jpg"),
    // Dusk brick - dark overlay
    overlay: "rgba(0,0,0,0.58)",
    swatch: "bg-[#5a2a1a]",
  },
  {
    id: "abuja",
    label: "Abuja",
    src: asset("/landmark-abuja.jpg"),
    // Blue sky gate - medium overlay
    overlay: "rgba(0,0,0,0.52)",
    swatch: "bg-[#2a4a1a]",
  },
] as const;

type CruiseId = typeof CRUISE_VARIANTS[number]["id"];

// Category bar - white text on any background
function CategoryBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[5.5rem] shrink-0 truncate text-[9px] font-medium uppercase tracking-wide text-white/72">
        {label}
      </span>
      <div className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden">
        <div className="h-full rounded-full bg-white/85" style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-[9px] font-semibold text-white/80 w-5 text-right">{score}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAXPAYER CARD - textile pattern background
// ─────────────────────────────────────────────
function TaxpayerCard({
  leader,
  score,
  rank,
  rankSub,
  variant,
}: {
  leader: Leader;
  score: number;
  rank: string;
  rankSub: string;
  variant: typeof TEXTILE_VARIANTS[number];
}) {
  const grade = scoreToGrade(score);
  return (
    <div className="relative mx-auto flex aspect-[9/16] w-full max-w-[320px] flex-col justify-between overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {/* Textile pattern fills entire card */}
      <img
        src={variant.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark overlay - ensures all text reads */}
      <div
        className="absolute inset-0"
        style={{ background: variant.overlay }}
      />
      {/* Bottom-weighted extra darkness for text area */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
        }}
      />

      {/* Card content */}
      <div className="relative px-6 pt-7">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.26em] text-white">
            NIGERIA GOVERNANCE SCORECARD
          </p>
        </div>
        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/60">
          {leader.jurisdiction}
        </p>

        <div className="mt-5 flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-white/12 text-white">
              {leader.photoUrl
                ? <img src={asset(leader.photoUrl)} alt={leader.name} className="h-full w-full object-cover object-top" />
                : <UserRound size={20} strokeWidth={1.5} />}
            </div>
            <h2 className="mt-2.5 text-[1.2rem] font-bold leading-tight text-white drop-shadow-sm">
              {leader.name}
            </h2>
            <p className="mt-0.5 text-[10px] font-medium text-white/75">{leader.role}</p>
          </div>

          {/* Grade stamp - white bordered box, no gradient */}
          <div className="flex flex-col items-center rounded-xl border-2 border-white/50 bg-white/12 px-3 py-2 backdrop-blur-sm">
            <span className="font-mono text-[3rem] font-black leading-none text-white drop-shadow">
              {grade}
            </span>
            <span className="font-mono text-[8px] text-white/60">{score}/100</span>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-6">
        {/* Verdict - frosted panel */}
        <div className="rounded-xl border border-white/20 bg-white/12 px-4 py-3 backdrop-blur-md">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">NGSC Verdict</p>
          <p className="mt-1 text-[1rem] font-bold italic text-white leading-tight">{rank}</p>
          <p className="mt-1.5 text-[9px] leading-relaxed text-white/65">{rankSub}</p>
        </div>

        {/* Category bars */}
        <p className="mt-3 mb-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-white/50">Categories</p>
        <div className="space-y-1.5">
          {leader.categories.slice(0, 5).map((c) => (
            <CategoryBar key={c.label} label={c.label} score={c.score} />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/55">Get yours at ngsc.com</p>
          <p className="font-mono text-[8px] text-white/55">#accountability</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CRUISE CARD - landmark background, liquid-crystal panels
// ─────────────────────────────────────────────
function CruiseCard({
  leader,
  score,
  rank,
  rankSub,
  variant,
}: {
  leader: Leader;
  score: number;
  rank: string;
  rankSub: string;
  variant: typeof CRUISE_VARIANTS[number];
}) {
  const grade = scoreToGrade(score);
  return (
    <div className="relative mx-auto flex aspect-[9/16] w-full max-w-[320px] flex-col justify-between overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
      {/* Landmark photo */}
      <img
        src={variant.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Vertical gradient - light mid, dark top/bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.80) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Liquid-crystal top panel */}
      <div className="relative px-5 pt-6">
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 2px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.24em] text-white/70">NGSC · Agbado Cruise</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">{leader.jurisdiction}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/12 text-white">
                  {leader.photoUrl
                    ? <img src={asset(leader.photoUrl)} alt={leader.name} className="h-full w-full object-cover object-top" />
                    : <UserRound size={16} strokeWidth={1.5} />}
                </div>
                <div>
                  <h2 className="text-[1.0rem] font-bold leading-tight text-white">{leader.name}</h2>
                  <p className="text-[9px] text-white/65">{leader.role}</p>
                </div>
              </div>
            </div>
            {/* Score + grade */}
            <div className="flex flex-col items-center">
              <p className="font-mono text-[3.5rem] font-black leading-none text-white drop-shadow-lg">{score}</p>
              <p className="font-mono text-[8px] text-white/55">/ 100</p>
              <span
                className="mt-1 rounded-lg px-2 py-0.5 font-mono text-[0.9rem] font-black text-white"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              >
                {grade}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid-crystal bottom panel */}
      <div className="relative px-5 pb-5">
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 2px 0 rgba(255,255,255,0.06) inset",
          }}
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">NGSC Verdict</p>
          <p className="mt-1 text-[1.0rem] font-bold italic text-white leading-tight">{rank}</p>
          <p className="mt-1.5 text-[9px] leading-relaxed text-white/65">{rankSub}</p>

          <p className="mt-3 mb-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-white/50">Categories</p>
          <div className="space-y-1.5">
            {leader.categories.slice(0, 4).map((c) => (
              <CategoryBar key={c.label} label={c.label} score={c.score} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/50">Get yours at ngsc.com</p>
            <p className="font-mono text-[8px] text-white/50">#accountability</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export function ScorecardCanvas({ leader }: { leader: Leader }) {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const raw = searchParams.get("s");
  const parsed = raw ? parseInt(raw, 10) : NaN;
  const score = Number.isNaN(parsed) ? leader.score : Math.max(0, Math.min(100, parsed));
  const rank = getRankTitle(score, mode);
  const rankSub = getRankSubtext(score, mode);

  // Page background - mode-specific reveal image
  const bgPhoto = mode === "cruise"
    ? asset("/reveal-cruise.jpg")
    : asset("/reveal-taxpayer.jpg");

  // Card variant pickers - separate per mode
  const [textileId, setTextileId] = useState<TextileId>("ankara");
  const [cruiseId, setCruiseId]   = useState<CruiseId>("lekki");
  const [caption, setCaption]     = useState("");
  const [captionSaved, setCaptionSaved] = useState(false);
  const [entryId, setEntryId]     = useState<string | null>(null);

  // Auto-post to community feed on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const entry = postToFeed({
      leaderName: leader.name,
      leaderSlug: leader.slug,
      leaderRole: leader.role,
      score,
      grade: scoreToGrade(score),
      verdict: rank,
      mode,
    });
    setEntryId(entry.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTextile = TEXTILE_VARIANTS.find((v) => v.id === textileId)!;
  const activeCruise  = CRUISE_VARIANTS.find((v) => v.id === cruiseId)!;

  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied]     = useState(false);
  const focusHandlerRef = useRef<(() => void) | null>(null);

  function armFocusUnlock() {
    if (focusHandlerRef.current) return;
    const handler = () => {
      setUnlocked(true);
      window.removeEventListener("focus", handler);
      focusHandlerRef.current = null;
    };
    focusHandlerRef.current = handler;
    window.addEventListener("focus", handler, { once: true });
  }

  function shareTo(platform: "whatsapp" | "x" | "native") {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/scorecard/${leader.slug}`;
    const shareText =
      mode === "cruise"
        ? `${leader.name} score ${score}/100 on NGSC. Rank: ${rank}. Come drag am too. #accountability`
        : `${leader.name} scored ${score}/100 on NGSC. Rank: ${rank}.`;

    if (platform === "native" && typeof navigator.share === "function") {
      navigator.share({ title: "NGSC", text: shareText, url: shareUrl }).then(
        () => setUnlocked(true),
        () => armFocusUnlock()
      );
      return;
    }
    const intent =
      platform === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    armFocusUnlock();
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      await navigator.clipboard.writeText(`${origin}/scorecard/${leader.slug}`);
      setCopied(true);
      setUnlocked(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const nextLeader = leaders.find((l) => l.slug !== leader.slug);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Page landmark background */}
      <img src={bgPhoto} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
      <div
        aria-hidden className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 20%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,0.97) 100%)" }}
      />

      <div className="relative mx-auto max-w-lg px-6 py-14">
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300">
          {mode === "cruise" ? "Your NGSC card don ready" : "Your Nigeria Governance Scorecard is ready"}
        </span>

        {/* Card */}
        <div className="relative mt-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {mode === "taxpayer" ? (
              <TaxpayerCard leader={leader} score={score} rank={rank} rankSub={rankSub} variant={activeTextile} />
            ) : (
              <CruiseCard leader={leader} score={score} rank={rank} rankSub={rankSub} variant={activeCruise} />
            )}
          </motion.div>

          {/* Share lock overlay */}
          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 rounded-2xl bg-ink/45 pb-10 backdrop-blur-sm">
              <Lock size={18} className="text-white" />
              <p className="max-w-56 text-center text-[13px] font-medium text-white">
                {mode === "cruise"
                  ? "Share am first. Mic go open after."
                  : "Voice feature coming soon."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 px-4">
                <button onClick={() => shareTo("native")} className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[13px] font-medium text-ink hover:bg-white/90">
                  <Share2 size={13} /> Share
                </button>
                <button onClick={() => shareTo("whatsapp")} className="rounded-full border border-white/50 px-4 py-2 text-[13px] font-medium text-white hover:bg-white/10">
                  WhatsApp
                </button>
                <button onClick={() => shareTo("x")} className="rounded-full border border-white/50 px-4 py-2 text-[13px] font-medium text-white hover:bg-white/10">
                  X
                </button>
                <button onClick={copyLink} className="flex items-center gap-1.5 rounded-full border border-white/50 px-4 py-2 text-[13px] font-medium text-white hover:bg-white/10">
                  <Copy size={13} /> {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Variant picker - textile swatches for Taxpayer, landmark swatches for Cruise */}
        <div className="mt-5">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wide text-white/55">
            {mode === "taxpayer" ? "Choose your textile" : "Pick your landmark"}
          </p>
          <div className="flex items-center justify-center gap-2.5">
            {mode === "taxpayer"
              ? TEXTILE_VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setTextileId(v.id)}
                    aria-label={v.label}
                    aria-pressed={textileId === v.id}
                    title={v.label}
                    className={cn(
                      "relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-transparent transition-all",
                      textileId === v.id ? "ring-paper scale-110" : "ring-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={v.src} alt={v.label} className="h-full w-full object-cover" />
                    {textileId === v.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))
              : CRUISE_VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setCruiseId(v.id)}
                    aria-label={v.label}
                    aria-pressed={cruiseId === v.id}
                    title={v.label}
                    className={cn(
                      "relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-transparent transition-all",
                      cruiseId === v.id ? "ring-paper scale-110" : "ring-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={v.src} alt={v.label} className="h-full w-full object-cover" />
                    {cruiseId === v.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
          </div>
        </div>

        {/* Post-share actions */}
        {unlocked && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button onClick={() => shareTo("native")} className="flex items-center gap-1.5 rounded-full bg-forest-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-forest-700">
              <Share2 size={13} /> {mode === "cruise" ? "Share am again" : "Share again"}
            </button>
            <button onClick={copyLink} className="flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/10">
              <Copy size={13} /> {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-2">
          <Link href={`/card/${leader.slug}?s=${score}`} className="flex items-center gap-1.5 text-[13px] font-medium text-white/80 hover:text-white">
            {mode === "cruise" ? "See the full record" : "View the full record"} <ArrowRight size={14} />
          </Link>
          {unlocked && nextLeader && (
            <Link href={`/evaluate/${nextLeader.slug}`} className="flex items-center gap-1.5 text-[13px] font-medium text-white/55 hover:text-white/80">
              {mode === "cruise" ? `Go drag ${nextLeader.name} next` : `Evaluate ${nextLeader.name} next`}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {unlocked && (
          <>
            {/* Caption for community feed */}
            <div className="mt-10 border-t border-white/20 pt-8">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-white/60">
                {mode === "cruise" ? "Add caption for the Community Pulse" : "Add a caption for the Community Pulse"}
              </p>
              <p className="mt-1 text-[12px] text-white/45">
                {mode === "cruise"
                  ? "Optional. E go show under your anonymous entry."
                  : "Optional. Appears under your anonymous entry on the Community Pulse page."}
              </p>
              <div className="mt-3 flex gap-2">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={mode === "cruise" ? "Wetin you wan add?" : "Add your thoughts..."}
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/35 outline-none focus:border-white/40"
                />
                <button
                  onClick={() => {
                    if (!entryId || !caption.trim()) return;
                    updateCaption(entryId, caption.trim());
                    setCaptionSaved(true);
                  }}
                  className="shrink-0 self-start rounded-xl bg-white/15 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-white/25"
                >
                  {captionSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Coming Soon voice */}
            <div className="mt-10 border-t border-white/20 pt-8">
              <span className="text-[12px] font-semibold text-forest-300 uppercase tracking-wider">Coming Soon</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-white">
                {mode === "cruise" ? "Voice feature dey come" : "Voice feature coming soon"}
              </h2>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/65">
                {mode === "cruise"
                  ? "You go soon fit talk your mind directly and e go convert to text. Watch this space."
                  : "Speech-to-text transcription is in development. You will be able to record a voice note and have it converted to a written submission."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
