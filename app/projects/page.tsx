import type { Metadata } from "next";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description: "Gallery proyek published — filter, search, dan grid layout.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Projects
          </p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
            Project Gallery
          </h1>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            Hanya proyek berstatus published. Filter berdasarkan tools dan cari
            judul.
          </p>
        </Reveal>
        <div className="mt-12">
          <ProjectGallery />
        </div>
      </Container>
    </main>
  );
}
