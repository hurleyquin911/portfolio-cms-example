import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "About Neodeeps: timeline, skills, and design approach.",
};

export default function AboutPage() {
  return <AboutContent />;
}
