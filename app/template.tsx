import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Page transition overlay wipe antar route.
 * ScrollTrigger.refresh() dipanggil di dalam PageTransition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
