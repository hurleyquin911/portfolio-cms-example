# Neodeeps — Portfolio Demo

Website portfolio demo (desainer/kreator) berbasis **Next.js App Router + static export**, siap di-deploy ke **GitHub Pages**. Semua data dummy, tetapi fitur (CRUD, upload gambar/PDF, login, form kontak) benar-benar berfungsi di browser lewat **localStorage** + **IndexedDB**.

Status: **lengkap (Fase 1–4)**.

## Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 16 (App Router), TypeScript strict, `output: 'export'` |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Storage | localStorage (teks), IndexedDB via `idb` (gambar & PDF) |
| Forms | react-hook-form + zod |
| Rich text | Tiptap (dynamic import di admin) |
| Motion | GSAP + ScrollTrigger + Flip + `@gsap/react` + Lenis |

**Tidak ada** backend, API Routes, Server Actions, atau database server.

## Jalankan lokal

```bash
npm install --legacy-peer-deps
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Build static (hasil di `out/`):

```bash
npm run build
```

Opsional preview folder `out` dengan static server apa pun, misalnya:

```bash
npx serve out
```

### Environment lokal

| Variabel | Nilai lokal | Keterangan |
|----------|-------------|------------|
| `NEXT_PUBLIC_BASE_PATH` | *(kosong)* | Diisi `/nama-repo` saat deploy Pages |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` (opsional) | Origin absolut untuk sitemap/OG |

Helper `withBasePath()` di `lib/paths.ts` mem-prefix aset & path publik.

## Deploy ke GitHub Pages

1. Push ke branch `main` (atau `master`).
2. Di repo GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) akan:
   - `npm ci --legacy-peer-deps`
   - set `NEXT_PUBLIC_BASE_PATH=/{nama-repo}`
   - set `NEXT_PUBLIC_SITE_URL=https://{owner}.github.io`
   - `npm run build` → folder `out` (+ `.nojekyll`)
   - upload artifact & deploy Pages

URL tipikal: `https://<user>.github.io/<nama-repo>/`

## Kredensial demo

| Field | Nilai |
|-------|--------|
| Email | `admin@demo.com` |
| Password | `admin123` |

Login: `/admin/login/` — hint kredensial ditampilkan di form.

## Fitur

### Publik
- Landing (hero, selected projects, marquee tools, CTA)
- Project gallery (filter tag + search) & detail (`/projects/detail/?slug=`)
- Yearly proofs & detail + PDF viewer/download (`?year=`)
- About (dari Site Settings) + JSON-LD Person
- Contact (honeypot + math captcha + rate limit 30s → Admin Messages)

### Admin (di balik login)
- Dashboard + **Reset Demo Data**
- Projects CRUD (Tiptap, tags, upload multi-gambar, cover, reorder)
- Yearly Proofs CRUD + upload PDF
- Messages inbox
- Site Settings (hero, about, foto, sosial, skills/tools)

### Image pipeline (client)
Upload → Canvas resize/kompres WebP → varian **400 / 800 / 1600w** → IndexedDB → `srcset` + blur placeholder di publik. Admin menampilkan ukuran asli vs kompres.

## Arsitektur folder

```
app/                 # routes (tanpa [slug]/[id] dinamis)
components/          # UI publik, motion, admin, media
lib/
  storage/           # localStorage helpers
  db/                # IndexedDB (idb)
  repositories/      # getAll / getById / create / update / remove
  seed/              # dummy data + bootstrap/reset
  image/             # compress pipeline
store/               # theme, auth, toast
hooks/
.github/workflows/   # deploy Pages
public/              # placeholders SVG, sample PDF, .nojekyll
```

**Kenapa query param, bukan `[slug]`?**  
Static export harus mem-prerender semua HTML di build time. Data CRUD baru di browser tidak bisa di-prerender, jadi detail memakai:

- `/projects/detail/?slug=...`
- `/yearly-proofs/detail/?year=...`
- `/admin/projects/edit/?id=...`

## Aksesibilitas & SEO (ringkas)

- Landmark semantik, satu `h1` per halaman, skip-to-content
- Focus ring jelas, dialog konfirmasi (Escape / restore focus)
- `prefers-reduced-motion` dihormati di GSAP/Lenis
- Metadata + Open Graph + Twitter; `app/sitemap.ts` & `app/robots.ts`
- Admin di-`noindex`; `/admin` di-disallow di robots
- Komponen berat (Tiptap, PDF viewer) di-dynamic import

## Apa yang diganti untuk produksi

| Demo sekarang | Ganti dengan |
|---------------|--------------|
| Auth localStorage (`admin@demo.com`) | Auth sungguhan (Auth.js, Clerk, Cognito, dsb.) |
| localStorage + IndexedDB | Database / CMS (Supabase, Sanity, Payload, …) |
| Form kontak → localStorage | EmailJS / Formspree / Resend (lihat komentar di `ContactForm`) |
| Image di IndexedDB | CDN / object storage (Cloudinary, S3, R2) + transform server-side |
| Query `?slug=` | Route dinamis App Router `[slug]` + ISR/SSR jika ada server |
| `output: 'export'` | Opsional: Node hosting / Vercel jika butuh API |

Titik ganti repository ada di `lib/repositories/*` — interface sudah `getAll` / `getById` / `create` / `update` / `remove`.

## Catatan teknis

- Install memakai `--legacy-peer-deps` karena resolusi peer `@hookform/resolvers`.
- File `AGENTS.md` bisa muncul lagi dari `next dev` (aturan Next.js agent); aman di-commit agar tree bersih.
- Seed gambar & PDF ada di `public/placeholders` dan `public/samples` (tanpa dependensi internet).
