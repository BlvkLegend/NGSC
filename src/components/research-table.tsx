"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Lock } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { PaywallModal } from "@/components/paywall-modal";

type Column = "name" | "role" | "jurisdiction" | "score" | "grade" | "evaluations" | "trend";

const COLUMNS: { key: Column; label: string }[] = [
  { key: "name", label: "Official" },
  { key: "role", label: "Office" },
  { key: "jurisdiction", label: "Jurisdiction" },
  { key: "score", label: "Score" },
  { key: "grade", label: "Grade" },
  { key: "evaluations", label: "Evaluations" },
  { key: "trend", label: "Trend" },
];

const PREVIEW_COUNT = 3;

export function ResearchTable() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [sortKey, setSortKey] = useState<Column>("score");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const data = leaders.map((l) => ({
      ...l,
      grade: scoreToGrade(l.score),
    }));
    return data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "score" || sortKey === "evaluations") {
        cmp = a[sortKey] - b[sortKey];
      } else {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      return sortDesc ? -cmp : cmp;
    });
  }, [sortKey, sortDesc]);

  const previewRows = rows.slice(0, PREVIEW_COUNT);
  const lockedCount = rows.length - PREVIEW_COUNT;

  function toggleSort(key: Column) {
    if (key === sortKey) {
      setSortDesc((d) => !d);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-[13px] text-ink-muted">
          Showing {PREVIEW_COUNT} preview rows
        </p>
        <button
          onClick={() => setShowPaywall(true)}
          className="flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-forest-tint"
        >
          <Lock size={13} /> Unlock Full Dataset
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              {COLUMNS.map((col) => (
                <th key={col.key} className="py-2.5 pr-6">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted hover:text-ink"
                  >
                    {col.label}
                    <ArrowUpDown
                      size={11}
                      className={sortKey === col.key ? "text-forest-500" : "text-line-strong"}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((r) => (
              <tr key={r.slug} className="border-b border-line hover:bg-forest-tint/40">
                <td className="py-3 pr-6">
                  <Link href={`/leaders/${r.slug}`} className="text-[13px] font-medium text-ink hover:underline">
                    {r.name}
                  </Link>
                </td>
                <td className="py-3 pr-6 text-[13px] text-ink-muted">{r.role}</td>
                <td className="py-3 pr-6 text-[13px] text-ink-muted">{r.jurisdiction}</td>
                <td className="py-3 pr-6 font-mono text-[13px] text-ink">{r.score}</td>
                <td className="py-3 pr-6 font-mono text-[13px] text-ink">{r.grade}</td>
                <td className="py-3 pr-6 font-mono text-[13px] text-ink-muted">
                  {r.evaluations.toLocaleString()}
                </td>
                <td className="py-3 pr-6 text-[13px] text-ink-muted capitalize">{r.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Locked rows paywall gate */}
      <div className="relative mt-0">
        {/* Blurred ghost rows — not real data, just visual texture */}
        <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
          {Array.from({ length: Math.min(lockedCount, 4) }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-0 border-b border-line px-0 py-3 blur-[3px] opacity-40"
            >
              {COLUMNS.map((col) => (
                <div key={col.key} className="w-[120px] pr-6">
                  <div className="h-3 rounded bg-ink-muted/20" style={{ width: `${55 + ((i * 17 + COLUMNS.indexOf(col) * 13) % 40)}%` }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-paper via-paper/92 to-paper/60 px-6 py-8">
          <div className="flex flex-col items-center text-center max-w-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-paper-raised">
              <Lock size={20} className="text-ink-muted" />
            </div>
            <p className="mt-3 text-[15px] font-semibold text-ink">
              Full dataset locked
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              The full register includes all tracked officials with complete scores, category breakdowns, and CSV export. Used by journalists, analysts, and civil society researchers.
            </p>

            {/* Pricing */}
            <div className="mt-5 flex gap-3">
              <div className="flex-1 rounded-xl border border-line bg-paper-raised px-4 py-3 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Monthly</p>
                <p className="mt-1 text-[22px] font-black text-ink">$5</p>
                <p className="text-[11px] text-ink-muted">per month</p>
              </div>
              <div className="flex-1 rounded-xl border-2 border-forest-500 bg-forest-tint px-4 py-3 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-forest-500">Yearly</p>
                <p className="mt-1 text-[22px] font-black text-ink">$40</p>
                <p className="text-[11px] text-ink-muted">save $20/yr</p>
              </div>
            </div>

            <button
              onClick={() => setShowPaywall(true)}
              className="mt-4 w-full rounded-xl bg-forest-500 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-forest-700"
            >
              Unlock Full Dataset
            </button>
            <p className="mt-2 text-[11px] text-ink-muted">Includes CSV export. Cancel anytime.</p>
          </div>
        </div>
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
