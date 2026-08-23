"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { asset } from "@/lib/asset";

const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

const TAXPAYER_PHOTO = asset("/taxpayer-mode.png");
const CRUISE_PHOTO   = asset("/cruise-mode.png");

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1400px] -mt-16 overflow-hidden px-6 pb-10 lg:px-10 lg:pb-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img src={HERO_BG} alt="" className="h-full w-full object-cover object-top" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--paper) 0%, var(--paper) 28%, color-mix(in srgb, var(--paper) 65%, transparent) 52%, transparent 72%), " +
              "linear-gradient(to top, var(--paper) 0%, transparent 35%), " +
              "linear-gradient(to bottom, color-mix(in srgb, var(--paper) 70%, transparent) 0%, transparent 22%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: "linear-gradient(to bottom, color-mix(in srgb, var(--paper) 80%, transparent) 0%, color-mix(in srgb, var(--paper) 70%, transparent) 60%, var(--paper) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-2xl pt-24 lg:pt-28">
        <motion.span
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500"
        >
          Nigeria Governance Scorecard
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
        >
          {mode === "cruise" ? "Oya evaluate them. Your vote, your verdict." : "Hold them to account."}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted"
        >
          {mode === "cruise"
            ? "Ten questions. One card. Rate who dey deliver and who dey form. Sharp sharp for group chat."
            : "Ten structured questions. A grade, a score, and a public record. Not a tweet. A verdict."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-3"
        >
          <Link
            href="/start"
            className="group flex items-center gap-1.5 text-[15px] font-semibold text-ink underline-offset-4 hover:underline"
          >
            {mode === "cruise" ? "Who do you want to evaluate today?" : "Start evaluating"}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Mode cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        className="relative mt-10 max-w-2xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">Choose your experience</p>
          <button
            onClick={() => setInfoOpen((v) => !v)}
            aria-label="About the two modes"
            className="flex items-center gap-1 text-[12px] text-ink-muted hover:text-ink"
          >
            <Info size={13} /> Understand the modes
          </button>
        </div>

        {infoOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-xl border border-line bg-paper-raised p-4 text-[13px] leading-relaxed text-ink shadow-sm"
          >
            {mode === "cruise"
              ? "Same ten questions. Difference na the vibe. Taxpayer dey straight. Cruise dey sharp. Real Naija energy. Switch anytime from the nav toggle."
              : "Same 10 questions. Same NGSC card at the end. Only the phrasing changes. Taxpayer is clear English. Cruise is sharp Pidgin. Switch anytime from the nav toggle."}
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">

          {/* ── TAXPAYER — white/light background, green accents ── */}
          <button
            onClick={() => setMode("taxpayer")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "taxpayer" ? "border-[#167a4a]" : "border-[#d4d4d8] hover:border-[#167a4a]/60"
            }`}
          >
            <div className="relative h-full w-28 shrink-0 overflow-hidden bg-[#f4f4f5] sm:w-36">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#167a4a]" />
              <img src={TAXPAYER_PHOTO} alt="" aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy" />
            </div>
            <div className="relative flex flex-1 flex-col justify-between bg-[#f4f4f5] px-4 py-3">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#167a4a]" />
              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#167a4a]">Taxpayer Mode</p>
                  <h3 className="mt-0.5 text-[15px] font-bold leading-tight text-[#0a0a0b]">Formal. Data-driven.</h3>
                </div>
                {mode === "taxpayer" && (
                  <span className="shrink-0 rounded-full bg-[#167a4a] px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11.5px] italic leading-snug text-[#6b6b7a]">
                &ldquo;A structured verdict. On record. Permanently.&rdquo;
              </p>
              <p className="text-[10px] font-medium text-[#167a4a] leading-tight">
                Factual. Permanent. Quietly devastating.
              </p>
            </div>
          </button>

          {/* ── AGBADO CRUISE MODE — black background, orange accents ── */}
          <button
            onClick={() => setMode("cruise")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "cruise" ? "border-[#ff9d3d]" : "border-[#32333a] hover:border-[#ff9d3d]/60"
            }`}
          >
            <div className="relative h-full w-28 shrink-0 overflow-hidden bg-[#08090a] sm:w-36">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#ff9d3d]" />
              <img src={CRUISE_PHOTO} alt="" aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy" />
            </div>
            <div className="relative flex flex-1 flex-col justify-between bg-[#08090a] px-4 py-3">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#ff9d3d]" />
              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#ff9d3d]">Agbado Cruise Mode</p>
                  <h3 className="mt-0.5 text-[15px] font-bold leading-tight text-[#f4f4f5]">Sharp. No filter.</h3>
                </div>
                {mode === "cruise" && (
                  <span className="shrink-0 rounded-full bg-[#ff9d3d] px-2 py-0.5 text-[9px] font-bold uppercase text-[#08090a]">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11.5px] italic leading-snug text-[#a8a9b0]">
                &ldquo;Where the money go? Why dem dey act like na crime to ask?&rdquo;
              </p>
              <p className="text-[10px] font-medium text-[#ff9d3d] leading-tight">
                Your oga can run. He no fit hide from ten questions.
              </p>
            </div>
          </button>

        </div>
      </motion.div>
    </section>
  );
}
