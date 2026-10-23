"use client";

import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SelectedProjects } from "@/components/projects/ProjectGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { settingsRepo } from "@/lib/repositories";

export function HomePageClient() {
  const { data: settings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  return (
    <main className="flex-1">
      <Hero />

      <section className="py-20 sm:py-28" aria-labelledby="selected-heading">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Selected
                </p>
                <h2
                  id="selected-heading"
                  className="mt-2 font-serif text-4xl sm:text-5xl"
                >
                  Selected Projects
                </h2>
              </div>
              <Link
                href="/projects/"
                className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Lihat semua
              </Link>
            </div>
          </Reveal>
          <div className="mt-12">
            <SelectedProjects limit={4} />
          </div>
        </Container>
      </section>

      {loading || !settings ? (
        <Container>
          <PageSkeleton />
        </Container>
      ) : (
        <Reveal as="section" variant="fade">
          <Marquee items={settings.tools} />
        </Reveal>
      )}

      <section className="py-20 sm:py-28" aria-labelledby="about-cta-heading">
        <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">About</p>
            <h2
              id="about-cta-heading"
              className="mt-2 max-w-2xl font-serif text-4xl sm:text-5xl text-balance"
            >
              Desain yang tenang di permukaan, ketat di sistem.
            </h2>
            <p className="mt-5 max-w-xl text-muted leading-relaxed">
              {settings?.aboutShort ??
                "Identitas merek, editorial, dan packaging — dari konsep hingga file siap produksi."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <Button href="/about/" variant="secondary">
                Tentang saya
              </Button>
              <Button href="/contact/">Mulai proyek</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
