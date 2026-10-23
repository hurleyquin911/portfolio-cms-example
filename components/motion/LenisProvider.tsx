"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { refreshScroll, setLenisInstance } from "@/lib/scroll";

/**
 * Smooth scroll Lenis ↔ ScrollTrigger.
 * ResizeObserver memastikan tinggi dokumen ikut konten dinamis (gallery, footer, dll).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    // Pastikan tidak terkunci overflow dari state sebelumnya
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.15,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => refreshScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    const ro = new ResizeObserver(() => {
      refreshScroll();
    });
    ro.observe(document.body);

    // Refresh setelah gambar/font selesai memuat
    const t1 = window.setTimeout(onResize, 300);
    const t2 = window.setTimeout(onResize, 1000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ro.disconnect();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return children;
}
