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

    // AI Search
    const searchInput = document.getElementById('ai-search-input');
    const searchBtn = document.querySelector('.ai-search-btn');
    const searchResults = document.getElementById('ai-search-results');
    const searchHint = document.getElementById('search-results-hint');

    const allSearchableLinks = Array.from(document.querySelectorAll('a[data-search]'));

    function normalizeText(str) {
        return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function searchLinks(query) {
        const q = normalizeText(query);
        if (!q || q.length < 2) return [];

        const terms = q.split(/\s+/).filter(t => t.length >= 2);
        const results = [];

        allSearchableLinks.forEach(link => {
            const searchData = link.getAttribute('data-search') || '';
            const linkText = link.querySelector('.link-text')?.textContent || '';
            const searchable = normalizeText(searchData + ' ' + linkText);
            let score = 0;

            terms.forEach(term => {
                if (searchable.includes(term)) score += 2;
                if (linkText.toLowerCase().includes(term)) score += 3;
            });

            if (score > 0) {
                results.push({ link, score });
            }
        });

        return results
            .sort((a, b) => b.score - a.score)
            .map(r => r.link);
    }

    function renderResults(matchedLinks) {
        if (matchedLinks.length === 0) {
            searchResults.innerHTML = `
                <div class="ai-search-no-results">
                    <p>לא מצאתי תוצאות. נסה מילים אחרות או <a href="https://notebooklm.google.com/notebook/9696a696-65f0-4db1-91de-d671880ca7b4" target="_blank" rel="noopener noreferrer">שאל את החוברת</a>.</p>
                </div>
            `;
            searchResults.classList.remove('has-results');
        } else {
            searchResults.classList.add('has-results');
            searchResults.innerHTML = matchedLinks.map(link => {
                const iconEl = link.querySelector('.link-icon, .btn-icon');
                const icon = iconEl ? iconEl.innerHTML : '🔗';
                const textEl = link.querySelector('.link-text');
                const text = textEl ? textEl.textContent : link.textContent.trim();
                return `<a href="${link.href}" target="_blank" rel="noopener noreferrer" class="ai-search-result-item">
                    <span class="ai-search-result-icon">${icon}</span>
                    <span class="ai-search-result-text">${text}</span>
                </a>`;
            }).join('');
        }
    }

    function runSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('has-results');
            searchHint.textContent = 'הקלד מילת חיפוש ואמצא לך את הקישורים הרלוונטיים';
            return;
        }
        const matched = searchLinks(query);
        renderResults(matched);
        searchHint.textContent = matched.length > 0
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
});
