import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact form with honeypot, math captcha, and client-side rate limiting.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
