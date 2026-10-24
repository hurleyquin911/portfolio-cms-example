"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { projectsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { Project, ProjectStatus } from "@/lib/types";
import { useToastStore } from "@/store/toast";

export function ProjectsAdminClient() {
  const push = useToastStore((s) => s.push);
  const [items, setItems] = useState<Project[] | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    ensureSeedData();
    setItems(await projectsRepo.getAll());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);
      const matchS = status === "all" || p.status === status;
      return matchQ && matchS;
    });
  }, [items, query, status]);

  async function onDuplicate(id: string) {
    try {
      await projectsRepo.duplicate(id);
      await load();
      push("Project duplicated (draft)", "success");
    } catch (e) {
      push(e instanceof Error ? e.message : "Duplicate failed", "error");
    }
  }

  async function onDelete() {
    if (!deleteId) return;
    await projectsRepo.remove(deleteId);
    setDeleteId(null);
    await load();
    push("Project deleted", "success");
  }

  if (!items) {
    return (
      <AdminPage title="Projects">
        <PageSkeleton />
      </AdminPage>
    );
  }

  return (
    <AdminPage
      title="Projects"
      description="Project CRUD. Only published items appear in the public gallery."
      actions={
        <Button href="/admin/projects/new/" size="sm">
          + New project
        </Button>
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Search title / slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}
          className="rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="No projects"
          description="Create a new project or change the filter."
          action={
            <Button href="/admin/projects/new/" size="sm">
              Create project
            </Button>
          }
        />
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="py-3 pr-3 font-medium">Title</th>
                <th className="py-3 pr-3 font-medium">Year</th>
                <th className="py-3 pr-3 font-medium">Status</th>
                <th className="py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/70">
                  <td className="py-3 pr-3">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-muted">{p.slug}</p>
                  </td>
                  <td className="py-3 pr-3 tabular-nums">{p.year}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={
                        p.status === "published"
                          ? "text-success"
                          : "text-muted"
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/projects/edit/?id=${encodeURIComponent(p.id)}`}
                        className="text-xs underline underline-offset-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-foreground"
                        onClick={() => void onDuplicate(p.id)}
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        className="text-xs text-danger"
                        onClick={() => setDeleteId(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete project?"
        description="This cannot be undone (unless you use Reset Demo Data)."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void onDelete()}
      />
    </AdminPage>
  );
}
