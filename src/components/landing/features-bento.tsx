"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3, Shield, Mic2,
  Trophy, Zap, Users, TrendingUp,
} from "lucide-react";
import { useMode } from "@/lib/mode-context";

// --- 3D tilt card wrapper (liquid-crystal) ---
function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.015 }}
      transition={{ scale: { duration: 0.2 } }}
      className={`relative cursor-default overflow-hidden rounded-2xl border border-line-strong bg-paper-raised
        shadow-[0_2px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-6px_rgba(0,0,0,0.18)]
        hover:shadow-[0_2px_0_rgba(255,255,255,0.1)_inset,0_12px_32px_-6px_rgba(0,0,0,0.24)]
        ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] font-medium text-ink shadow-sm ${className}`}
      style={{ transform: "translateZ(20px)" }}
    >
      {children}
    </div>
  );
}

// Shareable NGSC card mock (F4 slot)
function NgscCardMock() {
  return (
    <div
      className="relative mx-auto flex h-[108px] w-[170px] flex-col justify-between overflow-hidden rounded-xl p-3 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0a2e22 0%, #167a4a 60%, #1a4a2e 100%)",
        transform: "translateZ(20px) rotate(-2.5deg)",
      }}
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/50">NGSC</p>
          <p className="mt-0.5 text-[9px] font-semibold text-white/90">Adaeze Nwosu</p>
          <p className="text-[7px] text-white/50">Governor · Enugu State</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/15">
          <span className="font-mono text-[1.1rem] font-black leading-none text-white">B+</span>
        </div>
      </div>
      {/* category bars */}
      <div className="space-y-[3px]">
        {[
          { l: "Infrastructure", w: 81 },
          { l: "Transparency", w: 71 },
          { l: "Security", w: 73 },
        ].map((r) => (
          <div key={r.l} className="flex items-center gap-1.5">
            <span className="w-14 truncate text-[6px] text-white/50">{r.l}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-white/10 h-[3px]">
              <div className="h-full rounded-full bg-white/65" style={{ width: `${r.w}%` }} />
            </div>
            <span className="font-mono text-[6px] text-white/50">{r.w}</span>
          </div>
        ))}
      </div>
      {/* footer */}
      <div className="flex items-center justify-between">
        <span className="text-[6px] font-mono text-white/30">ngsc.ng</span>
        <span className="text-[7px] font-mono font-bold text-white/60">74 / 100</span>
      </div>
    </div>
  );
}

// Compare preview mock - category rows with dual scores, matching actual compare page
function CompareMock() {
  const rows = [
    { cat: "Infrastructure", a: 81, b: 74 },
    { cat: "Education",      a: 76, b: 65 },
    { cat: "Healthcare",     a: 68, b: 71 },
    { cat: "Transparency",   a: 71, b: 80 },
    { cat: "Security",       a: 73, b: 66 },
  ];
  return (
    <div className="mt-3 space-y-[5px]" style={{ transform: "translateZ(16px)" }}>
      {rows.map((row) => (
        <div key={row.cat} className="grid grid-cols-[28px_1fr_28px] items-center gap-1.5">
          <span
            className="text-right font-mono text-[12px] font-bold leading-none"
            style={{ color: row.a >= row.b ? "var(--signal-good)" : "var(--ink-muted)" }}
          >
            {row.a}
          </span>
          <span className="truncate text-center text-[9px] uppercase tracking-wide text-ink-muted">{row.cat}</span>
          <span
            className="text-left font-mono text-[12px] font-bold leading-none"
            style={{ color: row.b > row.a ? "var(--signal-good)" : "var(--ink-muted)" }}
          >
            {row.b}
          </span>
        </div>
      ))}
      {/* totals */}
      <div className="mt-1 grid grid-cols-[28px_1fr_28px] items-center gap-1.5 border-t border-line pt-[5px]">
        <span className="text-right font-mono text-[13px] font-black text-signal-good">74</span>
        <span className="text-center text-[8px] uppercase tracking-wide text-ink-muted">Total</span>
        <span className="text-left font-mono text-[13px] font-black text-ink-muted">71</span>
      </div>
    </div>
  );
}

const COPY = {
  taxpayer: {
    eyebrow: "What the Nigeria Governance Scorecard gives you",
    title: "A formal civic instrument.",
    f1: { title: "Structured scoring", body: "Ten structured questions across ten categories." },
    f2: { title: "Community pulse", body: "See how your view compares to the crowd." },
    f3: { title: "Two modes, one record", body: "Taxpayer for the data heads. Cruise for the streets." },
    cardShare: { title: "Your NGSC card", body: "Grade, score, breakdowns. Built to travel." },
    f5: { title: "Leaderboard", body: "Who is rising. Who is falling. Updated live." },
    f6: { title: "Voice your take", body: "Say more after you score. Speech-to-text transcription — coming soon." },
    compare: { title: "Compare any two officials", body: "Same scale, same categories. No spin." },
  },
  cruise: {
    eyebrow: "Wetin the Nigeria Governance Scorecard go give you",
    title: "Sharp tool for the streets.",
    f1: { title: "No-joke scoring", body: "Ten questions, seven areas. No be vibes." },
    f2: { title: "Street pulse", body: "See if your take match the crowd or you dey lone wolf." },
    f3: { title: "Two modes, one record", body: "Taxpayer dey formal. Agbado Cruise dey real. Same ten questions." },
    cardShare: { title: "Your NGSC card", body: "Grade, score, full breakdon. Drop am, make dem see." },
    f5: { title: "Who dey lead", body: "Who rise. Who fall. Live update." },
    f6: { title: "Open your mouth", body: "Talk am after you score. Voice to text dey come soon." },
    compare: { title: "Line them up", body: "Same ten questions. Numbers go do the talking." },
  },
};

export function FeaturesBento() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
      <span className="ledger-index text-[12px] text-forest-500">{c.eyebrow}</span>
      <h2 className="mt-2 max-w-lg text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {c.title}
      </h2>

      <div
        className="mt-6 grid gap-2.5"
        style={{ perspective: "1200px" }}
      >
        {/* Row 1: wide + narrow */}
        <div className="grid gap-2.5 sm:grid-cols-[1.6fr_1fr]">
          {/* F1: score preview */}
          <TiltCard className="p-5" intensity={6}>
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <BarChart3 size={18} />
              </div>
              <Chip>
                <Zap size={11} className="text-cruise-500" /> Live
              </Chip>
            </div>
            <div className="mt-4 space-y-1.5">
              {[
                { label: "Infrastructure", w: 81 },
                { label: "Transparency",  w: 71 },
                { label: "Security",      w: 73 },
                { label: "Economy",       w: 69 },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[11px] text-ink-muted">{r.label}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-line h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                      className="h-1.5 rounded-full bg-forest-500"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-ink w-6 text-right">{r.w}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="font-semibold text-ink">{c.f1.title}</h3>
              <p className="mt-0.5 text-[12px] text-ink-muted">{c.f1.body}</p>
            </div>
          </TiltCard>

          {/* F2: community pulse */}
          <TiltCard className="p-5" intensity={10}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Users size={18} />
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              {[
                { pct: 67, label: "Agreed with this" },
                { pct: 31, label: "Disagreed" },
                { pct: 2,  label: "No opinion" },
              ].map((r) => (
                <div key={r.label} className="flex items-baseline gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-mono text-[1.3rem] font-black text-ink leading-none"
                  >
                    {r.pct}%
                  </motion.span>
                  <span className="text-[11px] text-ink-muted">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="font-semibold text-ink">{c.f2.title}</h3>
              <p className="mt-0.5 text-[12px] text-ink-muted">{c.f2.body}</p>
            </div>
          </TiltCard>
        </div>

        {/* Row 2: three equal */}
        <div className="grid gap-2.5 sm:grid-cols-3">
          {/* F3: mode toggle */}
          <TiltCard className="p-4" intensity={12}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cruise-tint text-cruise-500">
              <Shield size={18} />
            </div>
            <div className="mt-3 flex gap-2">
              <Chip className="bg-forest-tint border-forest-500 text-forest-700">Taxpayer</Chip>
              <Chip className="bg-cruise-tint border-cruise-500 text-cruise-700">Agbado Cruise</Chip>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <h3 className="font-semibold text-ink text-[14px]">{c.f3.title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-muted">{c.f3.body}</p>
            </div>
          </TiltCard>

          {/* F4: Shareable NGSC card */}
          <TiltCard className="p-4" intensity={12}>
            <NgscCardMock />
            <div className="mt-3 border-t border-line pt-3">
              <h3 className="font-semibold text-ink text-[14px]">{c.cardShare.title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-muted">{c.cardShare.body}</p>
            </div>
          </TiltCard>

          {/* F5: leaderboard */}
          <TiltCard className="p-4" intensity={12}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Trophy size={18} />
            </div>
            <div className="mt-3 space-y-1.5">
              {[
                { rank: 1, name: "A. Nwosu", delta: "+3", up: true },
                { rank: 2, name: "T. Bakare", delta: "-2", up: false },
                { rank: 3, name: "H. Idris", delta: "New", up: true },
              ].map((r) => (
                <div key={r.rank} className="flex items-center gap-2">
                  <span className="font-mono text-[0.9rem] font-black text-ink w-4">{r.rank}</span>
                  <span className="flex-1 text-[11px] text-ink truncate">{r.name}</span>
                  <span className={`font-mono text-[10px] font-bold ${r.up ? "text-signal-good" : "text-signal-low"}`}>
                    {r.delta}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <h3 className="font-semibold text-ink text-[14px]">{c.f5.title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-muted">{c.f5.body}</p>
            </div>
          </TiltCard>
        </div>

        {/* Row 3: narrow + wide */}
        <div className="grid gap-2.5 sm:grid-cols-[1fr_1.6fr]">
          {/* F6: voice */}
          <TiltCard className="p-4" intensity={10}>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <Mic2 size={18} />
              </div>
              <span className="rounded-full bg-cruise-tint px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cruise-700">Coming Soon</span>
            </div>
            <div className="mt-3">
              <svg viewBox="0 0 120 36" className="w-full text-forest-500" fill="none">
                {[8, 18, 28, 38, 48, 58, 68, 78, 88, 98, 108].map((x, i) => {
                  const h = [6, 18, 26, 14, 30, 22, 10, 28, 16, 24, 8][i];
                  return (
                    <rect
                      key={x}
                      x={x}
                      y={(36 - h) / 2}
                      width="5"
                      height={h}
                      rx="2.5"
                      fill="currentColor"
                      fillOpacity={0.35 + i * 0.03}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <h3 className="font-semibold text-ink text-[14px]">{c.f6.title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-muted">{c.f6.body}</p>
            </div>
          </TiltCard>

          {/* Compare bento - real category-row layout mirroring the compare page */}
          <TiltCard className="p-5" intensity={6}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-forest-500" />
                <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide">vs</span>
              </div>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-forest-tint px-2 py-0.5 text-[9px] font-semibold text-forest-700">Official A</span>
                <span className="rounded-full bg-cruise-tint px-2 py-0.5 text-[9px] font-semibold text-cruise-700">Official B</span>
              </div>
            </div>
            <CompareMock />
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="font-semibold text-ink">{c.compare.title}</h3>
              <p className="mt-0.5 text-[12px] text-ink-muted">{c.compare.body}</p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
