import type { Metadata } from "next";
import { SettingsAdminClient } from "./SettingsAdminClient";

export const metadata: Metadata = { title: "Admin · Settings" };

export default function AdminSettingsPage() {
  return <SettingsAdminClient />;
}
