"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useT } from "@/hooks/useT";
import { messagesRepo } from "@/lib/repositories";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readString, writeString } from "@/lib/storage/local";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { useToastStore } from "@/store/toast";

const RATE_LIMIT_MS = 30_000;

/**
 * Form kontak client-only.
 * PRODUKSI: ganti blok `messagesRepo.create` dengan layanan email
 * (EmailJS / Formspree / Resend) — biarkan validasi + spam protection tetap.
 */
export function ContactForm() {
  const push = useToastStore((s) => s.push);
  const { t } = useT();
  const [success, setSuccess] = useState(false);
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, sum: a + b };
  }, []);

  const schema = useMemo(() => createContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
      captchaAnswer: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const last = Number(readString(STORAGE_KEYS.contactRateLimit) ?? "0");
    if (Date.now() - last < RATE_LIMIT_MS) {
      push(t("contact.toast.rateLimit"), "error");
      return;
    }

    if (values.website) {
      setSuccess(true);
      return;
    }

    if (Number(values.captchaAnswer) !== captcha.sum) {
      push(t("contact.toast.badCaptcha"), "error");
      return;
    }

    await messagesRepo.create({
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      read: false,
    });

    writeString(STORAGE_KEYS.contactRateLimit, String(Date.now()));
    setSuccess(true);
    reset();
    push(t("contact.toast.saved"), "success");
  }

  if (success) {
    return (
      <div
        className="rounded-[var(--radius-md)] border border-border bg-surface p-8"
        role="status"
      >
        <h2 className="font-serif text-3xl">{t("contact.successTitle")}</h2>
        <p className="mt-3 text-muted leading-relaxed">
          {t("contact.successBody")}
        </p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => setSuccess(false)}
        >
          {t("contact.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label={t("contact.name")} error={errors.name?.message}>
        <input
          className={inputClass}
          autoComplete="name"
          {...register("name")}
        />
      </Field>
      <Field label={t("contact.email")} error={errors.email?.message}>
        <input
          type="email"
          className={inputClass}
          autoComplete="email"
          {...register("email")}
        />
      </Field>
      <Field label={t("contact.subject")} error={errors.subject?.message}>
        <input className={inputClass} {...register("subject")} />
      </Field>
      <Field label={t("contact.message")} error={errors.message?.message}>
        <textarea
          rows={6}
          className={inputClass}
          {...register("message")}
        />
      </Field>
      <Field
        label={t("contact.captcha", { a: captcha.a, b: captcha.b })}
        error={errors.captchaAnswer?.message}
      >
        <input
          type="number"
          inputMode="numeric"
          className={inputClass}
          {...register("captchaAnswer")}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="min-w-40">
        {isSubmitting ? t("contact.sending") : t("contact.send")}
      </Button>
    </form>
  );
}

const inputClass =
  "mt-1 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
