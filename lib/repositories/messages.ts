import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readJson, writeJson } from "@/lib/storage/local";
import type { ContactMessage, Repository } from "@/lib/types";

function createId(): string {
  return `msg_${crypto.randomUUID().slice(0, 8)}`;
}

function load(): ContactMessage[] {
  return readJson<ContactMessage[]>(STORAGE_KEYS.messages, []);
}

function save(items: ContactMessage[]): void {
  writeJson(STORAGE_KEYS.messages, items);
}

export const messagesRepo: Repository<ContactMessage> & {
  markRead(id: string, read?: boolean): Promise<ContactMessage>;
  countUnread(): Promise<number>;
} = {
  async getAll() {
    return load().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  async getById(id) {
    return load().find((m) => m.id === id);
  },

  async create(input) {
    const message: ContactMessage = {
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      read: input.read ?? false,
      id: input.id ?? createId(),
      createdAt: new Date().toISOString(),
    };
    const all = load();
    all.unshift(message);
    save(all);
    return message;
  },

  async update(id, patch) {
    const all = load();
    const idx = all.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error(`Message ${id} tidak ditemukan`);
    const updated: ContactMessage = { ...all[idx], ...patch, id };
    all[idx] = updated;
    save(all);
    return updated;
  },

  async remove(id) {
    save(load().filter((m) => m.id !== id));
  },

  async markRead(id, read = true) {
    return this.update(id, { read });
  },

  async countUnread() {
    return load().filter((m) => !m.read).length;
  },
};
