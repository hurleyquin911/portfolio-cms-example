"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
  /** clip-path mask reveal vs fade-up */
  variant?: "fade-up" | "clip" | "fade";
  delay?: number;
};

export function Reveal({
  children,
  className,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const fromVars: gsap.TweenVars =
        variant === "clip"
          ? { clipPath: "inset(100% 0 0 0)", opacity: 1 }
          : variant === "fade"
            ? { opacity: 0 }
            : { y: 36, opacity: 0 };

      const toVars: gsap.TweenVars =
        variant === "clip"
          ? { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.out", delay }
          : { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay };

      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [variant, delay] },
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
