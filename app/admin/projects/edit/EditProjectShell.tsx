"use client";

import { useSearchParams } from "next/navigation";
import { PhaseShell } from "@/components/shell/PhaseShell";

export function EditProjectShell() {
  const id = useSearchParams().get("id");
  return (
    <PhaseShell
      eyebrow="Admin · Projects"
      title="Edit proyek"
      description={
        id
          ? `Shell edit untuk id=${id}. Form penuh di Fase 3.`
          : "Tambahkan ?id= pada URL. Form penuh di Fase 3."
      }
    />
  );
}
