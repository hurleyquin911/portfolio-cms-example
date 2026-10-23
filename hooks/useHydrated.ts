"use client";

import { useEffect, useState } from "react";

/** True setelah mount — hindari hydration mismatch untuk data client-only */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
