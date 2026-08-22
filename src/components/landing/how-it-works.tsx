"use client";

import { motion } from "framer-motion";
import { Search, ListChecks, CreditCard, Share2, UserRound } from "lucide-react";
import { useMode } from "@/lib/mode-context";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.863L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const COPY = {
  taxpayer: {
    eyebrow: "Process",
    title: "Four steps, one scorecard.",
    find: {
      title: "Find the official",
      body: "Search by name, state, or office.",
      placeholder: "Search name, state, office...",
      suggestions: ["Governor", "Senator", "FCT"],
    },
    answer: {
      title: "Answer ten questions",
      body: "Rate each area A (Excellent) through F (Fail). Infrastructure, healthcare, education, and seven more.",
      q: "Have schools improved under this official?",
      opts: ["A: Excellent progress", "B: Some improvement", "C: No change"],
    },
    reveal: {
      title: "Get your NGSC card",
      body: "A grade, a score, and category breakdowns.",
    },
    share: {
      title: "Post it. Let it hold.",
      body: "It enters the public record.",
    },
  },
  cruise: {
    eyebrow: "How e dey work",
    title: "Four steps, one scorecard.",
    find: {
      title: "Pick who you wan evaluate",
      body: "Search name, state, or office. Simple.",
      placeholder: "Who you dey find...",
      suggestions: ["Governor", "Senator", "Abuja"],
    },
    answer: {
      title: "Answer the ten questions",
      body: "Roads, light, health, school. Give am grade A to F based on wetin you see with your eyes.",
      q: "School for your area don reach anywhere?",
      opts: ["A: E reach! No be small", "B: Small small", "C: Nothing dey happen"],
    },
    reveal: {
      title: "Collect your NGSC card",
      body: "Your grade, score, and full breakdown. Ready to share.",
    },
    share: {
      title: "Drop am. Make dem see.",
      body: "E dey enter the public record. Permanent.",
    },
  },
};

const STEP_ICONS = [Search, ListChecks, CreditCard, Share2];

export function HowItWorks() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section id="how-it-works" className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12 scroll-mt-16">
      <span className="ledger-index text-[12px] text-forest-500">{c.eyebrow}</span>
      <h2 className="mt-2 max-w-md text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {c.title}
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {/* Step 1: Find */}
        <BentoCell delay={0} icon={<Search size={16} />} stepLabel="01">
          {/* Search bar with icon + blinking cursor */}
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2">
            <Search size={12} className="shrink-0 text-ink-muted/60" />
            <span className="flex-1 text-[11px] text-ink-muted">{c.find.placeholder}</span>
            <span className="w-[1.5px] h-3 rounded-full bg-forest-500 animate-pulse" />
          </div>
          {/* Suggestion chips */}
          <div className="mt-2 flex flex-col gap-1">
            {c.find.suggestions.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-md px-2 py-1 bg-paper hover:bg-line/40">
                <UserRound size={10} className="text-ink-muted" />
                <span className="text-[11px] text-ink-muted">{s}</span>
              </div>
            ))}
          </div>
          <BentoText title={c.find.title} body={c.find.body} />
        </BentoCell>

        {/* Step 2: Answer */}
        <BentoCell delay={0.05} icon={<ListChecks size={16} />} stepLabel="02">
          {/* Progress bar */}
          <div className="mt-3 flex gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${i < 4 ? "bg-forest-500" : "bg-line"}`}
              />
            ))}
          </div>
          <p className="mt-1 text-[10px] text-ink-muted">Question 4 of 10</p>
          {/* Mini question */}
          <p className="mt-2 text-[11px] font-medium leading-snug text-ink">{c.answer.q}</p>
          {/* Answer options */}
          <div className="mt-2 flex flex-col gap-1">
            {c.answer.opts.map((opt, i) => (
              <div
                key={opt}
                className={`rounded-lg border px-2.5 py-1.5 text-[10px] leading-snug ${
                  i === 1
                    ? "border-forest-500 bg-forest-500 text-white"
                    : "border-line text-ink-muted"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
          <BentoText title={c.answer.title} body={c.answer.body} />
        </BentoCell>

        {/* Step 3: NGSC Card */}
        <BentoCell delay={0.1} icon={<CreditCard size={16} />} stepLabel="03">
          {/* Card visual */}
          <div className="mt-3 flex flex-1 items-center justify-center">
            <div
              className="relative flex h-[110px] w-[140px] flex-col justify-between overflow-hidden rounded-xl p-3 shadow-md"
              style={{ background: "linear-gradient(135deg, #0a2e22 0%, #167a4a 55%, #1d5c38 100%)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[6px] font-semibold uppercase tracking-[0.14em] text-white/50">NGSC</p>
                  <p className="mt-0.5 text-[8px] font-semibold text-white/90">Adaeze Nwosu</p>
                  <p className="text-[6px] text-white/45">Governor · Enugu State</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/15">
                  <span className="font-mono text-[1rem] font-black text-white">B+</span>
                </div>
              </div>
              <div className="space-y-[3px]">
                {[{ l: "Infrastructure", w: 81 }, { l: "Transparency", w: 71 }, { l: "Security", w: 73 }].map((r) => (
                  <div key={r.l} className="flex items-center gap-1.5">
                    <span className="w-12 truncate text-[6px] text-white/50">{r.l}</span>
                    <div className="flex-1 h-[3px] overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-white/65" style={{ width: `${r.w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <span className="text-[5px] font-mono text-white/30">ngsc.ng</span>
                <span className="text-[6px] font-mono font-bold text-white/55">74 / 100</span>
              </div>
            </div>
          </div>
          <BentoText title={c.reveal.title} body={c.reveal.body} />
        </BentoCell>

        {/* Step 4: Share */}
        <BentoCell delay={0.15} icon={<Share2 size={16} />} stepLabel="04">
          <div className="mt-3 flex-1">
            {/* Social buttons */}
            <div className="flex gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
                <WhatsAppIcon />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f1011] text-white shadow-sm">
                <XIcon />
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm"
                style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
              >
                <InstagramIcon />
              </div>
            </div>
            {/* Shareable link preview */}
            <div className="mt-3 rounded-lg border border-line bg-paper px-3 py-2">
              <p className="text-[9px] text-ink-muted/60 uppercase tracking-wide mb-0.5">Share link</p>
              <p className="font-mono text-[10px] text-ink-muted truncate">ngsc.ng/card/leader</p>
            </div>
            {/* Record indicator */}
            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-good" />
              <span className="text-[10px] text-ink-muted">
                {mode === "cruise" ? "E dey live for the public record" : "Now in the public record"}
              </span>
            </div>
          </div>
          <BentoText title={c.share.title} body={c.share.body} />
        </BentoCell>

      </div>
    </section>
  );
}

function StepIcon({ icon, stepLabel }: { icon: React.ReactNode; stepLabel: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
        {icon}
      </div>
      <span className="font-mono text-[10px] font-bold text-ink-muted/60 uppercase tracking-widest">{stepLabel}</span>
    </div>
  );
}

function BentoCell({
  children,
  delay,
  icon,
  stepLabel,
}: {
  children: React.ReactNode;
  delay: number;
  icon: React.ReactNode;
  stepLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className="flex min-h-[240px] flex-col rounded-2xl border border-line bg-paper-raised p-4"
    >
      <StepIcon icon={icon} stepLabel={stepLabel} />
      {children}
    </motion.div>
  );
}

function BentoText({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-auto border-t border-line pt-3">
      <h3 className="text-[14px] font-semibold text-ink">{title}</h3>
      <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
