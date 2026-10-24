import { en, type MessageKey } from "@/lib/i18n/en";
import { id } from "@/lib/i18n/id";
import type { Locale } from "@/lib/i18n/types";

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  en: en as Record<MessageKey, string>,
  id,
};

export type { MessageKey };
export type { Locale } from "@/lib/i18n/types";
export { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n/types";

export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const dict = dictionaries[locale] ?? dictionaries.en;
  let text = dict[key] ?? dictionaries.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}
