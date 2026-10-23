import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Form kontak dengan honeypot, math captcha, dan rate limit client-side.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Hubungi</h1>
          <p className="mt-4 max-w-md text-muted leading-relaxed">
            Ceritakan singkat tentang proyek Anda. Pesan tersimpan di Admin →
            Messages (demo tanpa backend).
          </p>
          <a
            href="mailto:hello@neodeeps.demo"
            className="mt-8 inline-block text-sm text-foreground underline underline-offset-4"
          >
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
