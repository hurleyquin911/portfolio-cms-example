"use client";

import { useEffect, useState } from "react";
import { createObjectUrl } from "@/lib/db/files";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/cn";

/** Foto profil dari path publik seed atau fileId IndexedDB */
export function ProfileImage({
  publicSrc,
  fileId,
  alt,
  className,
  width = 1200,
  height = 1500,
}: {
  publicSrc?: string;
  fileId?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [src, setSrc] = useState<string | null>(
    publicSrc ? withBasePath(publicSrc) : null,
  );

  useEffect(() => {
    let revoked: string | null = null;
    let cancelled = false;

    (async () => {
      if (publicSrc) {
        setSrc(withBasePath(publicSrc));
        return;
      }
      if (!fileId) {
        setSrc(withBasePath("/placeholders/profile.jpg"));
        return;
      }
      const url = await createObjectUrl(fileId);
      if (cancelled) {
        if (url) URL.revokeObjectURL(url);
        return;
      }
      if (url) {
        revoked = url;
        setSrc(url);
      }
    })();

    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [publicSrc, fileId]);

  if (!src) {
    return <div className={cn("animate-pulse bg-surface-2", className)} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-full w-full object-cover", className)}
      decoding="async"
    />
  );
}
