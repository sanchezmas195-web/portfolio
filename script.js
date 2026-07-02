// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1500);
});

// ============================================
// CURSOR PERSONALIZADO MEJORADO
// ============================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Partículas del cursor
const cursorParticles = [];
const maxCursorParticles = 5;

class CursorParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.95;
    }

    draw() {
        if (this.life <= 0) return;
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            opacity: ${this.life};
            box-shadow: 0 0 10px var(--accent-color);
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 50);
    }
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crear partículas al mover
    if (Math.random() > 0.7) {
        cursorParticles.push(new CursorParticle(mouseX, mouseY));
    }
});

// Animación suave del cursor
function animateCursor() {
    // Cursor principal
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursor.style.left = cursorX - 4 + 'px';
    cursor.style.top = cursorY - 4 + 'px';
    
    // Cursor follower con glow
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';
    
    // Actualizar partículas
    for (let i = cursorParticles.length - 1; i >= 0; i--) {
        cursorParticles[i].update();
        cursorParticles[i].draw();
        
        if (cursorParticles[i].life <= 0) {
            cursorParticles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .service-card, .tech-card, .project-card, .social-card, .server-card, .about-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(2)';
        cursorFollower.style.borderColor = 'var(--accent-color)';
        cursorFollower.style.boxShadow = '0 0 20px var(--accent-color)';
        cursor.style.transform = 'scale(2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
        cursorFollower.style.boxShadow = 'none';
        cursor.style.transform = 'scale(1)';
    });
});

// ============================================
// GSAP ANIMATIONS MEJORADAS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Animación del Hero con diferentes efectos
gsap.from('.hero-badge', {
    opacity: 0,
    scale: 0.5,
    rotation: -10,
    duration: 1,
    delay: 1.5,
    ease: 'elastic.out(1, 0.5)'
});

gsap.from('.hero-greeting', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    delay: 1.7,
    ease: 'power3.out'
});

gsap.from('.hero-name', {
    opacity: 0,
    y: 100,
    scale: 0.8,
    duration: 1,
    delay: 1.9,
    ease: 'power4.out'
});

gsap.from('.hero-typing-label', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 2.1,
    ease: 'power2.out'
});

gsap.from('.hero-typing', {
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 2.2,
    ease: 'power3.out'
});

gsap.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 2.4,
    ease: 'power2.out'
});

gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 20,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.15,
    delay: 2.6,
    ease: 'back.out(1.7)'
});

gsap.from('.hero-scroll', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    delay: 3.2,
    ease: 'power2.inOut'
});

// Animación de estadísticas con zoom y rotate
gsap.from('.stat-card', {
    scrollTrigger: {
        trigger: '.stats',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0.5,
    rotation: 10,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
});

// Animación de servicios con slide desde diferentes direcciones
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top 80%',
    },
    opacity: 0,
    y: 80,
    rotationX: 45,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

// Animación de about cards con flip effect
gsap.from('.about-card', {
    scrollTrigger: {
        trigger: '.about-cards',
        start: 'top 85%',
    },
    opacity: 0,
    rotationY: 90,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Animación de timeline con slide
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
    },
    opacity: 0,
    x: -100,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Animación de proyecto destacado con parallax
gsap.from('.featured-project', {
    scrollTrigger: {
        trigger: '.featured-project',
        start: 'top 80%',
        scrub: 1,
    },
    opacity: 0,
    y: 100,
    scale: 0.95,
    duration: 1,
    ease: 'power2.out'
});

// Animación de características del proyecto
gsap.from('.featured-feature', {
    scrollTrigger: {
        trigger: '.featured-features',
        start: 'top 85%',
    },
    opacity: 0,
    x: -30,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out'
});

// Animación de galería con zoom
gsap.from('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0.3,
    rotation: 15,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
});

// Animación de proyectos con 3D effect
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
    },
    opacity: 0,
    y: 60,
    rotationZ: 5,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Animación de tecnologías con pop effect
gsap.from('.tech-card', {
    scrollTrigger: {
        trigger: '.technologies',
        start: 'top 85%',
    },
    opacity: 0,
    scale: 0,
    duration: 0.4,
    stagger: 0.03,
    ease: 'elastic.out(1, 0.5)'
});

// Animación de tecnologías "Próximamente"
gsap.from('.tech-card.coming-soon', {
    scrollTrigger: {
        trigger: '.technologies',
        start: 'top 75%',
    },
    opacity: 0,
    x: 50,
    duration: 0.6,
    stagger: 0.05,
    ease: 'power2.out'
});

// Animación de redes sociales con bounce
gsap.from('.social-card', {
    scrollTrigger: {
        trigger: '.social',
        start: 'top 80%',
    },
    opacity: 0,
    y: 100,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)'
});

// Animación de servidores con slide
gsap.from('.server-card', {
    scrollTrigger: {
        trigger: '.servers',
        start: 'top 80%',
    },
    opacity: 0,
    y: 80,
    rotationX: 30,
    duration: 0.8,
    ease: 'power3.out'
});

// Animación de contacto con split
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    opacity: 0,
    x: -80,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    opacity: 0,
    x: 80,
    duration: 0.8,
    ease: 'power3.out'
});

// Animación del footer
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
});

// Parallax effect en secciones
gsap.utils.toArray('section').forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        },
        y: 50,
        ease: 'none'
    });
});

// ============================================
// TYPING ANIMATION MEJORADO
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
        typingSpeed = 2500; // Pausa al completar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pausa antes de empezar nueva frase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Iniciar typing animation después del loader
setTimeout(typeEffect, 2500);

// ============================================
// FONDO TECNOLÓGICO MEJORADO
// ============================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particles = [];
let particleCount = 0;
let gridOffset = 0;

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Clase Partícula mejorada
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }

    getRandomColor() {
        const colors = ['#5865F2', '#7289DA', '#9B59B6', '#00D4FF', '#E91E63'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        // Rebotar en los bordes
        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }

        // Interacción con el mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
            const force = (200 - distance) / 200;
            this.x -= dx * force * 0.03;
            this.y -= dy * force * 0.03;
        }
    }

    draw() {
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.2;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, pulseOpacity));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

// Crear partículas
function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

createParticles();

// Dibujar grid futurista
function drawGrid() {
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(88, 101, 242, 0.03)';
    ctx.lineWidth = 1;

    // Líneas verticales
    for (let theX = gridOffset % gridSize; theX < canvas.width; theX += gridSize) {
        ctx.beginPath();
        ctx.moveTo(theX, 0);
        ctx.lineTo(theX, canvas.height);
        ctx.stroke();
    }

    // Líneas horizontales
    for (let theY = gridOffset % gridSize; theY < canvas.height; theY += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, theY);
        ctx.lineTo(canvas.width, theY);
        ctx.stroke();
    }

    gridOffset += 0.2;
}

// Dibujar líneas entre partículas cercanas
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.2;
                ctx.strokeStyle = `rgba(88, 101, 242, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Dibujar nodos de red
function drawNetworkNodes() {
    particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.3;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });
}

// Animar partículas
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    drawLines();
    drawNetworkNodes();
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Recrear partículas al redimensionar
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

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
// ANIMACIÓN DE ESTADÍSTICAS
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        if (!target) return;
        
        const targetNum = parseInt(target);
        const duration = 2000;
        const step = targetNum / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < targetNum) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = targetNum;
            }
        };

        updateCounter();
    });
}

// Observar sección de estadísticas
const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================
const backToTop = document.getElementById('back-to-top');

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

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animación del botón
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío
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

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrolled = window.scrollY;
    
    if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// ============================================
// ANIMACIÓN DE TARJETAS AL HOVER
// ============================================
document.querySelectorAll('.service-card, .project-card, .tech-card, .social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ============================================
// GALERÍA LIGHTBOX (SIMPLE)
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Aquí puedes implementar un lightbox completo
        // Por ahora, solo mostramos una alerta
        console.log('Imagen clickeada - Implementar lightbox');
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Bienvenido al portfolio de Arnau!', 'color: #5865F2; font-size: 24px; font-weight: bold; font-family: Inter, sans-serif;');
console.log('%cDiscord & Minecraft Developer', 'color: #9B59B6; font-size: 16px; font-family: Inter, sans-serif;');
console.log('%c¿Tienes un proyecto en mente? ¡Contáctame!', 'color: #00D4FF; font-size: 14px; font-family: Inter, sans-serif;');

// ============================================
// PREVENT CONTEXT MENU ON IMAGES (OPCIONAL)
// ============================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Reducir animaciones en dispositivos móviles
if (window.innerWidth < 768) {
    // Desactivar cursor personalizado en móvil
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    
    // Reducir número de partículas
    particleCount = Math.floor(particleCount / 2);
    createParticles();
}

// ============================================
// LAZY LOADING PARA IMÁGENES (CUANDO SE AÑADAN)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
