import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl text-balance">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 max-w-md text-muted leading-relaxed">
          URL yang Anda buka tidak ada, atau kontennya belum di-prerender untuk
          static export.
        </p>
        <div className="mt-8">
          <Button href="/">Kembali ke beranda</Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Atau coba{" "}
          <Link href="/projects/" className="underline underline-offset-4">
            Projects
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
