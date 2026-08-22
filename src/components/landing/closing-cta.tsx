"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";

export function ClosingCta() {
  const { mode } = useMode();

  return (
    <section className="relative overflow-hidden border-t border-line bg-forest-900">
      <img
        src="https://images.unsplash.com/photo-1649502913092-fb7f0e8fc632?auto=format&fit=crop&w=1400&q=60"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          {mode === "cruise" ? (
            <>
              <p className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                You always had the gist. Now it dey on record.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70">
                Your evaluation enter a running score wey journalists and civil society
                fit quote. Not just group chat noise. A citable file. That na wetin
                your voice become on the Nigeria Governance Scorecard.
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                The opinion was always yours. Now it has a paper trail.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70">
                Your evaluation joins thousands of others into a running public score
                that journalists, civil society, and policymakers can cite.
                Not a tweet. A structured verdict. On record. Permanently.
              </p>
            </>
          )}
          <Link
            href="/start"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-paper px-6 py-3 text-[15px] font-bold text-ink transition-colors hover:bg-forest-tint"
          >
            {mode === "cruise" ? "Take Quiz" : "Take Quiz"}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
