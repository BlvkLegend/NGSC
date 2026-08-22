import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start border border-dashed border-line-strong px-8 py-14 text-left">
      <span className="ledger-index text-[11px] text-ink-muted">Nothing filed here yet</span>
      <h3 className="mt-3 font-display text-xl font-medium text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
