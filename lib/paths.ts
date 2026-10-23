/**
 * Prefix path aset/route dengan basePath GitHub Pages.
 * Di lokal NEXT_PUBLIC_BASE_PATH kosong; saat deploy berisi "/nama-repo".
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (!base) return path;
  return `${base}${path}`;
}
