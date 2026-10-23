"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { yearlyProofsRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { YearlyProof } from "@/lib/types";

const PdfViewer = dynamic(
  () => import("@/components/yearly/PdfViewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-muted" aria-busy>
        Memuat PDF viewer…
      </p>
    ),
  },
);

export function YearlyProofDetailClient() {
  const searchParams = useSearchParams();
  const yearRaw = searchParams.get("year") ?? "";
  const year = Number(yearRaw);
  const [proof, setProof] = useState<YearlyProof | null | undefined>(undefined);

  useEffect(() => {
    ensureSeedData();
    let cancelled = false;
    (async () => {
      if (!Number.isFinite(year) || yearRaw === "") {
        setProof(null);
        return;
      }
      const found = await yearlyProofsRepo.getByYear(year);
      if (!cancelled) setProof(found ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [year, yearRaw]);

  useDocumentMeta(
    proof ? `${proof.title} · Neodeeps` : undefined,
    proof?.digitalDescription,
  );

  if (proof === undefined) {
    return (
      <main className="flex-1 py-16">
        <Container>
          <PageSkeleton />
        </Container>
      </main>
    );
  }

  if (!proof) {
    return (
      <main className="flex-1 py-16">
        <Container>
          <h1 className="font-serif text-4xl">Yearly proof tidak ditemukan</h1>
          <Link
            href="/yearly-proofs/"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            Kembali ke daftar
          </Link>
        </Container>
      </main>
    );
  }

  const digital = proof.images
    .filter((i) => i.category === "digital")
    .sort((a, b) => a.order - b.order);
  const print = proof.images
    .filter((i) => i.category === "print")
    .sort((a, b) => a.order - b.order);

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Year {proof.year}
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl">{proof.title}</h1>
      </Container>

      <section className="border-t border-border py-14" aria-labelledby="digital-h">
        <Container>
          <Reveal>
            <h2 id="digital-h" className="font-serif text-3xl">
              Karya digital
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              {proof.digitalDescription}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {digital.map((img) => (
              <Reveal key={img.id} variant="clip">
                <SmartImage image={img} className="aspect-[4/3]" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-14" aria-labelledby="print-h">
        <Container>
          <Reveal>
            <h2 id="print-h" className="font-serif text-3xl">
              Karya cetak
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              {proof.printDescription}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {print.map((img) => (
              <Reveal key={img.id} variant="clip">
                <SmartImage image={img} className="aspect-[4/3]" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-14" aria-labelledby="pdf-h">
        <Container>
          <h2 id="pdf-h" className="font-serif text-3xl">
            PDF Proof
          </h2>
          <div className="mt-8">
            <PdfViewer proof={proof} />
          </div>
        </Container>
      </section>
    </main>
  );
}
