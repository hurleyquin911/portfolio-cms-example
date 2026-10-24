"use client";

import { useCallback } from "react";
import { translate, type MessageKey } from "@/lib/i18n";
import { useLocaleStore } from "@/store/locale";

export function useT() {
  const locale = useLocaleStore((s) => s.locale);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale],
  );

  return { t, locale };
}
