"use client";

import { create } from "zustand";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { STORAGE_KEYS } from "@/lib/storage/keys";

interface LocaleState {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  hydrate: () => void;
}

function applyLocale(locale: Locale) {
  document.documentElement.setAttribute("lang", locale);
  try {
    localStorage.setItem(STORAGE_KEYS.locale, locale);
  } catch {
    /* ignore */
  }
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: DEFAULT_LOCALE,
  hydrated: false,

  hydrate() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.locale);
      const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;
      applyLocale(locale);
      set({ locale, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  setLocale(locale) {
    applyLocale(locale);
    set({ locale });
  },

  toggle() {
    const next = get().locale === "en" ? "id" : "en";
    get().setLocale(next);
  },
}));
