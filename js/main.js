// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Mobile Menu Toggle
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Add active class to current navigation item
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function setActiveNavItem() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            let isValid = true;
            const errors = [];

            // Name validation
            if (!data.name || data.name.length < 2) {
                isValid = false;
                errors.push('Please enter a valid name');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email || !emailRegex.test(data.email)) {
                isValid = false;
                errors.push('Please enter a valid email address');
            }

            // Phone validation
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!data.phone || !phoneRegex.test(data.phone)) {
                isValid = false;
                errors.push('Please enter a valid phone number');
            }

            // Service validation
            if (!data.service) {
                isValid = false;
                errors.push('Please select a service');
            }

            // Message validation
            if (!data.message || data.message.length < 10) {
                isValid = false;
                errors.push('Please enter a message (minimum 10 characters)');
            }

            if (!isValid) {
                // Show errors
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
                
                const existingError = contactForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                contactForm.insertBefore(errorContainer, contactForm.firstChild);
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Here you would typically send the data to your server
                console.log('Form submitted:', data);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }

    // Add loading animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.service-card, .feature, .about-card, .team-member').forEach(element => {
        observer.observe(element);
    });
}); 