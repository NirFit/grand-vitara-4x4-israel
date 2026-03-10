/**
 * Suzuki Grand Vitara 4x4 Israel
 * Premium Website - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

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
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.width = percent + '%';
        });
    }

    // Back to top visibility
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });
    }

    // Header scroll effect - add glass effect when scrolled
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // External links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // AI Search - uses SEARCH_DATA from search-data.js (all items in site)
    const searchInput = document.getElementById('ai-search-input');
    const searchBtn = document.querySelector('.ai-search-btn');
    const searchResults = document.getElementById('ai-search-results');
    const searchHint = document.getElementById('search-results-hint');

    const searchData = typeof SEARCH_DATA !== 'undefined' ? SEARCH_DATA : [];

    function normalizeText(str) {
        return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function searchItems(query) {
        const q = normalizeText(query);
        if (!q || q.length < 1) return [];

        const terms = q.split(/\s+/).filter(t => t.length >= 1);
        const results = [];

        searchData.forEach(item => {
            const searchable = normalizeText((item.keywords || '') + ' ' + (item.text || ''));
            let score = 0;

            terms.forEach(term => {
                if (searchable.includes(term)) score += 2;
                if (normalizeText(item.text).includes(term)) score += 4;
            });

            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        return results
            .sort((a, b) => b.score - a.score)
            .map(r => ({ href: r.href, text: r.text, icon: r.icon || '🔗' }));
    }

    function renderResults(matched) {
        if (!searchResults) return;
        if (matched.length === 0) {
            searchResults.innerHTML = `
                <div class="ai-search-no-results">
                    <p>לא מצאתי תוצאות. נסה מילים אחרות או <a href="https://notebooklm.google.com/notebook/9696a696-65f0-4db1-91de-d671880ca7b4" target="_blank" rel="noopener noreferrer">שאל את החוברת</a>.</p>
                </div>
            `;
            searchResults.classList.remove('has-results');
        } else {
            searchResults.classList.add('has-results');
            searchResults.innerHTML = matched.map(item => {
                const isExternal = item.href.startsWith('http') && !item.href.includes('nirfit.github.io');
                const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
                return `<a href="${item.href}"${target} class="ai-search-result-item">
                    <span class="ai-search-result-icon">${item.icon}</span>
                    <span class="ai-search-result-text">${item.text}</span>
                </a>`;
            }).join('');
        }
    }

    function runSearch() {
        if (!searchInput || !searchResults) return;
        const query = searchInput.value.trim();
        if (!query) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('has-results');
            if (searchHint) searchHint.textContent = 'הקלד מילת חיפוש ואמצא לך את הקישורים הרלוונטיים';
            return;
        }
        const matched = searchItems(query);
        renderResults(matched);
        if (searchHint) searchHint.textContent = matched.length > 0
            ? `מצאתי ${matched.length} תוצאות עבורך`
            : 'לא נמצאו תוצאות – נסה מילים אחרות';
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(window._searchDebounce);
            window._searchDebounce = setTimeout(runSearch, 200);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                runSearch();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', runSearch);
    }

    // Background music toggle
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
                musicToggle.classList.add('playing');
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });
        bgMusic.addEventListener('play', () => musicToggle.classList.add('playing'));
        bgMusic.addEventListener('pause', () => musicToggle.classList.remove('playing'));
    }

    // Parallax effect on hero scroll
    const heroFull = document.querySelector('.hero-full');
    if (heroFull) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroFull.offsetHeight;
            if (scrolled < heroHeight) {
                const opacity = 1 - (scrolled / heroHeight) * 0.3;
                heroFull.querySelector('.hero-content')?.style.setProperty('opacity', opacity);
            }
        });
    }

    // Subtle scale pulse on stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
