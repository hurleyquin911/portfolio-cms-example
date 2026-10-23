import { getBasePath } from "@/lib/paths";

/**
 * URL publik situs untuk metadata / sitemap.
 * Set NEXT_PUBLIC_SITE_URL saat deploy (contoh: https://user.github.io).
 */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

export function getSiteUrl(path = "/"): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteOrigin()}${base}${normalized}`;
}
