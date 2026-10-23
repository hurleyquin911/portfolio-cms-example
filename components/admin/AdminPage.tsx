import { cn } from "@/lib/cn";

export function AdminPage({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 py-10 sm:px-8", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
