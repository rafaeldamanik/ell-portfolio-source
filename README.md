# ell. — Portfolio Website

Website portfolio personal bernama **ell.** milik **Rafael Damanik** — Graphic Designer & Video Editor.

Dibangun dengan gaya **editorial / magazine**: tipografi serif oversized, grid asimetris, palet warm cream + electric blue, animasi halus yang hormat `prefers-reduced-motion`, dan sistem portfolio yang sepenuhnya digerakkan oleh data JSON.

> Catatan penting: seluruh project di halaman Works saat ini adalah **placeholder dummy untuk pengujian layout**. Mereka diberi flag `isPlaceholder` di data dan **bukan** karya asli. Ganti dengan karya sendiri mengikuti panduan di bawah.

---

## Daftar Isi

1. [Fitur](#fitur)
2. [Teknologi](#teknologi)
3. [Instalasi Dependencies](#instalasi-dependencies)
4. [Menjalankan Project Secara Lokal](#menjalankan-project-secara-lokal)
5. [Struktur Folder](#struktur-folder)
6. [Panduan Menambahkan Project Baru](#panduan-menambahkan-project-baru)
7. [Panduan Mengganti Gambar & Video](#panduan-mengganti-gambar--video)
8. [Mengubah Teks Profil, About & Kontak](#mengubah-teks-profil-about--kontak)
9. [Deployment ke GitHub Pages](#deployment-ke-github-pages)
10. [Checklist Testing Sebelum Deployment](#checklist-testing-sebelum-deployment)
11. [Troubleshooting](#troubleshooting)

---

## Fitur

- **4 halaman utama** — Home, About, Works, Contact (+ 404) dalam satu SPA hash-routed.
- **Hero editorial full-screen** dengan oversized typography, foto portrait, dan CTA.
- **Masonry grid asimetris** dengan proporsi gambar yang beragam (bukan kartu seragam).
- **Category filter** — All Works / Graphic Design / Social Media Design / Video Editing / Photography.
- **Project detail modal** — ESC, klik di luar, fokus trap, restore fokus, scroll lock yang selalu dipulihkan, navigasi Prev/Next.
- **Video preview otomatis saat hover** (desktop, muted, `playsInline`) — thumbnail di perangkat mobile, tidak pernah autoplay bersuara.
- **Custom cursor** (dot + ring) — hanya aktif pada perangkat pointer presisi; touch device memakai cursor normal.
- **Scroll reveal** ringan — konten tetap terlihat jika JavaScript gagal berjalan.
- **Loading screen ber-branding**, **scroll progress bar**, **back-to-top**, **floating WhatsApp** dengan pesan terisi otomatis.
- **Navigasi mobile** full-screen dengan menu interaktif.
- **SEO lengkap** — unique title per halaman, meta description, Open Graph + Twitter Card, robots.txt, sitemap.xml, favicon custom.
- **Aksesibilitas** — semantic HTML, skip link, keyboard navigation, focus states, kontras warna, alt text deskriptif.
- **Siap GitHub Pages** — static export, hash routing, base path otomatis dari nama repo.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Routing SPA | react-router-dom v6 (`HashRouter`) |
| Styling | Modern CSS (custom properties, grid, clamp, `prefers-reduced-motion`) |
| Font | Instrument Serif + Space Grotesk (self-hosted via @fontsource) |
| Data | JSON + JS module terpusat (`src/data/`) |
| Deployment | Static export → GitHub Pages |

Tidak ada backend, database, admin dashboard, analytics, atau API key — sesuai kebutuhan portfolio static.

> **Catatan teknis:** lingkungan development menyediakan runtime Next.js, sehingga React SPA ini dibungkus dalam Next.js dan di-export menjadi 100% statis untuk GitHub Pages. Struktur komponen (`components/`, `views/`, `data/`, `hooks/`, `utils/`) tetap mengikuti arsitektur yang diminta, dan `HashRouter` dipakai agar routing tidak rusak di GitHub Pages.

---

## Instalasi Dependencies

Pastikan sudah terpasang:

- **Node.js 20+** (disarankan 22)
- **npm** (bawaan Node.js) atau bun/pnpm

```bash
# masuk ke folder project
cd ell-portfolio   # atau folder tempat project berada

# install semua dependencies
npm install
```

Dependencies utama yang akan terpasang: `next`, `react`, `react-dom`, `react-router-dom`, `@fontsource/instrument-serif`, `@fontsource/space-grotesk`.

## Menjalankan Project Secara Lokal

```bash
# mode development (hot reload)
npm run dev
# buka http://localhost:3000

# build static export ke folder out/ (untuk deployment)
npm run build:static

# cek kualitas kode
npm run lint
```

Untuk mencoba hasil build secara lokal:

```bash
npx serve out
```

---

## Struktur Folder

```
├── public/
│   ├── favicon.svg              # favicon custom "ell."
│   ├── robots.txt               # aturan crawler
│   ├── sitemap.xml              # sitemap (update domain saat deploy)
│   └── assets/
│       ├── images/
│       │   ├── profile/         # portrait.webp — foto profil
│       │   ├── projects/        # cover project (p1..p8.webp)
│       │   └── og-image.jpg     # gambar Open Graph 1200x630
│       └── videos/              # video sampel (reel-sample.mp4, recap-sample.mp4)
│
├── src/
│   ├── app/                     # shell Next.js (satu route "/" yang memuat SPA)
│   │   ├── layout.tsx           # metadata SEO global
│   │   ├── page.tsx             # mount SPA (client-only)
│   │   └── not-found.tsx        # 404.html hasil export
│   │
│   ├── components/
│   │   ├── App.jsx              # root SPA: HashRouter + layout global
│   │   ├── Icons.jsx            # ikon SVG inline
│   │   ├── Navbar.jsx           # navbar + menu mobile
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx      # kartu project (image/video hover)
│   │   ├── ProjectModal.jsx     # modal detail project (accessible)
│   │   ├── CustomCursor.jsx     # cursor dot + ring
│   │   ├── LoadingScreen.jsx    # loading ber-branding
│   │   ├── ScrollProgress.jsx   # indikator progres scroll
│   │   ├── FloatingWhatsApp.jsx # tombol WhatsApp mengambang
│   │   ├── BackToTop.jsx
│   │   ├── Reveal.jsx           # scroll-reveal wrapper
│   │   ├── SectionHeading.jsx   # heading "( 01 ) — Label"
│   │   └── sections/            # Hero, Intro, Marquee, FeaturedWorks,
│   │                            # ServicesSection, SkillsSection, ContactCTA
│   │
│   ├── views/                   # halaman SPA (dipanggil oleh router)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx        # filter + masonry + modal
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/                    # SEMUA KONTEN DI SINI
│   │   ├── profile.js           # identitas, kontak, teks About, CV
│   │   ├── projects.json        # daftar project + kategori
│   │   ├── services.json        # layanan kreatif
│   │   └── skills.json          # software & skills
│   │
│   ├── hooks/                   # useReveal, useMediaQuery, useBodyScrollLock,
│   │                            # useProjectModal, useScrollY, useDocumentMeta
│   ├── utils/                   # helper (cx, whatsappUrl, projects.js)
│   └── styles/                  # global.css (design tokens) + css per area
│
├── scripts/gen_assets.py        # generator placeholder (opsional, Python)
├── .github/workflows/deploy.yml # auto-deploy ke GitHub Pages
└── next.config.ts               # static export + base path
```

---

## Panduan Menambahkan Project Baru

Menambahkan project **tidak perlu menyentuh komponen UI sama sekali** — cukup 3 langkah:

### 1. Siapkan file gambar/video

- Gambar: taruh di `public/assets/images/projects/` — format **WebP** disarankan (jpg/png juga jalan).
- Video (opsional): taruh di `public/assets/videos/` — format **MP4** (H.264), tanpa audio disarankan.

### 2. Buka `src/data/projects.json`

Tambahkan satu object baru ke array `projects`:

```json
{
  "id": "proyek-baru-01",
  "isPlaceholder": false,
  "title": "Judul Project Saya",
  "category": "graphic-design",
  "year": "2026",
  "ratio": "4 / 3",
  "cover": "assets/images/projects/nama-file.webp",
  "coverAlt": "Deskripsi gambar untuk screen reader",
  "description": "Deskripsi singkat project — apa, untuk siapa, bagaimana prosesnya.",
  "tools": ["Adobe Photoshop"],
  "featured": false,
  "video": null
}
```

### 3. Selesai

- Muncul otomatis di masonry grid halaman Works.
- Set `featured: true` agar tampil di section Selected Works di Home (maksimal 3 yang diambil).
- Untuk project video, isi `video`:

```json
"video": {
  "src": "assets/videos/nama-video.mp4",
  "poster": "assets/images/projects/nama-thumbnail.webp"
}
```

Nilai `category` yang tersedia: `graphic-design`, `social-media`, `video-editing`, `photography` (bisa ditambah di array `categories` pada file yang sama).

Nilai `ratio` mengatur proporsi di grid, contoh: `"4 / 3"`, `"3 / 4"`, `"1 / 1"`, `"2 / 3"`, `"8 / 5"`.

Set `isPlaceholder: false` untuk karya asli — catatan "placeholder" di modal otomatis hilang.

---

## Panduan Mengganti Gambar & Video

**Foto profil (About + Hero):**

1. Siapkan foto portrait rasio **4:5** (misal 1200 × 1500 px), format WebP.
2. Timpa file: `public/assets/images/profile/portrait.webp` (nama harus sama).
3. Ubah teks alt di `src/data/profile.js` → `portraitAlt`.

**Gambar project:** timpa file cover di `public/assets/images/projects/` dengan nama yang sama seperti di JSON, atau tambahkan file baru + update path di JSON.

**Video project:** timpa file di `public/assets/videos/`, atau tambahkan baru + update `video.src` di JSON. Video dipakai: thumbnail sebagai poster → hover di desktop memutar preview (muted, loop) → di modal video punya kontrol penuh. Mobile selalu lihat thumbnail.

**Open Graph image (preview saat link dibagikan):** timpa `public/assets/images/og-image.jpg` (1200 × 630 px).

**Favicon:** edit `public/favicon.svg`.

> Tips konversi WebP: `cwebp -q 85 input.jpg -o output.webp` atau ekspor langsung dari Photoshop/Figma.

---

## Mengubah Teks Profil, About & Kontak

Semua identitas ada di **satu file**: `src/data/profile.js`.

- `name`, `brand`, `role`, `location` — identitas dasar.
- `email`, `whatsappNumber` (format internasional tanpa `+`), `whatsappMessage` (pesan otomatis), `instagramHandle/Url`, `githubHandle/Url`.
- `heroIntro` — deskripsi singkat di hero Home.
- `about.lead`, `about.paragraphs`, `about.quote`, `about.interests` — isi halaman About.
- `cv.entries` — isi pengalaman kerja saat sudah ada. **Jangan biarkan baris "20XX / Your role or title" tampil di website final** — hapus atau ganti dengan data asli.
- `skills.json` dan `services.json` — toolkit & layanan.

Perubahan langsung terlihat di dev server (hot reload).

---

## Deployment ke GitHub Pages

### Cara A — GitHub Actions (disarankan)

1. Push project ke repository GitHub (branch `main`).
2. Buka **Settings → Pages → Build and deployment → Source** → pilih **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` sudah menangani sisanya:
   - build static dengan `NEXT_BASE_PATH=/nama-repo` (otomatis dari nama repo),
   - upload folder `out/`,
   - deploy ke Pages.
4. Setiap push ke `main` akan deploy ulang otomatis.

URL hasil: `https://username.github.io/nama-repo/`

### Cara B — Manual dari komputer

```bash
# 1. build static (set base path sesuai nama repo)
NEXT_EXPORT=1 NEXT_BASE_PATH=/nama-repo npm run build:static

# 2a. deploy dengan npx gh-pages (folder out/ ke branch gh-pages)
npx gh-pages -d out

# 2b. ATAU commit isi out/ ke branch gh-pages secara manual
```

### Catatan penting base path

- **Project site** (`username.github.io/nama-repo/`): WAJIB set `NEXT_BASE_PATH=/nama-repo`.
- **User site** (`username.github.io/`): jalankan build **tanpa** `NEXT_BASE_PATH`.
- Routing memakai **HashRouter** — semua halaman diakses lewat `/#/about`, `/#/works`, `/#/contact` sehingga tidak butuh rewrite server. Fallback `404.html` juga sudah di-generate dari export.
- Setelah live, update domain final di:
  - `src/app/layout.tsx` → `SITE_URL` (metadata + Open Graph),
  - `public/robots.txt` → baris `Sitemap:`,
  - `public/sitemap.xml` → `<loc>`.

---

## Checklist Testing Sebelum Deployment

- [ ] Semua halaman terbuka: Home, About, Works, Contact, dan URL hash yang salah menampilkan 404.
- [ ] Semua tombol berfungsi: Start a Project (semua lokasi), View All Works, scroll indicator, hamburger menu.
- [ ] Semua link valid: WhatsApp (pesan otomatis muncul di WhatsApp), Instagram, Email (mailto), GitHub — semua `target=_blank` + `rel=noopener noreferrer`.
- [ ] Tidak ada broken image — cek Network tab saat scroll halaman Works.
- [ ] Video: thumbnail tampil; hover di desktop memutar preview muted; keluar hover berhenti; mobile menampilkan thumbnail; tidak ada autoplay bersuara.
- [ ] Portfolio filter berfungsi (semua kategori + jumlah count benar) dan animasi jalan.
- [ ] Project modal: buka via card, tutup via X / ESC / klik backdrop; Prev/Next berpindah; scroll posisi tidak hilang setelah tutup; body tidak terkunci permanen.
- [ ] Navbar berfungsi + active state benar; menu mobile buka/tutup, link bekerja, ESC menutup.
- [ ] Loading screen muncul sekali dan hilang cepat.
- [ ] Back to top muncul setelah scroll dan kembali ke atas.
- [ ] Scroll progress bar mengikuti scroll.
- [ ] Custom cursor tidak mengganggu (aktif hanya di pointer presisi; touch device pakai cursor normal).
- [ ] Tidak ada error di browser console (aktifkan devtools saat navigasi semua halaman).
- [ ] Tidak ada layout overflow horizontal (uji di 320px, 390px, 768px, 1024px, 1440px, 1920px).
- [ ] `npm run build:static` sukses tanpa error.
- [ ] Folder `out/` berisi `index.html`, `404.html`, `_next/`, dan `assets/`.
- [ ] Cek hasil build di `npx serve out` — gambar, video, dan routing berfungsi.
- [ ] Data dummy sudah diganti / `isPlaceholder: false` untuk karya asli; baris CV "20XX" sudah diganti.
- [ ] Domain final sudah di-set di `layout.tsx`, `robots.txt`, `sitemap.xml`.

## Troubleshooting

| Masalah | Solusi |
| --- | --- |
| Gambar 404 saat build Pages | `NEXT_BASE_PATH` belum di-set. Jalankan ulang dengan `/nama-repo`. |
| Halaman kosong putih di GitHub Pages | Pastikan Source Pages = GitHub Actions, dan workflow sukses (tab Actions). |
| Video tidak play saat hover | Pastikan format MP4 H.264, muted, dan path benar. Hover preview hanya aktif di perangkat desktop. |
| Font tidak muncul | Pastikan `@fontsource/*` terpasang dan tidak ada error saat `npm install`. |
| Ingin BrowserRouter (URL tanpa `#`) | Ganti `HashRouter` → `BrowserRouter` di `src/components/App.jsx` dan tambahkan fallback 404 di GitHub Pages (index.html → 404.html). `out/404.html` sudah disiapkan oleh export. |
| Ubah warna/typography | Edit design tokens di `src/styles/global.css` (bagian `:root`). |
