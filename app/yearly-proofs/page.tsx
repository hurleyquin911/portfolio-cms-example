import type { Metadata } from "next";
import { YearlyProofsPageClient } from "@/components/yearly/YearlyProofsPageClient";

export const metadata: Metadata = {
  title: "Yearly Proofs",
  description: "Yearly archive of digital and print work, with PDF download.",
};

export default function YearlyProofsPage() {
  return <YearlyProofsPageClient />;
}
