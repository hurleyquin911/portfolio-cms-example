import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

/** Panggil setelah konten dinamis / ganti route agar tinggi scroll akurat */
export function refreshScroll() {
  lenisInstance?.resize();
  ScrollTrigger.refresh();
}
