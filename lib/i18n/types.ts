export type Locale = "en" | "id";

export const LOCALES: Locale[] = ["en", "id"];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "id";
}
