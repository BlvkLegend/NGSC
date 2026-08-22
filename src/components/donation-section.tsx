"use client";

import { Coffee } from "lucide-react";
import { useMode } from "@/lib/mode-context";

const PAYSTACK_LINK = "https://paystack.com/pay/ngsc-support";

export function DonationSection() {
  const { mode } = useMode();
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-4 pt-2 lg:px-10">
      <div className="overflow-hidden rounded-2xl border border-cruise-500/25 bg-paper-raised">
        <div className="px-8 py-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Coffee size={16} className="text-cruise-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cruise-500">
                  {mode === "cruise" ? "Keep the light on" : "Support the platform"}
                </span>
              </div>
              <h2 className="mt-2 text-[1.4rem] font-bold leading-tight text-ink">
                {mode === "cruise" ? "Help us keep NGSC running." : "Keep the Lights On."}
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-muted">
                {mode === "cruise"
                  ? "NGSC dey free. But server, design, and dev no be free. If the platform don help you, drop something small to keep am going."
                  : "NGSC is free and fully independent. No government funding. No party sponsorship. A small contribution keeps the infrastructure running and the platform free for everyone."}
              </p>
            </div>
            <a
              href={PAYSTACK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cruise-500 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-cruise-700"
            >
              <Coffee size={15} />
              {mode === "cruise" ? "Buy us a coffee" : "Support with a coffee"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
