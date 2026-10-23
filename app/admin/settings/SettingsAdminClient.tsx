"use client";

import { useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { ProfileImage } from "@/components/media/ProfileImage";
import { processImageUpload } from "@/lib/image/compress";
import { settingsRepo } from "@/lib/repositories";
import { ensureSeedData, resetDemoData } from "@/lib/seed/bootstrap";
import type { SiteSettings } from "@/lib/types";
import { useToastStore } from "@/store/toast";

const field =
  "mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm";

export function SettingsAdminClient() {
  const push = useToastStore((s) => s.push);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [skillsText, setSkillsText] = useState("");
  const [toolsText, setToolsText] = useState("");

  useEffect(() => {
    ensureSeedData();
    void settingsRepo.get().then((s) => {
      setSettings(s);
      setSkillsText(s.skills.join("\n"));
      setToolsText(s.tools.join("\n"));
    });
  }, []);

  if (!settings) {
    return (
      <AdminPage title="Site Settings">
        <PageSkeleton />
      </AdminPage>
    );
  }

  function patch<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const next = await settingsRepo.update({
        ...settings,
        skills: skillsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        tools: toolsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setSettings(next);
      push("Settings disimpan", "success");
    } catch (err) {
      push(err instanceof Error ? err.message : "Gagal menyimpan", "error");
    } finally {
      setSaving(false);
    }
  }

  async function onProfileFile(file: File | undefined) {
    if (!file) return;
    try {
      const processed = await processImageUpload(file, "Foto profil", {
        isCover: true,
        order: 0,
      });
      const largest = processed.variants[processed.variants.length - 1];
      // Simpan juga sebagai profileImageFileId (pakai varian terbesar)
      const updated = await settingsRepo.update({
        profileImageFileId: largest?.fileId,
        profileImagePublicSrc: undefined,
      });
      setSettings(updated);
      push(
        `Foto profil dikompres (${processed.originalSizeBytes} → ${processed.compressedSizeBytes} bytes)`,
        "success",
      );
    } catch (err) {
      push(err instanceof Error ? err.message : "Upload gagal", "error");
    }
  }

  async function onReset() {
    if (!window.confirm("Reset seluruh demo data?")) return;
    await resetDemoData();
    const s = await settingsRepo.get();
    setSettings(s);
    setSkillsText(s.skills.join("\n"));
    setToolsText(s.tools.join("\n"));
    push("Demo data di-reset", "success");
  }

  return (
    <AdminPage
      title="Site Settings"
      description="Teks hero, about, foto, dan tautan sosial."
      actions={
        <Button type="button" variant="secondary" size="sm" onClick={() => void onReset()}>
          Reset Demo Data
        </Button>
      }
    >
      <form onSubmit={onSave} className="mx-auto max-w-2xl space-y-5">
        <label className="block text-sm">
          <span className="text-muted">Nama hero</span>
          <input
            className={field}
            value={settings.heroName}
            onChange={(e) => patch("heroName", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Tagline</span>
          <input
            className={field}
            value={settings.heroTagline}
            onChange={(e) => patch("heroTagline", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Label CTA</span>
          <input
            className={field}
            value={settings.heroCtaLabel}
            onChange={(e) => patch("heroCtaLabel", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">About singkat</span>
          <textarea
            className={field}
            rows={3}
            value={settings.aboutShort}
            onChange={(e) => patch("aboutShort", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">About panjang</span>
          <textarea
            className={field}
            rows={6}
            value={settings.aboutLong}
            onChange={(e) => patch("aboutLong", e.target.value)}
          />
        </label>

        <div className="text-sm">
          <span className="text-muted">Foto profil</span>
          <div className="mt-2 flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-[var(--radius-md)]">
              <ProfileImage
                publicSrc={settings.profileImagePublicSrc}
                fileId={settings.profileImageFileId}
                alt="Preview profil"
                width={80}
                height={80}
              />
            </div>
            <label className="cursor-pointer text-sm underline">
              Ganti foto
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => void onProfileFile(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        <label className="block text-sm">
          <span className="text-muted">Skills (satu per baris)</span>
          <textarea
            className={field}
            rows={5}
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Tools (satu per baris)</span>
          <textarea
            className={field}
            rows={5}
            value={toolsText}
            onChange={(e) => setToolsText(e.target.value)}
          />
        </label>

        <fieldset className="space-y-3 border border-border rounded-[var(--radius-md)] p-4">
          <legend className="px-1 text-xs uppercase tracking-wider text-muted">
            Sosial
          </legend>
          {(
            [
              "email",
              "instagram",
              "behance",
              "dribbble",
              "linkedin",
            ] as const
          ).map((key) => (
            <label key={key} className="block text-sm">
              <span className="capitalize text-muted">{key}</span>
              <input
                className={field}
                value={settings.social[key] ?? ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, [key]: e.target.value },
                  })
                }
              />
            </label>
          ))}
        </fieldset>

        <Button type="submit" disabled={saving}>
          {saving ? "Menyimpan…" : "Simpan settings"}
        </Button>
      </form>
    </AdminPage>
  );
}
