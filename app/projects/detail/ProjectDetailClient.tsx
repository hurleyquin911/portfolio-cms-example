"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { getCoverImage } from "@/lib/media";
import { projectsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { Project } from "@/lib/types";

export function ProjectDetailClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";
  const [all, setAll] = useState<Project[] | null>(null);

  useEffect(() => {
    ensureSeedData();
    let cancelled = false;
    (async () => {
      const list = (await projectsRepo.getAll()).filter(
        (p) => p.status === "published",
      );
      if (!cancelled) setAll(list);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const project = useMemo(
    () => all?.find((p) => p.slug === slug) ?? null,
    [all, slug],
  );

  const index = useMemo(
    () => (project && all ? all.findIndex((p) => p.id === project.id) : -1),
    [all, project],
  );

  const prev = index > 0 && all ? all[index - 1] : null;
  const next =
    index >= 0 && all && index < all.length - 1 ? all[index + 1] : null;

  useDocumentMeta(
    project ? `${project.title} · Neodeeps` : undefined,
    project?.summary,
  );

  if (all === null) {
    return (
      <main className="flex-1 py-16">
        <Container>
          <PageSkeleton />
        </Container>
      </main>
    );
  }

  if (!slug || !project) {
    return (
      <main className="flex-1 py-16">
        <Container>
          <h1 className="font-serif text-4xl">Proyek tidak ditemukan</h1>
          <Link
            href="/projects/"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            Kembali ke gallery
          </Link>
        </Container>
      </main>
    );
  }

  const cover = getCoverImage(project.images);
  const gallery = [...project.images].sort((a, b) => a.order - b.order);

  return (
    <main className="flex-1">
      <article>
        <header className="border-b border-border">
          <Container className="py-12 sm:py-16">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {project.year}
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-6xl text-balance">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              {project.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border px-2 py-1 text-[11px] uppercase tracking-wider text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Container>
          {cover ? (
            <Reveal variant="clip" className="w-full">
              <SmartImage
                image={cover}
                className="aspect-[16/9] w-full rounded-none"
                preferredWidth={1600}
                sizes="100vw"
                priority
                width={1600}
                height={900}
              />
            </Reveal>
          ) : null}
        </header>

        <Container className="py-14 sm:py-20">
          <Reveal>
            <div
              className="prose-body max-w-2xl space-y-4 text-base leading-relaxed text-foreground/90 [&_p]:text-muted"
              dangerouslySetInnerHTML={{ __html: project.body }}
            />
          </Reveal>

          {gallery.length > 1 ? (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {gallery
                .filter((img) => !img.isCover)
                .map((img) => (
                  <Reveal key={img.id} variant="clip">
                    <SmartImage
                      image={img}
                      className="aspect-[4/3]"
                      preferredWidth={1200}
                    />
                  </Reveal>
                ))}
            </div>
          ) : null}

          <nav
            className="mt-20 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between"
            aria-label="Navigasi proyek"
          >
            {prev ? (
              <Link
                href={`/projects/detail/?slug=${encodeURIComponent(prev.slug)}`}
                className="group max-w-xs"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Previous
                </span>
                <span className="mt-1 block font-serif text-2xl group-hover:underline">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/detail/?slug=${encodeURIComponent(next.slug)}`}
                className="group max-w-xs sm:text-right"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Next
                </span>
                <span className="mt-1 block font-serif text-2xl group-hover:underline">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </Container>
      </article>
    </main>
  );
}
