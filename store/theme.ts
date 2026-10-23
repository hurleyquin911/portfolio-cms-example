"use client";

import { create } from "zustand";
import { STORAGE_KEYS } from "@/lib/storage/keys";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  hydrated: boolean;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
  hydrate: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
    /* ignore */
  }
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  hydrated: false,

  hydrate() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.theme) as Theme | null;
      const theme = stored === "dark" || stored === "light" ? stored : "light";
      applyTheme(theme);
      set({ theme, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  setTheme(theme) {
    applyTheme(theme);
    set({ theme });
  },

  toggle() {
    const next = get().theme === "light" ? "dark" : "light";
    get().setTheme(next);
  },
}));
