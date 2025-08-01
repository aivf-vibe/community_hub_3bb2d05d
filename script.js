

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .executive-card, .insight-card, .event-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
            const suffix = target.replace(/[0-9]/g, '');
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);

    // Executive card hover effects
    const executiveCards = document.querySelectorAll('.executive-card');
    executiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(212, 175, 55, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form handling for access request
    const accessButtons = document.querySelectorAll('.btn-primary-large, .btn-primary');
    accessButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showAccessModal();
        });
    });

    // Create and show access request modal
    function showAccessModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--primary-color);
            border: 1px solid var(--border-color);
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="color: var(--gold-color); margin-bottom: 1rem;">Request Exclusive Access</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Thank you for your interest in Executive Circle. Membership is exclusively for Fortune 500 C-suite executives.
            </p>
            <form id="accessForm">
                <input type="email" placeholder="Corporate Email" required style="
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    background: var(--background-dark);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    color: var(--text-primary);
                ">
                <select required style="
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    background: var(--background-dark);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    color: var(--text-primary);
                ">
                    <option value="">Select Your Role</option>
                    <option value="ceo">Chief Executive Officer</option>
                    <option value="cfo">Chief Financial Officer</option>
                    <option value="coo">Chief Operating Officer</option>
                    <option value="cto">Chief Technology Officer</option>
                    <option value="cmo">Chief Marketing Officer</option>
                    <option value="other">Other C-Suite Role</option>
                </select>
                <input type="text" placeholder="Company Name" required style="
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1.5rem;
                    background: var(--background-dark);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    color: var(--text-primary);
                ">
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button type="submit" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--gold-color);
                        color: var(--primary-color);
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Submit Request</button>
                    <button type="button" class="close-modal" style="
                        padding: 0.75rem 1.5rem;
                        background: transparent;
                        color: var(--text-secondary);
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                </div>
            </form>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate modal appearance
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Form submission
        const form = modal.querySelector('#accessForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your access request has been submitted. Our team will verify your credentials and respond within 24-48 hours.');
            closeModal();
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Mobile menu toggle (for future mobile implementation)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const navContainer = document.querySelector('.nav-container');
            const hamburger = document.createElement('button');
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 1.5rem;
                cursor: pointer;
            `;
            
            hamburger.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--primary-color)';
                navMenu.style.padding = '1rem';
            });
            
            navContainer.appendChild(hamburger);
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading states
    const addLoadingStates = () => {
        const cards = document.querySelectorAll('.executive-card, .insight-card, .event-card');
        cards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
    };

    addLoadingStates();
});

// Performance optimization
window.addEventListener('load', function() {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Console welcome message
console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    Executive Circle - Fortune 500 C-Suite Network            ║
║    Version 1.0.0                                             ║
║    Built with ❤️ for Fortune 500 Leaders                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);

