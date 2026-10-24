"use client";

import { IconMoon, IconSun } from "@/components/icons/SocialIcons";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/cn";
import { useThemeStore } from "@/store/theme";

/**
 * Toggle tema berbentuk switch pill — sun / moon dengan knob geser.
 */
export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const { t } = useT();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? t("theme.toLight") : t("theme.toDark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
      className={cn(
        "relative inline-flex h-9 w-[3.75rem] items-center rounded-full border border-border p-1 transition-colors",
        "bg-surface-2 hover:border-foreground/30",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      {/* Track icons */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center justify-center text-muted"
        aria-hidden
      >
        <IconSun className="h-3.5 w-3.5" />
      </span>
      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-center text-muted"
        aria-hidden
      >
        <IconMoon className="h-3.5 w-3.5" />
      </span>

      {/* Sliding knob */}
      <span
        className={cn(
          "relative z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isDark ? "translate-x-[1.65rem]" : "translate-x-0",
        )}
        aria-hidden
      >
        {isDark ? (
          <IconMoon className="h-3.5 w-3.5" />
        ) : (
          <IconSun className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  );
}
