"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DEMO_CREDENTIALS, useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/toast";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const session = useAuthStore((s) => s.session);
  const hydrated = useAuthStore((s) => s.hydrated);
  const push = useToastStore((s) => s.push);
  const [email, setEmail] = useState<string>(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && session) {
      router.replace("/admin/");
    }
  }, [hydrated, session, router]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = login(email, password);
    if (ok) {
      push("Berhasil masuk", "success");
      router.replace("/admin/");
    } else {
      setError("Email atau password salah.");
      push("Login gagal", "error");
    }
  }

  return (
    <div className="w-full max-w-md border border-border bg-surface rounded-[var(--radius-md)] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Admin</p>
      <h1 className="mt-2 font-serif text-3xl">Masuk</h1>
      <p className="mt-3 rounded-[var(--radius-md)] bg-surface-2 px-3 py-2 text-xs text-muted">
        Demo: <code>{DEMO_CREDENTIALS.email}</code> /{" "}
        <code>{DEMO_CREDENTIALS.password}</code>
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span className="text-muted">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2"
          />
        </label>
        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
