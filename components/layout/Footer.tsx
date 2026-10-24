"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  IconArrowUpRight,
  IconMail,
  SOCIAL_ICON_MAP,
} from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { useClientCollection } from "@/hooks/useClientCollection";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/cn";
import type { MessageKey } from "@/lib/i18n";
import { localizeSettings } from "@/lib/i18n/localize";
import { settingsRepo } from "@/lib/repositories";
import { refreshScroll } from "@/lib/scroll";

const SITE_NAV: Array<{ href: string; labelKey: MessageKey }> = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects/", labelKey: "nav.projects" },
  { href: "/yearly-proofs/", labelKey: "nav.yearlyProofs" },
  { href: "/about/", labelKey: "nav.about" },
  { href: "/contact/", labelKey: "nav.contact" },
];

export function Footer() {
  const { t, locale } = useT();
  const { data: rawSettings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  const settings = useMemo(
    () => (rawSettings ? localizeSettings(rawSettings, locale) : null),
    [rawSettings, locale],
  );

  useEffect(() => {
    refreshScroll();
  }, [settings, loading]);

  const social = settings?.social;
  const name = settings?.heroName ?? "Neodeeps";
  const tagline = settings?.heroTagline ?? t("content.footerTagline");
  const email = social?.email ?? "hello@neodeeps.demo";

  const socialLinks: Array<{
    href: string;
    label: keyof typeof SOCIAL_ICON_MAP;
  }> = [];
  if (social?.instagram)
    socialLinks.push({ href: social.instagram, label: "Instagram" });
  if (social?.behance)
    socialLinks.push({ href: social.behance, label: "Behance" });
  if (social?.dribbble)
    socialLinks.push({ href: social.dribbble, label: "Dribbble" });
  if (social?.linkedin)
    socialLinks.push({ href: social.linkedin, label: "LinkedIn" });

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {t("footer.portfolio")}
            </p>
            <p className="mt-3 font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-tight">
              {name}
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              {tagline}
            </p>
          </div>
          <Link
            href="/contact/"
            className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
          >
            {t("footer.startProject")}
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            <nav aria-label={t("footer.ariaSite")}>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {t("footer.explore")}
              </p>
              <ul className="mt-5 space-y-2.5">
                {SITE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground transition-colors hover:text-accent"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t("footer.ariaSocial")}>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {t("footer.connect")}
              </p>

              <a
                href={`mailto:${email}`}
                className="mt-5 inline-flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-accent"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface">
                  <IconMail />
                </span>
                {email}
              </a>

              <ul className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map((l) => {
                  const Icon = SOCIAL_ICON_MAP[l.label];
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={l.label}
                        title={l.label}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-foreground transition-colors",
                          "hover:border-foreground hover:bg-foreground hover:text-background",
                        )}
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {t("footer.studio")}
              </p>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                {t("footer.studioBlurb")}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-border bg-surface-2/50">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {name}
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((l) => {
              const Icon = SOCIAL_ICON_MAP[l.label];
              return (
                <a
                  key={`meta-${l.label}`}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="inline-flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <p className="text-xs text-muted">{t("common.allRights")}</p>
        </Container>
      </div>
    </footer>
  );
}
