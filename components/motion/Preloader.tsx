"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { STORAGE_KEYS } from "@/lib/storage/keys";

/**
 * Preloader singkat sekali per sesi (sessionStorage).
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEYS.preloaderSeen) === "1") {
        onDone?.();
        return;
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, [onDone]);

  useGSAP(
    () => {
      if (!visible || !rootRef.current) return;
      registerGsap();

      if (prefersReducedMotion()) {
        try {
          sessionStorage.setItem(STORAGE_KEYS.preloaderSeen, "1");
        } catch {
          /* ignore */
        }
        setVisible(false);
        onDone?.();
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(STORAGE_KEYS.preloaderSeen, "1");
          } catch {
            /* ignore */
          }
          setVisible(false);
          onDone?.();
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.value));
          }
        },
      }).to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
        },
        "-=0.15",
      );
    },
    { dependencies: [visible], scope: rootRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-foreground text-background"
      aria-hidden
    >
      <p className="font-serif text-4xl sm:text-5xl tracking-tight">Neodeeps</p>
      <p className="mt-6 font-mono text-sm tabular-nums tracking-widest">
        <span ref={counterRef}>0</span>
      </p>
    </div>
  );
}
