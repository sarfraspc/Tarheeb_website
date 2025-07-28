// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will contact you within 24 hours.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add active state to navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 60, 114, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }
});

// Pricing card click handlers
document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const packageName = card.querySelector('.pricing-header h3').textContent;
        const price = card.querySelector('.pricing-price').textContent;
        
        alert(`You selected the ${packageName} for ${price}. Please contact us to proceed with your application.`);
        
        // Scroll to contact section
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some interactive elements
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Remove floating animation from stats

// Counter animation for stats

// Animate counters when they come into view

document.querySelectorAll('.stat-item').forEach(item => {
});
document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP is loaded: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    // And if using scroll-triggered: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    
    gsap.registerPlugin(ScrollTrigger); // Register if using ScrollTrigger

    const animationCanvas = document.getElementById('tarheeb-animation-canvas');
    const animationStages = document.querySelectorAll('.animation-stage');

    // Option 1: Scroll-triggered animation (recommended for "About" section)
    // The animation progresses as the user scrolls through the 'about' section.
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about", // The section that triggers the animation
            start: "top center", // When the top of #about hits the center of the viewport
            end: "bottom center", // When the bottom of #about leaves the center of the viewport
            scrub: 1, // Smoothly link animation to scroll position
            pin: true, // Optionally pin the section while animation plays
            // markers: true // For debugging ScrollTrigger setup
        }
    });

    // --- Animation Timeline Definition (using GSAP) ---
    // Each 'stage' is a part of the overall animation.

    // Stage 0: Initial state (optional, if elements start off-screen/hidden)
    gsap.set(animationStages, { opacity: 0, scale: 0.8 }); // All stages start hidden and slightly scaled down

    // Stage 1: Intro - Dubai's Most Trusted Partner
    tl.to("#stage-intro", { opacity: 1, scale: 1, duration: 1 })
      .to("#stage-intro .icon-globe", { rotation: 360, duration: 2, ease: "none", repeat: -1 }, "<") // Animate globe continuously
      .to("#stage-intro", { opacity: 0, scale: 0.8, duration: 0.5, delay: 2 }) // Fade out intro stage

    // Stage 2: Experience - 12+ Years of Excellence
    .to("#stage-experience", { opacity: 1, scale: 1, duration: 1 })
      .fromTo("#stage-experience .number", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }, "<0.2") // Stagger number/text reveal
      .to("#stage-experience", { opacity: 0, scale: 0.8, duration: 0.5, delay: 2 })

    // Stage 3: Services - Visa, Passport, Attestation
    .to("#stage-services", { opacity: 1, scale: 1, duration: 1 })
      .from("#stage-services .service-item", { x: -50, opacity: 0, stagger: 0.3, duration: 0.8 }, "<0.2")
      .to("#stage-services", { opacity: 0, scale: 0.8, duration: 0.5, delay: 2 })

    // Stage 4: Process - Smooth, Efficient, Transparent
    .to("#stage-process", { opacity: 1, scale: 1, duration: 1 })
      .fromTo("#stage-process .icon-flow", { strokeDashoffset: "100%" }, { strokeDashoffset: "0%", duration: 1.5, ease: "power1.inOut" }, "<0.2") // Assuming icon-flow is an SVG path
      .to("#stage-process", { opacity: 0, scale: 0.8, duration: 0.5, delay: 2 })

    // Stage 5: Results - 100% Success, Guaranteed
    .to("#stage-results", { opacity: 1, scale: 1, duration: 1 })
      .from("#stage-results .icon-check", { scale: 0, ease: "back.out(1.7)", duration: 0.8 }, "<0.2")
      .to("#stage-results", { opacity: 0, scale: 0.8, duration: 0.5, delay: 2 })

    // Stage 6: Why Choose Us - Key Benefits
    .to("#stage-why-us", { opacity: 1, scale: 1, duration: 1 })
      .from("#stage-why-us li", { x: -30, opacity: 0, stagger: 0.2, duration: 0.6 }, "<0.2")
      .to("#stage-why-us", { opacity: 0, scale: 0.8, duration: 0.5, delay: 3 }) // Longer delay for reading benefits

    // Stage 7: Client Count - 5000+ Happy Clients (Optional if already in about-text)
    // If you keep the stats in about-text, you might omit this stage or make it a concluding flourish.
    .to("#stage-client-count", { opacity: 1, scale: 1, duration: 1 })
      .from("#stage-client-count .number", { innerHTML: "0+", duration: 2, ease: "power1.out", snap: "innerHTML" }, "<0.2") // Counting animation
      .to("#stage-client-count", { opacity: 0, scale: 0.8, duration: 0.5, delay: 1 });


    // Option 2: Timed/Sequential animation (if not scroll-triggered)
    // This would run automatically once the section is in view, or on click.
    // Replace the ScrollTrigger timeline above with:
    /*
    const tlTimed = gsap.timeline({ paused: true }); // Start paused
    tlTimed.to(...); // Define the same animation sequence as above
    
    // Then, trigger it when the about section comes into view (using Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !tlTimed.isActive() && tlTimed.progress() === 0) {
                tlTimed.play();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);
    */
});
 // Header scroll effect
 window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const header = document.querySelector('header');
if (navToggle && header) {
    navToggle.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });
}
// Add interactive cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    document.querySelectorAll('a, button, .service-card, .pricing-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});
