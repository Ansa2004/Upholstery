// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initServicesTabs();
    initStatsAnimation();
    initIntersectionObserver();
    initHeroCTA();
    
    console.log('Elite Upholstery Studio website loaded successfully!');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Smooth Scrolling for Navigation Links - FIXED
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 70;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                console.log(`Scrolling to section: ${targetId}`);
            }
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Services Section Tabs - FIXED
function initServicesTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ensure default state
    const defaultTab = document.querySelector('.tab-btn[data-tab="repairing"]');
    const defaultContent = document.getElementById('repairing');
    
    if (defaultTab && defaultContent) {
        defaultTab.classList.add('active');
        defaultContent.classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            console.log(`Switching to tab: ${targetTab}`);

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Stats Counter Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;

    function animateStats() {
        if (animated) return;
        animated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number with appropriate suffix
                let displayValue = Math.floor(current);
                const originalText = stat.textContent;
                
                if (originalText.includes('%') || target === 98) {
                    displayValue += '%';
                } else if (target >= 1000) {
                    displayValue = displayValue.toLocaleString() + '+';
                } else if (target >= 20) {
                    displayValue += '+';
                }
                
                stat.textContent = displayValue;
            }, 20);
        });
    }

    // Trigger animation when stats section comes into view
    const statsSection = document.querySelector('.overview');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
}

// Hero CTA Button Functionality - FIXED
function initHeroCTA() {
    const heroCTA = document.querySelector('.hero-cta');
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                const navbarHeight = 70;
                const offsetTop = servicesSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                console.log('Hero CTA clicked - scrolling to services section');
            }
        });
    }
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .highlight-card,
        .testimonial-card,
        .option-card,
        .contact-item,
        .stat-card
    `);

    // Set initial styles and observe elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(element);
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Service Cards Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card, .highlight-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation support
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const debouncedScroll = debounce(function() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
}, 10);

// Touch Events for Mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Initialize loading state
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    
    // Verify all sections exist
    const sections = ['hero', 'overview', 'services', 'customization', 'highlights', 'about', 'contact'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`✓ Section found: ${sectionId}`);
        } else {
            console.warn(`✗ Section missing: ${sectionId}`);
        }
    });
    
    // Verify navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    console.log(`Found ${navLinks.length} navigation links`);
    
    // Verify tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    console.log(`Found ${tabButtons.length} tab buttons and ${tabContents.length} tab contents`);
});