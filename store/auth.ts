"use client";

import { create } from "zustand";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readJson, removeKey, writeJson } from "@/lib/storage/local";

/** Kredensial demo — diganti auth sungguhan di produksi */
export const DEMO_CREDENTIALS = {
  email: "admin@demo.com",
  password: "admin123",
} as const;

interface AuthSession {
  email: string;
  loggedInAt: string;
}

interface AuthState {
  session: AuthSession | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  hydrated: false,

  hydrate() {
    try {
      const session = readJson<AuthSession | null>(STORAGE_KEYS.auth, null);
      set({ session, hydrated: true });
    } catch {
      set({ session: null, hydrated: true });
    }
  },

  login(email, password) {
    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      const session: AuthSession = {
        email: DEMO_CREDENTIALS.email,
        loggedInAt: new Date().toISOString(),
      };
      writeJson(STORAGE_KEYS.auth, session);
      set({ session });
      return true;
    }
    return false;
  },

  logout() {
    removeKey(STORAGE_KEYS.auth);
    set({ session: null });
  },

  isAuthenticated() {
    return get().session != null;
  },
}));
