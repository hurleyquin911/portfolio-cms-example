import { createObjectUrl } from "@/lib/db/files";
import { withBasePath } from "@/lib/paths";
import type { ImageVariant, ProjectImage, YearlyProofImage } from "@/lib/types";

export type AnyImage = ProjectImage | YearlyProofImage;

/** URL tampilan: public seed path (dengan basePath) atau blob IndexedDB */
export async function resolveImageSrc(
  image: AnyImage,
  preferredWidth = 800,
): Promise<string | null> {
  if (image.publicSrc) {
    return withBasePath(image.publicSrc);
  }
  if (!image.variants?.length) return null;
  const sorted = [...image.variants].sort((a, b) => a.width - b.width);
  const match =
    sorted.find((v) => v.width >= preferredWidth) ?? sorted[sorted.length - 1];
  return createObjectUrl(match.fileId);
}

export function buildSrcSetFromVariants(
  variants: ImageVariant[],
  urlByFileId: Record<string, string>,
): string {
  return variants
    .map((v) => {
      const url = urlByFileId[v.fileId];
      return url ? `${url} ${v.width}w` : null;
    })
    .filter(Boolean)
    .join(", ");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getCoverImage(images: ProjectImage[]): ProjectImage | undefined {
  return (
    images.find((i) => i.isCover) ??
    [...images].sort((a, b) => a.order - b.order)[0]
  );
}
