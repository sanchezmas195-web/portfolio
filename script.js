// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 800);
});

// ============================================
// CURSOR PERSONALIZADO - DESACTIVADO PARA RENDIMIENTO
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
if (cursor) cursor.style.display = 'none';
if (cursorFollower) cursorFollower.style.display = 'none';

// Desactivar cursor personalizado en body
document.body.style.cursor = 'auto';

// ============================================
// GSAP ANIMATIONS SIMPLIFICADAS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Animación del Hero simplificada
gsap.from('.hero-badge', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    delay: 0.9,
    ease: 'power2.out'
});

gsap.from('.hero-greeting', {
    opacity: 0,
    x: -30,
    duration: 0.6,
    delay: 1.0,
    ease: 'power2.out'
});

gsap.from('.hero-name', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1.1,
    ease: 'power2.out'
});

gsap.from('.hero-typing-label', {
    opacity: 0,
    y: 10,
    duration: 0.5,
    delay: 1.3,
    ease: 'power2.out'
});

gsap.from('.hero-typing', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    delay: 1.4,
    ease: 'power2.out'
});

gsap.from('.hero-description', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1.5,
    ease: 'power2.out'
});

gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 15,
    duration: 0.5,
    stagger: 0.1,
    delay: 1.6,
    ease: 'power2.out'
});

// Animaciones de scroll simplificadas
gsap.from('.stat-card', {
    scrollTrigger: {
        trigger: '.stats',
        start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.about-card', {
    scrollTrigger: {
        trigger: '.about-cards',
        start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 85%',
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
});

gsap.from('.featured-project', {
    scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 85%',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.featured-feature', {
    scrollTrigger: {
        trigger: '.featured-features',
        start: 'top 85%',
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out'
});

gsap.from('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.tech-card', {
    scrollTrigger: {
        trigger: '.technologies',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    stagger: 0.05,
    ease: 'power2.out'
});

gsap.from('.tech-card.coming-soon', {
    scrollTrigger: {
        trigger: '.technologies',
        start: 'top 85%',
    },
    opacity: 0,
    x: 20,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out'
});

gsap.from('.social-card', {
    scrollTrigger: {
        trigger: '.social',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.server-card', {
    scrollTrigger: {
        trigger: '.servers',
        start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: 'power2.out'
});

gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 85%',
    },
    opacity: 0,
    x: -40,
    duration: 0.6,
    ease: 'power2.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 85%',
    },
    opacity: 0,
    x: 40,
    duration: 0.6,
    ease: 'power2.out'
});

gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Discord Developer',
    'Minecraft Developer',
    'Network Developer',
    'Bot Developer',
    'Web Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1200);

// ============================================
// FONDO DE PARTÍCULAS SIMPLIFICADO
// ============================================
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 40; // Reducido significativamente

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (window.innerWidth < 768) {
            particleCount = 20;
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = '#5865F2';
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// ============================================
// NAVEGACIÓN
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            submitBtn.style.background = 'var(--gradient-secondary)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ============================================
// SMOOTH SCROLL PARA ENLACES ANCLA
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
