"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export function TagInput({
  value,
  onChange,
  suggestions = [],
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
}) {
  const [draft, setDraft] = useState("");

  const filtered = useMemo(() => {
    const q = draft.trim().toLowerCase();
    if (!q) return suggestions.filter((s) => !value.includes(s)).slice(0, 8);
    return suggestions
      .filter((s) => s.toLowerCase().includes(q) && !value.includes(s))
      .slice(0, 8);
  }, [draft, suggestions, value]);

  function add(tag: string) {
    const t = tag.trim();
    if (!t || value.includes(t)) return;
    onChange([...value, t]);
    setDraft("");
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => remove(tag)}
            className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-border bg-surface-2 px-2 py-1 text-xs"
            aria-label={`Hapus tag ${tag}`}
          >
            {tag} <span aria-hidden>×</span>
          </button>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft.replace(/,/g, ""));
          }
          if (e.key === "Backspace" && !draft && value.length) {
            remove(value[value.length - 1]);
          }
        }}
        placeholder="Tambah tag lalu Enter"
        className="mt-2 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm"
      />
      {filtered.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1">
          {filtered.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => add(s)}
                className={cn(
                  "rounded-[var(--radius-md)] border border-dashed border-border px-2 py-1 text-xs text-muted hover:text-foreground",
                )}
              >
                + {s}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
