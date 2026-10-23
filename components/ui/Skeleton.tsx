import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-surface-2",
        className,
      )}
      aria-hidden
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 py-16" aria-busy aria-label="Memuat konten">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-5/6 max-w-lg" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4">
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
      </div>
    </div>
  );
}
