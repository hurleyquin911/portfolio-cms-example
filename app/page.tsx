import type { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Neodeeps portfolio demo: calm, precise visual design ready for production.",
};

export default function HomePage() {
  return <HomePageClient />;
}
