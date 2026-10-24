import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/AdminPage";
import { YearlyProofForm } from "@/components/admin/YearlyProofForm";

export const metadata: Metadata = { title: "Admin · New Yearly Proof" };

export default function AdminNewYearlyProofPage() {
  return (
    <AdminPage title="Create yearly proof">
      <YearlyProofForm mode="create" />
    </AdminPage>
  );
}
