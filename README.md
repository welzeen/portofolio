# Portfolio Website — Cara Pakai

Website ini terdiri dari 4 halaman terpisah (bukan satu halaman panjang yang di-scroll):
- `index.html` — **halaman depan (landing)**: sapaan "Halo, saya Welzeen" + ilustrasi animasi + 4 kartu pilihan (Portfolio / Tentang / Links / Hubungi Saya)
- `portfolio.html` — **halaman khusus galeri project**, dengan filter kategori (Semua / Web / App)
- `about.html` — **halaman "Tentang Saya"**: bio, stats, skill/tech stack, dan timeline pengalaman
- `links.html` — halaman kumpulan link gaya "linktree"

Alurnya: orang buka website → lihat halaman depan dulu → klik salah satu kartu pilihan → baru masuk ke halaman project atau halaman link. Jadi tidak numpuk semua dalam satu scroll panjang.

Sekarang tampilannya **3D & immersive**:
- Background jaringan partikel 3D yang bergerak mengikuti mouse dan scroll (dibuat pakai Three.js).
- Kartu project & kartu pilihan bisa "dimiringkan" (3D tilt) dengan efek spotlight mengikuti kursor.
- Elemen muncul dengan animasi saat di-scroll ke viewport.
- Tombol di halaman Links punya efek "magnetic" — sedikit tertarik ke arah kursor.
- **Menu hamburger di HP/tablet** — di layar sempit (di bawah 720px), menu navigasi otomatis berubah jadi ikon garis tiga (☰) di pojok kanan atas. Klik untuk buka panel menu, ikon berubah jadi "X", dan menu otomatis tertutup kalau kamu klik salah satu link, klik area gelap di belakangnya, atau tekan tombol Escape di keyboard.
- Semua animasi otomatis mati kalau browser/OS user mengaktifkan "reduce motion", dan tilt/magnetic otomatis nonaktif di HP/tablet (supaya tetap nyaman disentuh).

> Catatan: efek 3D butuh koneksi internet aktif karena library Three.js dimuat dari CDN
> (`cdnjs.cloudflare.com`). Kalau nanti mau offline penuh, tinggal download file
> `three.min.js` dan taruh lokal, lalu ganti path `<script src="...">` di ketiga file HTML.

## 1. Buka di browser
Cukup buka file `index.html` dua kali klik, langsung tampil di browser.
Tidak perlu install apa-apa.

## 2. Ilustrasi robot animasi di halaman depan (index.html)
Slot foto di sebelah teks hero sekarang diisi **ilustrasi robot kecil animasi** (buatan sendiri lewat SVG + CSS, bukan karakter berhak cipta) — melayang pelan, mata berkedip, dan panel dada berkedip seperti kode. Ini dipilih supaya halamannya tetap hidup tanpa perlu foto asli.

**Kalau nanti berubah pikiran dan mau pakai foto asli kamu:**
1. Simpan foto kamu (disarankan persegi, minimal 336×336 px) ke folder `assets/`, misal `assets/foto-profil.jpg`.
2. Buka `index.html`, cari `<div class="hero-illustration" aria-hidden="true">`.
3. Hapus seluruh isi `<svg class="bot-svg">...</svg>` di dalamnya.
4. Ganti dengan:
   ```html
   <img src="assets/foto-profil.jpg" alt="Foto Welzeen" style="width:100%; height:100%; object-fit:cover; border-radius:28px;">
   ```

**Kalau mau oprek animasi robotnya:** buka `style.css`, cari blok yang diawali `.hero-illustration{` — semua keyframe animasinya (melayang, kedip mata, kedip kode, partikel) ada nama class `bot-` di situ, tinggal ubah durasi/warnanya sesuai selera.

## 3. Filter kategori project
Di atas grid project ada tombol filter (Semua / Web / App). Cara kerjanya:
- Tiap kartu `<article class="card ...">` punya atribut `data-category="web"` atau `data-category="app"`.
- Tiap tombol filter `<button class="filter-tab" data-filter="web">` akan menampilkan kartu yang `data-category`-nya sama.

**Kalau mau tambah kategori baru** (misal "Design"):
1. Tambah tombol baru di `.filter-tabs`:
   ```html
   <button class="filter-tab" data-filter="design">Design <span class="n">2</span></button>
   ```
2. Ubah `data-category` pada kartu yang sesuai jadi `data-category="design"`.
3. Update angka di `<span class="n">` sesuai jumlah project tiap kategori (opsional, hanya kosmetik).

Filter ini otomatis berjalan lewat `script.js`, tidak perlu tulis JS tambahan.

## 4. Tambah / ganti gambar project
1. Simpan screenshot project kamu (disarankan ukuran 1200×750 px, format `.jpg` atau `.png`) ke folder `assets/projects/`.
2. Buka `portfolio.html` pakai text editor (Notepad, VS Code, dll).
3. Di tiap kartu project, cari baris seperti ini:
   ```html
   <!-- <img src="assets/projects/project-01.jpg" alt="Screenshot Project 1"> -->
   ```
4. Hapus tanda komentar `<!--` dan `-->` di awal-akhir, lalu sesuaikan nama file gambarnya. Contoh jadi:
   ```html
   <img src="assets/projects/project-01.jpg" alt="Screenshot Project 1">
   ```
5. Baris placeholder di bawahnya (`<span class="placeholder-label">...`) boleh dihapus setelah gambar terpasang.

## 5. Ganti judul, deskripsi, tag, dan link project
Masih di `portfolio.html`, tiap kartu punya bagian:
```html
<h3>Nama Project 1</h3>
<p>Deskripsi singkat...</p>
<div class="tags">
  <span class="tag">React</span>
</div>
<a href="#" class="card-link" ...>Lihat project →</a>
```
Ganti teksnya sesuai project kamu, dan ganti `href="#"` dengan link asli (demo, GitHub, Play Store, dll).

## 6. Tambah kartu project baru
Kalau project lebih dari 6, tinggal copy-paste 1 blok `<article class="card">...</article>` yang sudah ada, lalu tempel di bawahnya dan ubah isinya.

## 7. Edit halaman Links
Buka `links.html`. Tiap baris link berbentuk:
```html
<a href="#" class="link-row" target="_blank" rel="noopener">
  <span class="icon">GH</span>
  <span class="label">GitHub<span class="sub">github.com/username-kamu</span></span>
  <span class="go">→</span>
</a>
```
Ganti `href="#"` dengan link asli, ganti teks di dalam `label` dan `sub`, dan `icon` boleh diisi singkatan 2 huruf (GH, IG, in, dst) sesuai selera.

Untuk foto profil, sama seperti gambar project: taruh file di folder `assets/`, lalu di `links.html` cari:
```html
<!-- <img src="assets/foto-profil.jpg" alt="Foto profil"> -->
```
aktifkan baris itu dan sesuaikan nama filenya.

## 8. Edit halaman Tentang Saya (about.html)
Buka `about.html`. Ada 4 bagian yang bisa diedit, semua ditandai komentar `<!-- GANTI DI SINI -->`:

1. **Stats** (`<div class="stats-row">`) — angka pencapaian singkat, contoh "2+ tahun pengalaman". Ganti angka di `<div class="num">` dan label di bawahnya.
2. **Bio** (`<div class="bio-text">`) — cerita singkat tentang kamu, boleh 2-4 paragraf.
3. **Skills** (`<div class="skills-groups">`) — dikelompokkan per kategori (Frontend, Backend, Mobile, Tools). Tiap skill adalah:
   ```html
   <span class="skill-chip">React</span>
   ```
   Tinggal tambah/hapus/ubah teksnya. Kalau mau tambah kategori baru, copy satu blok `<div class="skill-group">...</div>` dan ubah judul + isinya.
4. **Timeline pengalaman** (`<div class="timeline">`) — tiap pengalaman kerja/belajar adalah satu blok:
   ```html
   <div class="timeline-item">
     <div class="period">2025 — Sekarang</div>
     <h4>Posisi Kamu</h4>
     <div class="org">Nama Perusahaan</div>
     <p>Deskripsi singkat.</p>
   </div>
   ```
   Urutkan dari yang paling baru di atas. Tinggal copy-paste blok ini untuk menambah pengalaman lain.

## 9. Ganti nama & warna
- Nama kamu ada di beberapa tempat: `<div class="brand">`, `<h1>` di hero, dan `links.html`. Cari-ganti "Nama Kamu" / "nama-kamu.dev".
- Warna aksen (kuning amber) bisa diganti di `style.css`, cari variabel `--accent` di bagian paling atas file.

## 10. Upload online (opsional)
Kalau mau online, cara termudah gratis:
- **Netlify Drop** (netlify.com/drop) — tinggal drag & drop folder ini.
- **GitHub Pages** — push folder ini ke repository GitHub, aktifkan Pages di Settings.
- **Vercel** — import folder/project ini lewat vercel.com.

## 11. Kustomisasi efek 3D (opsional)
Buka `script.js`, semua variabel yang bisa diutak-atik ada komentarnya:
- `PARTICLE_COUNT` — jumlah titik di background (lebih banyak = lebih ramai, tapi lebih berat).
- `pointsMat` warna `0xF2B84B` — warna titik partikel.
- `lineMat` warna `0x5FD3A3` — warna garis penghubung.
- `strength` di `initCardTilt()` — seberapa besar kemiringan kartu (derajat).
- `pull` di `initMagnetic()` — seberapa jauh tombol link tertarik ke kursor (px).

## 12. Favicon & SEO (sudah otomatis terpasang)
Website ini sekarang sudah punya:
- **Favicon** — ikon huruf "W" di tab browser (`assets/icons/favicon.svg`, plus PNG fallback untuk browser lama dan `apple-touch-icon.png` untuk HP iPhone).
- **Meta description** — ringkasan halaman yang muncul di hasil pencarian Google.
- **Open Graph & Twitter Card** — supaya kalau link website ini di-share ke WhatsApp/LinkedIn/Twitter, muncul gambar preview otomatis (`assets/icons/og-image.png`) bukan cuma link polos.
- **robots.txt** dan **sitemap.xml** — membantu Google mengindeks halaman kamu.

**Kalau kamu ganti domain** (bukan `welzeen.dev`), ganti semua kemunculan
`https://welzeen.dev` di file `index.html`, `portfolio.html`, `links.html`, `robots.txt`,
dan `sitemap.xml` dengan domain asli kamu.

**Kalau mau ganti gambar preview (og-image):**
1. Edit `assets/icons/og-source.svg` (ukurannya 1200×630, sesuaikan teks/warna).
2. Convert ke PNG pakai tool online seperti [cloudconvert.com](https://cloudconvert.com/svg-to-png), atau kalau punya Python:
   ```
   pip install cairosvg
   python3 -c "import cairosvg; cairosvg.svg2png(url='assets/icons/og-source.svg', write_to='assets/icons/og-image.png', output_width=1200, output_height=630)"
   ```

Selamat berkarya! 🚀
