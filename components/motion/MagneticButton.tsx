"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

/** CTA dengan magnetic pull (pointer fine saja) */
export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: Props) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent) {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = rootRef.current;
    if (!el) return;
    registerGsap();
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: "power2.out" });
    gsap.to(labelRef.current, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function onLeave() {
    registerGsap();
    gsap.to(rootRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
    });
    gsap.to(labelRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
    });
  }

  return (
    <Link
      ref={rootRef}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-accent text-accent-fg hover:bg-foreground hover:text-background",
        variant === "secondary" &&
          "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface-2",
        className,
      )}
    >
      <span
        ref={labelRef}
        className="inline-flex items-center gap-2 whitespace-nowrap"
      >
        {children}
      </span>
    </Link>
  );
}
