"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** CTA dengan magnetic pull (pointer fine saja) */
export function MagneticButton({ href, children, className }: Props) {
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
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "power2.out" });
    gsap.to(labelRef.current, {
      x: x * 0.12,
      y: y * 0.12,
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function onLeave() {
    registerGsap();
    gsap.to(rootRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    gsap.to(labelRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <Link
      ref={rootRef}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-accent px-6 text-sm font-medium text-accent-fg",
        className,
      )}
    >
      <span ref={labelRef}>{children}</span>
    </Link>
  );
}
