"use client";

import { X, Database, Check } from "lucide-react";

const PAYSTACK_MONTHLY = "https://paystack.com/pay/ngsc-data-monthly";
const PAYSTACK_YEARLY  = "https://paystack.com/pay/ngsc-data-yearly";

interface PaywallModalProps {
  onClose: () => void;
}

const TIERS = [
  {
    id: "monthly",
    label: "Monthly Access",
    price: "₦2,500",
    period: "/month",
    tokens: "100 data downloads",
    perks: ["Full CSV export", "All 10 category scores", "Historical records", "Cancel anytime"],
    cta: "Get Monthly Access",
    href: PAYSTACK_MONTHLY,
    highlight: false,
  },
  {
    id: "yearly",
    label: "Annual Access",
    price: "₦20,000",
    period: "/year",
    tokens: "Unlimited downloads",
    perks: ["Everything in Monthly", "Priority data updates", "API access (coming soon)", "Save ₦10,000 vs monthly"],
    cta: "Get Annual Access",
    href: PAYSTACK_YEARLY,
    highlight: true,
  },
];

export function PaywallModal({ onClose }: PaywallModalProps) {
  return (
    <div className="fixed inset-0 z-[990] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-paper shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-muted hover:text-ink"
        >
          <X size={14} />
        </button>

        <div className="px-8 pb-6 pt-8">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-forest-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-500">
              Data Access
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink">Download the full dataset</h2>
          <p className="mt-2 text-[13px] text-ink-muted">
            Complete structured data behind every Nigeria Governance Scorecard entry. Formatted for research, journalism, and policy analysis.
          </p>
        </div>

        <div className="grid gap-3 px-8 pb-8 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative overflow-hidden rounded-xl border p-5 ${
                tier.highlight
                  ? "border-forest-500 bg-forest-tint"
                  : "border-line bg-paper-raised"
              }`}
            >
              {tier.highlight && (
                <span className="absolute right-3 top-3 rounded-full bg-forest-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                  Best value
                </span>
              )}
              <p className="text-[13px] font-semibold text-ink">{tier.label}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black text-ink">{tier.price}</span>
                <span className="text-[12px] text-ink-muted">{tier.period}</span>
              </div>
              <p className="mt-1 text-[12px] text-forest-500 font-medium">{tier.tokens}</p>
              <ul className="mt-4 space-y-2">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[12px] text-ink-muted">
                    <Check size={12} className="mt-0.5 shrink-0 text-forest-500" /> {p}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 block w-full rounded-xl py-2.5 text-center text-[13px] font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-forest-500 text-white hover:bg-forest-700"
                    : "border border-forest-500 text-forest-500 hover:bg-forest-tint"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="border-t border-line px-8 py-4 text-[11px] text-ink-muted">
          Payment powered by Paystack. Secure. Cancel anytime. Data access activates immediately after payment confirmation.
        </p>
      </div>
    </div>
  );
}
