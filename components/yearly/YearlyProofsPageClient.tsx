"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { YearlyProofsList } from "@/components/yearly/YearlyProofsList";
import { useT } from "@/hooks/useT";

export function YearlyProofsPageClient() {
  const { t } = useT();

  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {t("yearly.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            {t("yearly.title")}
          </h1>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            {t("yearly.subtitle")}
          </p>
        </Reveal>
        <div className="mt-12">
          <YearlyProofsList />
        </div>
      </Container>
    </main>
  );
}
