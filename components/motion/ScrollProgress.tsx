"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion() || !barRef.current) return;

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress });
      },
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent"
      aria-hidden
    >
      <div ref={barRef} className="h-full w-full origin-left bg-accent" />
    </div>
  );
}
