import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Brief stats for the portfolio demo.",
};

export default function AdminDashboardPage() {
  return <DashboardClient />;
}
