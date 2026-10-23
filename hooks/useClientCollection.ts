"use client";

import { useEffect, useState } from "react";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import { refreshScroll } from "@/lib/scroll";

/**
 * Muat data client-only setelah mount (hindari hydration mismatch).
 * status: loading | ready
 */
export function useClientCollection<T>(
  loader: () => Promise<T>,
  deps: unknown[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    ensureSeedData();
    (async () => {
      try {
        const result = await loader();
        if (!cancelled) {
          setData(result);
          // Tinggi dokumen berubah setelah data/gambar muncul
          requestAnimationFrame(() => refreshScroll());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps dikontrol pemanggil
  }, deps);

  return { data, loading };
}
