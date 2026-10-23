import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = { title: "Admin · New Project" };

export default function AdminNewProjectPage() {
  return (
    <AdminPage title="Buat proyek" description="Form create dengan Tiptap & upload gambar.">
      <ProjectForm mode="create" />
    </AdminPage>
  );
}
