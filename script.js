document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

    if (themeBtn) {
        // Initialize theme from local storage
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
        }

        themeBtn.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 2. Sidebar Progress / Active Link Logic
    const docsContent = document.querySelector('.docs-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.docs-content section');

    if (docsContent && sidebarLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    sidebarLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            sidebarLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // 3. Sticky Nav logic
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 4. Copy Code to Clipboard
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeWindow = button.closest('.docs-code-window');
            if (codeWindow) {
                const codeBlock = codeWindow.querySelector('code');
                const textToCopy = codeBlock.innerText;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    button.classList.add('copied');
                    const originalHtml = button.innerHTML;
                    button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.innerHTML = originalHtml;
                    }, 2000);
                });
            }
        });
    });

    // 5. Search Functionality
    const searchTrigger = document.getElementById('nav-search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-results');
    const searchClose = document.getElementById('search-modal-close');
    
    let searchIndex = [];
    let selectedIndex = -1;

    // Index creation
    function createSearchIndex() {
        const sections = document.querySelectorAll('.docs-content section');
        sections.forEach(section => {
            const category = section.querySelector('div[style*="text-transform: uppercase"]')?.innerText || 'Documentation';
            const h1 = section.querySelector('h1');
            const subheadings = section.querySelectorAll('h2, h3');
            const paragraphs = section.querySelectorAll('p:not(.lead)');
            const sectionId = section.getAttribute('id');

            if (h1) {
                searchIndex.push({
                    title: h1.innerText,
                    category: category,
                    snippet: section.querySelector('.lead')?.innerText || '',
                    url: `#${sectionId}`,
                    type: 'h1'
                });
            }

            subheadings.forEach(sub => {
                searchIndex.push({
                    title: sub.innerText,
                    category: category,
                    snippet: sub.nextElementSibling?.innerText || '',
                    url: `#${sectionId}`,
                    anchor: sub.innerText.toLowerCase().replace(/ /g, '-'), // Basic anchor logic
                    type: 'sub'
                });
            });
        });
    }

    createSearchIndex();

    function openSearch() {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        renderResults([]);
    }

    function renderResults(results) {
        if (results.length === 0) {
            if (searchInput.value.trim() === '') {
                searchResults.innerHTML = '<div class="search-empty"><p>No recent searches</p></div>';
            } else {
                searchResults.innerHTML = `<div class="search-empty"><p>No results for "${searchInput.value}"</p></div>`;
            }
            selectedIndex = -1;
            return;
        }

        searchResults.innerHTML = results.map((res, index) => `
            <a href="${res.url}" class="search-result-item ${index === 0 ? 'selected' : ''}" data-index="${index}">
                <div class="category">${res.category}</div>
                <div class="title">${res.title}</div>
                <div class="snippet">${res.snippet}</div>
            </a>
        `).join('');
        selectedIndex = 0;

        // click results
        const items = searchResults.querySelectorAll('.search-result-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                closeSearch();
            });
        });
    }

    function performSearch(query) {
        if (!query.trim()) {
            renderResults([]);
            return;
        }

        const q = query.toLowerCase();
        const results = searchIndex.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.snippet.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        ).slice(0, 8);

        renderResults(results);
    }

    // Event Listeners
    if (searchTrigger) {
        searchTrigger.addEventListener('click', openSearch);
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    searchOverlay?.addEventListener('click', (e) => {
        if (e.target === searchOverlay) closeSearch();
    });

    searchInput?.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    window.addEventListener('keydown', (e) => {
        // Cmd + K or Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }

        // Esc to close
        if (e.key === 'Escape') {
            closeSearch();
        }

        // Navigation
        if (searchOverlay?.classList.contains('active')) {
            const items = searchResults.querySelectorAll('.search-result-item');
            if (items.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[selectedIndex]?.classList.remove('selected');
                    selectedIndex = (selectedIndex + 1) % items.length;
                    items[selectedIndex]?.classList.add('selected');
                    items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[selectedIndex]?.classList.remove('selected');
                    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                    items[selectedIndex]?.classList.add('selected');
                    items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    items[selectedIndex]?.click();
                    const href = items[selectedIndex].getAttribute('href');
                    window.location.hash = href;
                    closeSearch();
                }
            }
        }
    });
});
