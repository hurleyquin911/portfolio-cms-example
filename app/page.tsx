import type { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio demo Neodeeps — desain visual yang tenang, tajam, dan siap produksi.",
};

export default function HomePage() {
  return <HomePageClient />;
}
