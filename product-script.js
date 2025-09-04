// Product Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsGrid = document.querySelector('.products-grid');
    const productItems = document.querySelectorAll('.product-item');

    // Filter products
    function filterProducts() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        
        productItems.forEach(item => {
            let showItem = true;
            
            // Category filter
            if (category !== 'all' && item.dataset.category !== category) {
                showItem = false;
            }
            
            // Price filter
            if (priceRange !== 'all') {
                const itemPrice = parseFloat(item.dataset.price);
                if (priceRange === '0-100' && itemPrice > 100) showItem = false;
                else if (priceRange === '100-300' && (itemPrice < 100 || itemPrice > 300)) showItem = false;
                else if (priceRange === '300-500' && (itemPrice < 300 || itemPrice > 500)) showItem = false;
                else if (priceRange === '500+' && itemPrice < 500) showItem = false;
            }
            
            item.style.display = showItem ? 'block' : 'none';
        });
    }

    // Sort products
    function sortProducts() {
        const sortBy = sortFilter.value;
        const productsArray = Array.from(productItems);
        
        productsArray.sort((a, b) => {
            if (sortBy === 'price-low') {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (sortBy === 'price-high') {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            } else if (sortBy === 'rating') {
                const aRating = a.querySelectorAll('.rating .fa-star').length;
                const bRating = b.querySelectorAll('.rating .fa-star').length;
                return bRating - aRating;
            }
            return 0;
        });
        
        // Re-append sorted items
        productsArray.forEach(item => {
            productsGrid.appendChild(item);
        });
    }

    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', sortProducts);

    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-item');
            const productName = productCard.querySelector('h3').textContent;
            alert(`Quick view for: ${productName}`);
        });
    });

    // Add to wishlist
    const wishlistBtns = document.querySelectorAll('.add-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.color = '#ef4444';
                this.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                this.style.color = '#6b7280';
                this.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    });

    // Add to cart
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-item');
            const productName = productCard.querySelector('h3').textContent;
            const originalText = this.innerHTML;
            
            // Change button text temporarily
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
            
            // Show notification
            showNotification(`${productName} added to cart!`);
        });
    });

    // Load more products
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more products
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'No more products';
                this.style.opacity = '0.5';
            }, 1500);
        });
    }

    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});