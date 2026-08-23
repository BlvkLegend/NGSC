"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { asset } from "@/lib/asset";

const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

// User-supplied illustration assets in /public
const TAXPAYER_PHOTO = asset("/taxpayer-mode.png");
const CRUISE_PHOTO   = asset("/cruise-mode.png");

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    /*
     * -mt-16 pulls the section up behind the sticky nav (nav = pt-3 12px + h-52px = ~64px).
     * The absolute hero image then starts from y=0 (top of viewport).
     * pt-24 on the inner content pushes text clear of the nav pill.
     */
    <section className="relative mx-auto max-w-[1400px] -mt-16 overflow-hidden px-6 pb-10 lg:px-10 lg:pb-14">
      {/* Danfo street background - bleeds from page top, nav floats over it */}
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
        {/* Extra mobile overlay: covers full width at sm and below so text is always legible */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: "linear-gradient(to bottom, color-mix(in srgb, var(--paper) 80%, transparent) 0%, color-mix(in srgb, var(--paper) 70%, transparent) 60%, var(--paper) 100%)",
          }}
        />
      </div>

      {/* pt-24 = ~96px clears the nav pill (64px) + breathing room */}
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
          {/* TAXPAYER — always light, preview of taxpayer surface */}
          <button
            onClick={() => setMode("taxpayer")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "taxpayer" ? "border-forest-500" : "border-line hover:border-forest-400"
            }`}
          >
            <div className="relative h-full w-28 shrink-0 overflow-hidden bg-[#f4f4f5] sm:w-36">
              <img
                src={TAXPAYER_PHOTO}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="relative flex flex-1 flex-col justify-between bg-[#f4f4f5] px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold leading-tight text-[#0a0a0b]">Taxpayer Mode</h3>
                {mode === "taxpayer" && (
                  <span className="shrink-0 rounded-full bg-forest-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[12px] leading-snug text-[#6b6b7a]">
                Clear English. Formal civic record.
              </p>
              <div className="flex gap-1">
                {["A", "B", "C", "D", "F"].map((g) => (
                  <span key={g} className="flex h-5 w-5 items-center justify-center rounded border border-[#d4d4d8] font-mono text-[9px] font-bold text-[#6b6b7a]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </button>

          {/* AGBADO CRUISE — always dark, preview of cruise surface */}
          <button
            onClick={() => setMode("cruise")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "cruise" ? "border-cruise-500" : "border-line hover:border-cruise-500/60"
            }`}
          >
            <div className="relative h-full w-28 shrink-0 overflow-hidden bg-[#08090a] sm:w-36">
              <img
                src={CRUISE_PHOTO}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="relative flex flex-1 flex-col justify-between bg-[#08090a] px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold leading-tight text-[#f4f4f5]">Agbado Cruise</h3>
                {mode === "cruise" && (
                  <span className="shrink-0 rounded-full bg-cruise-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[12px] leading-snug text-[#a8a9b0]">
                Sharp Pidgin. Real street energy.
              </p>
              <div className="flex gap-1">
                {["A", "B", "C", "D", "F"].map((g) => (
                  <span key={g} className="flex h-5 w-5 items-center justify-center rounded border border-[#32333a] font-mono text-[9px] font-bold text-[#a8a9b0]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
