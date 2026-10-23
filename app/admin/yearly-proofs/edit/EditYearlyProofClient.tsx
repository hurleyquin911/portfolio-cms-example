"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { YearlyProofForm } from "@/components/admin/YearlyProofForm";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { yearlyProofsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { YearlyProof } from "@/lib/types";

export function EditYearlyProofClient() {
  const id = useSearchParams().get("id");
  const [item, setItem] = useState<YearlyProof | null | undefined>(undefined);

  useEffect(() => {
    ensureSeedData();
    let cancelled = false;
    (async () => {
      if (!id) {
        setItem(null);
        return;
      }
      const found = await yearlyProofsRepo.getById(id);
      if (!cancelled) setItem(found ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (item === undefined) {
    return (
      <AdminPage title="Edit yearly proof">
        <PageSkeleton />
      </AdminPage>
    );
  }

  if (!item) {
    return (
      <AdminPage title="Tidak ditemukan">
        <a href="/admin/yearly-proofs/" className="text-sm underline">
          Kembali
        </a>
      </AdminPage>
    );
  }

  return (
    <AdminPage title="Edit yearly proof" description={item.title}>
      <YearlyProofForm mode="edit" initial={item} />
    </AdminPage>
  );
}
