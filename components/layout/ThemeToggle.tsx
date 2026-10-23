"use client";

import { useThemeStore } from "@/store/theme";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-border px-3 text-xs uppercase tracking-wider text-muted hover:text-foreground"
      aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
