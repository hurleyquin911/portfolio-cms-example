"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/cn";
import type { MessageKey } from "@/lib/i18n";
import { useAuthStore } from "@/store/auth";

const LINKS: Array<{ href: string; labelKey: MessageKey }> = [
  { href: "/admin/", labelKey: "admin.nav.dashboard" },
  { href: "/admin/projects/", labelKey: "admin.nav.projects" },
  { href: "/admin/yearly-proofs/", labelKey: "admin.nav.yearlyProofs" },
  { href: "/admin/messages/", labelKey: "admin.nav.messages" },
  { href: "/admin/settings/", labelKey: "admin.nav.settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const session = useAuthStore((s) => s.session);
  const { t } = useT();

  if (pathname.includes("/admin/login")) return null;

  return (
    <aside className="border-b border-border bg-surface-2/50 lg:w-56 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-3.5rem)]">
      <div className="px-5 py-4 lg:px-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {t("admin.nav.eyebrow")}
        </p>
        <p className="mt-1 truncate text-sm text-foreground">{session?.email}</p>
      </div>
      <nav
        aria-label={t("admin.nav.eyebrow")}
        className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-6"
      >
        {LINKS.map((link) => {
          const active =
            link.href === "/admin/"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(link.href.replace(/\/$/, ""));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm",
                active
                  ? "bg-surface text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(link.labelKey)}
            </Link>
          );
        })}
        <button
          type="button"
          className="mt-2 whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-left text-sm text-muted hover:text-foreground lg:mt-6"
          onClick={() => {
            logout();
            router.replace("/admin/login/");
          }}
        >
          {t("admin.nav.logout")}
        </button>
      </nav>
    </aside>
  );
}
