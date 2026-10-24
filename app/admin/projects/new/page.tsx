import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = { title: "Admin · New Project" };

export default function AdminNewProjectPage() {
  return (
    <AdminPage title="Create project" description="Create form with Tiptap and image upload.">
      <ProjectForm mode="create" />
    </AdminPage>
  );
}
