import { SEED_SETTINGS } from "@/lib/seed/data";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readJson, writeJson } from "@/lib/storage/local";
import type { SiteSettings } from "@/lib/types";

export const settingsRepo = {
  async get(): Promise<SiteSettings> {
    return readJson<SiteSettings>(STORAGE_KEYS.settings, SEED_SETTINGS);
  },

  async update(patch: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.get();
    const next: SiteSettings = {
      ...current,
      ...patch,
      social: { ...current.social, ...patch.social },
      updatedAt: new Date().toISOString(),
    };
    writeJson(STORAGE_KEYS.settings, next);
    return next;
  },
};
