import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { EditYearlyProofClient } from "./EditYearlyProofClient";

export const metadata: Metadata = { title: "Admin · Edit Yearly Proof" };

export default function AdminEditYearlyProofPage() {
  return (
    <Suspense
      fallback={
        <AdminPage title="Loading…">
          <PageSkeleton />
        </AdminPage>
      }
    >
      <EditYearlyProofClient />
    </Suspense>
  );
}
