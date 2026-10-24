"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { useT } from "@/hooks/useT";
import { Flip, prefersReducedMotion, registerGsap } from "@/lib/gsap";
import { localizeProjects } from "@/lib/i18n/localize";
import { projectsRepo } from "@/lib/repositories";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProjectGallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { t, locale } = useT();

  const { data, loading } = useClientCollection(
    () => projectsRepo.getAll(),
    [],
  );

  const published = useMemo(() => {
    const list = (data ?? []).filter((p) => p.status === "published");
    return localizeProjects(list, locale);
  }, [data, locale]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    published.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return [...set].sort();
  }, [published]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return published.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q);
      const matchTag = !activeTag || p.tags.includes(activeTag);
      return matchQ && matchTag;
    });
  }, [published, query, activeTag]);

  useLayoutEffect(() => {
    registerGsap();
    const state = flipStateRef.current;
    const grid = gridRef.current;
    if (!state || !grid || prefersReducedMotion()) {
      flipStateRef.current = null;
      return;
    }
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: false,
      nested: true,
      fade: true,
    });
    flipStateRef.current = null;
  }, [filtered]);

  function animateFilter(nextTag: string | null) {
    registerGsap();
    const grid = gridRef.current;
    if (grid && !prefersReducedMotion()) {
      flipStateRef.current = Flip.getState(
        grid.querySelectorAll("[data-flip-item]"),
      );
    }
    setActiveTag(nextTag);
  }

  if (loading) return <PageSkeleton />;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <label className="block w-full max-w-sm text-sm">
          <span className="text-muted">{t("projects.searchLabel")}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("projects.searchPlaceholder")}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2"
          />
        </label>
        <p className="text-sm tabular-nums text-muted">
          {filtered.length === 1
            ? t("projects.countOne", { n: filtered.length })
            : t("projects.countMany", { n: filtered.length })}
        </p>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label={t("projects.filterAria")}
      >
        <FilterChip
          label={t("projects.filterAll")}
          active={activeTag === null}
          onClick={() => animateFilter(null)}
        />
        {tags.map((tag) => (
          <FilterChip
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => animateFilter(activeTag === tag ? null : tag)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-10"
          title={t("projects.emptyTitle")}
          description={t("projects.emptyDesc")}
        />
      ) : (
        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <div key={project.id} data-flip-item className="min-w-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-[var(--radius-md)] border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

/** Dipakai landing — grid 2×2 rapi */
export function SelectedProjects({ limit = 4 }: { limit?: number }) {
  const { t, locale } = useT();
  const { data, loading } = useClientCollection(
    () => projectsRepo.getAll(),
    [],
  );

  if (loading) return <PageSkeleton />;

  const items = localizeProjects(
    (data ?? []).filter((p: Project) => p.status === "published").slice(0, limit),
    locale,
  );

  if (items.length === 0) {
    return (
      <EmptyState
        title={t("projects.selectedEmptyTitle")}
        description={t("projects.selectedEmptyDesc")}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
