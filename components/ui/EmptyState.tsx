import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed border-border rounded-[var(--radius-md)] px-6 py-12",
        className,
      )}
    >
      <h2 className="font-serif text-2xl text-foreground">{title}</h2>
      {description ? (
        <p className="max-w-md text-sm text-muted leading-relaxed">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
