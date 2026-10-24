"use client";

import Link from "next/link";
import { SmartImage } from "@/components/media/SmartImage";
import { getCoverImage } from "@/lib/media";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
  /** @deprecated rasio digabung seragam di gallery */
  featured?: boolean;
}) {
  const cover = getCoverImage(project.images);

  return (
    <article className={cn("group relative h-full", className)}>
      <Link
        href={`/projects/detail/?slug=${encodeURIComponent(project.slug)}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
        <div className="overflow-hidden rounded-[var(--radius-md)]">
          {cover ? (
            <SmartImage
              image={cover}
              className="aspect-[4/3] w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              preferredWidth={1000}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              width={1200}
              height={900}
            />
          ) : (
            <div className="aspect-[4/3] w-full bg-surface-2" />
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-xl leading-snug text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
              {project.year}
            </span>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
          {project.tags.length > 0 ? (
            <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2">
              {project.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.12em] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
