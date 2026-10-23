import type { Metadata } from "next";
import { MessagesAdminClient } from "./MessagesAdminClient";

export const metadata: Metadata = { title: "Admin · Messages" };

export default function AdminMessagesPage() {
  return <MessagesAdminClient />;
}
