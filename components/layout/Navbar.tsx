"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/yearly-proofs/", label: "Yearly Proofs" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        aria-label="Navigasi utama"
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
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/admin/"
            className="hidden text-xs uppercase tracking-wider text-muted hover:text-foreground sm:inline"
          >
            Admin
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
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
          aria-label="Menu navigasi"
        >
          <ul className="flex h-full flex-col gap-2 px-5 py-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block font-serif text-3xl text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/admin/" className="text-sm uppercase tracking-wider text-muted">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
