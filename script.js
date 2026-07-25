/* =========================================================
   PORTFOLIO — interaksi & 3D
   Semua efek otomatis nonaktif kalau user set
   "prefers-reduced-motion: reduce" di OS/browsernya.
   ========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches; // HP/tablet

/* ---------------------------------------------------------
   1) BACKGROUND 3D — jaringan partikel yang mengikuti
      pergerakan mouse & scroll (dibuat pakai Three.js)
   --------------------------------------------------------- */
function initBackground(){
  const canvas = document.getElementById('webgl-bg');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 26;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Grup yang menampung semua partikel — di-rotate perlahan & di-tilt oleh mouse
  const group = new THREE.Group();
  scene.add(group);

  const PARTICLE_COUNT = isCoarsePointer ? 90 : 180;
  const RANGE = 22;
  const positions = [];

  for (let i = 0; i < PARTICLE_COUNT; i++){
    positions.push(
      (Math.random() - 0.5) * RANGE * 2,
      (Math.random() - 0.5) * RANGE * 2,
      (Math.random() - 0.5) * RANGE * 2
    );
  }

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const pointsMat = new THREE.PointsMaterial({
    color: 0xF2B84B,
    size: 0.16,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  group.add(points);

  // Garis penghubung antar partikel yang berdekatan — dihitung sekali saat load
  const lineVertices = [];
  const THRESHOLD = 6.4;
  for (let i = 0; i < PARTICLE_COUNT; i++){
    for (let j = i + 1; j < PARTICLE_COUNT; j++){
      const dx = positions[i*3]   - positions[j*3];
      const dy = positions[i*3+1] - positions[j*3+1];
      const dz = positions[i*3+2] - positions[j*3+2];
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (dist < THRESHOLD){
        lineVertices.push(
          positions[i*3], positions[i*3+1], positions[i*3+2],
          positions[j*3], positions[j*3+1], positions[j*3+2]
        );
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x5FD3A3, transparent: true, opacity: 0.18 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // target rotation mengikuti mouse (parallax), di-lerp tiap frame biar halus
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  if (!isCoarsePointer){
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });
  }

  // scroll menggeser kamera sedikit ke depan — kesan "melayang" saat scroll
  let scrollFactor = 0;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollFactor = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    group.rotation.y = t * 0.03 + currentX;
    group.rotation.x = currentY * 0.6;

    camera.position.z = 26 - scrollFactor * 8;

    renderer.render(scene, camera);
  }

  if (reduceMotion){
    // render satu frame statis saja, tanpa loop animasi terus-menerus
    renderer.render(scene, camera);
  } else {
    animate();
  }
}

/* ---------------------------------------------------------
   2) TILT 3D + SPOTLIGHT pada kartu project
   --------------------------------------------------------- */
function initCardTilt(){
  if (reduceMotion || isCoarsePointer) return;

  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach((card) => {
    const strength = 8; // derajat maksimum kemiringan

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;

      const rotateY = (px - 0.5) * strength * 2;
      const rotateX = (0.5 - py) * strength * 2;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ---------------------------------------------------------
   3) SCROLL REVEAL — elemen muncul saat masuk viewport
   --------------------------------------------------------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)){
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   4) MAGNETIC BUTTON — link-row "tertarik" ke arah kursor
   --------------------------------------------------------- */
function initMagnetic(){
  if (reduceMotion || isCoarsePointer) return;

  const items = document.querySelectorAll('.magnetic');
  items.forEach((el) => {
    const pull = 14; // jarak maksimum pergeseran (px)

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate(${px * pull}px, ${py * pull}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/* ---------------------------------------------------------
   5) FILTER KATEGORI PROJECT — klik tab untuk menyaring kartu
   --------------------------------------------------------- */
function initFilters(){
  const tabs = document.querySelectorAll('.filter-tab');
  const grid = document.getElementById('project-grid');
  const countLabel = document.querySelector('.section-head .count');
  if (!tabs.length || !grid) return;

  const cards = grid.querySelectorAll('.card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (!reduceMotion) grid.classList.add('filtering');

      let visibleCount = 0;
      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !matches);
        if (matches){
          card.classList.add('in-view');
          visibleCount++;
        }
      });

      if (countLabel) countLabel.textContent = `${visibleCount} project ditampilkan`;

      window.setTimeout(() => grid.classList.remove('filtering'), 500);
    });
  });
}

/* ---------------------------------------------------------
   6) MENU HAMBURGER MOBILE — buka/tutup nav di layar kecil
   --------------------------------------------------------- */
function initMobileNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-header .nav');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!toggle || !nav) return;

  function closeMenu(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('is-open');
  }

  function openMenu(){
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('is-open');
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // tutup menu saat salah satu link diklik (biar nggak nyangkut kebuka pas pindah halaman)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // tutup menu saat klik backdrop gelap di belakangnya
  if (backdrop){
    backdrop.addEventListener('click', closeMenu);
  }

  // tutup menu dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // kalau layar di-resize jadi besar (misal rotate tablet), pastikan menu ketutup & reset
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

/* ---------------------------------------------------------
   Jalankan semua setelah DOM siap
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  initCardTilt();
  initScrollReveal();
  initMagnetic();
  initFilters();
  initMobileNav();
});
