"use client";

import { useEffect } from "react";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Preloader } from "@/components/motion/Preloader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";

/**
 * Bootstrap client: seed, theme, auth, Lenis, preloader, cursor.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrateTheme = useThemeStore((s) => s.hydrate);
  const hydrateAuth = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    ensureSeedData();
    hydrateTheme();
    hydrateAuth();
  }, [hydrateTheme, hydrateAuth]);

  return (
    <LenisProvider>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      {children}
      <ToastViewport />
    </LenisProvider>
  );
}
