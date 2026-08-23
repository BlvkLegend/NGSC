"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { DonationSection } from "@/components/donation-section";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight,
  ShieldCheck, Building2, Eye, ShieldAlert, HeartPulse,
  GraduationCap, Zap, Briefcase, TrendingDown, Users, Scale,
} from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { asset } from "@/lib/asset";

const GRADE_SCALE = [
  { grade: "A", meaning: "Excellent",      range: "80 to 100", color: "text-signal-good border-signal-good", bg: "bg-[#e7efe6] dark:bg-[#0d2218]", textClass: "text-[#1a2e1a] dark:text-[#b8dcc8]" },
  { grade: "B", meaning: "Good",           range: "65 to 79",  color: "text-forest-500 border-forest-500",   bg: "bg-[#edf5f0] dark:bg-[#0d2018]", textClass: "text-[#1a2e20] dark:text-[#a8d4b8]" },
  { grade: "C", meaning: "Average",        range: "50 to 64",  color: "text-signal-mid border-signal-mid",   bg: "bg-[#fdf8e4] dark:bg-[#2a2208]", textClass: "text-[#2a2208] dark:text-[#d4c070]" },
  { grade: "D", meaning: "Poor",           range: "35 to 49",  color: "text-cruise-500 border-cruise-500",   bg: "bg-[#fdeee0] dark:bg-[#2a1808]", textClass: "text-[#2a1808] dark:text-[#d4a070]" },
  { grade: "F", meaning: "Fail",           range: "0 to 34",   color: "text-signal-low border-signal-low",   bg: "bg-[#fce8e6] dark:bg-[#2a0e0e]", textClass: "text-[#2a0e0e] dark:text-[#d48080]" },
];

const ANSWER_SCALE = [
  { label: "A", display: "Excellent",  cruiseDisplay: "Sharp Sharp",   helper: "Consistent, well-documented delivery",   cruiseHelper: "Oga dey deliver. No dulling.",     gradient: "linear-gradient(135deg, #0a2e22 0%, #167a4a 55%, #1d5c38 100%)" },
  { label: "B", display: "Good",       cruiseDisplay: "E Do Well",     helper: "Clear, verifiable progress",             cruiseHelper: "Progress dey show. You fit see.", gradient: "linear-gradient(135deg, #0e5236 0%, #3fae74 55%, #1d8050 100%)" },
  { label: "C", display: "Average",    cruiseDisplay: "Half Half",     helper: "Some progress, significant gaps remain", cruiseHelper: "E try small. Gap still plenty.",  gradient: "linear-gradient(135deg, #4a3800 0%, #8a6d1f 55%, #c9a23f 100%)" },
  { label: "D", display: "Poor",       cruiseDisplay: "E No Do",       helper: "Minimal, inconsistent progress",         cruiseHelper: "Small movement. No reach far.",   gradient: "linear-gradient(135deg, #5c2e00 0%, #b8590a 55%, #d9720f 100%)" },
  { label: "F", display: "Fail",       cruiseDisplay: "Total Failure", helper: "No credible evidence of progress",      cruiseHelper: "Zero. Person just dey collect.",  gradient: "linear-gradient(135deg, #4a0e0e 0%, #9c3b30 55%, #c04040 100%)" },
];

const CATEGORIES = [
  { icon: <Building2 size={16} />,     label: "Infrastructure",  q: "Visible infrastructure delivered this term?",          cruiseQ: "Road, bridge, water supply don reach your area?" },
  { icon: <Eye size={16} />,           label: "Transparency",    q: "Budgets and records citizens can verify?",              cruiseQ: "Where the money go? Can ordinary person check am?" },
  { icon: <ShieldAlert size={16} />,   label: "Security",        q: "Has safety meaningfully improved?",                     cruiseQ: "You fit waka night market without looking back?" },
  { icon: <HeartPulse size={16} />,    label: "Healthcare",      q: "Access to functioning public healthcare?",               cruiseQ: "Government hospital na real clinic or just a building with sign?" },
  { icon: <GraduationCap size={16} />, label: "Education",       q: "Condition of public schools this term?",                 cruiseQ: "Public school pickin dey learn or na holiday every week?" },
  { icon: <Zap size={16} />,           label: "Power Supply",    q: "Consistency of electricity supply?",                    cruiseQ: "Light don show for your area or inverter remain your best friend?" },
  { icon: <Briefcase size={16} />,     label: "Job Creation",    q: "Verifiable employment beyond announcements?",            cruiseQ: "Dem announce 10,000 jobs. You know anybody wey actually get?" },
  { icon: <TrendingDown size={16} />,  label: "Economy",         q: "Affordability of basic goods changed?",                 cruiseQ: "You fit enter market with small money and comot with something?" },
  { icon: <Users size={16} />,         label: "Responsiveness",  q: "Accessible and responsive to constituents?",             cruiseQ: "How many gates and redirections before you give up?" },
  { icon: <Scale size={16} />,         label: "Accountability",  q: "Scrutiny or consequences for failures?",                cruiseQ: "Dem mess up public funds. Wetin happen to them? You know the answer." },
];

const BRACKETS = [
  { label: "Geographic anchor",  detail: "36 states, FCT Abuja, or Diaspora" },
  { label: "Occupation status",  detail: "Student, unemployed, employed, or entrepreneur" },
  { label: "Age bracket",        detail: "Inferred from interface mode, never asked directly" },
];

export default function MethodologyPage() {
  const { mode } = useMode();

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* FULL-BLEED HERO - -mt-16 pulls behind sticky nav */}
      <div className="relative -mt-16 min-h-[62vh] w-full overflow-hidden">
        <img
          src={asset("/how-it-works-hero.webp")}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.70) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 lg:px-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300">
            {mode === "cruise" ? "How e dey work" : "How it works"}
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {mode === "cruise" ? "How your drag turn to grade." : "How a score becomes a grade."}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            {mode === "cruise"
              ? "Every drag on NGSC follow the same ten questions for every oga. Whether na you or your neighbour do am, the score dey comparable. No favoritism, no bias."
              : "Every evaluation on the Nigeria Governance Scorecard follows the same structure regardless of which official is scored or which mode was used. That consistency is what makes one governor's grade comparable to another's."}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 lg:px-10">

        {/* Step 1: 10 questions */}
        <section>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-white">1</span>
            <h2 className="text-xl font-bold text-ink">
              {mode === "cruise" ? "Ten questions, ten areas of government life" : "Ten questions, ten categories"}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {mode === "cruise"
              ? "Same question, different vibe. Taxpayer mode dey formal. Cruise mode dey real Naija. But both na the same ten areas: roads, light, hospital, school, job, security and more."
              : "One question per category, asked in both formal English (Taxpayer mode) and Nigerian Pidgin (Cruise mode). Same underlying question, different register. Every official faces the same ten areas without exception."}
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-xl border border-line bg-paper-raised p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-tint text-forest-500">
                  {cat.icon}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{cat.label}</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{mode === "cruise" ? cat.cruiseQ : cat.q}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 2: answer scale */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-white">2</span>
            <h2 className="text-xl font-bold text-ink">
              {mode === "cruise" ? "You answer A to F - no star rating nonsense" : "Each question answered A to F"}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {mode === "cruise"
              ? "No 1-to-5 star rubbish. Letter grades with clear definition so every person wey dey drag dey use the same standard, whether you dey Lagos or London."
              : "Not star ratings or numbers: letter grades with clear definitions so every evaluator uses the same standard across all officials, all states, all times."}
          </p>

          <div className="mt-6 grid gap-2.5 grid-cols-3 sm:grid-cols-5">
            {ANSWER_SCALE.map((opt) => (
              <div
                key={opt.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper-raised p-4"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-[1.2rem] font-black text-white"
                  style={{ background: opt.gradient }}
                >
                  {opt.label}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{mode === "cruise" ? opt.cruiseDisplay : opt.display}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">{mode === "cruise" ? opt.cruiseHelper : opt.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: score to grade */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-white">3</span>
            <h2 className="text-xl font-bold text-ink">
              {mode === "cruise" ? "Your answers average into a score, score become grade" : "Answers average into a score, score maps to a grade"}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {mode === "cruise"
              ? "The ten letter grades convert to number (A=5, B=4, C=3, D=2, F=1), average am, scale to 100. That number become your oga final NGSC grade. Simple math, no politics."
              : "The ten letter grades convert to a numeric average (A=5, B=4, C=3, D=2, F=1), scaled to 100. That number maps to a final letter grade:"}
          </p>

          {/* Grade card strip */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-line-strong shadow-card">
            {GRADE_SCALE.map((row, i) => (
              <motion.div
                key={row.grade}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-5 px-6 py-4 ${i > 0 ? "border-t border-line" : ""} ${row.bg}`}
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-[1.6rem] font-black ${row.color}`}>
                  {row.grade}
                </span>
                <div className="flex-1">
                  <p className={`text-[15px] font-semibold ${row.textClass}`}>{row.meaning}</p>
                </div>
                <span className={`font-mono text-[13px] ${row.textClass} opacity-70`}>{row.range}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 4: demographic brackets */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-white">4</span>
            <h2 className="text-xl font-bold text-ink">
              {mode === "cruise" ? "Evaluations dey bracketed, anonymous, no identity stored" : "Evaluations are anonymously bracketed"}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
            {mode === "cruise"
              ? "Results fit break by segment - your state, your work status, your age group, without ever identifying who you be. Three brackets dey captured when you start:"
              : "Results can be read by segment without ever identifying an individual evaluator. No account is created, no personal data is stored. Three brackets are captured at onboarding:"}
          </p>
          <div className="mt-5 grid gap-2.5 lg:grid-cols-3">
            {BRACKETS.map((b) => (
              <div key={b.label} className="flex items-center justify-between rounded-xl border border-line bg-paper-raised px-5 py-3.5">
                <span className="text-[14px] font-medium text-ink">{b.label}</span>
                <span className="text-[13px] text-ink-muted">{b.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Guard note */}
        <section className="mt-12">
          <div className="flex items-start gap-4 rounded-2xl border border-forest-500/30 bg-forest-tint/40 p-6">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-forest-500" />
            <div>
              <h3 className="text-[15px] font-semibold text-ink">
                {mode === "cruise" ? "Blocking bad-faith entries" : "Guarding against manipulation"}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                {mode === "cruise"
                  ? "NGSC roadmap include photo and clip evidence to back evaluations, plus pattern detection to catch coordinated fake entries before dem affect public score."
                  : "The Nigeria Governance Scorecard includes evidence-backed evaluations where an evaluator can attach a photo or clip to support a claim, and pattern-based detection to flag coordinated or duplicate submissions before they affect a public score."}
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA - consistent with home ClosingCta scale */}
        <section className="mt-10 overflow-hidden rounded-2xl bg-forest-900">
          <div className="px-8 py-12 lg:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {mode === "cruise" ? "You don know the gist." : "Now you know how it works."}
                </p>
                <p className="mt-2 max-w-md text-[15px] text-white/60">
                  {mode === "cruise"
                    ? "Time to drag somebody. Pick your oga, answer ten questions, and see the grade the data give them."
                    : "Put the methodology to use. Select an official, answer ten questions, and see what the data produces."}
                </p>
              </div>
              <Link
                href="/start"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-paper px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-forest-tint"
              >
                {mode === "cruise" ? "Go drag one" : "Rate a leader"} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DonationSection />
      <SiteFooter />
    </div>
  );
}
