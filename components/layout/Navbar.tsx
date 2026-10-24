"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/cn";
import type { MessageKey } from "@/lib/i18n";

const NAV: Array<{ href: string; labelKey: MessageKey }> = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects/", labelKey: "nav.projects" },
  { href: "/yearly-proofs/", labelKey: "nav.yearlyProofs" },
  { href: "/about/", labelKey: "nav.about" },
  { href: "/contact/", labelKey: "nav.contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useT();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label={t("nav.ariaMain")}
      >
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-foreground"
        >
          Neodeeps
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace(/\/$/, ""));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors",
                    active ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{t("nav.menu")}</span>
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-14 z-40 bg-background md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.ariaMobile")}
        >
          <ul className="flex h-full flex-col gap-2 px-5 py-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block font-serif text-3xl text-foreground"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
