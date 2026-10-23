"use client";

import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/40 p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className="w-full max-w-md rounded-[var(--radius-md)] border border-border bg-surface p-6 shadow-sm"
      >
        <h2 id={titleId} className="font-serif text-2xl">
          {title}
        </h2>
        {description ? (
          <p id={descId} className="mt-2 text-sm text-muted leading-relaxed">
            {description}
          </p>
        ) : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            ref={cancelRef}
            type="button"
            variant="secondary"
            size="sm"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button type="button" variant="danger" size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
