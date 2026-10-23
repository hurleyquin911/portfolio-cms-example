"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

/**
 * Editor rich text sederhana (Tiptap).
 * Diimpor dinamis dari form admin agar tidak membebani bundle publik.
 */
export function RichTextEditor({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (html: string) => void;
  className?: string;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] px-3 py-2 text-sm leading-relaxed outline-none prose-admin",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="h-40 animate-pulse rounded-[var(--radius-md)] bg-surface-2" />
    );
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-border bg-background",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        <ToolbarBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        />
        <ToolbarBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <ToolbarBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="List"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-sm)] px-2 py-1 text-xs",
        active ? "bg-foreground text-background" : "text-muted hover:bg-surface-2",
      )}
    >
      {label}
    </button>
  );
}
