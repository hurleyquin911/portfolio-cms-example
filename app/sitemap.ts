import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Wajib untuk static export */
export const dynamic = "force-static";

/** Di-generate saat `next build` (static export) */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/projects/", "/yearly-proofs/", "/about/", "/contact/"];
  const now = new Date();

  return routes.map((path) => ({
    url: getSiteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
