"use client";

import { motion } from "framer-motion";

/** Instagram-story style segmented progress bar. `dark` mode uses paper/white tracks. */
export function ProgressBar({
  current,
  total,
  dark = false,
}: {
  current: number;
  total: number;
  dark?: boolean;
}) {
  return (
    <div className="flex gap-1" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`relative h-[3px] flex-1 overflow-hidden rounded-full ${
            dark ? "bg-paper/20" : "bg-line"
          }`}
        >
          {i < current && (
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${
                dark ? "bg-paper" : "bg-forest-500"
              }`}
              initial={{ width: i < current - 1 ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: i === current - 1 ? 0.4 : 0, ease: "easeOut" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
