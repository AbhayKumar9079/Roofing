 // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show sticky CTA after scrolling
            const stickyCta = document.getElementById('sticky-cta');
            if (window.scrollY > 800) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });

        // Hero parallax effect
        let heroImg = document.getElementById('hero-img');
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            if (heroImg && scrolled < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
            }
        });

        // Scroll reveal animations for service cards
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });

        document.querySelectorAll('.process-step').forEach(step => {
            observer.observe(step);
        });

        // Animated counter for stats
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (target === 98 || target === 99 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (target === 98 || target === 99 ? '%' : '+');
                }
            }, 20);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const target = parseInt(number.getAttribute('data-target'));
                    animateCounter(number, target);
                    statsObserver.unobserve(number);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(stat => {
            statsObserver.observe(stat);
        });
// Before/After Slider
const baSliderLine = document.getElementById('ba-slider-line');
const baAfterOverlay = document.getElementById('ba-after-overlay');
const baSliderWrapper = document.querySelector('.ba-slider-wrapper');
const baAfterImg = document.querySelector('.ba-after-img');
let isDragging = false;

// Update slider position
function updateSliderPosition(clientX) {
    const rect = baSliderWrapper.getBoundingClientRect();
    let x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    // Limit between 0% and 100%
    percentage = Math.max(0, Math.min(100, percentage));
    
    baAfterOverlay.style.width = percentage + '%';
    baSliderLine.style.left = percentage + '%';
}

// Mouse events
baSliderLine.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        updateSliderPosition(e.clientX);
    }
});

// Touch events
baSliderLine.addEventListener('touchstart', () => {
    isDragging = true;
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        updateSliderPosition(e.touches[0].clientX);
    }
});

// Click anywhere to move slider
baSliderWrapper.addEventListener('click', (e) => {
    updateSliderPosition(e.clientX);
});

// Gallery images array
const galleryImages = [
    {
        before: 'images/after-1.jpg',
        after: 'images/before-1.png'
    },
    {
        before: 'images/after-2.jpg',
        after: 'images/before-2.png'
    },
    {
        before: 'images/after-3.jpg',
        after: 'images/before-3.png'
    }
];

// gallery image
function changeGalleryImage(index) {
    const beforeImg = document.getElementById('ba-before');
    const afterImg = document.getElementById('ba-after');
    const dots = document.querySelectorAll('.gallery-dot');
    
    //  images
    beforeImg.src = galleryImages[index].before;
    afterImg.src = galleryImages[index].after;
    
    //  active dot
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    //  slider
    baAfterOverlay.style.width = '50%';
    baSliderLine.style.left = '50%';
}

// Dots click event
document.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        changeGalleryImage(index);
    });
});

        // Testimonials carousel
        let currentTestimonial = 0;
        const testimonialsTrack = document.getElementById('testimonials-track');
        const totalTestimonials = document.querySelectorAll('.testimonial-card').length;

        function updateTestimonialPosition() {
            testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonialPosition();
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            updateTestimonialPosition();
        }

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 6000);

        // Modal functions
        function openModal() {
            document.getElementById('modal-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modal-overlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                closeModal();
            }
        });

        function submitForm(e) {
            e.preventDefault();
            alert('Thank you! Your estimate request has been submitted. We\'ll contact you within 24 hours.');
            closeModal();
            e.target.reset();
        }

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });