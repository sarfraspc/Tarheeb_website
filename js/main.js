          // Preloader
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 1000);
        });

        // Hero video auto-play and loop functionality
        const heroVideo = document.getElementById('heroVideo');
        if (heroVideo) {
            // Ensure video plays and loops continuously
            heroVideo.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
            });

            // Handle video loading and ensure it starts playing
            heroVideo.addEventListener('loadeddata', function() {
                this.play().catch(function(error) {
                    console.log('Video autoplay failed:', error);
                });
            });

            // Ensure video continues playing when page becomes visible
            document.addEventListener('visibilitychange', function() {
                if (!document.hidden && heroVideo.paused) {
                    heroVideo.play().catch(function(error) {
                        console.log('Video resume failed:', error);
                    });
                }
            });

            // Handle any play interruptions and restart
            heroVideo.addEventListener('pause', function() {
                if (!this.ended) {
                    setTimeout(() => {
                        this.play().catch(function(error) {
                            console.log('Video restart failed:', error);
                        });
                    }, 100);
                }
            });
        }

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const logo = document.querySelector('.header-container .logo img');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                logo.src = 'img/logo1.png';
            } else {
                header.classList.remove('scrolled');
                logo.src = 'img/logo2.png';
            }
            
            // Counting animation
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the #, the faster the count

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace('+', '').replace('%', '');
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        if (counter.getAttribute('data-target') === '100') {
                            counter.innerText = target + '%';
                        } else if (counter.getAttribute('data-target') === '5000') {
                            counter.innerText = target + '+';
                        } else if (counter.getAttribute('data-target') === '25') {
                            counter.innerText = target + '+';
                        } else {
                            counter.innerText = target;
                        }
                    }
                };
                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Back to top button
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        const floatingActionContainer = document.getElementById('floatingActionContainer');
    const backToTopBtn = document.getElementById('backToTop');
    const whatsappBtn = document.querySelector('.whatsapp-btn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                floatingActionContainer.querySelectorAll('.floating-btn').forEach(btn => {
                    btn.classList.add('visible');
                });
            } else {
                floatingActionContainer.querySelectorAll('.floating-btn').forEach(btn => {
                    btn.classList.remove('visible');
                });
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    alert('Thank you for your message! We will contact you within 24 hours.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            });
        }
        
        // Image carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Reset all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Set new active slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Auto rotate slides
        function autoRotateSlides() {
            let nextIndex = (currentSlide + 1) % totalSlides;
            showSlide(nextIndex);
        }
        
        // Set up event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Auto rotate slides every 5 seconds
        setInterval(autoRotateSlides, 5000);
        
        // Testimonial carousel functionality
        const testimonialSlides = document.querySelector('.testimonial-slides');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentTestimonial = 0;
        const totalTestimonials = testimonialDots.length;
        
        function showTestimonial(index) {
            testimonialSlides.style.transform = `translateX(-${index * 100}%)`;
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        });
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
        
        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }, 7000);
        
        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.service-card, .about-content, .contact-info, .contact-form, .stat-box, .testimonial');
            
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                
                // If element is in viewport
                if(position.top < window.innerHeight * 0.85 && position.bottom >= 0) {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }
            });
        };
        
        // Set initial state for animated elements
        document.querySelectorAll('.service-card, .about-content, .contact-info, .contact-form, .stat-box, .testimonial').forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
        // Trigger once on load
        window.addEventListener('load', animateOnScroll);
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const result = document.getElementById('form-result');
    result.style.display = 'block';
    result.innerHTML = 'Sending...';
    
    const formData = new FormData(this);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (response.status === 200) {
            result.innerHTML = 'Message sent successfully!';
            result.style.color = 'green';
            this.reset();
        } else {
            result.innerHTML = data.message || 'Something went wrong!';
            result.style.color = 'red';
        }
    } catch (error) {
        result.innerHTML = 'Error: Could not send message!';
        result.style.color = 'red';
        console.error('Error:', error);
    }
    
    setTimeout(() => {
        result.style.display = 'none';
    }, 5000);
});