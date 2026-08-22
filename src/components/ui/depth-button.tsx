"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useMode } from "@/lib/mode-context";

type DepthButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Layered-gradient CTA with a pressed/hover depth feel and a click ripple.
 * CSS + Framer-free (uses plain transitions) so it stays lightweight.
 * Colour follows the active persona: forest green in Taxpayer, amber in Cruise.
 */
export function DepthButton({
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled,
}: DepthButtonProps) {
  const { mode } = useMode();
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);
  const elRef = useRef<HTMLElement | null>(null);

  const isCruise = mode === "cruise";
  const gradient = isCruise
    ? "bg-[linear-gradient(180deg,#ffb765_0%,#d9720f_55%,#b8590a_100%)]"
    : "bg-[linear-gradient(180deg,#3fae9a_0%,#167a4a_55%,#0e5236_100%)]";

  function fireRipple(e: React.MouseEvent) {
    const target = elRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 550);
  }

  const shared = `relative isolate inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 py-3 text-[14px] font-medium text-white transition-transform duration-150 ${
    pressed ? "translate-y-[1px] scale-[0.98]" : ""
  } ${
    disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
  } ${gradient} ${
    pressed
      ? "shadow-[inset_0_2px_3px_rgba(0,0,0,0.2)]"
      : "shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.35)]"
  } ${className}`;

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-white/15" />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
          style={{ left: r.x, top: r.y, animation: "depth-ripple 0.55s ease-out forwards" }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      <style jsx>{`
        @keyframes depth-ripple {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
          }
          to {
            transform: translate(-50%, -50%) scale(9);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={elRef as React.Ref<HTMLAnchorElement>}
        className={shared}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={(e) => {
          fireRipple(e);
          onClick?.();
        }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={elRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={shared}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={(e) => {
        fireRipple(e);
        onClick?.();
      }}
    >
      {inner}
    </button>
  );
}
