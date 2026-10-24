"use client";

import { cn } from "@/lib/cn";
import { useT } from "@/hooks/useT";
import { useLocaleStore } from "@/store/locale";

/**
 * Switch EN ↔ ID — compact text toggle next to theme.
 */
export function LocaleToggle() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const { t } = useT();
  const isId = locale === "id";

  return (
    <div
      className="inline-flex h-9 items-center rounded-full border border-border bg-surface-2 p-0.5"
      role="group"
      aria-label={isId ? t("locale.switchToEn") : t("locale.switchToId")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={!isId}
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors",
          !isId
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground",
        )}
      >
        {t("locale.short.en")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("id")}
        aria-pressed={isId}
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors",
          isId
            ? "bg-foreground text-background"
            : "text-muted hover:text-foreground",
        )}
      >
        {t("locale.short.id")}
      </button>
    </div>
  );
}
