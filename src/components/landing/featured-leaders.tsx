"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeaderRow } from "@/components/leader-row";
import { asset } from "@/lib/asset";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const COPY = {
  taxpayer: { eyebrow: "Trending evaluations", title: "Most dragged this week.", link: "See all officials" },
  cruise: { eyebrow: "Who everybody dey drag", title: "These ones trending for the wrong reasons.", link: "See all the ogas" },
};

const TRENDING_PHOTO = asset("/trending-evaluations.jpg");

export function FeaturedLeaders() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      {/* Trending photo band */}
      <div className="relative mb-8 h-36 w-full overflow-hidden rounded-2xl sm:h-44">
        <img
          src={TRENDING_PHOTO}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{copy.eyebrow}</span>
          <h2 className="mt-2 max-w-sm text-2xl font-bold text-white sm:text-3xl">{copy.title}</h2>
        </div>
      </div>
      <div className="flex items-end justify-between border-b border-line pb-4">
        <div />

        <Link
          href="/leaders"
          className="hidden items-center gap-1.5 text-[14px] font-medium text-ink hover:text-forest-500 sm:flex"
        >
          {copy.link} <ArrowRight size={15} />
        </Link>
      </div>

      <div>
        {leaders.slice(0, 5).map((leader, i) => (
          <LeaderRow key={leader.slug} leader={leader} index={i} />
        ))}
      </div>

      {/* Mobile-only View all CTA */}
      <Link
        href="/leaders"
        className="mt-5 flex items-center justify-center gap-1.5 rounded-xl border border-line bg-paper-raised py-3 text-[14px] font-medium text-ink hover:text-forest-500 sm:hidden"
      >
        {copy.link} <ArrowRight size={15} />
      </Link>
    </section>
  );
}
