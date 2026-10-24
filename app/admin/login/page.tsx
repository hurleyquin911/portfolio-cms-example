import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Demo login for the admin panel.",
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <Suspense fallback={<PageSkeleton />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
