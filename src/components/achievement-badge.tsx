import { cn } from "@/lib/utils";
import type { Achievement } from "@/lib/data";
import { Award } from "lucide-react";

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 border border-line px-4 py-4",
        !achievement.earned && "opacity-40"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
          achievement.earned ? "border-forest-500 text-forest-500" : "border-line-strong text-ink-muted"
        )}
      >
        <Award size={16} strokeWidth={1.75} />
      </span>
      <div>
        <h4 className="text-[14px] font-medium text-ink">{achievement.title}</h4>
        <p className="mt-0.5 text-[12px] leading-snug text-ink-muted">{achievement.description}</p>
      </div>
    </div>
  );
}
