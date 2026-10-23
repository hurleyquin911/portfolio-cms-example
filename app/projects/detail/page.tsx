import type { Metadata } from "next";
import { Suspense } from "react";
import { PhaseShell } from "@/components/shell/PhaseShell";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { ProjectDetailClient } from "./ProjectDetailClient";

export const metadata: Metadata = {
  title: "Project Detail",
  description: "Detail proyek portfolio.",
};

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <PhaseShell title="Memuat proyek…">
          <PageSkeleton />
        </PhaseShell>
      }
    >
      <ProjectDetailClient />
    </Suspense>
  );
}
