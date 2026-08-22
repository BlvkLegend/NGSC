/**
 * The hero's "dynamic imagery." Deliberately not a stock photo: no
 * licensing risk, no hosting dependency, and effectively free on a slow
 * connection (a few hundred bytes of inline SVG vs. a multi-hundred-KB
 * hero image). Instead it extends the actual NGSC mark's own vocabulary,
 * ascending bars, a sunrise arc, the national outline, at large scale, so
 * the hero reads as brand-coherent rather than generic decoration.
 */
export function CivicMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="sunrise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--forest-300)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--forest-300)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="barFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--forest-500)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--forest-500)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <circle cx="460" cy="150" r="220" fill="url(#sunrise)" />

      {/* Ascending bars, echoing the logo's growth motif, at editorial scale */}
      {[
        { x: 120, h: 90 },
        { x: 190, h: 150 },
        { x: 260, h: 210 },
        { x: 330, h: 280 },
        { x: 400, h: 360 },
        { x: 470, h: 440 },
      ].map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={560 - bar.h}
          width="46"
          height={bar.h}
          rx="6"
          fill="url(#barFade)"
        />
      ))}

      {/* Baseline, evoking the horizon / ledger rule */}
      <line x1="80" y1="560" x2="560" y2="560" stroke="var(--line-strong)" strokeWidth="1.5" />
    </svg>
  );
}
