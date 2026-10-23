"use client";

import { useMemo, useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { processImageUpload, processProofImageUpload } from "@/lib/image/compress";
import { formatBytes } from "@/lib/media";
import type { ProjectImage, YearlyProofImage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useToastStore } from "@/store/toast";

type Mode = "project" | "proof";

type Props = {
  images: ProjectImage[] | YearlyProofImage[];
  onChange: (images: ProjectImage[] | YearlyProofImage[]) => void;
  mode?: Mode;
  /** untuk proof: kategori default saat upload */
  proofCategory?: "digital" | "print";
};

export function ImageUploader({
  images,
  onChange,
  mode = "project",
  proofCategory = "digital",
}: Props) {
  const push = useToastStore((s) => s.push);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const sorted = useMemo(
    () => [...images].sort((a, b) => a.order - b.order),
    [images],
  );

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setBusy(true);
    try {
      if (mode === "proof") {
        const next = [...(images as YearlyProofImage[])];
        for (const file of Array.from(fileList)) {
          if (!file.type.startsWith("image/")) {
            push(`${file.name} bukan gambar`, "error");
            continue;
          }
          const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
          next.push(
            await processProofImageUpload(file, alt, proofCategory, next.length),
          );
        }
        onChange(reindex(next));
      } else {
        const next = [...(images as ProjectImage[])];
        for (const file of Array.from(fileList)) {
          if (!file.type.startsWith("image/")) {
            push(`${file.name} bukan gambar`, "error");
            continue;
          }
          const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
          next.push(
            await processImageUpload(file, alt, {
              isCover: next.length === 0,
              order: next.length,
            }),
          );
        }
        onChange(reindex(next));
      }
      push("Gambar diproses & dikompres", "success");
    } catch (e) {
      push(e instanceof Error ? e.message : "Upload gagal", "error");
    } finally {
      setBusy(false);
    }
  }

  function updateAt(id: string, patch: Partial<ProjectImage & YearlyProofImage>) {
    onChange(
      images.map((img) => (img.id === id ? { ...img, ...patch } : img)) as typeof images,
    );
  }

  function setCover(id: string) {
    if (mode !== "project") return;
    onChange(
      (images as ProjectImage[]).map((img) => ({
        ...img,
        isCover: img.id === id,
      })),
    );
  }

  function remove(id: string) {
    const next = images.filter((img) => img.id !== id);
    if (mode === "project") {
      const list = next as ProjectImage[];
      if (list.length && !list.some((i) => i.isCover)) {
        list[0] = { ...list[0], isCover: true };
      }
      onChange(reindex(list));
    } else {
      onChange(reindex(next as YearlyProofImage[]));
    }
  }

  function onDropReorder(toIndex: number) {
    if (dragIndex === null || dragIndex === toIndex) {
      setDragIndex(null);
      return;
    }
    const list = [...sorted];
    const [item] = list.splice(dragIndex, 1);
    list.splice(toIndex, 0, item);
    setDragIndex(null);
    if (mode === "proof") {
      onChange(reindex(list as YearlyProofImage[]));
    } else {
      onChange(reindex(list as ProjectImage[]));
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-[var(--radius-md)] border border-dashed border-border px-4 py-10 text-center",
          dragOver && "border-accent bg-surface-2",
        )}
      >
        <p className="text-sm text-muted">
          Drag & drop gambar, atau pilih file. Otomatis WebP + varian 400/800/1600w.
        </p>
        <label className="mt-4 inline-flex cursor-pointer">
          <span className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-border px-3 text-sm hover:bg-surface-2">
            {busy ? "Memproses…" : "Pilih gambar"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            disabled={busy}
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </label>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted">Belum ada gambar.</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((img, index) => (
            <li
              key={img.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropReorder(index)}
              className="grid gap-3 rounded-[var(--radius-md)] border border-border p-3 sm:grid-cols-[120px_1fr_auto]"
            >
              <SmartImage
                image={img}
                className="aspect-square w-full"
                preferredWidth={400}
                width={400}
                height={400}
              />
              <div className="space-y-2">
                <label className="block text-xs text-muted">
                  Alt text (wajib)
                  <input
                    value={img.alt}
                    onChange={(e) => updateAt(img.id, { alt: e.target.value })}
                    required
                    className="mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-2 py-1.5 text-sm"
                  />
                </label>
                <p className="text-xs text-muted">
                  {formatBytes(img.originalSizeBytes)} →{" "}
                  {formatBytes(img.compressedSizeBytes)}
                  {img.publicSrc ? " · seed publik" : ""}
                </p>
                {mode === "project" ? (
                  <label className="inline-flex items-center gap-2 text-xs">
                    <input
                      type="radio"
                      name="cover"
                      checked={"isCover" in img && img.isCover}
                      onChange={() => setCover(img.id)}
                    />
                    Jadikan cover
                  </label>
                ) : (
                  <label className="block text-xs text-muted">
                    Kategori
                    <select
                      value={
                        "category" in img ? img.category : proofCategory
                      }
                      onChange={(e) =>
                        updateAt(img.id, {
                          category: e.target.value as "digital" | "print",
                        })
                      }
                      className="mt-1 block rounded-[var(--radius-md)] border border-border bg-background px-2 py-1"
                    >
                      <option value="digital">Digital</option>
                      <option value="print">Print</option>
                    </select>
                  </label>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="cursor-grab text-xs text-muted">⋮⋮ drag</span>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => remove(img.id)}
                >
                  Hapus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function reindex<T extends { order: number }>(list: T[]): T[] {
  return list.map((item, i) => ({ ...item, order: i }));
}
