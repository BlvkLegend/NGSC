"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { quizQuestions, scoreOptions } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { getLandmark, landmarkVariant } from "@/lib/landmarks";
import { asset } from "@/lib/asset";
import type { Leader } from "@/lib/data";

// Per-category local images matching each question topic
const CATEGORY_PHOTOS: Record<string, string> = {
  Infrastructure:  asset("/quiz-bg/infrastructure.webp"),
  Transparency:    asset("/quiz-bg/budget.jpg"),
  Security:        asset("/quiz-bg/security.webp"),
  Healthcare:      asset("/quiz-bg/healthcare.png"),
  Education:       asset("/quiz-bg/school.jpg"),
  "Power Supply":  asset("/quiz-bg/electricity.jpg"),
  "Job Creation":  asset("/quiz-bg/jobs.jpg"),
  Economy:         asset("/quiz-bg/goods.webp"),
  Responsiveness:  asset("/quiz-bg/responsive.jpeg"),
};

const LOADING_BG   = asset("/loading-bg.jpg");
const REVEAL_CRUISE   = asset("/reveal-cruise.jpg");
const REVEAL_TAXPAYER = asset("/reveal-taxpayer.jpg");

const CRUISE_LABELS: Record<string, string> = {
  A: "E choke! Correct oga",
  B: "E try, I give am that",
  C: "Half half, him dey manage",
  D: "Na only announcement remain",
  F: "Certified sapa minister",
};

const GRADE_GRADIENTS: Record<string, string> = {
  A: "linear-gradient(135deg, #0a2e22 0%, #167a4a 55%, #1d5c38 100%)",
  B: "linear-gradient(135deg, #0e5236 0%, #3fae74 55%, #1d8050 100%)",
  C: "linear-gradient(135deg, #4a3800 0%, #8a6d1f 55%, #c9a23f 100%)",
  D: "linear-gradient(135deg, #5c2e00 0%, #b8590a 55%, #d9720f 100%)",
  F: "linear-gradient(135deg, #4a0e0e 0%, #9c3b30 55%, #c04040 100%)",
};

const TAXPAYER_LABELS: Record<string, string> = {
  A: "Excellent",
  B: "Good",
  C: "Average",
  D: "Poor",
  F: "Fail",
};

type Stage = "question" | "generating";

export function QuizEngine({ leader }: { leader: Leader }) {
  const router = useRouter();
  const { mode } = useMode();
  const [stage, setStage] = useState<Stage>("question");
  const [step, setStep]   = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total    = quizQuestions.length;
  const question = quizQuestions[step];
  const answeredValue = answers[question.id];

  // Category-specific photo - falls back to landmark if category not mapped
  const categoryPhoto = CATEGORY_PHOTOS[question.category];
  const variant = useMemo(() => landmarkVariant(`${leader.slug}-${step}`), [leader.slug, step]);
  const landmarkPhoto = getLandmark(leader.jurisdiction, variant);
  const bgPhoto = categoryPhoto ?? landmarkPhoto;

  function selectAnswer(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!answeredValue) return;
    if (step < total - 1) { setStep((s) => s + 1); return; }
    setStage("generating");
    const values = Object.values(answers);
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 3;
    const computedScore = Math.round((avg / 5) * 100);
    setTimeout(() => router.push(`/scorecard/${leader.slug}?s=${computedScore}`), 2200);
  }

  function goBack() { if (step > 0) setStep((s) => s - 1); }

  if (stage === "generating") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <img src={LOADING_BG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative">
          <Loader2 className="mx-auto animate-spin text-white" size={32} strokeWidth={1.5} />
          <p className="mt-6 text-xl font-bold text-white">
            {mode === "cruise" ? "Your NGSC card dey form..." : "Compiling your NGSC card..."}
          </p>
          <p className="mt-2 text-[13px] text-white/60">{leader.name} · {leader.jurisdiction}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Full-page background - crossfades on step change */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${step}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img src={bgPhoto} alt="" aria-hidden className="h-full w-full object-cover object-center" loading="eager" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.40) 22%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.90) 78%, rgba(0,0,0,0.97) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Sticky header — sits below the 64px site nav */}
      <div className="sticky top-16 z-20 px-4 pb-2.5 pt-2" style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(10px)" }}>
        <div className="mx-auto max-w-2xl">
          {/* Story-style top row: avatar + name on left, step count on right */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/35 bg-white/12">
                {leader.photoUrl
                  ? <img src={asset(leader.photoUrl)} alt={leader.name} className="h-full w-full object-cover object-top" />
                  : <span className="flex h-full w-full items-center justify-center font-mono text-[11px] font-bold text-white">{leader.name[0]}</span>}
              </div>
              <span className="text-[13px] font-semibold text-white leading-none">{leader.name}</span>
            </div>
            <span className="text-[11px] text-white/55">{step + 1} of {total}</span>
          </div>
          <ProgressBar current={step + 1} total={total} dark />
        </div>
      </div>

      {/* Question body */}
      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-2xl flex-1 px-6 pb-4 pt-6"
          >
            <span className="inline-block rounded-full border border-paper/25 bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              {question.category}
            </span>

            <h2 className="mt-4 max-w-lg text-[1.6rem] font-bold leading-tight text-white drop-shadow-sm sm:text-[1.9rem]">
              {mode === "cruise" ? question.cruise : question.taxpayer}
            </h2>

            <div className="mt-6 space-y-2">
              {[...scoreOptions].reverse().map((opt) => {
                const selected = answeredValue === opt.value;
                const displayLabel = mode === "cruise" ? CRUISE_LABELS[opt.label] : TAXPAYER_LABELS[opt.label];

                return (
                  <div key={opt.value}>
                    <button
                      onClick={() => selectAnswer(opt.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? mode === "cruise"
                            ? "border-cruise-500 bg-cruise-500/88 shadow"
                            : "border-forest-400 bg-forest-500/88 shadow"
                          : "border-paper/20 bg-black/52 backdrop-blur-sm hover:border-paper/40 hover:bg-black/62"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[14px] font-bold text-white"
                        style={{ background: selected ? "rgba(255,255,255,0.22)" : GRADE_GRADIENTS[opt.label] }}
                      >
                        {selected ? <Check size={13} className="text-white" /> : opt.label}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold text-white">{displayLabel}</span>
                        <span className="block truncate text-[11px] text-white/60">{mode === "cruise" && opt.cruiseHelper ? opt.cruiseHelper : opt.helper}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Optional evidence upload */}
            {answeredValue && (
              <div className="mt-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-paper/25 bg-black/30 px-4 py-3 text-[12px] text-white/55 hover:border-paper/45 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {mode === "cruise"
                    ? "Attach proof (optional) — photo or PDF"
                    : "Attach supporting evidence (optional) — image or PDF"}
                  <input type="file" accept="image/*,.pdf" className="sr-only" />
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 z-20 px-6 py-4" style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button onClick={goBack} disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-medium text-white/60 transition-colors hover:text-white disabled:opacity-0">
            <ArrowLeft size={15} /> Back
          </button>
          <button onClick={goNext} disabled={!answeredValue}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-semibold text-white transition-all ${
              answeredValue
                ? mode === "cruise" ? "bg-cruise-500 hover:bg-cruise-700" : "bg-forest-500 hover:bg-forest-700"
                : "cursor-not-allowed bg-white/10 text-white/30"
            }`}>
            {step === total - 1 ? "Finish" : "Next"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
