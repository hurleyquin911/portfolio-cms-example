import { clearDb } from "@/lib/db";
import {
  SEED_MESSAGES,
  SEED_PROJECTS,
  SEED_SETTINGS,
  SEED_YEARLY_PROOFS,
} from "@/lib/seed/data";
import { SEED_VERSION, STORAGE_KEYS } from "@/lib/storage/keys";
import { readString, removeKey, writeJson, writeString } from "@/lib/storage/local";

/**
 * Seed data ke localStorage sekali per versi.
 * Dipanggil dari client provider setelah mount.
 */
export function ensureSeedData(): void {
  if (typeof window === "undefined") return;
  const current = readString(STORAGE_KEYS.seedVersion);
  if (current === SEED_VERSION) return;
  writeSeed();
}

/** Paksa tulis ulang seed (tombol Reset Demo Data) */
export async function resetDemoData(): Promise<void> {
  if (typeof window === "undefined") return;
  await clearDb();
  writeSeed();
  // Jangan hapus theme preference; hapus auth agar user login ulang jika perlu
  removeKey(STORAGE_KEYS.auth);
  removeKey(STORAGE_KEYS.contactRateLimit);
}

function writeSeed(): void {
  writeJson(STORAGE_KEYS.projects, SEED_PROJECTS);
  writeJson(STORAGE_KEYS.yearlyProofs, SEED_YEARLY_PROOFS);
  writeJson(STORAGE_KEYS.messages, SEED_MESSAGES);
  writeJson(STORAGE_KEYS.settings, SEED_SETTINGS);
  writeString(STORAGE_KEYS.seedVersion, SEED_VERSION);
}
