# Portfolio Website — Cara Pakai

Website ini terdiri dari 2 halaman:
- `index.html` — galeri project (web, app, dll)
- `links.html` — halaman kumpulan link gaya "linktree"

Sekarang tampilannya **3D & immersive**:
- Background jaringan partikel 3D yang bergerak mengikuti mouse dan scroll (dibuat pakai Three.js).
- Kartu project bisa "dimiringkan" (3D tilt) dengan efek spotlight mengikuti kursor.
- Elemen muncul dengan animasi saat di-scroll ke viewport.
- Tombol di halaman Links punya efek "magnetic" — sedikit tertarik ke arah kursor.
- Semua animasi otomatis mati kalau browser/OS user mengaktifkan "reduce motion", dan tilt/magnetic otomatis nonaktif di HP/tablet (supaya tetap nyaman disentuh).

> Catatan: efek 3D butuh koneksi internet aktif karena library Three.js dimuat dari CDN
> (`cdnjs.cloudflare.com`). Kalau nanti mau offline penuh, tinggal download file
> `three.min.js` dan taruh lokal, lalu ganti path `<script src="...">` di `index.html`
> dan `links.html`.

## 1. Buka di browser
Cukup buka file `index.html` dua kali klik, langsung tampil di browser.
Tidak perlu install apa-apa.

## 2. Tambah foto profil di halaman utama (hero)
1. Simpan foto kamu (disarankan persegi, minimal 336×336 px) ke folder `assets/`, misal `assets/foto-profil.jpg`.
2. Buka `index.html`, cari bagian `<div class="hero-photo">`.
3. Hapus tanda komentar pada baris:
   ```html
   <!-- <img src="assets/foto-profil.jpg" alt="Foto Welzeen"> -->
   ```
   jadi:
   ```html
   <img src="assets/foto-profil.jpg" alt="Foto Welzeen">
   ```
4. Teks "foto profil 168×168" di bawahnya boleh dihapus setelah foto terpasang.

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
2. Buka `index.html` pakai text editor (Notepad, VS Code, dll).
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
Masih di `index.html`, tiap kartu punya bagian:
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

## 8. Ganti nama & warna
- Nama kamu ada di beberapa tempat: `<div class="brand">`, `<h1>` di hero, dan `links.html`. Cari-ganti "Nama Kamu" / "nama-kamu.dev".
- Warna aksen (kuning amber) bisa diganti di `style.css`, cari variabel `--accent` di bagian paling atas file.

## 9. Upload online (opsional)
Kalau mau online, cara termudah gratis:
- **Netlify Drop** (netlify.com/drop) — tinggal drag & drop folder ini.
- **GitHub Pages** — push folder ini ke repository GitHub, aktifkan Pages di Settings.
- **Vercel** — import folder/project ini lewat vercel.com.

## 10. Kustomisasi efek 3D (opsional)
Buka `script.js`, semua variabel yang bisa diutak-atik ada komentarnya:
- `PARTICLE_COUNT` — jumlah titik di background (lebih banyak = lebih ramai, tapi lebih berat).
- `pointsMat` warna `0xF2B84B` — warna titik partikel.
- `lineMat` warna `0x5FD3A3` — warna garis penghubung.
- `strength` di `initCardTilt()` — seberapa besar kemiringan kartu (derajat).
- `pull` di `initMagnetic()` — seberapa jauh tombol link tertarik ke kursor (px).

Selamat berkarya! 🚀
