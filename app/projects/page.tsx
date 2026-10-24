import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Published project gallery with filters, search, and grid layout.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
