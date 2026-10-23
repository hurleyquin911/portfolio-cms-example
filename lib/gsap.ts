/**
 * Registrasi plugin GSAP terpusat — impor dari komponen client beranimasi.
 */
"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
  registered = true;
}

/** true jika user meminta gerakan dikurangi */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, Flip, useGSAP };
