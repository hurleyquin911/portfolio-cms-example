"use client";

import { useEffect } from "react";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Preloader } from "@/components/motion/Preloader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import { useAuthStore } from "@/store/auth";
import { useLocaleStore } from "@/store/locale";
import { useThemeStore } from "@/store/theme";

/**
 * Bootstrap client: seed, theme, locale, auth, Lenis, preloader.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrateTheme = useThemeStore((s) => s.hydrate);
  const hydrateLocale = useLocaleStore((s) => s.hydrate);
  const hydrateAuth = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    ensureSeedData();
    hydrateTheme();
    hydrateLocale();
    hydrateAuth();
  }, [hydrateTheme, hydrateLocale, hydrateAuth]);

  return (
    <LenisProvider>
      <Preloader />
      <ScrollProgress />
      {children}
      <ToastViewport />
    </LenisProvider>
  );
}
