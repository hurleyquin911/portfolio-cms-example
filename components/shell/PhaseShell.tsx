import { Container } from "@/components/ui/Container";

/** Shell halaman Fase 1 — konten penuh diisi di fase berikutnya */
export function PhaseShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">{description}</p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </main>
  );
}
