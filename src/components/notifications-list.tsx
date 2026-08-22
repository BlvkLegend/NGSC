"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { notifications as initialNotifications } from "@/lib/data";
import { EmptyState } from "@/components/empty-state";

export function NotificationsList() {
  const [items, setItems] = useState(initialNotifications);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="You're caught up"
        body="New notifications about officials you follow will appear here."
      />
    );
  }

  return (
    <div>
      <div className="flex justify-end pb-4">
        <button onClick={markAllRead} className="text-[13px] font-medium text-forest-500 hover:underline">
          Mark all as read
        </button>
      </div>
      <div className="border-t border-line">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() =>
              setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
            }
            className={cn(
              "flex w-full items-start gap-4 border-b border-line px-1 py-5 text-left transition-colors hover:bg-forest-tint/40"
            )}
          >
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                n.unread ? "bg-forest-500" : "bg-transparent"
              )}
            />
            <div className="flex-1">
              <div className={cn("text-[14px]", n.unread ? "font-medium text-ink" : "text-ink-muted")}>
                {n.title}
              </div>
              <p className="mt-1 text-[13px] text-ink-muted">{n.body}</p>
            </div>
            <span className="ledger-index shrink-0 text-[11px] text-ink-muted">{n.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
