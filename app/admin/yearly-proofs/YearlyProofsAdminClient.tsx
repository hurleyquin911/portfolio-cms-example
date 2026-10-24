"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { yearlyProofsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { YearlyProof } from "@/lib/types";
import { useToastStore } from "@/store/toast";

export function YearlyProofsAdminClient() {
  const push = useToastStore((s) => s.push);
  const [items, setItems] = useState<YearlyProof[] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    ensureSeedData();
    setItems(await yearlyProofsRepo.getAll());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete() {
    if (!deleteId) return;
    await yearlyProofsRepo.remove(deleteId);
    setDeleteId(null);
    await load();
    push("Yearly proof deleted", "success");
  }

  if (!items) {
    return (
      <AdminPage title="Yearly Proofs">
        <PageSkeleton />
      </AdminPage>
    );
  }

  return (
    <AdminPage
      title="Yearly Proofs"
      description="Yearly archive + PDFs in IndexedDB."
      actions={
        <Button href="/admin/yearly-proofs/new/" size="sm">
          + New
        </Button>
      }
    >
      {items.length === 0 ? (
        <EmptyState
          title="No yearly proofs yet"
          action={
            <Button href="/admin/yearly-proofs/new/" size="sm">
              Create
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-xs text-muted">{item.year}</p>
                <p className="font-serif text-xl">{item.title}</p>
                <p className="text-xs text-muted">
                  {item.pdf
                    ? item.pdf.fileName
                    : item.publicPdfPath
                      ? "Seed PDF"
                      : "No PDF"}
                </p>
              </div>
              <div className="flex gap-3 text-xs">
                <Link
                  href={`/admin/yearly-proofs/edit/?id=${encodeURIComponent(item.id)}`}
                  className="underline underline-offset-2"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-danger"
                  onClick={() => setDeleteId(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete yearly proof?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void onDelete()}
      />
    </AdminPage>
  );
}
