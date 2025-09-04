// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const articlesGrid = document.getElementById('articlesGrid');
const articles = articlesGrid.querySelectorAll('.article-card');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let hasResults = false;
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            article.style.display = 'block';
            hasResults = true;
        } else {
            article.style.display = 'none';
        }
    });
    
    if (!hasResults && searchTerm !== '') {
        if (!document.querySelector('.no-results')) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No articles found matching your search.';
            noResults.style.gridColumn = '1 / -1';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '2rem';
            noResults.style.color = '#6b7280';
            articlesGrid.appendChild(noResults);
        }
    } else {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        articles.forEach(article => {
            if (filter === 'all') {
                article.style.display = 'block';
            } else if (article.dataset.category === filter) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });
});

// Pagination
const articlesPerPage = 6;
let currentPage = 1;
const pageNumbers = document.getElementById('pageNumbers');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

function showPage(page) {
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    
    articles.forEach((article, index) => {
        if (index >= start && index < end) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
    
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-num';
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
        });
        pageNumbers.appendChild(pageBtn);
    }
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});

// Initialize pagination
showPage(1);

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        newsletterForm.reset();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.article-card, .product-card').forEach(el => {
    observer.observe(el);
});

// Hero Slider (if multiple slides)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length > 1) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

// Auto-advance slides every 5 seconds
if (slides.length > 1) {
    setInterval(nextSlide, 5000);
}

// Product Carousel Auto-scroll
const productsCarousel = document.querySelector('.products-carousel');
if (productsCarousel) {
    let isScrolling = false;
    
    productsCarousel.addEventListener('mouseenter', () => {
        isScrolling = false;
    });
    
    productsCarousel.addEventListener('mouseleave', () => {
        isScrolling = true;
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Sort articles by date
function sortArticlesByDate() {
    const articlesList = Array.from(articles);
    articlesList.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return dateB - dateA;
    });
    
    articlesList.forEach(article => {
        articlesGrid.appendChild(article);
    });
}

// Initialize sort on load
sortArticlesByDate();