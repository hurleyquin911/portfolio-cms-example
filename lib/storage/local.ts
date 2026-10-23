/**
 * Wrapper localStorage aman untuk SSR.
 * Hanya dipanggil dari client (useEffect / event handler).
 */

function assertClient(): void {
  if (typeof window === "undefined") {
    throw new Error("localStorage hanya tersedia di browser");
  }
}

export function readJson<T>(key: string, fallback: T): T {
  assertClient();
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  assertClient();
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key: string): void {
  assertClient();
  window.localStorage.removeItem(key);
}

export function readString(key: string): string | null {
  assertClient();
  return window.localStorage.getItem(key);
}

export function writeString(key: string, value: string): void {
  assertClient();
  window.localStorage.setItem(key, value);
}
