"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { replaceFile, removeFile } from "@/lib/db/files";
import { formatBytes } from "@/lib/media";
import type { YearlyProof } from "@/lib/types";
import { useToastStore } from "@/store/toast";

type PdfMeta = NonNullable<YearlyProof["pdf"]>;

export function PdfUploader({
  pdf,
  publicPdfPath,
  onChange,
}: {
  pdf?: PdfMeta;
  publicPdfPath?: string;
  onChange: (next: {
    pdf?: PdfMeta;
    publicPdfPath?: string;
  }) => void;
}) {
  const push = useToastStore((s) => s.push);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      push("PDF files only", "error");
      return;
    }
    setBusy(true);
    try {
      const record = await replaceFile(pdf?.fileId, file, file.name, "application/pdf");
      onChange({
        pdf: {
          fileId: record.id,
          fileName: record.name,
          sizeBytes: record.sizeBytes,
        },
        publicPdfPath: undefined,
      });
      push("PDF saved to IndexedDB", "success");
    } catch (e) {
      push(e instanceof Error ? e.message : "PDF upload failed", "error");
    } finally {
      setBusy(false);
    }
  }

  async function clearPdf() {
    if (pdf?.fileId) {
      await removeFile(pdf.fileId).catch(() => undefined);
    }
    onChange({ pdf: undefined, publicPdfPath: undefined });
    push("PDF removed", "info");
  }

  return (
    <div className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      {pdf ? (
        <p className="text-sm">
          <span className="font-medium">{pdf.fileName}</span>
          <span className="ml-2 text-muted">{formatBytes(pdf.sizeBytes)}</span>
        </p>
      ) : publicPdfPath ? (
        <p className="text-sm text-muted">
          Seed PDF: <code>{publicPdfPath}</code>
        </p>
      ) : (
        <p className="text-sm text-muted">No PDF yet.</p>
      )}

      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer">
          <span className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-border px-3 text-sm hover:bg-surface-2">
            {busy ? "Uploading…" : pdf || publicPdfPath ? "Replace PDF" : "Upload PDF"}
          </span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            disabled={busy}
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
        {(pdf || publicPdfPath) && (
          <Button type="button" variant="danger" size="sm" onClick={() => void clearPdf()}>
            Delete PDF
          </Button>
        )}
      </div>
    </div>
  );
}
