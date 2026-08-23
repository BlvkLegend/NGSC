"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Lock, Download } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { PaywallModal } from "@/components/paywall-modal";

type Column = "name" | "role" | "jurisdiction" | "score" | "grade" | "evaluations" | "trend";

const COLUMNS: { key: Column; label: string }[] = [
  { key: "name",        label: "Official"     },
  { key: "role",        label: "Office"       },
  { key: "jurisdiction",label: "Jurisdiction" },
  { key: "score",       label: "Score"        },
  { key: "grade",       label: "Grade"        },
  { key: "evaluations", label: "Evaluations"  },
  { key: "trend",       label: "Trend"        },
];

const PREVIEW_COUNT = 3;

export function ResearchTable() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [sortKey, setSortKey] = useState<Column>("score");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const data = leaders.map((l) => ({ ...l, grade: scoreToGrade(l.score) }));
    return data.sort((a, b) => {
      const cmp =
        sortKey === "score" || sortKey === "evaluations"
          ? a[sortKey] - b[sortKey]
          : String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDesc ? -cmp : cmp;
    });
  }, [sortKey, sortDesc]);

  const previewRows = rows.slice(0, PREVIEW_COUNT);
  const lockedRows  = rows.slice(PREVIEW_COUNT);

  function toggleSort(key: Column) {
    if (key === sortKey) setSortDesc((d) => !d);
    else { setSortKey(key); setSortDesc(true); }
  }

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-[13px] text-ink-muted">
          Showing {PREVIEW_COUNT} preview rows · full dataset requires access
        </p>
        <button
          onClick={() => setShowPaywall(true)}
          className="flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-forest-tint"
        >
          <Download size={13} /> Download CSV
        </button>
      </div>

      {/* Table */}
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
                    <ArrowUpDown size={11} className={sortKey === col.key ? "text-forest-500" : "text-line-strong"} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Preview rows — fully visible */}
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
                <td className="py-3 pr-6 font-mono text-[13px] text-ink-muted">{r.evaluations.toLocaleString()}</td>
                <td className="py-3 pr-6 text-[13px] capitalize text-ink-muted">{r.trend}</td>
              </tr>
            ))}

            {/* Locked rows — real structure, progressively blurred, not readable */}
            {lockedRows.map((r, i) => {
              const blurLevel = i < 2 ? "blur-[2px]" : i < 4 ? "blur-[4px]" : "blur-[6px]";
              const opacity   = i < 2 ? "opacity-60" : i < 4 ? "opacity-35" : "opacity-15";
              return (
                <tr
                  key={r.slug}
                  aria-hidden
                  className={`pointer-events-none select-none border-b border-line ${blurLevel} ${opacity}`}
                >
                  <td className="py-3 pr-6 text-[13px] font-medium text-ink">{r.name}</td>
                  <td className="py-3 pr-6 text-[13px] text-ink-muted">{r.role}</td>
                  <td className="py-3 pr-6 text-[13px] text-ink-muted">{r.jurisdiction}</td>
                  <td className="py-3 pr-6 font-mono text-[13px] text-ink">{r.score}</td>
                  <td className="py-3 pr-6 font-mono text-[13px] text-ink">{r.grade}</td>
                  <td className="py-3 pr-6 font-mono text-[13px] text-ink-muted">{r.evaluations.toLocaleString()}</td>
                  <td className="py-3 pr-6 text-[13px] capitalize text-ink-muted">{r.trend}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Gradient fade over locked rows — visual only, no card unless user clicks */}
      <div
        aria-hidden
        className="pointer-events-none -mt-32 h-32 w-full"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--paper) 100%)" }}
      />

      {/* Persistent lock strip below table */}
      <div className="mt-2 flex items-center justify-between rounded-xl border border-line bg-paper-raised px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-paper">
            <Lock size={16} className="text-ink-muted" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Full dataset locked</p>
            <p className="text-[11px] text-ink-muted">All officials · CSV export · used by journalists and researchers</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] text-ink-muted">From</p>
            <p className="text-[15px] font-black text-ink">$5<span className="text-[11px] font-normal text-ink-muted">/mo</span></p>
          </div>
          <button
            onClick={() => setShowPaywall(true)}
            className="rounded-xl bg-forest-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-forest-700"
          >
            Unlock access
          </button>
        </div>
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
