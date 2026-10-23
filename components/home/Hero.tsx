"use client";

import Link from "next/link";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { ProfileImage } from "@/components/media/ProfileImage";
import { settingsRepo } from "@/lib/repositories";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { data: settings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  useGSAP(
    () => {
      registerGsap();
      if (!settings || !rootRef.current || prefersReducedMotion()) return;

      const lines = rootRef.current.querySelectorAll("[data-hero-line]");
      const media = rootRef.current.querySelector("[data-hero-media]");

      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      if (media) {
        gsap.fromTo(
          media,
          { clipPath: "inset(20% 10% 20% 10%)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            delay: 0.25,
          },
        );
        gsap.to(media, {
          yPercent: 8,
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
      <Container className="grid items-end gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
        <div>
          <p
            data-hero-line
            className="text-xs uppercase tracking-[0.22em] text-muted"
          >
            Designer & Creator
          </p>
          <div className="mt-5 overflow-hidden">
            <h1
              data-hero-line
              className="font-serif text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] tracking-tight text-balance"
            >
              {settings.heroName}
            </h1>
          </div>
          <div className="mt-6 overflow-hidden">
            <p
              data-hero-line
              className="max-w-md text-lg leading-relaxed text-muted"
            >
              {settings.heroTagline}
            </p>
          </div>
          <div data-hero-line className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="/projects/">
              {settings.heroCtaLabel}
            </MagneticButton>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center px-2 text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Hubungi
            </Link>
          </div>
        </div>

        <div
          data-hero-media
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-surface-2 will-change-transform"
        >
          <ProfileImage
            publicSrc={settings.profileImagePublicSrc}
            fileId={settings.profileImageFileId}
            alt={`Potret / mark ${settings.heroName}`}
          />
        </div>
      </Container>
    </header>
  );
}
