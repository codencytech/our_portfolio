
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Codency - Initializing...');

    document.body.style.overflow = '';
    
    // FIRST: Initialize scroll (most important)
    initLocomotiveScroll();
    
    // THIRD: Initialize other components
    initParticles();
    initNavigation();
    initProjectFiltering();
    initContactForm();
    initStatsCounter();
    initCurrentYear();
    initVideoHover();
    initInteractiveElements();
    loadFeaturedProjects();
    
    // Force update after everything loads
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('scroll'));
    }, 1000);
});

// Initialize Locomotive Scroll
function initLocomotiveScroll() {

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768) {
        initNativeSmoothScroll();
        return;
    }

    if (typeof initLocomotiveScroll === 'undefined') {
        initNativeSmoothScroll();
        return;
    }

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) {
        console.warn('Scroll container missing — falling back');
        initNativeSmoothScroll();
        return;
    }

    // Destroy existing instance safely
    if (scrollInstance) {
        scrollInstance.destroy();
        scrollInstance = null;
    }

    scrollInstance = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 0.8,
        lerp: 0.1,
        smartphone: { smooth: false },
        tablet: { smooth: false }
    });

    window.addEventListener('resize', () => scrollInstance.update());
    window.addEventListener('load', () => setTimeout(() => scrollInstance.update(), 500));
}


function initNativeSmoothScroll() {
    // Enable smooth scroll CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 100; // Adjust based on your header height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(el => {
        observer.observe(el);
    });
    
    console.log('Native smooth scroll initialized');
}

// Particle Background Effect
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(0) translateX(20px);
            }
            75% {
                transform: translateY(20px) translateX(10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Navigation Functionality
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Simple scroll reveal animations
    const elementsToAnimate = document.querySelectorAll('[data-scroll], .service-card, .project-card, .team-member');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elementsToAnimate.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe element
        scrollObserver.observe(el);
        
        // Add class for when animation completes
        el.addEventListener('transitionend', () => {
            el.classList.add('animation-complete');
        });
    });
}

// Project Filtering for Featured Projects
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                projectType: document.getElementById('projectType').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Set Current Year in Footer
function initCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Video Hover Effects
function initVideoHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const video = card.querySelector('.project-video');
        const thumbnail = card.querySelector('.project-thumbnail');
        
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video autoplay prevented:', e));
            });
            
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

// Interactive Elements Animation
function initInteractiveElements() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
    
    // Add parallax effect to decoration items
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const decorationItems = document.querySelectorAll('.decoration-item');
        
        decorationItems.forEach((item, index) => {
            const speed = parseFloat(item.getAttribute('data-scroll-speed') || 1);
            const yPos = -(scrolled * speed * 0.1);
            item.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Load Featured Projects
function loadFeaturedProjects() {
    const featuredContainer = document.getElementById('featuredProjects');
    const projectCountElement = document.getElementById('projectCount');
    
    if (!featuredContainer) return;
    
    // Get featured projects (first 6)
    const featuredProjects = projects.filter(project => project.featured).slice(0, 6);
    
    // Update project count
    if (projectCountElement) {
        projectCountElement.textContent = projects.length;
    }
    
    // Clear container
    featuredContainer.innerHTML = '';
    
    // Add featured projects
    featuredProjects.forEach(project => {
        const projectCard = createProjectCard(project, false);
        featuredContainer.appendChild(projectCard);
    });
    
    // Reinitialize video hover
    initVideoHover();
}

// Create Project Card Element
function createProjectCard(project, isLarge = false) {
    const card = document.createElement('div');
    card.className = `project-card ${isLarge ? 'project-card-large' : ''}`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-scroll', '');
    card.setAttribute('data-scroll-speed', '0.5');
    
    // Create tech tags HTML
    const techTags = project.tech.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    // Video or thumbnail
    const mediaContent = project.video ? 
        `<video class="project-video" loop muted playsinline>
            <source src="${project.video}" type="video/mp4">
        </video>
        <div class="project-play">
            <i class="fas fa-play"></i>
        </div>` :
        '';
    
    card.innerHTML = `
        <div class="project-media">
            <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
            ${mediaContent}
        </div>
        <div class="project-content">
            <span class="project-category">${project.categoryName}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
            <a href="#" class="project-link">View Case Study <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return card;
}

// Add Notification Styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s ease;
        max-width: 400px;
        border-left: 4px solid var(--primary);
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification-success {
        border-left-color: var(--success);
    }
    
    .notification-error {
        border-left-color: var(--secondary);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
    
    .notification-success .notification-content i {
        color: var(--success);
    }
    
    .notification-error .notification-content i {
        color: var(--secondary);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-dark);
        cursor: pointer;
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .notification-close:hover {
        color: var(--dark);
    }
`;
document.head.appendChild(notificationStyles);