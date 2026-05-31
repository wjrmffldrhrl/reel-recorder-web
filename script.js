// ============================
// Navigation scroll effect
// ============================
const nav = document.getElementById('nav');

function handleNavScroll() {
    if (window.scrollY > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ============================
// Scroll Reveal Animation
// ============================
function initScrollReveal() {
    const revealElements = [
        // Hero
        '.hero-badge',
        '.hero-title',
        '.hero-subtitle',
        '.hero-actions',
        '.hero-device',
        // Features
        '.section-header',
        '.feature-card',
        // Design
        '.design-showcase',
        '.design-detail-item',
        // Pro
        '.pro-card',
        // Download
        '.download-title',
        '.download-subtitle',
        '.download-badge-area',
        '.download-device-item',
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.setProperty('--stagger-index', i);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================
// Smooth scroll for anchor links
// ============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// ============================
// Feature cards tilt effect
// ============================
function initTiltEffect() {
    const cards = document.querySelectorAll('.feature-card, .design-detail-item, .pro-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================
// Parallax for hero device
// ============================
function initHeroParallax() {
    const device = document.querySelector('.hero-device');
    if (!device) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        if (scrolled < window.innerHeight) {
            device.style.transform = `translateY(${rate}px)`;
        }
    }, { passive: true });
}

// ============================
// Initialize
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initTiltEffect();
    initHeroParallax();
});
