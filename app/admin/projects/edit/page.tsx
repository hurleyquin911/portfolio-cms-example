import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { EditProjectClient } from "./EditProjectClient";

export const metadata: Metadata = { title: "Admin · Edit Project" };

export default function AdminEditProjectPage() {
  return (
    <Suspense
      fallback={
        <AdminPage title="Memuat…">
          <PageSkeleton />
        </AdminPage>
      }
    >
      <EditProjectClient />
    </Suspense>
  );
}
