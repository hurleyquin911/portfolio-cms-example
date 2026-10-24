import { translate, type Locale, type MessageKey } from "@/lib/i18n";
import type { Project, SiteSettings, YearlyProof } from "@/lib/types";

const SKILL_KEYS: Record<string, MessageKey> = {
  "Brand Identity": "content.skill.brand",
  "Editorial Design": "content.skill.editorial",
  Packaging: "content.skill.packaging",
  "Motion Design": "content.skill.motion",
  "Art Direction": "content.skill.artDirection",
};

const TIMELINE_KEYS: Record<
  string,
  { title: MessageKey; desc: MessageKey }
> = {
  tl_01: { title: "content.tl01.title", desc: "content.tl01.desc" },
  tl_02: { title: "content.tl02.title", desc: "content.tl02.desc" },
  tl_03: { title: "content.tl03.title", desc: "content.tl03.desc" },
};

const PROJECT_KEYS: Record<
  string,
  { title: MessageKey; summary: MessageKey }
> = {
  proj_01: { title: "content.proj_01.title", summary: "content.proj_01.summary" },
  proj_02: { title: "content.proj_02.title", summary: "content.proj_02.summary" },
  proj_03: { title: "content.proj_03.title", summary: "content.proj_03.summary" },
  proj_04: { title: "content.proj_04.title", summary: "content.proj_04.summary" },
  proj_05: { title: "content.proj_05.title", summary: "content.proj_05.summary" },
  proj_06: { title: "content.proj_06.title", summary: "content.proj_06.summary" },
};

const YEARLY_KEYS: Record<
  string,
  { title: MessageKey; digital: MessageKey; print: MessageKey }
> = {
  yp_2025: {
    title: "content.yp_2025.title",
    digital: "content.yp_2025.digital",
    print: "content.yp_2025.print",
  },
  yp_2024: {
    title: "content.yp_2024.title",
    digital: "content.yp_2024.digital",
    print: "content.yp_2024.print",
  },
  yp_2023: {
    title: "content.yp_2023.title",
    digital: "content.yp_2023.digital",
    print: "content.yp_2023.print",
  },
};

/** Overlay seed marketing copy for the active locale (EN keeps stored values). */
export function localizeSettings(
  settings: SiteSettings,
  locale: Locale,
): SiteSettings {
  if (locale === "en") return settings;

  return {
    ...settings,
    heroTagline: translate(locale, "content.heroTagline"),
    heroCtaLabel: translate(locale, "content.heroCtaLabel"),
    aboutShort: translate(locale, "content.aboutShort"),
    aboutLong: translate(locale, "content.aboutLong"),
    skills: settings.skills.map(
      (s) => (SKILL_KEYS[s] ? translate(locale, SKILL_KEYS[s]) : s),
    ),
    timeline: settings.timeline.map((item) => {
      const keys = TIMELINE_KEYS[item.id];
      if (!keys) return item;
      return {
        ...item,
        title: translate(locale, keys.title),
        description: translate(locale, keys.desc),
      };
    }),
  };
}

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  const keys = PROJECT_KEYS[project.id];
  if (!keys) return project;
  return {
    ...project,
    title: translate(locale, keys.title),
    summary: translate(locale, keys.summary),
  };
}

export function localizeProjects(
  projects: Project[],
  locale: Locale,
): Project[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function localizeYearlyProof(
  proof: YearlyProof,
  locale: Locale,
): YearlyProof {
  if (locale === "en") return proof;
  const keys = YEARLY_KEYS[proof.id];
  if (!keys) return proof;
  return {
    ...proof,
    title: translate(locale, keys.title),
    digitalDescription: translate(locale, keys.digital),
    printDescription: translate(locale, keys.print),
  };
}

export function localizeYearlyProofs(
  proofs: YearlyProof[],
  locale: Locale,
): YearlyProof[] {
  return proofs.map((p) => localizeYearlyProof(p, locale));
}
