"use client";

import { useEffect, useState } from "react";
import { createObjectUrl } from "@/lib/db/files";
import { withBasePath } from "@/lib/paths";
import type { YearlyProof } from "@/lib/types";
/**
 * Viewer PDF inline (iframe) + tombol download.
 * Dynamic-ready: komponen ini cukup ringan; di Fase 4 bisa di-dynamic import.
 */
export function PdfViewer({ proof }: { proof: YearlyProof }) {
  const [src, setSrc] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("yearly-proof.pdf");

  useEffect(() => {
    let cancelled = false;
    let revoked: string | null = null;

    (async () => {
      if (proof.pdf?.fileId) {
        const url = await createObjectUrl(proof.pdf.fileId);
        if (cancelled) {
          if (url) URL.revokeObjectURL(url);
          return;
        }
        if (url) {
          revoked = url;
          setBlobUrl(url);
          setSrc(url);
          setFileName(proof.pdf.fileName);
        }
        return;
      }
      if (proof.publicPdfPath) {
        setSrc(withBasePath(proof.publicPdfPath));
        setFileName(proof.publicPdfPath.split("/").pop() ?? "yearly-proof.pdf");
      }
    })();

    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [proof]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  if (!src) {
    return (
      <p className="text-sm text-muted">PDF belum tersedia untuk tahun ini.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Dokumen: <span className="text-foreground">{fileName}</span>
          {proof.pdf ? (
            <span className="ml-2">
              ({(proof.pdf.sizeBytes / 1024).toFixed(1)} KB)
            </span>
          ) : null}
        </p>
        <a
          href={src}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-border px-3 text-sm hover:bg-surface-2"
        >
          Download PDF
        </a>
      </div>
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface">
        <iframe
          title={`Pratinjau PDF: ${proof.title}`}
          src={src}
          className="h-[70vh] w-full"
        />
      </div>
      <p className="text-xs text-muted">
        Jika PDF tidak tampil, gunakan tombol Download di atas.{" "}
        <a href={src} target="_blank" rel="noopener noreferrer" className="underline">
          Buka di tab baru
        </a>
        .
      </p>
    </div>
  );
}
