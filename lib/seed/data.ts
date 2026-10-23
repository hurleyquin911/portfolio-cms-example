import type {
  ContactMessage,
  Project,
  SiteSettings,
  YearlyProof,
} from "@/lib/types";

const now = "2026-01-15T10:00:00.000Z";

function img(
  id: string,
  publicSrc: string,
  alt: string,
  isCover = false,
  order = 0,
): Project["images"][number] {
  return {
    id,
    alt,
    isCover,
    order,
    originalSizeBytes: 0,
    compressedSizeBytes: 0,
    variants: [],
    publicSrc,
  };
}

function proofImg(
  id: string,
  publicSrc: string,
  alt: string,
  category: "digital" | "print",
  order = 0,
): YearlyProof["images"][number] {
  return {
    id,
    alt,
    order,
    category,
    originalSizeBytes: 0,
    compressedSizeBytes: 0,
    variants: [],
    publicSrc,
  };
}

/** 6 proyek dummy: campuran published & draft */
export const SEED_PROJECTS: Project[] = [
  {
    id: "proj_01",
    title: "Aurora Brand System",
    slug: "aurora-brand-system",
    year: 2025,
    summary:
      "Identitas visual lengkap untuk startup climate-tech: logo, tipografi, dan pedoman aplikasi.",
    body: "<p>Sistem merek yang dibangun dari metafora aurora — gradien lembut, tipografi editorial, dan grid yang ketat untuk konsistensi lintas media.</p><p>Deliverables mencakup logo suite, color tokens, stationery, dan UI kit ringan.</p>",
    tags: ["Illustrator", "Figma", "Brand"],
    status: "published",
    images: [
      img("p1i1", "/placeholders/project-01.jpg", "Aurora brand hero composition", true, 0),
      img("p1i2", "/placeholders/project-01b.jpg", "Aurora stationery mockup", false, 1),
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "proj_02",
    title: "Nimbus Editorial",
    slug: "nimbus-editorial",
    year: 2025,
    summary:
      "Tata letak majalah digital dengan tipografi berani dan fotografi atmosferik.",
    body: "<p>Edisi khusus tentang arsitektur tropis. Layout modular, pull quotes besar, dan hierarki tipografi yang jelas untuk membaca panjang.</p>",
    tags: ["InDesign", "Photoshop", "Editorial"],
    status: "published",
    images: [
      img("p2i1", "/placeholders/project-02.jpg", "Nimbus magazine cover", true, 0),
      img("p2i2", "/placeholders/project-02b.jpg", "Nimbus interior spread", false, 1),
    ],
    createdAt: "2025-11-02T09:00:00.000Z",
    updatedAt: "2025-11-02T09:00:00.000Z",
  },
  {
    id: "proj_03",
    title: "Kala Packaging",
    slug: "kala-packaging",
    year: 2024,
    summary:
      "Seri kemasan kopi specialty dengan ilustrasi botanical dan finishing foil.",
    body: "<p>Tiga SKU dengan sistem warna berbeda namun tetap satu keluarga visual. Fokus pada shelf impact dan sustainability storytelling.</p>",
    tags: ["Illustrator", "Packaging", "Print"],
    status: "published",
    images: [
      img("p3i1", "/placeholders/project-03.jpg", "Kala coffee packaging lineup", true, 0),
    ],
    createdAt: "2024-08-20T12:00:00.000Z",
    updatedAt: "2024-08-20T12:00:00.000Z",
  },
  {
    id: "proj_04",
    title: "Orbit Motion Specs",
    slug: "orbit-motion-specs",
    year: 2024,
    summary:
      "Motion design system untuk product launch: timing, easing, dan micro-interactions.",
    body: "<p>Dokumen spesifikasi gerak yang dipakai tim product & engineering agar animasi konsisten di web dan mobile.</p>",
    tags: ["After Effects", "Figma", "Motion"],
    status: "published",
    images: [
      img("p4i1", "/placeholders/project-04.jpg", "Orbit motion frames", true, 0),
    ],
    createdAt: "2024-05-10T08:00:00.000Z",
    updatedAt: "2024-05-10T08:00:00.000Z",
  },
  {
    id: "proj_05",
    title: "Harbor Wayfinding",
    slug: "harbor-wayfinding",
    year: 2026,
    summary: "Sistem wayfinding untuk ruang budaya tepi laut — masih dalam draft.",
    body: "<p>Eksplorasi piktogram dan tipografi jarak jauh untuk area outdoor & indoor.</p>",
    tags: ["Illustrator", "Signage"],
    status: "draft",
    images: [
      img("p5i1", "/placeholders/project-05.jpg", "Harbor wayfinding sketch", true, 0),
    ],
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-02-01T10:00:00.000Z",
  },
  {
    id: "proj_06",
    title: "Velvet Type Specimen",
    slug: "velvet-type-specimen",
    year: 2023,
    summary: "Specimen tipografi display — draft untuk presentasi klien.",
    body: "<p>Eksperimen ligature dan display setting untuk font custom yang sedang dikembangkan.</p>",
    tags: ["Typography", "InDesign"],
    status: "draft",
    images: [
      img("p6i1", "/placeholders/project-06.jpg", "Velvet type specimen page", true, 0),
    ],
    createdAt: "2023-12-12T10:00:00.000Z",
    updatedAt: "2023-12-12T10:00:00.000Z",
  },
];

/** 3 yearly proofs dengan PDF contoh di /public/samples */
export const SEED_YEARLY_PROOFS: YearlyProof[] = [
  {
    id: "yp_2025",
    year: 2025,
    title: "Year in Review 2025",
    digitalDescription:
      "Fokus pada brand systems digital, motion specs, dan UI exploration untuk klien tech. Banyak eksperimen tipografi di layar dan prototipe interaktif.",
    printDescription:
      "Seri packaging dan editorial cetak: coffee line, magazine spreads, dan limited poster run untuk pameran lokal.",
    images: [
      proofImg("yp25d1", "/placeholders/year-2025-digital.jpg", "Digital work 2025", "digital", 0),
      proofImg("yp25p1", "/placeholders/year-2025-print.jpg", "Print work 2025", "print", 0),
    ],
    publicPdfPath: "/samples/year-2025.pdf",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "yp_2024",
    year: 2024,
    title: "Year in Review 2024",
    digitalDescription:
      "Tahun eksplorasi motion dan product storytelling. Kolaborasi dengan tim engineering untuk handoff spesifikasi animasi.",
    printDescription:
      "Kemasan specialty coffee dan material pameran. Eksperimen finishing foil serta kertas daur ulang.",
    images: [
      proofImg("yp24d1", "/placeholders/year-2024-digital.jpg", "Digital work 2024", "digital", 0),
      proofImg("yp24p1", "/placeholders/year-2024-print.jpg", "Print work 2024", "print", 0),
    ],
    publicPdfPath: "/samples/year-2024.pdf",
    createdAt: "2025-01-05T10:00:00.000Z",
    updatedAt: "2025-01-05T10:00:00.000Z",
  },
  {
    id: "yp_2023",
    year: 2023,
    title: "Year in Review 2023",
    digitalDescription:
      "Fondasi portfolio digital: landing pages, type experiments, dan identity starter kits.",
    printDescription:
      "Poster series dan type specimens cetak kecil untuk studio visits.",
    images: [
      proofImg("yp23d1", "/placeholders/year-2023-digital.jpg", "Digital work 2023", "digital", 0),
      proofImg("yp23p1", "/placeholders/year-2023-print.jpg", "Print work 2023", "print", 0),
    ],
    publicPdfPath: "/samples/year-2023.pdf",
    createdAt: "2024-01-08T10:00:00.000Z",
    updatedAt: "2024-01-08T10:00:00.000Z",
  },
];

export const SEED_MESSAGES: ContactMessage[] = [
  {
    id: "msg_01",
    name: "Rina Pramesti",
    email: "rina@studioexample.com",
    subject: "Kolaborasi brand refresh",
    message:
      "Halo! Kami tertarik membahas refresh identitas untuk brand F&B. Apakah ada slot konsultasi bulan depan?",
    read: false,
    createdAt: "2026-03-01T14:22:00.000Z",
  },
  {
    id: "msg_02",
    name: "Andi Wijaya",
    email: "andi@agencyexample.co",
    subject: "Request portfolio PDF",
    message:
      "Boleh minta yearly proof 2025 dalam bentuk PDF untuk internal review kami?",
    read: true,
    createdAt: "2026-02-18T09:10:00.000Z",
  },
];

export const SEED_SETTINGS: SiteSettings = {
  heroName: "Neodeeps",
  heroTagline: "Desain visual yang tenang, tajam, dan siap produksi.",
  heroCtaLabel: "Lihat proyek",
  aboutShort:
    "Desainer & kreator yang mengerjakan identitas merek, editorial, dan packaging — dari konsep hingga file siap cetak.",
  aboutLong:
    "Saya menggabungkan pendekatan editorial dengan ketelitian sistem desain. Pekerjaan saya mencakup brand identity, layout majalah, packaging, dan motion specs yang bisa diimplementasikan tim produk. Demo ini menyimpan semua data di browser Anda (localStorage + IndexedDB) agar fitur CRUD terasa nyata tanpa backend.",
  profileImagePublicSrc: "/placeholders/profile.jpg",
  skills: [
    "Brand Identity",
    "Editorial Design",
    "Packaging",
    "Motion Design",
    "Art Direction",
  ],
  tools: [
    "Figma",
    "Illustrator",
    "Photoshop",
    "InDesign",
    "After Effects",
    "Blender",
    "Procreate",
  ],
  timeline: [
    {
      id: "tl_01",
      year: "2024 — sekarang",
      title: "Independent Designer",
      description: "Proyek brand, packaging, dan editorial untuk klien lokal & remote.",
    },
    {
      id: "tl_02",
      year: "2021 — 2024",
      title: "Studio Designer",
      description: "Anggota tim creative studio: identity systems dan campaign visual.",
    },
    {
      id: "tl_03",
      year: "2017 — 2021",
      title: "Desain Komunikasi Visual",
      description: "Studi formal dengan fokus tipografi dan desain cetak.",
    },
  ],
  social: {
    email: "hello@neodeeps.demo",
    instagram: "https://instagram.com/",
    behance: "https://behance.net/",
    dribbble: "https://dribbble.com/",
    linkedin: "https://linkedin.com/",
  },
  updatedAt: now,
};
