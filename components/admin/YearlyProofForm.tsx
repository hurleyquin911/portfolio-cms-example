"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PdfUploader } from "@/components/admin/PdfUploader";
import { Button } from "@/components/ui/Button";
import { yearlyProofsRepo } from "@/lib/repositories";
import type { YearlyProof, YearlyProofImage } from "@/lib/types";
import { useToastStore } from "@/store/toast";

const field =
  "mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm";

export function YearlyProofForm({
  initial,
  mode,
}: {
  initial?: YearlyProof;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const push = useToastStore((s) => s.push);
  const [year, setYear] = useState(initial?.year ?? new Date().getFullYear());
  const [title, setTitle] = useState(initial?.title ?? "");
  const [digitalDescription, setDigitalDescription] = useState(
    initial?.digitalDescription ?? "",
  );
  const [printDescription, setPrintDescription] = useState(
    initial?.printDescription ?? "",
  );
  const [images, setImages] = useState<YearlyProofImage[]>(
    initial?.images ?? [],
  );
  const [pdf, setPdf] = useState(initial?.pdf);
  const [publicPdfPath, setPublicPdfPath] = useState(initial?.publicPdfPath);
  const [saving, setSaving] = useState(false);

  const missingAlt = useMemo(
    () => images.some((img) => !img.alt.trim()),
    [images],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      push("Judul wajib", "error");
      return;
    }
    if (missingAlt) {
      push("Semua gambar wajib punya alt text", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        year: Number(year),
        title: title.trim(),
        digitalDescription: digitalDescription.trim(),
        printDescription: printDescription.trim(),
        images,
        pdf,
        publicPdfPath,
      };
      if (mode === "create") {
        await yearlyProofsRepo.create(payload);
        push("Yearly proof dibuat", "success");
      } else if (initial) {
        await yearlyProofsRepo.update(initial.id, payload);
        push("Yearly proof disimpan", "success");
      }
      router.push("/admin/yearly-proofs/");
    } catch (err) {
      push(err instanceof Error ? err.message : "Gagal menyimpan", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Tahun</span>
          <input
            type="number"
            className={field}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Judul</span>
          <input
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-muted">Deskripsi karya digital</span>
        <textarea
          className={field}
          rows={4}
          value={digitalDescription}
          onChange={(e) => setDigitalDescription(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted">Deskripsi karya cetak</span>
        <textarea
          className={field}
          rows={4}
          value={printDescription}
          onChange={(e) => setPrintDescription(e.target.value)}
          required
        />
      </label>
      <div className="text-sm">
        <span className="text-muted">Gambar (digital & print)</span>
        <div className="mt-2">
          <ImageUploader
            images={images}
            onChange={(imgs) => setImages(imgs as YearlyProofImage[])}
            mode="proof"
            proofCategory="digital"
          />
        </div>
      </div>
      <div className="text-sm">
        <span className="text-muted">PDF</span>
        <div className="mt-2">
          <PdfUploader
            pdf={pdf}
            publicPdfPath={publicPdfPath}
            onChange={(next) => {
              setPdf(next.pdf);
              setPublicPdfPath(next.publicPdfPath);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Menyimpan…" : "Simpan"}
        </Button>
        <Button variant="secondary" href="/admin/yearly-proofs/">
          Batal
        </Button>
      </div>
    </form>
  );
}
