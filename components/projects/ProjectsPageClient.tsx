"use client";

import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { useT } from "@/hooks/useT";

export function ProjectsPageClient() {
  const { t } = useT();

  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {t("projects.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            {t("projects.title")}
          </h1>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </Reveal>
        <div className="mt-12">
          <ProjectGallery />
        </div>
      </Container>
    </main>
  );
}
