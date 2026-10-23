"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useClientCollection } from "@/hooks/useClientCollection";
import { yearlyProofsRepo } from "@/lib/repositories";

export function YearlyProofsList() {
  const { data, loading } = useClientCollection(
    () => yearlyProofsRepo.getAll(),
    [],
  );

  if (loading) return <PageSkeleton />;

  const items = data ?? [];
  if (items.length === 0) {
    return (
      <EmptyState
        title="Belum ada yearly proof"
        description="Tambahkan dari Admin → Yearly Proofs."
      />
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((proof, i) => (
        <Reveal as="li" key={proof.id} delay={i * 0.05}>
          <Link
            href={`/yearly-proofs/detail/?year=${proof.year}`}
            className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between"
            data-cursor="view"
          >
            <div>
              <p className="font-mono text-sm tabular-nums text-muted">
                {proof.year}
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl group-hover:underline underline-offset-4">
                {proof.title}
              </h2>
            </div>
            <span className="text-sm text-muted">Lihat detail →</span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
