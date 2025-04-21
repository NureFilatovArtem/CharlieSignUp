document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Element Selection ---
    const flags = document.querySelectorAll(".language-toggle img");
    const elementsToTranslate = document.querySelectorAll("[data-en]");
    const geoPins = document.querySelectorAll(".geo-pin");
    const heroHeading = document.querySelector(".hero h1"); // H1 element
    const signupForm = document.querySelector('.signup form');
    const formInputs = signupForm ? signupForm.querySelectorAll('input[required]') : [];
    const progressElement = signupForm ? signupForm.closest('.signup-content')?.querySelector('.progress') : null;
    const mainCtaButtonConfetti = document.querySelector(".hero .cta-button");
    const confettiCanvas = document.getElementById('confetti-canvas');
    const coinCanvas = document.getElementById("coin-canvas");
    const swiperContainer = document.querySelector('.swiper-container');
    const modal = document.getElementById('provider-modal');
    const modalContent = modal?.querySelector('.modal-content');
    const modalCloseButton = modal?.querySelector('.modal-close');
    const providerImages = document.querySelectorAll('.swiper-slide img');
    const modalTitle = document.getElementById('modal-title');
    const modalInfo = document.getElementById('modal-info');
    const modalCta = modal?.querySelector('.modal-cta');
    const heroSection = document.querySelector('.hero');
    const heroCtaButton = document.querySelector('.hero .cta-button');
    const stickyCtaButton = document.querySelector('.sticky-cta');

    // --- Language Switcher ---
    const defaultLang = 'ru';
    let currentLang = localStorage.getItem('lang') || defaultLang;

    function applyLanguage(lang) {
        // Update flags
        flags.forEach(f => f.classList.remove("active"));
        const activeFlag = document.querySelector(`.language-toggle img[data-lang="${lang}"]`);
        if (activeFlag) activeFlag.classList.add('active');

        // Translate elements
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en'); // Fallback to English
            if (!text) return; // Skip if no translation data

            const tag = el.tagName.toLowerCase();
            const classes = el.classList;

            // --- Apply text based on element type ---

            // Special handling for H1 (update text directly, wrap words)
            if (el === heroHeading) {
                 // Wrap words in spans for animation consistency on language change
                 heroHeading.innerHTML = text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
            }
            // Update buttons, specific links, headings, paragraphs, specific spans
            else if (tag === 'button' ||
                     (tag === 'a' && (classes.contains('cta-button') || classes.contains('sticky-cta') || classes.contains('privacy-link') || el.closest('.footer-links'))) ||
                     tag === 'h2' || tag === 'h3' || tag === 'p' ||
                     classes.contains('name') || classes.contains('score'))
            {
                 el.textContent = text;
            }
            // Update input and textarea placeholders
            else if ((tag === 'input' || tag === 'textarea') && 'placeholder' in el) {
                 el.placeholder = text;
            }
            // Update image alt text
            else if (tag === 'img' && el.alt) {
                 el.alt = text;
            }
            // You can add more specific selectors here if needed
        });

        // Translate Geo Pin tooltips
        geoPins.forEach(pin => {
            const tooltipText = pin.getAttribute(`data-${lang}`) || pin.getAttribute('data-en');
            pin.setAttribute('data-tooltip', tooltipText);
            pin.setAttribute('aria-label', `${tooltipText} Geo Pin`); // Update aria-label as well
        });

        // Update page language attribute
        document.documentElement.lang = lang;
    }

    // Apply initial language
    applyLanguage(currentLang);

    // Add click listeners to flags
    flags.forEach(flag => {
        flag.addEventListener("click", () => {
            const newLang = flag.getAttribute("data-lang");
            if (newLang && newLang !== currentLang) {
                // Fade out content
                gsap.to('main', {
                    opacity: 0, duration: 0.2, ease: "power1.in",
                    onComplete: () => {
                        currentLang = newLang;
                        applyLanguage(currentLang); // Apply new language texts
                        localStorage.setItem('lang', currentLang); // Save preference
                        // Fade in content
                        gsap.to('main', { opacity: 1, duration: 0.3, ease: "power1.out" });
                    }
                });
            }
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) { // Ensure it's not just "#"
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header')?.offsetHeight || 65; // Height of fixed header
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // Adjust offset (20px extra space)

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                } catch (error) {
                    console.error("Error finding or scrolling to element:", targetId, error);
                }
            }
        });
    });

    // --- GSAP Animations ---
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (!prefersReducedMotion) {
            // Hero text animations (Subtitle and Button)
            gsap.from(".hero .subtitle", { autoAlpha: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.5 });
            gsap.from(".hero .cta-button", { autoAlpha: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.7 });

            // Hero H1 Word Animation (using the CORRECT variable heroHeading)
            if (heroHeading) {
                const wordElements = heroHeading.querySelectorAll('.word');
                if (wordElements.length > 0) {
                    gsap.from(wordElements, {
                        x: (index) => (index % 2 === 0 ? -100 : 100), // Alternate left/right
                        y: (index) => (index % 3 === 0 ? -50 : 50),   // Alternate up/down
                        opacity: 0,
                        scale: 0.8,
                        rotation: (index) => (index % 2 === 0 ? -10 : 10), // Slight rotation
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.1, // Delay between words
                        delay: 0.2,   // Initial delay
                    });
                } else {
                    console.warn("No '.word' spans found inside H1 for animation.");
                     // Fallback simple fade-in for H1 if spans are missing
                     gsap.from(heroHeading, { autoAlpha: 0, duration: 1, delay: 0.2 });
                }
            }


            // Benefit Cards Animation
            gsap.from(".benefit-card", {
                autoAlpha: 0, y: 50, scale: 0.95, stagger: 0.15, duration: 0.6, ease: "power2.out",
                scrollTrigger: { trigger: ".benefits-grid", start: "top 85%" }
            });

            // Leaderboard Items Animation
            gsap.from(".leaderboard-item", {
                autoAlpha: 0, x: -50, stagger: 0.1, duration: 0.5, ease: "power2.out",
                scrollTrigger: { trigger: ".leaderboard-grid", start: "top 85%" }
            });

        } else {
            // If reduced motion is preferred, maybe just fade elements in quickly or set them to visible
             gsap.set([".hero .subtitle", ".hero .cta-button", ".benefit-card", ".leaderboard-item"], { autoAlpha: 1 });
             console.log("Reduced motion enabled, animations skipped.");
        }

         // --- Sticky Button Logic (requires ScrollTrigger) ---
         if (heroSection && heroCtaButton && stickyCtaButton) {
            ScrollTrigger.create({
                trigger: heroSection, // Element that triggers the change
                start: "bottom top+=150", // When bottom of hero is 150px above the top of viewport
                // markers: true, // Uncomment for debugging
                onEnter: () => { // Scrolling down past the trigger point
                    gsap.to(heroCtaButton, { autoAlpha: 0, duration: 0.3 }); // Hide hero button
                    gsap.to(stickyCtaButton, { autoAlpha: 1, duration: 0.3, pointerEvents: 'auto' }); // Show sticky button
                },
                onLeaveBack: () => { // Scrolling up past the trigger point
                    gsap.to(heroCtaButton, { autoAlpha: 1, duration: 0.3 }); // Show hero button
                    gsap.to(stickyCtaButton, { autoAlpha: 0, duration: 0.3, pointerEvents: 'none' }); // Hide sticky button
                }
            });
        } else {
            console.warn("Required elements for sticky button not found.");
            // Fallback for mobile if ScrollTrigger fails or elements missing?
            // Maybe always show sticky on small screens if hero button isn't visible?
            // The CSS already handles the initial hidden state.
        }


    } else {
        console.warn("GSAP or ScrollTrigger library not found. Animations and sticky button logic might not work.");
        // Fallback: Manually show sticky button on small screens if libraries missing?
        if (window.innerWidth <= 767 && stickyCtaButton) {
           // Check if hero button is potentially out of view quickly
           // This is less precise than ScrollTrigger
           if (window.scrollY > window.innerHeight * 0.8) { // Example threshold
               stickyCtaButton.style.opacity = '1';
               stickyCtaButton.style.visibility = 'visible';
               stickyCtaButton.style.pointerEvents = 'auto';
           }
           // Need scroll listener for this fallback to work dynamically
        }
    }


    // --- Confetti ---
    function launchConfetti() {
        if (!confettiCanvas || typeof particlesJS === 'undefined') {
            console.warn("Confetti canvas or particlesJS library not found.");
            return;
        }
        confettiCanvas.innerHTML = ''; // Clear previous confetti
        const particlesId = 'particles-js-confetti';
        const particlesContainer = document.createElement('div');
        particlesContainer.id = particlesId;
        // Style container to overlay correctly
        particlesContainer.style.cssText = 'position:absolute; width:100%; height:100%; top:0; left:0; z-index:10;';
        confettiCanvas.appendChild(particlesContainer);

        particlesJS(particlesId, { /* ... confetti config ... */
             "particles": { "number": { "value": 120, "density": { "enable": true, "value_area": 800 } }, "color": { "value": ["#FFD700", "#FFEC8B", "#FFFFFF", "#FDB813"] }, "shape": { "type": ["circle", "edge", "polygon"], "polygon": { "nb_sides": 5 } }, "opacity": { "value": 0.9, "random": true }, "size": { "value": 5, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 7, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } }, "retina_detect": true });

        // Automatically remove confetti after a delay
        setTimeout(() => {
            try {
                // Find the specific particles.js instance to destroy it cleanly
                const pjsInstance = window.pJSDom?.find(p => p.pJS?.canvas?.el?.parentElement?.id === particlesId);
                if (pjsInstance?.pJS?.fn?.vendors?.destroypJS) {
                    pjsInstance.pJS.fn.vendors.destroypJS();
                    // console.log("Confetti instance destroyed.");
                }
                const containerToRemove = document.getElementById(particlesId);
                if (containerToRemove) {
                    containerToRemove.remove();
                    // console.log("Confetti container removed.");
                }
            } catch (error) {
                console.error("Error removing confetti:", error);
                 // Fallback removal
                 confettiCanvas.innerHTML = '';
            }
        }, 3000); // Remove after 3 seconds
    }


    
    // if (mainCtaButtonConfetti) {
    //     mainCtaButtonConfetti.addEventListener('click', launchConfetti);
    // } else {
    //      console.warn("Main CTA button for confetti not found.");
    // }

    // --- Falling Coins Canvas ---
    if (coinCanvas && typeof particlesJS !== 'undefined') {
        // console.log("Initializing coin particles...");
        particlesJS('coin-canvas', { /* ... coin config ... */
            "particles": { "number": { "value": 30, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#FFD700" }, "shape": { "type": "circle" }, "opacity": { "value": 0.8, "random": true }, "size": { "value": 8, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 3, "direction": "bottom", "random": false, "straight": true, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } }, "retina_detect": true });

        // Optional: Check and style the generated canvas (usually not needed if container is styled)
        // const checkCanvas = setInterval(() => {
        //     const canvasEl = coinCanvas.querySelector('canvas');
        //     if (canvasEl) {
        //         // console.log("Coin canvas element found:", canvasEl);
        //         // Ensure it doesn't block interactions if it wasn't set correctly
        //         canvasEl.style.pointerEvents = 'none';
        //         canvasEl.style.position = 'absolute'; // Ensure positioning context
        //         canvasEl.style.top = '0';
        //         canvasEl.style.left = '0';
        //         canvasEl.style.width = '100%';
        //         canvasEl.style.height = '100%';
        //         canvasEl.style.zIndex = '0'; // Match CSS
        //         clearInterval(checkCanvas);
        //     }
        // }, 100);
    } else {
        console.error("Coin canvas or particlesJS library not found.");
    }

    // --- Swiper ---
    if (swiperContainer && typeof Swiper !== 'undefined') {
        try {
            const swiper = new Swiper(swiperContainer, {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 20,
                grabCursor: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next.custom-swiper-btn', // Correct selectors
                    prevEl: '.swiper-button-prev.custom-swiper-btn',
                },
                breakpoints: { // Responsive settings
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 30 },
                    1024: { slidesPerView: 5, spaceBetween: 30 }
                },
                a11y: { // Accessibility enhancements
                     prevSlideMessage: 'Previous slide',
                     nextSlideMessage: 'Next slide',
                 },
            });
        } catch (error) {
             console.error("Error initializing Swiper:", error);
        }
    } else {
        console.warn("Swiper container or Swiper library not found.");
    }

    // --- Provider Modal ---
    if (modal && modalContent && modalCloseButton && modalTitle && modalInfo && modalCta) {
        // Close modal function
        const closeProviderModal = () => {
            modal.setAttribute('hidden', '');
            document.body.style.overflow = '';
            if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                gsap.to(modalContent, { scale: 0.9, autoAlpha: 0, duration: 0.2, ease: "power2.in" });
            } else {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
            }
        };

        // Open modal logic
        providerImages.forEach(img => {
            img.addEventListener('click', () => {
                modalTitle.textContent = img.alt || "Provider";
                modalInfo.textContent = img.dataset.info || "More information coming soon.";
                const ctaText = modalCta.getAttribute(`data-${currentLang}`) || modalCta.getAttribute('data-en');
                modalCta.textContent = ctaText;

                modal.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';

                 if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                    gsap.to(modalContent, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power2.out", delay: 0.1 });
                 } else {
                     modalContent.style.opacity = '1';
                     modalContent.style.transform = 'scale(1)';
                 }
            });
        });

        // Close on button click
        modalCloseButton.addEventListener('click', closeProviderModal);

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProviderModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
                closeProviderModal();
            }
        });
    } else {
        console.warn("Modal elements not found.");
    }

    // --- Signup Form Progress Bar ---
    if (formInputs.length > 0 && progressElement && typeof gsap !== 'undefined') {
        const totalRequired = formInputs.length;

        function updateProgress() {
            let filledRequired = 0;
            formInputs.forEach(input => {
                // Check if required input is not empty (trimmed)
                if (input.value.trim() !== '') {
                    filledRequired++;
                }
            });
            const percentage = totalRequired > 0 ? (filledRequired / totalRequired) * 100 : 0;
            // Animate progress bar width
             if (!prefersReducedMotion) {
                 gsap.to(progressElement, { width: `${percentage}%`, duration: 0.5, ease: "power2.out" });
             } else {
                 progressElement.style.width = `${percentage}%`; // Update directly if reduced motion
             }
        }

        // Update progress on input change
        formInputs.forEach(input => input.addEventListener('input', updateProgress));
        // Initial progress check
        updateProgress();
    } else if (formInputs.length > 0 && !gsap) {
         console.warn("GSAP not found, progress bar animation disabled.");
         // Add non-GSAP fallback if needed
    }

    // --- Form Submission (Simulation) ---
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(signupForm.action, {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Form submitted successfully!');
                    signupForm.reset();
                    if (progressElement) {
                     progressElement.style.width = '0%';
                }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the form. Please try again.');
            }
        });
    }

    // Privacy Policy Modal
    const privacyModal = document.getElementById('privacy-modal');
    const privacyButton = document.querySelector('.privacy-link');
    const privacyModalContent = privacyModal?.querySelector('.modal-content');
    const privacyModalClose = privacyModal?.querySelector('.modal-close');

    if (privacyModal && privacyButton && privacyModalContent && privacyModalClose) {
        // Open modal
        privacyButton.addEventListener('click', () => {
            console.log('Privacy button clicked'); // Debug
            privacyModal.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Close modal function
        const closePrivacyModal = () => {
            console.log('Closing modal'); // Debug
            privacyModal.setAttribute('hidden', '');
            document.body.style.overflow = '';
        };

        // Close on button click
        privacyModalClose.addEventListener('click', closePrivacyModal);

        // Close on click outside
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closePrivacyModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !privacyModal.hasAttribute('hidden')) {
                closePrivacyModal();
            }
        });
    } else {
        console.warn('Some privacy modal elements are missing:', {
            modal: !!privacyModal,
            button: !!privacyButton,
            content: !!privacyModalContent,
            close: !!privacyModalClose
        });
    }

}); // End DOMContentLoaded