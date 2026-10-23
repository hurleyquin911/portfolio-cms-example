import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { YearlyProofsList } from "@/components/yearly/YearlyProofsList";

export const metadata: Metadata = {
  title: "Yearly Proofs",
  description: "Ringkasan karya digital & cetak per tahun, dengan PDF download.",
};

export default function YearlyProofsPage() {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Archive</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            Yearly Proofs
          </h1>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            Dokumentasi karya digital dan cetak per tahun, lengkap dengan PDF.
          </p>
        </Reveal>
        <div className="mt-12">
          <YearlyProofsList />
        </div>
      </Container>
    </main>
  );
}
