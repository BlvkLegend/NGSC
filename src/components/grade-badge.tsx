import { cn, scoreToGrade, scoreToSignal } from "@/lib/utils";

const SIGNAL_CLASSES: Record<string, string> = {
  good: "border-signal-good text-signal-good",
  mid: "border-signal-mid text-signal-mid",
  low: "border-signal-low text-signal-low",
};

export function GradeBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const grade = scoreToGrade(score);
  const signal = scoreToSignal(score);
  const sizeClasses =
    size === "lg" ? "h-20 w-20 text-3xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-14 w-14 text-xl";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-[1.5px] font-display font-semibold",
        SIGNAL_CLASSES[signal],
        sizeClasses
      )}
    >
      {grade}
    </div>
  );
}
