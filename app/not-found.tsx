import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl text-balance">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-muted leading-relaxed">
          The URL you opened does not exist, or this content was not prerendered
          for static export.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or try{" "}
          <Link href="/projects/" className="underline underline-offset-4">
            Projects
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
