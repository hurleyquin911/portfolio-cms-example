import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Tentang Neodeeps — timeline, skills, dan pendekatan desain.",
};

export default function AboutPage() {
  return <AboutContent />;
}
