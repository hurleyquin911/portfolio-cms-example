"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { Button } from "@/components/ui/Button";
import { projectsRepo } from "@/lib/repositories";
import { slugify } from "@/lib/slug";
import type { Project, ProjectImage, ProjectStatus } from "@/lib/types";
import { useToastStore } from "@/store/toast";

const RichTextEditor = dynamic(
  () =>
    import("@/components/admin/RichTextEditor").then((m) => m.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 animate-pulse rounded-[var(--radius-md)] bg-surface-2" />
    ),
  },
);

const field =
  "mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm";

export function ProjectForm({
  initial,
  mode,
}: {
  initial?: Project;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const push = useToastStore((s) => s.push);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [year, setYear] = useState(initial?.year ?? new Date().getFullYear());
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [body, setBody] = useState(initial?.body ?? "<p></p>");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [status, setStatus] = useState<ProjectStatus>(
    initial?.status ?? "draft",
  );
  const [images, setImages] = useState<ProjectImage[]>(initial?.images ?? []);
  const [saving, setSaving] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    void projectsRepo.getAll().then((all) => {
      const set = new Set<string>();
      all.forEach((p) => p.tags.forEach((t) => set.add(t)));
      setSuggestions([...set].sort());
    });
  }, []);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const missingAlt = useMemo(
    () => images.some((img) => !img.alt.trim()),
    [images],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      push("Title and slug are required", "error");
      return;
    }
    if (missingAlt) {
      push("Every image needs alt text", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        slug: slugify(slug),
        year: Number(year),
        summary: summary.trim(),
        body,
        tags,
        status,
        images,
      };
      if (mode === "create") {
        await projectsRepo.create(payload);
        push("Project created", "success");
      } else if (initial) {
        await projectsRepo.update(initial.id, payload);
        push("Project saved", "success");
      }
      router.push("/admin/projects/");
    } catch (err) {
      push(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-6">
      <label className="block text-sm">
        <span className="text-muted">Title</span>
        <input
          className={field}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted">Slug</span>
        <input
          className={field}
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Year</span>
          <input
            type="number"
            className={field}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Status</span>
          <select
            className={field}
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-muted">Summary</span>
        <textarea
          className={field}
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </label>
      <div className="text-sm">
        <span className="text-muted">Body</span>
        <div className="mt-1">
          <RichTextEditor value={body} onChange={setBody} />
        </div>
      </div>
      <div className="text-sm">
        <span className="text-muted">Tags / tools</span>
        <div className="mt-1">
          <TagInput value={tags} onChange={setTags} suggestions={suggestions} />
        </div>
      </div>
      <div className="text-sm">
        <span className="text-muted">Images</span>
        <div className="mt-2">
          <ImageUploader
            images={images}
            onChange={(imgs) => setImages(imgs as ProjectImage[])}
            mode="project"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button variant="secondary" href="/admin/projects/">
          Cancel
        </Button>
      </div>
    </form>
  );
}
