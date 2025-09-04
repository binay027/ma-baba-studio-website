document.addEventListener('DOMContentLoaded', function() {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // --- Custom Cursor (Optimized) ---
    const cursorGlow = document.getElementById('cursor-glow');
    let mouse = { x: 0, y: 0 };
    let previousMouse = { x: 0, y: 0 }
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    const tick = () => {
        if (previousMouse.x !== mouse.x || previousMouse.y !== mouse.y) {
            cursorGlow.style.left = `${mouse.x}px`;
            cursorGlow.style.top = `${mouse.y}px`;
            previousMouse.x = mouse.x;
            previousMouse.y = mouse.y;
        }
        requestAnimationFrame(tick);
    }
    tick();

    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const words = ["Ma-Baba Studio", "ডিজাইন ও প্রিন্টিং", "আপনার ভাবনার প্রকাশ"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typingSpeed);
        }
        type();
    }

    // --- Initialize Vanilla Tilt for 3D effect ---
    VanillaTilt.init(document.querySelectorAll(".portfolio-item, .service-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // --- Mobile Menu, Scrolling, etc. ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(!mobileMenu.classList.contains('hidden')){
               mobileMenu.classList.add('hidden');
            }
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Portfolio Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                    item.style.display = 'block';
                } else {
                   item.style.transform = 'scale(0.9)';
                   item.style.opacity = '0';
                   setTimeout(() => {
                    item.style.display = 'none';
                   }, 300)
                }
            });
        });
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('#home .slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }, 5000);

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, {
        threshold: 0.1 
    });

    const hiddenSections = document.querySelectorAll('.hidden-section');
    hiddenSections.forEach((section) => observer.observe(section));

    // --- Portfolio Modal Logic ---
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Updated to handle clicks on the portfolio item itself, not just the image
    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            const imgSrc = item.querySelector('img').getAttribute('src');
            modalImg.setAttribute('src', imgSrc);
            modal.classList.remove('hidden');
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { 
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    // --- NEW: Particles.js Initialization ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff00ff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ff00ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }

});

