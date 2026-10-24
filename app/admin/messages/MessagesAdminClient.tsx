"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { messagesRepo } from "@/lib/repositories";
import { ensureSeedData } from "@/lib/seed/bootstrap";
import type { ContactMessage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useToastStore } from "@/store/toast";

export function MessagesAdminClient() {
  const push = useToastStore((s) => s.push);
  const [items, setItems] = useState<ContactMessage[] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    ensureSeedData();
    setItems(await messagesRepo.getAll());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleRead(msg: ContactMessage) {
    await messagesRepo.markRead(msg.id, !msg.read);
    await load();
    push(msg.read ? "Marked as unread" : "Marked as read", "info");
  }

  async function onDelete() {
    if (!deleteId) return;
    await messagesRepo.remove(deleteId);
    setDeleteId(null);
    await load();
    push("Message deleted", "success");
  }

  if (!items) {
    return (
      <AdminPage title="Messages">
        <PageSkeleton />
      </AdminPage>
    );
  }

  return (
    <AdminPage
      title="Messages"
      description="Inbox from the contact form (localStorage)."
    >
      {items.length === 0 ? (
        <EmptyState
          title="Inbox is empty"
          description="Messages from /contact will show up here."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((msg) => (
            <li
              key={msg.id}
              className={cn(
                "rounded-[var(--radius-md)] border border-border p-4",
                !msg.read && "bg-surface-2",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {msg.subject}
                    {!msg.read ? (
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-accent">
                        new
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {msg.name} ·{" "}
                    <a href={`mailto:${msg.email}`} className="underline">
                      {msg.email}
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(msg.createdAt).toLocaleString("en-US")}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    className="underline underline-offset-2"
                    onClick={() => void toggleRead(msg)}
                  >
                    {msg.read ? "Mark unread" : "Mark as read"}
                  </button>
                  <button
                    type="button"
                    className="text-danger"
                    onClick={() => setDeleteId(msg.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete message?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void onDelete()}
      />
    </AdminPage>
  );
}
