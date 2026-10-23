"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

/**
 * Cursor label "View" — desktop saja, tanpa mix-blend (biar kontras jelas).
 * Target: [data-cursor="view"]
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    registerGsap();

    const el = rootRef.current;
    if (!el) return;

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.35,
      opacity: 0,
      x: -100,
      y: -100,
    });

    const setActive = (on: boolean) => {
      if (activeRef.current === on) return;
      activeRef.current = on;
      document.documentElement.classList.toggle("has-view-cursor", on);
      gsap.to(el, {
        scale: on ? 1 : 0.35,
        opacity: on ? 1 : 0,
        duration: on ? 0.28 : 0.18,
        ease: on ? "power3.out" : "power2.in",
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });

      const target = e.target as Element | null;
      setActive(Boolean(target?.closest?.('[data-cursor="view"]')));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-view-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="view-cursor pointer-events-none fixed left-0 top-0 z-[75] flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-medium uppercase tracking-[0.18em] text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      aria-hidden
    >
      View
    </div>
  );
}
