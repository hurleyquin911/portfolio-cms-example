"use client";

import { useMemo, useRef } from "react";
import { IconArrowUpRight, IconMail } from "@/components/icons/SocialIcons";
import { ProfileImage } from "@/components/media/ProfileImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { useT } from "@/hooks/useT";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { localizeSettings } from "@/lib/i18n/localize";
import { settingsRepo } from "@/lib/repositories";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { t, locale } = useT();
  const { data: rawSettings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  const settings = useMemo(
    () => (rawSettings ? localizeSettings(rawSettings, locale) : null),
    [rawSettings, locale],
  );

  useGSAP(
    () => {
      registerGsap();
      if (!settings || !rootRef.current || prefersReducedMotion()) return;

      const lines = rootRef.current.querySelectorAll("[data-hero-line]");
      const media = rootRef.current.querySelector("[data-hero-media]");

      gsap.fromTo(
        lines,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      if (media) {
        gsap.fromTo(
          media,
          { clipPath: "inset(12% 8% 12% 8%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            delay: 0.2,
          },
        );
        gsap.to(media, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [settings] },
  );

  if (loading || !settings) {
    return (
      <Container className="py-24">
        <PageSkeleton />
      </Container>
    );
  }

  return (
    <header
      ref={rootRef}
      className="relative overflow-hidden border-b border-border"
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="flex min-h-0 flex-col justify-between gap-10 lg:py-1">
            <p
              data-hero-line
              className="text-xs uppercase tracking-[0.22em] text-muted"
            >
              {t("hero.eyebrow")}
            </p>

            <div className="max-w-xl">
              <div className="overflow-hidden">
                <h1
                  data-hero-line
                  className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] tracking-tight text-balance"
                >
                  {settings.heroName}
                </h1>
              </div>
              <div className="mt-5 overflow-hidden sm:mt-6">
                <p
                  data-hero-line
                  className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
                >
                  {settings.heroTagline}
                </p>
              </div>
            </div>

            <div
              data-hero-line
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <MagneticButton href="/projects/">
                <span>{settings.heroCtaLabel}</span>
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton href="/contact/" variant="secondary">
                <IconMail className="h-4 w-4 text-muted transition-colors group-hover:text-foreground" />
                <span>{t("hero.contact")}</span>
              </MagneticButton>
            </div>
          </div>

          <div
            data-hero-media
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-md)] bg-surface-2 will-change-transform lg:mx-0 lg:max-w-none"
          >
            <ProfileImage
              publicSrc={settings.profileImagePublicSrc}
              fileId={settings.profileImageFileId}
              alt={t("hero.portraitAlt", { name: settings.heroName })}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
