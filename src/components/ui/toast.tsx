"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

export function Toast({
  message,
  variant = "success",
  visible,
}: {
  message: string;
  variant?: "success" | "error";
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-strong bg-paper-raised px-5 py-3 shadow-card"
          role="status"
        >
          {variant === "success" ? (
            <Check size={15} className="text-signal-good" />
          ) : (
            <AlertCircle size={15} className="text-signal-low" />
          )}
          <span className="text-[13px] text-ink">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
