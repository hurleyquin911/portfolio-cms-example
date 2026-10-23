import type { Metadata } from "next";
import { YearlyProofsAdminClient } from "./YearlyProofsAdminClient";

export const metadata: Metadata = { title: "Admin · Yearly Proofs" };

export default function AdminYearlyProofsPage() {
  return <YearlyProofsAdminClient />;
}
