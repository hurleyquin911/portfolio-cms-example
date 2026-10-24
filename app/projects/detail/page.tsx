import type { Metadata } from "next";
import { Suspense } from "react";
import { PhaseShell } from "@/components/shell/PhaseShell";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { ProjectDetailClient } from "./ProjectDetailClient";

export const metadata: Metadata = {
  title: "Project Detail",
  description: "Portfolio project detail.",
};

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <PhaseShell title="Loading project…">
          <PageSkeleton />
        </PhaseShell>
      }
    >
      <ProjectDetailClient />
    </Suspense>
  );
}
