"use client";

import { useSearchParams } from "next/navigation";
import { PhaseShell } from "@/components/shell/PhaseShell";

export function EditYearlyProofShell() {
  const id = useSearchParams().get("id");
  return (
    <PhaseShell
      eyebrow="Admin · Yearly Proofs"
      title="Edit yearly proof"
      description={
        id
          ? `Shell edit untuk id=${id}. Form penuh di Fase 3.`
          : "Tambahkan ?id= pada URL. Form penuh di Fase 3."
      }
    />
  );
}
