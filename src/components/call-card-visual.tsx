import { GradeBadge } from "@/components/grade-badge";
import { scoreToSignal } from "@/lib/utils";
import { asset } from "@/lib/asset";
import type { Leader } from "@/lib/data";

const SIGNAL_BG: Record<string, string> = {
  good: "bg-signal-good",
  mid: "bg-signal-mid",
  low: "bg-signal-low",
};

/** Short certificate-style reference code, not a URL, so the card reads as
 *  an issued record rather than implying a live domain that doesn't exist. */
function referenceCode(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  return `NGSC-${String(hash).padStart(5, "0")}`;
}

export function CallCardVisual({
  leader,
  compact = false,
}: {
  leader: Leader;
  compact?: boolean;
}) {
  return (
    <div className="relative w-full max-w-[380px] overflow-visible rounded-[10px] border border-line-strong bg-paper-raised shadow-card">
      {/* Header stub */}
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="ledger-index text-[10px] font-medium text-forest-500">
          NGSC
        </span>
        <span className="ledger-index text-[10px] text-ink-muted">
          NG · {leader.tookOffice} to present
        </span>
      </div>

      <div className="px-6 pb-6 pt-3">
        <div className="flex items-center gap-3">
          {leader.photoUrl && (
            <img
              src={asset(leader.photoUrl)}
              alt={leader.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover object-top border border-line"
            />
          )}
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
              {leader.name}
            </h3>
            <p className="mt-0.5 text-[13px] text-ink-muted">
              {leader.role} · {leader.jurisdiction}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <GradeBadge score={leader.score} size="lg" />
          <div>
            <div className="font-mono text-3xl font-medium leading-none text-ink">
              {leader.score}
              <span className="text-base text-ink-muted">/100</span>
            </div>
            <p className="mt-1 text-[12px] text-ink-muted">
              {leader.evaluations.toLocaleString()} citizen evaluations
            </p>
          </div>
        </div>
      </div>

      {/* Perforation */}
      <div className="relative border-t border-dashed border-line-strong">
        <span className="absolute -left-[9px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-paper" />
        <span className="absolute -right-[9px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-paper" />
      </div>

      {!compact && (
        <div className="space-y-3 px-6 py-5">
          {leader.categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[12px] text-ink-muted">{cat.label}</span>
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full ${SIGNAL_BG[scoreToSignal(cat.score)]}`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <span className="font-mono w-7 shrink-0 text-right text-[12px] text-ink">
                {cat.score}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-line px-6 py-3">
        <span className="ledger-index text-[10px] text-ink-muted">{referenceCode(leader.slug)}</span>
        <span className="h-6 w-6 rounded-sm bg-ink [mask-image:repeating-linear-gradient(90deg,#000_0,#000_1px,transparent_1px,transparent_2px)]" />
      </div>
    </div>
  );
}
