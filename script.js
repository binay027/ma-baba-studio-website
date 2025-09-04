document.addEventListener('DOMContentLoaded', function() {

    // --- NEW: Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // fade out duration
    });
    
    // --- NEW: Custom Cursor (Optimized for Performance) ---
    const cursorGlow = document.getElementById('cursor-glow');
    
    // Store the current mouse position
    let mouse = { x: 0, y: 0 };
    // Store the last position of the custom cursor
    let previousMouse = { x: 0, y: 0 }

    // Update mouse position on mousemove event
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // The main animation loop to update the cursor position
    const tick = () => {
        // Only update the position if the mouse has moved
        if (previousMouse.x !== mouse.x || previousMouse.y !== mouse.y) {
            cursorGlow.style.left = `${mouse.x}px`;
            cursorGlow.style.top = `${mouse.y}px`;
            previousMouse.x = mouse.x;
            previousMouse.y = mouse.y;
        }
        // Request the next frame to continue the loop
        requestAnimationFrame(tick);
    }
    // Start the animation loop
    tick();


    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- Smooth Scrolling ---
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
        if (e.target.tagName === 'IMG') {
            const imgSrc = e.target.getAttribute('src');
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
});

