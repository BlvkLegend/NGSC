"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const AD_DISMISS_KEY = "ngsc-ad-dismissed";
const AD_COOLDOWN_MS = 1000 * 60 * 60; // 1 hour between impressions

interface AdOverlayProps {
  onDismiss?: () => void;
}

export function AdOverlay({ onDismiss }: AdOverlayProps) {
  const [visible, setVisible]       = useState(false);
  const [countdown, setCountdown]   = useState(5);
  const [skippable, setSkippable]   = useState(false);

  useEffect(() => {
    // Respect cooldown
    try {
      const last = localStorage.getItem(AD_DISMISS_KEY);
      if (last && Date.now() - Number(last) < AD_COOLDOWN_MS) return;
    } catch {}

    // Show after 400ms to let page paint first
    const showTimer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (countdown <= 0) { dismiss(); return; }
    const t = setTimeout(() => {
      setCountdown((c) => c - 1);
      if (countdown === 3) setSkippable(true);
    }, 1000);
    return () => clearTimeout(t);
  }, [visible, countdown]);

  function dismiss() {
    setVisible(false);
    try { localStorage.setItem(AD_DISMISS_KEY, String(Date.now())); } catch {}
    onDismiss?.();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl bg-paper shadow-2xl">
        {/* Ad content slot - replace with actual ad creative */}
        <div className="flex min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-forest-900 to-forest-700 px-8 py-10 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Advertisement</span>
          <p className="mt-4 text-2xl font-bold text-white">Ad slot — partner placement</p>
          <p className="mt-2 text-[13px] text-white/60">
            Reserve this space. Contact ngsc@cezarsmedia.com
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3">
          <span className="text-[12px] text-ink-muted">
            {skippable ? "You can skip now" : `Ad closes in ${countdown}s`}
          </span>
          <button
            onClick={dismiss}
            disabled={!skippable}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
              skippable
                ? "bg-forest-500 text-white hover:bg-forest-700"
                : "cursor-not-allowed bg-line text-ink-muted"
            }`}
          >
            <X size={12} /> Skip
          </button>
        </div>
      </div>
    </div>
  );
}
