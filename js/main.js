// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// ========================================
// Navigation
// ========================================

// Scroll effect for navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ========================================
// Project Filters
// ========================================

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========================================
// Smooth Scroll
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Contact Form
// ========================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Log form data (replace with actual form submission)
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = 'var(--success)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
});

// ========================================
// Typing Effect for Code Window
// ========================================

const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;
    
    // Optional: Add typing animation on page load
    // Uncomment below for typing effect
    /*
    codeContent.innerHTML = '';
    let i = 0;
    const typeWriter = () => {
        if (i < originalHTML.length) {
            codeContent.innerHTML += originalHTML.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    setTimeout(typeWriter, 1000);
    */
}

// ========================================
// Parallax Effect on Hero
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const parallaxElements = hero.querySelectorAll('.hero-text, .hero-visual');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
});

// ========================================
// Stats Counter Animation
// ========================================

const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
};

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// Performance: Lazy load images if any
// ========================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Console Easter Egg
// ========================================

console.log('%c Welcome to my portfolio! 🚀', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c Built with vanilla HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 14px;');
console.log('%c Check out my projects at https://jmrcycling.com', 'color: #a855f7; font-size: 14px;');

// ========================================
// Demo Modal System
// ========================================

const demoConfig = {
    'kor-website': {
        title: 'KOR Website Demo',
        url: 'https://jmrcycling.com',
        sandbox: 'allow-scripts allow-same-origin allow-popups allow-forms'
    },
    'route-optimizer': {
        title: 'Route Optimizer Demo',
        url: 'demos/route-optimizer/index.html',
        sandbox: 'allow-scripts allow-same-origin allow-popups'
    },
    'stauffer': {
        title: 'Stauffer Landscaping Demo',
        url: 'https://jmrcycling.github.io/StaufferLandscaping/',
        sandbox: 'allow-scripts allow-same-origin allow-popups allow-forms'
    }
};

const demoModal = document.getElementById('demo-modal');
const demoModalBackdrop = document.getElementById('demo-modal-backdrop');
const demoModalClose = document.getElementById('demo-modal-close');
const demoModalTitle = document.getElementById('demo-modal-title');
const demoModalBody = document.getElementById('demo-modal-body');
const demoLoading = document.getElementById('demo-loading');

function openDemoModal(demoId) {
    const config = demoConfig[demoId];
    if (!config) {
        console.warn(`Demo config not found for: ${demoId}`);
        return;
    }
    
    // Update title
    demoModalTitle.textContent = config.title;
    
    // Show loading
    demoLoading.classList.remove('hidden');
    
    // Remove any existing iframe
    const existingIframe = demoModalBody.querySelector('iframe');
    if (existingIframe) {
        existingIframe.remove();
    }
    
    // Create and inject iframe
    const iframe = document.createElement('iframe');
    iframe.src = config.url;
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('sandbox', config.sandbox);
    iframe.setAttribute('title', config.title);
    
    // Hide loading when iframe loads
    iframe.addEventListener('load', () => {
        demoLoading.classList.add('hidden');
    });
    
    demoModalBody.appendChild(iframe);
    
    // Show modal
    demoModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus close button for accessibility
    demoModalClose.focus();
}

function closeDemoModal() {
    demoModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Remove iframe after animation
    setTimeout(() => {
        const iframe = demoModalBody.querySelector('iframe');
        if (iframe) {
            iframe.remove();
        }
        demoLoading.classList.remove('hidden');
    }, 300);
}

// Event listeners for demo buttons
document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const demoId = btn.dataset.demo;
        openDemoModal(demoId);
    });
});

// Close modal events
demoModalClose.addEventListener('click', closeDemoModal);
demoModalBackdrop.addEventListener('click', closeDemoModal);

// Update existing Escape key handler to also close demo modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        closeDemoModal();
    }
});
