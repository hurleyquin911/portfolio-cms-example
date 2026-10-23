"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { projectsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { Project } from "@/lib/types";

export function EditProjectClient() {
  const id = useSearchParams().get("id");
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    ensureSeedData();
    let cancelled = false;
    (async () => {
      if (!id) {
        setProject(null);
        return;
      }
      const found = await projectsRepo.getById(id);
      if (!cancelled) setProject(found ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (project === undefined) {
    return (
      <AdminPage title="Edit proyek">
        <PageSkeleton />
      </AdminPage>
    );
  }

  if (!project) {
    return (
      <AdminPage
        title="Proyek tidak ditemukan"
        description="Periksa parameter ?id= pada URL."
      >
        <a href="/admin/projects/" className="text-sm underline">
          Kembali
        </a>
      </AdminPage>
    );
  }

  return (
    <AdminPage title="Edit proyek" description={project.title}>
      <ProjectForm mode="edit" initial={project} />
    </AdminPage>
  );
}
