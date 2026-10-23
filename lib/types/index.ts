/** Status publikasi proyek */
export type ProjectStatus = "draft" | "published";

/** Varian gambar responsif hasil kompresi client-side */
export interface ImageVariant {
  width: number;
  height: number;
  /** Key blob di IndexedDB */
  fileId: string;
  sizeBytes: number;
}

export interface ProjectImage {
  id: string;
  alt: string;
  isCover: boolean;
  order: number;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  variants: ImageVariant[];
  /** Placeholder blur (data URL kecil) */
  blurDataUrl?: string;
  /** Path publik untuk seed (tanpa IndexedDB) */
  publicSrc?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  year: number;
  summary: string;
  /** Body HTML sederhana (dari Tiptap) atau markdown */
  body: string;
  tags: string[];
  status: ProjectStatus;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface YearlyProofImage {
  id: string;
  alt: string;
  order: number;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  variants: ImageVariant[];
  blurDataUrl?: string;
  publicSrc?: string;
  /** "digital" | "print" */
  category: "digital" | "print";
}

export interface YearlyProof {
  id: string;
  year: number;
  title: string;
  digitalDescription: string;
  printDescription: string;
  images: YearlyProofImage[];
  /** Metadata PDF di IndexedDB; seed memakai publicPdfPath */
  pdf?: {
    fileId: string;
    fileName: string;
    sizeBytes: number;
  };
  publicPdfPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SocialLinks {
  instagram?: string;
  behance?: string;
  dribbble?: string;
  linkedin?: string;
  email?: string;
}

export interface SiteSettings {
  heroName: string;
  heroTagline: string;
  heroCtaLabel: string;
  aboutShort: string;
  aboutLong: string;
  profileImagePublicSrc?: string;
  profileImageFileId?: string;
  skills: string[];
  tools: string[];
  timeline: Array<{
    id: string;
    year: string;
    title: string;
    description: string;
  }>;
  social: SocialLinks;
  updatedAt: string;
}

export interface StoredFileMeta {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
}

/** Interface repository generik — mudah diganti ke API/backend nyata */
export interface Repository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  create(input: Omit<T, "id" | "createdAt" | "updatedAt"> & Partial<Pick<T, "id">>): Promise<T>;
  update(id: string, patch: Partial<T>): Promise<T>;
  remove(id: string): Promise<void>;
}
