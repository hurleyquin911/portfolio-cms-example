import { z } from "zod";
import type { MessageKey } from "@/lib/i18n";

type Translator = (key: MessageKey) => string;

export function createContactSchema(t: Translator) {
  return z.object({
    name: z.string().min(2, t("contact.err.nameMin")).max(80),
    email: z.string().email(t("contact.err.email")),
    subject: z.string().min(3, t("contact.err.subjectMin")).max(120),
    message: z.string().min(10, t("contact.err.messageMin")).max(2000),
    /** Honeypot — harus kosong */
    website: z.string().optional(),
    captchaAnswer: z
      .string()
      .min(1, t("contact.err.captchaRequired"))
      .refine((v) => !Number.isNaN(Number(v)), t("contact.err.invalidNumber")),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
