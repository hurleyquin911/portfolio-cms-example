import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
