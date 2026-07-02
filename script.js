'use strict';

/* ============================================
   CONFIG
   ============================================ */
// Añade aquí los nombres de las capturas del bot (colócalas en la carpeta /images).
// Ejemplo: const GALLERY_IMAGES = ['bot-1.png', 'bot-2.png', 'bot-3.png'];
const GALLERY_IMAGES = [];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const isMobile = window.innerWidth < 768;

/* ============================================
   LOADER
   ============================================ */
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('hidden');
    document.body.classList.add('loaded');
}
window.addEventListener('load', () => setTimeout(hideLoader, 500));
// Failsafe por si el evento load tarda demasiado.
setTimeout(hideLoader, 4000);

/* ============================================
   CURSOR PREMIUM (dot + ring magnético)
   ============================================ */
(function initCursor() {
    if (isTouch || prefersReducedMotion) return;
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    document.body.classList.add('cursor-active');

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    function render() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(render);
    }
    render();

    const interactive = document.querySelectorAll('a, button, [data-cursor], .tilt, input, textarea, select');
    interactive.forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    window.addEventListener('mousedown', () => ring.classList.add('click'));
    window.addEventListener('mouseup', () => ring.classList.remove('click'));
})();

/* ============================================
   FONDO ANIMADO — partículas + líneas + hexágonos + código
   ============================================ */
(function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, dpr;
    let particles = [], hexes = [], glyphs = [];
    let mouse = { x: -9999, y: -9999 };
    let parallax = { x: 0, y: 0 };

    const PALETTE = ['#6d5efc', '#22d3ee', '#a855f7', '#5865F2'];
    const CODE = '01{}</>=;()[]#$_ABCDEF';

    function count(base) {
        if (prefersReducedMotion) return Math.round(base * 0.4);
        if (isMobile) return Math.round(base * 0.45);
        return base;
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function build() {
        particles = [];
        const n = count(80);
        for (let i = 0; i < n; i++) {
            particles.push({
                x: Math.random() * W, y: Math.random() * H,
                vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
                r: rand(1, 2.4), c: PALETTE[(Math.random() * PALETTE.length) | 0],
                a: rand(0.25, 0.7)
            });
        }
        hexes = [];
        const hn = count(9);
        for (let i = 0; i < hn; i++) {
            hexes.push({
                x: Math.random() * W, y: Math.random() * H,
                size: rand(22, 60), rot: rand(0, Math.PI), vr: rand(-0.003, 0.003),
                vy: rand(-0.18, -0.05), a: rand(0.05, 0.14),
                c: PALETTE[(Math.random() * PALETTE.length) | 0]
            });
        }
        glyphs = [];
        const gn = count(18);
        for (let i = 0; i < gn; i++) {
            glyphs.push({
                x: Math.random() * W, y: Math.random() * H,
                vy: rand(0.25, 0.7), ch: CODE[(Math.random() * CODE.length) | 0],
                size: rand(10, 16), a: rand(0.05, 0.18)
            });
        }
    }

    function drawHex(h) {
        ctx.save();
        ctx.translate(h.x + parallax.x * 0.4, h.y + parallax.y * 0.4);
        ctx.rotate(h.rot);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const ang = (Math.PI / 3) * i;
            const px = Math.cos(ang) * h.size, py = Math.sin(ang) * h.size;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = h.c; ctx.globalAlpha = h.a; ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
    }

    function step() {
        ctx.clearRect(0, 0, W, H);

        // Hexágonos flotantes (cubos tecnológicos)
        hexes.forEach((h) => {
            h.y += h.vy; h.rot += h.vr;
            if (h.y + h.size < 0) { h.y = H + h.size; h.x = Math.random() * W; }
            drawHex(h);
        });

        // Código cayendo
        ctx.font = "14px 'JetBrains Mono', monospace";
        glyphs.forEach((g) => {
            g.y += g.vy;
            if (g.y > H + 20) { g.y = -20; g.x = Math.random() * W; g.ch = CODE[(Math.random() * CODE.length) | 0]; }
            ctx.globalAlpha = g.a; ctx.fillStyle = '#22d3ee';
            ctx.fillText(g.ch, g.x + parallax.x * 0.2, g.y);
        });

        // Partículas + líneas conectadas
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            const px = p.x + parallax.x, py = p.y + parallax.y;
            ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
            ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x, dy = p.y - q.y;
                const dist = dx * dx + dy * dy;
                if (dist < 16000) {
                    ctx.globalAlpha = (1 - dist / 16000) * 0.18;
                    ctx.strokeStyle = '#6d5efc'; ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(q.x + parallax.x, q.y + parallax.y);
                    ctx.stroke();
                }
            }

            // Enlace con el ratón
            if (!isTouch) {
                const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
                const md = mdx * mdx + mdy * mdy;
                if (md < 22000) {
                    ctx.globalAlpha = (1 - md / 22000) * 0.35;
                    ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(step);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX; mouse.y = e.clientY;
        parallax.x = (e.clientX / W - 0.5) * 24;
        parallax.y = (e.clientY / H - 0.5) * 24;
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    resize();
    step();
})();

/* ============================================
   TYPING ANIMATION
   ============================================ */
(function initTyping() {
    const el = document.querySelector('.typing-text');
    if (!el) return;
    const phrases = [
        'Discord Developer',
        'Minecraft Developer',
        'Network Developer',
        'Backend Developer',
        'Bot Developer',
        'Full Stack Developer'
    ];
    let pi = 0, ci = 0, deleting = false;

    function tick() {
        const phrase = phrases[pi];
        el.textContent = phrase.substring(0, deleting ? ci - 1 : ci + 1);
        ci += deleting ? -1 : 1;
        let speed = deleting ? 45 : 90;
        if (!deleting && ci === phrase.length) { deleting = true; speed = 1800; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; speed = 400; }
        setTimeout(tick, speed);
    }
    setTimeout(tick, 900);
})();

/* ============================================
   NAVBAR
   ============================================ */
(function initNav() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    const onScroll = () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
    links.forEach((l) => l.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
    }));

    // Scrollspy
    const sections = [...document.querySelectorAll('section[id]')];
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const id = e.target.id;
                links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
})();

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    });
});

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
(function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (prefersReducedMotion) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e, idx) => {
            if (e.isIntersecting) {
                const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains('reveal'));
                const i = siblings.indexOf(e.target);
                e.target.style.transitionDelay = Math.min(i, 8) * 0.06 + 's';
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
})();

/* ============================================
   CONTADORES (stats)
   ============================================ */
(function initCounters() {
    const nums = document.querySelectorAll('.stat-number[data-count]');
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const dur = 1400; const start = performance.now();
            function frame(now) {
                const t = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
                if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
})();

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
(function initMagnetic() {
    if (isTouch || prefersReducedMotion) return;
    document.querySelectorAll('.btn, .nav-cta, .back-to-top').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const mx = e.clientX - r.left - r.width / 2;
            const my = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
            el.style.setProperty('--rx', ((e.clientX - r.left) / r.width * 100) + '%');
            el.style.setProperty('--ry', ((e.clientY - r.top) / r.height * 100) + '%');
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
})();

/* ============================================
   TILT CARDS (3D)
   ============================================ */
(function initTilt() {
    if (isTouch || prefersReducedMotion) return;
    document.querySelectorAll('.tilt').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
})();

/* ============================================
   TOAST
   ============================================ */
let toastTimer;
function showToast(text) {
    const toast = document.getElementById('toast');
    const label = document.getElementById('toast-text');
    if (!toast) return;
    if (label && text) label.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ============================================
   COPIAR DISCORD
   ============================================ */
(function initDiscordCopy() {
    const buttons = document.querySelectorAll('[data-user]');
    buttons.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const user = btn.dataset.user;
            try {
                await navigator.clipboard.writeText(user);
            } catch (_) {
                const ta = document.createElement('textarea');
                ta.value = user; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); } catch (e) {}
                document.body.removeChild(ta);
            }
            showToast('Usuario copiado');
        });
    });
})();

/* ============================================
   GALERÍA + LIGHTBOX
   ============================================ */
(function initGallery() {
    const grid = document.getElementById('gallery-grid');
    const hint = document.getElementById('gallery-hint');
    if (!grid) return;

    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    let current = 0;

    if (GALLERY_IMAGES.length) {
        if (hint) hint.classList.add('hidden');
        GALLERY_IMAGES.forEach((src, i) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            item.innerHTML = `<img src="images/${src}" alt="Captura del bot MineLoon ${i + 1}" loading="eager">
                <div class="gallery-overlay"><i class="fas fa-magnifying-glass-plus"></i></div>`;
            item.addEventListener('click', () => openLightbox(i));
            grid.appendChild(item);
        });
    } else {
        const labels = ['Comandos', 'Moderación', 'Economía', 'Panel'];
        labels.forEach((label) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            item.innerHTML = `<div class="gallery-placeholder"><i class="fas fa-image"></i><span>${label}</span></div>`;
            grid.appendChild(item);
        });
    }

    function openLightbox(i) {
        if (!GALLERY_IMAGES.length) return;
        current = i;
        lbImg.src = `images/${GALLERY_IMAGES[current]}`;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    }
    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
    }
    function nav(dir) {
        current = (current + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
        lbImg.src = `images/${GALLERY_IMAGES[current]}`;
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => nav(-1));
    if (lbNext) lbNext.addEventListener('click', () => nav(1));
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') nav(-1);
        if (e.key === 'ArrowRight') nav(1);
    });

    // Re-observa los nuevos .reveal creados dinámicamente
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    grid.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();

/* ============================================
   BACK TO TOP
   ============================================ */
(function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ============================================
   GSAP — flourishes extra (si está disponible)
   ============================================ */
(function initGsap() {
    if (typeof gsap === 'undefined' || prefersReducedMotion) return;
    if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-name', { opacity: 0, y: 40, scale: 0.94, duration: 1, delay: 0.6, ease: 'power3.out' });
    gsap.from('.navbar', { y: -60, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' });
})();
