"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { createObjectUrl } from "@/lib/db/files";
import { resolveImageSrc } from "@/lib/media";
import { withBasePath } from "@/lib/paths";
import type { AnyImage } from "@/lib/media";

type Props = {
  image: AnyImage;
  className?: string;
  imgClassName?: string;
  preferredWidth?: number;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  /** true = pakai rasio asli file; false = biarkan className (aspect-*) yang mengatur */
  intrinsicAspect?: boolean;
};

/**
 * Gambar seed (public) atau upload (object URL + srcset dari IndexedDB).
 * Pakai <img> biasa — bukan next/image — untuk blob URL.
 */
export function SmartImage({
  image,
  className,
  imgClassName,
  preferredWidth = 800,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  width = 1600,
  height = 1200,
  intrinsicAspect = false,
}: Props) {
  const [src, setSrc] = useState<string | null>(
    image.publicSrc ? withBasePath(image.publicSrc) : null,
  );
  const [srcSet, setSrcSet] = useState<string | undefined>();
  const [blobUrls, setBlobUrls] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const created: string[] = [];

    (async () => {
      if (image.publicSrc) {
        setSrc(withBasePath(image.publicSrc));
        setSrcSet(undefined);
        return;
      }

      if (image.variants?.length) {
        const parts: string[] = [];
        for (const v of image.variants) {
          const url = await createObjectUrl(v.fileId);
          if (!url) continue;
          created.push(url);
          parts.push(`${url} ${v.width}w`);
        }
        if (cancelled) {
          created.forEach((u) => URL.revokeObjectURL(u));
          return;
        }
        setBlobUrls(created);
        setSrcSet(parts.join(", ") || undefined);
        const preferred =
          image.variants.find((v) => v.width >= preferredWidth) ??
          image.variants[image.variants.length - 1];
        const idx = image.variants.indexOf(preferred);
        setSrc(created[idx] ?? created[0] ?? null);
        return;
      }

      const url = await resolveImageSrc(image, preferredWidth);
      if (cancelled) {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
        return;
      }
      if (url?.startsWith("blob:")) {
        created.push(url);
        setBlobUrls(created);
      }
      setSrc(url);
    })();

    return () => {
      cancelled = true;
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [image, preferredWidth]);

  useEffect(() => {
    return () => {
      blobUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [blobUrls]);

  const blur = image.blurDataUrl;
  const primaryVariant =
    image.variants?.find((v) => v.width >= preferredWidth) ??
    image.variants?.[image.variants.length - 1];
  const w = primaryVariant?.width ?? width;
  const h = primaryVariant?.height ?? height;

  return (
    <div
      className={cn("relative overflow-hidden bg-surface-2", className)}
      style={intrinsicAspect ? { aspectRatio: `${w} / ${h}` } : undefined}
    >
      {blur ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blur}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
        />
      ) : null}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          srcSet={srcSet}
          alt={image.alt}
          width={w}
          height={h}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "relative z-[1] h-full w-full object-cover",
            imgClassName,
          )}
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-surface-2" />
      )}
    </div>
  );
}
