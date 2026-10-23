/** Namespace localStorage agar tidak bentrok dengan app lain di domain yang sama */
export const STORAGE_KEYS = {
  seedVersion: "neo.demo.seedVersion",
  projects: "neo.demo.projects",
  yearlyProofs: "neo.demo.yearlyProofs",
  messages: "neo.demo.messages",
  settings: "neo.demo.settings",
  auth: "neo.demo.auth",
  theme: "neo.demo.theme",
  contactRateLimit: "neo.demo.contactRateLimit",
  preloaderSeen: "neo.demo.preloaderSeen",
} as const;

/** Bump versi ini untuk memaksa re-seed saat struktur data berubah */
export const SEED_VERSION = "1.1.0";
