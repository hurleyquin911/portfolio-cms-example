"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";
import { refreshScroll } from "@/lib/scroll";

/**
 * Overlay wipe antar route.
 * Cleanup selalu mereset overlay agar tidak mengunci scroll/pointer.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    registerGsap();
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const reset = () => {
      gsap.set(overlay, {
        scaleY: 0,
        pointerEvents: "none",
        transformOrigin: "top",
      });
      gsap.set(content, { autoAlpha: 1, clearProps: "opacity,visibility" });
      refreshScroll();
    };

    if (prefersReducedMotion()) {
      reset();
      return;
    }

    if (first.current) {
      first.current = false;
      reset();
      return;
    }

    // Scroll ke atas saat ganti halaman (tanpa merusak Lenis)
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: reset,
    });

    tl.set(overlay, { transformOrigin: "top", scaleY: 0, pointerEvents: "auto" })
      .to(overlay, { scaleY: 1, duration: 0.32, ease: "power2.inOut" })
      .set(content, { autoAlpha: 0 })
      .set(overlay, { transformOrigin: "bottom" })
      .to(overlay, { scaleY: 0, duration: 0.38, ease: "power2.inOut" })
      .to(content, { autoAlpha: 1, duration: 0.2 }, "-=0.12");

    return () => {
      tl.kill();
      reset();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[85] origin-top scale-y-0 bg-foreground"
        aria-hidden
      />
      <div ref={contentRef} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </>
  );
}
