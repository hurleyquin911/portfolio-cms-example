import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readJson, writeJson } from "@/lib/storage/local";
import type { Repository, YearlyProof } from "@/lib/types";

function createId(): string {
  return `yp_${crypto.randomUUID().slice(0, 8)}`;
}

function load(): YearlyProof[] {
  return readJson<YearlyProof[]>(STORAGE_KEYS.yearlyProofs, []);
}

function save(items: YearlyProof[]): void {
  writeJson(STORAGE_KEYS.yearlyProofs, items);
}

export const yearlyProofsRepo: Repository<YearlyProof> & {
  getByYear(year: number): Promise<YearlyProof | undefined>;
} = {
  async getAll() {
    return load().sort((a, b) => b.year - a.year);
  },

  async getById(id) {
    return load().find((p) => p.id === id);
  },

  async getByYear(year) {
    return load().find((p) => p.year === year);
  },

  async create(input) {
    const now = new Date().toISOString();
    const item: YearlyProof = {
      year: input.year,
      title: input.title,
      digitalDescription: input.digitalDescription,
      printDescription: input.printDescription,
      images: input.images ?? [],
      pdf: input.pdf,
      publicPdfPath: input.publicPdfPath,
      id: input.id ?? createId(),
      createdAt: now,
      updatedAt: now,
    };
    const all = load();
    all.unshift(item);
    save(all);
    return item;
  },

  async update(id, patch) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Yearly proof ${id} not found`);
    const updated: YearlyProof = {
      ...all[idx],
      ...patch,
      id,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    save(all);
    return updated;
  },

  async remove(id) {
    save(load().filter((p) => p.id !== id));
  },
};
