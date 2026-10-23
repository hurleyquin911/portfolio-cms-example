import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80),
  email: z.string().email("Email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter").max(120),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(2000),
  /** Honeypot — harus kosong */
  website: z.string().optional(),
  captchaAnswer: z
    .string()
    .min(1, "Jawaban captcha wajib")
    .refine((v) => !Number.isNaN(Number(v)), "Angka tidak valid"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
