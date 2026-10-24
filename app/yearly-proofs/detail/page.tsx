import type { Metadata } from "next";
import { Suspense } from "react";
import { PhaseShell } from "@/components/shell/PhaseShell";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { YearlyProofDetailClient } from "./YearlyProofDetailClient";

export const metadata: Metadata = {
  title: "Yearly Proof Detail",
  description: "Detail yearly proof.",
};

export default function YearlyProofDetailPage() {
  return (
    <Suspense
      fallback={
        <PhaseShell title="Loading…">
          <PageSkeleton />
        </PhaseShell>
      }
    >
      <YearlyProofDetailClient />
    </Suspense>
  );
}
