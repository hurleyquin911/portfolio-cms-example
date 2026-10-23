import { getDb, type FileRecord } from "./index";

function createId(): string {
  return `file_${crypto.randomUUID()}`;
}

export async function saveFile(
  blob: Blob,
  name: string,
  mimeType?: string,
): Promise<FileRecord> {
  const db = await getDb();
  const record: FileRecord = {
    id: createId(),
    name,
    mimeType: mimeType || blob.type || "application/octet-stream",
    sizeBytes: blob.size,
    createdAt: new Date().toISOString(),
    blob,
  };
  await db.put("files", record);
  return record;
}

export async function getFile(id: string): Promise<FileRecord | undefined> {
  const db = await getDb();
  return db.get("files", id);
}

export async function removeFile(id: string): Promise<void> {
  const db = await getDb();
  await db.delete("files", id);
}

export async function replaceFile(
  existingId: string | undefined,
  blob: Blob,
  name: string,
  mimeType?: string,
): Promise<FileRecord> {
  if (existingId) {
    await removeFile(existingId).catch(() => undefined);
  }
  return saveFile(blob, name, mimeType);
}

/** Object URL untuk <img> / iframe; caller wajib revoke saat unmount */
export async function createObjectUrl(fileId: string): Promise<string | null> {
  const file = await getFile(fileId);
  if (!file) return null;
  return URL.createObjectURL(file.blob);
}
