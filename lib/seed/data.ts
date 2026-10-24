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

/** 6 dummy projects: mix of published and draft */
export const SEED_PROJECTS: Project[] = [
  {
    id: "proj_01",
    title: "Aurora Brand System",
    slug: "aurora-brand-system",
    year: 2025,
    summary:
      "A complete visual identity for a climate-tech startup: logo, typography, and application guidelines.",
    body: "<p>A brand system built around the metaphor of the aurora: soft gradients, editorial typography, and a tight grid for consistency across media.</p><p>Deliverables include a logo suite, color tokens, stationery, and a lightweight UI kit.</p>",
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
      "Digital magazine layouts with bold typography and atmospheric photography.",
    body: "<p>A special issue on tropical architecture. Modular layouts, large pull quotes, and a clear typographic hierarchy for long-form reading.</p>",
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
      "A specialty coffee packaging series with botanical illustration and foil finishing.",
    body: "<p>Three SKUs with distinct color systems that still feel like one visual family. Focused on shelf impact and sustainability storytelling.</p>",
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
      "A motion design system for a product launch: timing, easing, and micro-interactions.",
    body: "<p>Motion specifications used by product and engineering teams so animation stays consistent across web and mobile.</p>",
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
    summary: "A wayfinding system for a waterfront cultural space (still in draft).",
    body: "<p>Exploring pictograms and long-distance typography for outdoor and indoor areas.</p>",
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
    summary: "A display type specimen, drafted for a client presentation.",
    body: "<p>Ligature and display setting experiments for a custom font still in development.</p>",
    tags: ["Typography", "InDesign"],
    status: "draft",
    images: [
      img("p6i1", "/placeholders/project-06.jpg", "Velvet type specimen page", true, 0),
    ],
    createdAt: "2023-12-12T10:00:00.000Z",
    updatedAt: "2023-12-12T10:00:00.000Z",
  },
];

/** 3 yearly proofs with sample PDFs in /public/samples */
export const SEED_YEARLY_PROOFS: YearlyProof[] = [
  {
    id: "yp_2025",
    year: 2025,
    title: "Year in Review 2025",
    digitalDescription:
      "Focused on digital brand systems, motion specs, and UI exploration for tech clients. Plenty of on-screen type experiments and interactive prototypes.",
    printDescription:
      "Packaging and print editorial series: coffee line, magazine spreads, and a limited poster run for a local exhibition.",
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
      "A year of motion exploration and product storytelling. Collaborated with engineering on animation handoff specs.",
    printDescription:
      "Specialty coffee packaging and exhibition materials. Experiments with foil finishing and recycled paper.",
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
      "Building digital portfolio foundations: landing pages, type experiments, and identity starter kits.",
    printDescription:
      "Poster series and small-run type specimens for studio visits.",
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
    subject: "Brand refresh collaboration",
    message:
      "Hi! We would love to discuss a brand refresh for our F&B label. Do you have availability for a consultation next month?",
    read: false,
    createdAt: "2026-03-01T14:22:00.000Z",
  },
  {
    id: "msg_02",
    name: "Andi Wijaya",
    email: "andi@agencyexample.co",
    subject: "Request for portfolio PDF",
    message:
      "Could you share the 2025 yearly proof as a PDF for our internal review?",
    read: true,
    createdAt: "2026-02-18T09:10:00.000Z",
  },
];

export const SEED_SETTINGS: SiteSettings = {
  heroName: "Neodeeps",
  heroTagline: "Visual design that is calm, sharp, and production-ready.",
  heroCtaLabel: "View projects",
  aboutShort:
    "A designer and creator working across brand identity, editorial, and packaging, from concept to print-ready files.",
  aboutLong:
    "I combine an editorial approach with the discipline of design systems. My work covers brand identity, magazine layouts, packaging, and motion specs that product teams can implement. This demo stores all data in your browser (localStorage and IndexedDB) so CRUD features feel real without a backend.",
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
      year: "2024 - present",
      title: "Independent Designer",
      description:
        "Brand, packaging, and editorial projects for local and remote clients.",
    },
    {
      id: "tl_02",
      year: "2021 - 2024",
      title: "Studio Designer",
      description:
        "Part of a creative studio team: identity systems and campaign visuals.",
    },
    {
      id: "tl_03",
      year: "2017 - 2021",
      title: "Visual Communication Design",
      description:
        "Formal study with a focus on typography and print design.",
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
