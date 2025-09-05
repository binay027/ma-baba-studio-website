document.addEventListener('DOMContentLoaded', function() {

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });
    
    // Custom Cursor
    const cursorGlow = document.getElementById('cursor-glow');
    let mouse = { x: 0, y: 0 }, previousMouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    const tick = () => {
        if (previousMouse.x !== mouse.x || previousMouse.y !== mouse.y) {
            cursorGlow.style.left = `${mouse.x}px`;
            cursorGlow.style.top = `${mouse.y}px`;
            previousMouse = { ...mouse };
        }
        requestAnimationFrame(tick);
    }
    tick();

    // Typing Effect
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const words = ["আপনার ভাবনার শৈল্পিক প্রকাশ", "ডিজাইন ও প্রিন্টিং সলিউশন"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            typingTextElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, isDeleting ? 100 : 150);
        }
        type();
    }

    // Vanilla Tilt
    VanillaTilt.init(document.querySelectorAll(".tilt-element"), { max: 10, speed: 400, glare: true, "max-glare": 0.2 });

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show-section');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden-section').forEach(section => observer.observe(section));

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                item.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
            });
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('hidden', window.pageYOffset <= 300);
    });
    
    // Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {"particles":{"number":{"value":50,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.7,"random":true},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3,"direction":"none","out_mode":"out"}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"}}},"retina_detect":true});
    }
    
    // Scroll Progress Bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    });
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = 'Sending message...';
            setTimeout(() => {
                formStatus.innerHTML = '<span class="text-green-500">Message sent successfully! Thank you.</span>';
                contactForm.reset();
                setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
            }, 1500);
        });
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    if (testimonialSlides.length > 0) {
        let currentTestimonial = 0;
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');
        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if(dots[i]) dots[i].classList.remove('active');
            });
            testimonialSlides[index].classList.add('active');
            if(dots[index]) dots[index].classList.add('active');
            currentTestimonial = index;
        }
        setInterval(() => { showTestimonial((currentTestimonial + 1) % testimonialSlides.length); }, 7000);
        showTestimonial(0);
    }
});

