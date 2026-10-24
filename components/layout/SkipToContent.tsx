"use client";

import { useT } from "@/hooks/useT";

export function SkipToContent() {
  const { t } = useT();
  return (
    <a href="#main-content" className="skip-link">
      {t("common.skipToContent")}
    </a>
  );
}
