"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { IconMail } from "@/components/icons/SocialIcons";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { useT } from "@/hooks/useT";

export function ContactPageClient() {
  const { t } = useT();

  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {t("contact.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="mt-4 max-w-md text-muted leading-relaxed">
            {t("contact.intro")}
          </p>
          <a
            href="mailto:hello@neodeeps.demo"
            className="mt-8 inline-flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-accent"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border">
              <IconMail />
            </span>
            hello@neodeeps.demo
          </a>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </Container>
    </main>
  );
}
