import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Statistik ringkas portfolio demo.",
};

export default function AdminDashboardPage() {
  return <DashboardClient />;
}
