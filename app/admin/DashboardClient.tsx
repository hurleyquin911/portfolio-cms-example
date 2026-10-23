"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/Skeleton";
import {
  messagesRepo,
  projectsRepo,
  yearlyProofsRepo,
} from "@/lib/repositories";
import { resetDemoData } from "@/lib/seed/bootstrap";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import { useToastStore } from "@/store/toast";

type Stats = {
  projects: number;
  draft: number;
  published: number;
  unread: number;
  yearly: number;
};

export function DashboardClient() {
  const push = useToastStore((s) => s.push);
  const [stats, setStats] = useState<Stats | null>(null);
  const [resetting, setResetting] = useState(false);

  const load = useCallback(async () => {
    ensureSeedData();
    const [projects, unread, yearly] = await Promise.all([
      projectsRepo.getAll(),
      messagesRepo.countUnread(),
      yearlyProofsRepo.getAll(),
    ]);
    setStats({
      projects: projects.length,
      draft: projects.filter((p) => p.status === "draft").length,
      published: projects.filter((p) => p.status === "published").length,
      unread,
      yearly: yearly.length,
    });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onReset() {
    if (
      !window.confirm(
        "Reset semua data demo ke seed awal? File IndexedDB juga dihapus.",
      )
    ) {
      return;
    }
    setResetting(true);
    try {
      await resetDemoData();
      await load();
      push("Demo data di-reset", "success");
    } finally {
      setResetting(false);
    }
  }

  if (!stats) {
    return (
      <AdminPage title="Dashboard">
        <PageSkeleton />
      </AdminPage>
    );
  }

  const cards = [
    { label: "Proyek", value: stats.projects, href: "/admin/projects/" },
    { label: "Published", value: stats.published, href: "/admin/projects/" },
    { label: "Draft", value: stats.draft, href: "/admin/projects/" },
    { label: "Pesan unread", value: stats.unread, href: "/admin/messages/" },
    { label: "Yearly proofs", value: stats.yearly, href: "/admin/yearly-proofs/" },
  ];

  return (
    <AdminPage
      title="Dashboard"
      description="Ringkasan data lokal di browser Anda."
      actions={
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={resetting}
          onClick={() => void onReset()}
        >
          {resetting ? "Meriset…" : "Reset Demo Data"}
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-[var(--radius-md)] border border-border bg-surface p-5 hover:bg-surface-2"
          >
            <p className="text-xs uppercase tracking-wider text-muted">
              {c.label}
            </p>
            <p className="mt-2 font-serif text-4xl tabular-nums">{c.value}</p>
          </Link>
        ))}
      </div>
    </AdminPage>
  );
}
