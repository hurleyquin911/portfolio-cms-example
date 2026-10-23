import type { Metadata } from "next";
import { ProjectsAdminClient } from "./ProjectsAdminClient";

export const metadata: Metadata = { title: "Admin · Projects" };

export default function AdminProjectsPage() {
  return <ProjectsAdminClient />;
}
