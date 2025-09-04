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
    
    // --- Particles.js Initialization ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ff00ff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ff00ff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } } },
            "retina_detect": true
        });
    }
    
    // --- NEW: Scroll Progress Bar ---
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    });

    // --- NEW: Magnetic Buttons ---
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0,0)';
        });
    });

    // --- NEW: Sound Effects on Hover ---
    const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 }
    }).toDestination();
    
    const playSound = () => {
        if (Tone.context.state !== 'running') {
            Tone.start();
        }
        synth.triggerAttackRelease("C5", "8n");
    };

    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', playSound);
    });

});

