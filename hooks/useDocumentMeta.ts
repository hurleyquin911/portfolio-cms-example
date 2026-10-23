"use client";

import { useEffect } from "react";

/**
 * Perbarui document.title + meta description di client
 * untuk halaman detail yang datanya dari localStorage.
 */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    if (!title) return;
    const prev = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = prev;
      if (meta && prevDesc != null) meta.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
