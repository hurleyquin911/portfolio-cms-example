import { STORAGE_KEYS } from "@/lib/storage/keys";
import { readJson, writeJson } from "@/lib/storage/local";
import type { Project, Repository } from "@/lib/types";

function createId(): string {
  return `proj_${crypto.randomUUID().slice(0, 8)}`;
}

function load(): Project[] {
  return readJson<Project[]>(STORAGE_KEYS.projects, []);
}

function save(items: Project[]): void {
  writeJson(STORAGE_KEYS.projects, items);
}

export const projectsRepo: Repository<Project> & {
  getBySlug(slug: string): Promise<Project | undefined>;
  duplicate(id: string): Promise<Project>;
} = {
  async getAll() {
    return load().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  },

  async getById(id) {
    return load().find((p) => p.id === id);
  },

  async getBySlug(slug) {
    return load().find((p) => p.slug === slug);
  },

  async create(input) {
    const now = new Date().toISOString();
    const project: Project = {
      title: input.title,
      slug: input.slug,
      year: input.year,
      summary: input.summary,
      body: input.body,
      tags: input.tags ?? [],
      status: input.status ?? "draft",
      images: input.images ?? [],
      id: input.id ?? createId(),
      createdAt: now,
      updatedAt: now,
    };
    const all = load();
    all.unshift(project);
    save(all);
    return project;
  },

  async update(id, patch) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Project ${id} tidak ditemukan`);
    const updated: Project = {
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

  async duplicate(id) {
    const source = await this.getById(id);
    if (!source) throw new Error(`Project ${id} tidak ditemukan`);
    const slugBase = `${source.slug}-copy`;
    return this.create({
      ...source,
      title: `${source.title} (Copy)`,
      slug: slugBase,
      status: "draft",
      id: undefined,
    });
  },
};
