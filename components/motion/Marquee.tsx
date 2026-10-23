"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const track = trackRef.current;
      if (!track || prefersReducedMotion() || items.length === 0) return;

      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: Math.max(20, width / 40),
        ease: "none",
        repeat: -1,
      });
    },
    { scope: trackRef, dependencies: [items] },
  );

  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden border-y border-border py-5 select-none",
        className,
      )}
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max gap-10 whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-serif text-2xl sm:text-3xl text-foreground/80"
          >
            {item}
            <span className="ml-10 text-accent">·</span>
          </span>
        ))}
      </div>
      <p className="sr-only">Tools: {items.join(", ")}</p>
    </div>
  );
}
