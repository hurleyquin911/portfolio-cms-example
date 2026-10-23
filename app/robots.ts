import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Wajib untuk static export */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*"],
    },
    sitemap: getSiteUrl("/sitemap.xml"),
  };
}
