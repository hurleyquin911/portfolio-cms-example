"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { useClientCollection } from "@/hooks/useClientCollection";
import { settingsRepo } from "@/lib/repositories";
import { refreshScroll } from "@/lib/scroll";

const SITE_NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/yearly-proofs/", label: "Yearly Proofs" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export function Footer() {
  const { data: settings, loading } = useClientCollection(
    () => settingsRepo.get(),
    [],
  );

  useEffect(() => {
    refreshScroll();
  }, [settings, loading]);

  const social = settings?.social;
  const name = settings?.heroName ?? "Neodeeps";
  const tagline =
    settings?.heroTagline ??
    "Desain visual yang tenang, tajam, dan siap produksi.";
  const email = social?.email ?? "hello@neodeeps.demo";

  const socialLinks = [
    social?.instagram && { href: social.instagram, label: "Instagram" },
    social?.behance && { href: social.behance, label: "Behance" },
    social?.dribbble && { href: social.dribbble, label: "Dribbble" },
    social?.linkedin && { href: social.linkedin, label: "LinkedIn" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <footer className="mt-auto border-t border-border bg-surface-2/40">
      {/* Band besar — brand sebagai sinyal visual */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              Portfolio
            </p>
            <p className="mt-4 font-serif text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-foreground">
              {name}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {tagline}
            </p>
            <Link
              href="/contact/"
              className="mt-8 inline-flex h-12 items-center border-b border-foreground text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Mulai proyek bersama →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-12">
            <nav aria-label="Navigasi situs">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Explore
              </p>
              <ul className="mt-5 space-y-3">
                {SITE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-xl text-foreground transition-colors hover:text-accent sm:text-2xl"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Kontak & sosial">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Connect
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {email}
                  </a>
                </li>
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/admin/"
                    className="text-xs uppercase tracking-[0.14em] text-muted hover:text-foreground"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Demo mode — data tersimpan di browser Anda.</p>
        </Container>
      </div>
    </footer>
  );
}
