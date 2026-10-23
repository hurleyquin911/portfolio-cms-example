"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { useAuthStore } from "@/store/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const session = useAuthStore((s) => s.session);
  const isLogin = pathname.includes("/admin/login");

  useEffect(() => {
    if (!hydrated || isLogin) return;
    if (!session) {
      router.replace("/admin/login/");
    }
  }, [hydrated, session, isLogin, router]);

  if (isLogin) return children;

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <PageSkeleton />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <PageSkeleton />
      </div>
    );
  }

  return children;
}
