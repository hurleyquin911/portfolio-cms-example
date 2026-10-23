"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { ProfileImage } from "@/components/media/ProfileImage";
import { PersonJsonLd } from "@/components/seo/JsonLd";
import { settingsRepo } from "@/lib/repositories";

export function AboutContent() {
  const { data: settings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  if (loading || !settings) {
    return (
      <Container className="py-16">
        <PageSkeleton />
      </Container>
    );
  }

  return (
    <main className="flex-1">
      <PersonJsonLd
        name={settings.heroName}
        description={settings.aboutShort}
        email={settings.social.email}
      />
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal variant="clip">
          <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-surface-2">
            <ProfileImage
              publicSrc={settings.profileImagePublicSrc}
              fileId={settings.profileImageFileId}
              alt={`Foto profil ${settings.heroName}`}
              width={1000}
              height={1250}
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">About</p>
            <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
              {settings.heroName}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {settings.aboutLong}
            </p>
          </Reveal>

          <Reveal className="mt-12" as="section">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted">
              Timeline
            </h2>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {settings.timeline.map((item) => (
                <li key={item.id} className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <p className="text-xs tabular-nums text-muted">{item.year}</p>
                  <p className="mt-1 font-serif text-2xl">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>

      <section className="border-t border-border py-16" aria-labelledby="skills-h">
        <Container>
          <Reveal>
            <h2 id="skills-h" className="font-serif text-3xl">
              Skills & Tools
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
                Skills
              </h3>
              <ul className="mt-4 space-y-2">
                {settings.skills.map((s) => (
                  <li key={s} className="font-serif text-2xl">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
                Tools
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {settings.tools.map((t) => (
                  <li
                    key={t}
                    className="border border-border px-3 py-1.5 text-sm text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
