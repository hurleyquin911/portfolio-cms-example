import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminGuard>
      <div className="flex flex-1 flex-col lg:flex-row">
        <AdminNav />
        <div className="min-w-0 flex-1" role="region" aria-label="Konten admin">
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
