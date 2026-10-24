"use client";

import { useToastStore } from "@/store/toast";
import { cn } from "@/lib/cn";

export function ToastViewport() {
  const items = useToastStore((s) => s.items);
  const dismiss = useToastStore((s) => s.dismiss);

  if (items.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
      role="region"
      aria-label="Notifications"
    >
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            "flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm shadow-sm",
            t.tone === "success" && "border-success/40",
            t.tone === "error" && "border-danger/40",
          )}
        >
          <span>{t.message}</span>
          <button
            type="button"
            className="text-muted hover:text-foreground"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
