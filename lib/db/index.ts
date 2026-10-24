import { openDB, type DBSchema, type IDBPDatabase } from "idb";

/**
 * IndexedDB untuk blob file (gambar WebP & PDF).
 * Metadata teks tetap di localStorage agar mudah di-inspect/reset.
 */

export interface FileRecord {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
  blob: Blob;
}

interface NeoDemoDB extends DBSchema {
  files: {
    key: string;
    value: FileRecord;
  };
}

const DB_NAME = "neo-demo-db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<NeoDemoDB>> | null = null;

export function getDb(): Promise<IDBPDatabase<NeoDemoDB>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB is only available in the browser"));
  }
  if (!dbPromise) {
    dbPromise = openDB<NeoDemoDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

/** Hapus seluruh DB (dipakai Reset Demo Data) */
export async function clearDb(): Promise<void> {
  if (typeof window === "undefined") return;
  dbPromise = null;
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    req.onblocked = () => resolve();
  });
}
