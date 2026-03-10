/**
 * Suzuki Grand Vitara 4x4 Israel Team
 * Website JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollProgressContainer = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const updateProgress = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
            scrollProgress.style.width = percent + '%';
            if (scrollProgressContainer) scrollProgressContainer.setAttribute('aria-valuenow', percent);
        };
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial update
    }

    // Back to top visibility
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .animate-item').forEach(el => observer.observe(el));

    // Add external link indicators
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Lazy load images with fallback
    document.querySelectorAll('img[data-src]').forEach(img => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                }
            });
        });
        obs.observe(img);
    });
});
