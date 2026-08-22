"use client";

import { useMode } from "@/lib/mode-context";

export function PersonaToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line p-0.5"
      role="tablist"
      aria-label="Interface mode"
    >
      <button
        role="tab"
        aria-selected={mode === "taxpayer"}
        onClick={() => setMode("taxpayer")}
        className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
          compact ? "px-2.5" : ""
        } ${mode === "taxpayer" ? "bg-forest-500 text-white" : "text-ink-muted hover:text-ink"}`}
      >
        Taxpayer
      </button>
      <button
        role="tab"
        aria-selected={mode === "cruise"}
        onClick={() => setMode("cruise")}
        className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
          compact ? "px-2.5" : ""
        } ${mode === "cruise" ? "bg-cruise-500 text-white" : "text-ink-muted hover:text-ink"}`}
      >
        Cruise
      </button>
    </div>
  );
}
