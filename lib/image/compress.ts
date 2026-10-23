import { saveFile } from "@/lib/db/files";
import type { ImageVariant, ProjectImage } from "@/lib/types";

const TARGET_WIDTHS = [400, 800, 1600] as const;
const WEBP_QUALITY = 0.82;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal memuat gambar"));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("toBlob gagal"));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

/**
 * Resize + kompres ke WebP, hasilkan varian 400/800/1600w + blur placeholder.
 * Disimpan ke IndexedDB; metadata dikembalikan untuk localStorage.
 */
export async function processImageUpload(
  file: File,
  alt: string,
  options?: { isCover?: boolean; order?: number },
): Promise<ProjectImage> {
  const originalSizeBytes = file.size;
  const img = await loadImage(file);
  const naturalW = img.naturalWidth;
  const naturalH = img.naturalHeight;
  const aspect = naturalH / naturalW;

  const widths: number[] = TARGET_WIDTHS.filter((w) => w <= naturalW);
  if (widths.length === 0) widths.push(Math.min(naturalW, 400));

  const variants: ImageVariant[] = [];
  let compressedSizeBytes = 0;

  for (const width of widths) {
    const height = Math.round(width * aspect);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas tidak tersedia");
    ctx.drawImage(img, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, "image/webp", WEBP_QUALITY);
    const record = await saveFile(
      blob,
      `${file.name.replace(/\.[^.]+$/, "")}-${width}w.webp`,
      "image/webp",
    );
    compressedSizeBytes += blob.size;
    variants.push({
      width,
      height,
      fileId: record.id,
      sizeBytes: blob.size,
    });
  }

  // Blur tiny (24px wide)
  const blurCanvas = document.createElement("canvas");
  const blurW = 24;
  const blurH = Math.max(1, Math.round(blurW * aspect));
  blurCanvas.width = blurW;
  blurCanvas.height = blurH;
  const bctx = blurCanvas.getContext("2d");
  if (bctx) {
    bctx.drawImage(img, 0, 0, blurW, blurH);
  }

  return {
    id: `img_${crypto.randomUUID().slice(0, 8)}`,
    alt: alt.trim() || file.name,
    isCover: options?.isCover ?? false,
    order: options?.order ?? 0,
    originalSizeBytes,
    compressedSizeBytes,
    variants,
    blurDataUrl: blurCanvas.toDataURL("image/jpeg", 0.4),
  };
}

/** Proses upload untuk yearly proof (tambah category) */
export async function processProofImageUpload(
  file: File,
  alt: string,
  category: "digital" | "print",
  order = 0,
) {
  const base = await processImageUpload(file, alt, { order });
  return { ...base, category };
}
