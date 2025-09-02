(() => {
    // Check the homepage
    const isHomepage = () => {
        const currentPath = window.location.pathname;
        return currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('e-bebek.com/');
    };

    // Initialization function
    const init = () => {
        if (!isHomepage()) {
            console.log('wrong page');
            return;
        }

        buildHTML();
        buildCSS();
        setEvents();
    };

    // HTML Structure 
    const buildHTML = () => {
        const html = `
            <div class="product-carousel-container custom-eb-carousel">
                <div class="section-card">
                    <div class="section-header">
                        <h2 class="carousel-title">Beğenebileceğiniz Ürünler</h2>
                    </div>
                    <div class="carousel-wrapper">
                        <button class="carousel-nav carousel-nav-prev" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="carousel-container">
                            <div class="carousel-track">
                                <!-- Products will be inserted here -->
                            </div>
                        </div>
                        <button class="carousel-nav carousel-nav-next">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Preferred anchor: after the Section2A product carousel slot
        const section2Anchor = document.querySelector('cx-page-slot[position="Section2A"] eb-product-carousel')
            || document.querySelector('cx-page-slot.Section2A eb-product-carousel')
            || document.querySelector('eb-product-carousel');

        if (section2Anchor) {
            section2Anchor.insertAdjacentHTML('beforebegin', html);
            return;
        }

        const heroSelectors = [
            'div.banner.ng-star-inserted',  
            'div[class*="banner"]',         
            'eb-banner',                    
            '.hero-banner',                 
            '.main-banner'                  
        ];
        
        let heroBanner = null;
        for (const selector of heroSelectors) {
            heroBanner = document.querySelector(selector);
            if (heroBanner) break;
        }
        
        if (heroBanner) {
            heroBanner.insertAdjacentHTML('afterend', html);
        } else {
            // Final fallback
            document.body.insertAdjacentHTML('beforeend', html);
        }
    };

    // CSS styles
    const buildCSS = () => {
        const css = `
            .product-carousel-container.custom-eb-carousel {
                background-color: transparent;
                padding: 30px 0 50px;
                margin: 0;
                width: 100%;
                position: relative;
                z-index: 1;
                clear: both;
                box-sizing: border-box;
            }

            .section-card {
                max-width: 1500px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 14px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.06);
                border: 1px solid #f0efe9;
                overflow: visible; 
            }

            .section-header {
                background: #fff3e0;
                padding: 18px 24px;
                margin-bottom: 10px; 
            }

            .carousel-title {
                font-size: 22px;
                font-weight: 700;
                color: #ff8a00;
                text-align: left;
                margin: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .carousel-wrapper {
                position: relative;
                max-width: 1500px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                padding: 0 30px;
                margin-top: 10px; 
            }

            .carousel-nav {
                background: #fff3e0; 
                border: 1px solid #ffd7a1;
                width: 44px;
                height: 44px;
                border-radius: 9999px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 6px 16px rgba(0,0,0,0.12);
                z-index: 20;
                transition: none; 
                color: #ff8a00; 
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }

            .carousel-nav:hover:not(:disabled) {
                background: #fff3e0;
                border-color: #ffd7a1;
            }

            .carousel-nav:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .carousel-nav-prev { left: -55px; }
            .carousel-nav-next { right: -55px; }

            .carousel-container {
                flex: 1 1 auto;
                overflow: hidden;
                border-radius: 0;
                min-width: 0;
                min-height: 410px; 
            }

            .carousel-track {
                display: flex;
                transition: transform 0.3s ease;
                gap: 20px;
                padding: 0px;
            }

            .product-card {
                background: white;
                border-radius: 8px;
                padding: 15px;
                width: 240px;
                height: 400px; 
                flex-shrink: 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                border: 1px solid #e0e0e0;
            }

            .product-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.12);
            }

            .product-badges {
                position: absolute;
                top: 10px;
                left: 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                z-index: 3;
            }

            .product-badge {
                background: #00a651;
                color: white;
                font-size: 9px;
                font-weight: 700;
                padding: 2px 6px;
                border-radius: 4px;
                text-transform: uppercase;
            }

            .product-badge.bestseller {
                background: #ff6b35;
            }

            .product-image-container {
                width: 100%;
                height: 180px;
                margin-bottom: 15px;
                border-radius: 4px;
                overflow: hidden;
                background: #fafafa;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .product-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                object-position: center;
            }

            .heart-icon {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 24px;
                height: 24px;
                cursor: pointer;
                z-index: 5;
                transition: all 0.2s ease;
            }

            .heart-icon:hover {
                transform: scale(1.1);
            }

            .heart-icon.active {
                color: #ff6b35;
                fill: #ff6b35;
            }

            .product-title {
                font-size: 13px;
                color: #666;
                line-height: 1.35;
                margin-bottom: 8px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                min-height: 52px;
            }

            .product-title .brand { font-weight: 700; color: #4d4d4d; }

            .product-rating {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                gap: 4px;
            }

            .stars {
                display: flex;
                gap: 2px;
            }

            .star { color: #FFC107; font-size: 16px; }

            .star.empty {
                color: #ddd;
            }

            .rating-count { font-size: 12px; color: #888; margin-left: 4px; }

            .product-pricing { margin-bottom: 12px; margin-top: auto; }

            .price-meta { display:flex; align-items:center; gap:8px; margin-bottom: 4px; }

            .original-price { font-size: 13px; color:#999; text-decoration: line-through; }
            .discount-text { font-size: 13px; color:#13a058; font-weight: 700; }
            .discount-badge { width:18px; height:18px; border-radius:50%; background:#13a058; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:11px; }
            .final-price { font-size: 20px; font-weight: 800; color:#333; }
            .final-price--discount { color:#13a058; }

            .product-original-price {
                font-size: 13px;
                color: #999;
                text-decoration: line-through;
            }

            .product-discount {
                background: #30b455;
                color: white;
                font-size: 10px;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: 700;
            }

            .add-to-cart-btn {
                width: 100%;
                background: #fff3e0; 
                color: #ff8a00; 
                border: 1px solid #ffd7a1;
                padding: 10px 12px;
                border-radius: 9999px; 
                font-size: 13px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: auto;
            }

            .add-to-cart-btn:hover {
                background: #ffe6c2;
                transform: translateY(-1px);
                border-color: #ffc777;
            }

            /* Responsive Design */
            @media (max-width: 1024px) {
                .carousel-nav-prev { left: 6px; }
                .carousel-nav-next { right: 6px; }
            }
            @media (min-width: 1200px) {
                .carousel-container {
                    flex: 0 0 1280px; /* 5 * 240 + 4 * 20 = 1280 */
                    width: 1280px;
                }
            }
            @media (max-width: 1200px) {
                .carousel-wrapper {
                    max-width: 1100px;
                }
                .product-card {
                    width: 200px;
                }
                .carousel-track {
                    gap: 15px;
                }
            }

            @media (max-width: 768px) {
                .carousel-wrapper {
                    padding: 0 10px;
                }
                
                .product-card {
                    width: 180px;
                    height: 320px;
                }
                
                .product-image-container {
                    height: 140px;
                }
                
                .carousel-title {
                    font-size: 18px;
                }
                
                .carousel-nav {
                    width: 30px;
                    height: 30px;
                }
                
                .carousel-track {
                    gap: 12px;
                }
            }

            @media (max-width: 480px) {
                .product-card {
                    width: 160px;
                    height: 300px;
                    padding: 12px;
                }
                
                .product-image-container {
                    height: 120px;
                }
                
                .carousel-track {
                    gap: 10px;
                }
                
                .carousel-title {
                    font-size: 16px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = css;
        document.head.appendChild(styleSheet);
    };

    const FAVORITES_KEY = 'ebebek_favorites';
    const PRODUCT_DATA_URL = 'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json';

    // Get product data from link
    const getProductData = async () => {
        try {
            const res = await fetch(PRODUCT_DATA_URL, { method: 'GET' });
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    // Get favorites
    const getFavorites = () => {
        try {
            const favorites = localStorage.getItem(FAVORITES_KEY);
            return favorites ? JSON.parse(favorites) : [];
        } catch {
            return [];
        }
    };

    // Save favorites to localStorage
    const saveFavorites = (favorites) => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    // Calculate discount percentage
    const calculateDiscount = (price, originalPrice) => {
        if (price >= originalPrice) return 0;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    };

    const generateStarRating = (rating, reviewCount) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<span class="star">★</span>';
        }
        
        // Half stars
        if (hasHalfStar) {
            starsHtml += '<span class="star">★</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<span class="star empty">★</span>';
        }
        
        return `
            <div class="product-rating">
                <div class="stars">${starsHtml}</div>
                <span class="rating-count">(${reviewCount})</span>
            </div>
        `;
    };

    // Product badges for demo
    const generateBadges = (productId) => {
        const badgeOptions = [
            { text: 'KARGO BEDAVA', class: '' },
            { text: 'ÇOK SATAN', class: 'bestseller' },
            { text: 'YENİ', class: 'bestseller' }
        ];
        
        // Logic to assign badges based on product ID
        const badges = [];
        if (productId % 3 === 0) badges.push(badgeOptions[0]);
        if (productId === 6 || productId === 5) badges.push(badgeOptions[1]);
        if (productId === 1 || productId === 8) badges.push(badgeOptions[2]);
        
        if (badges.length === 0) return '';
        
        return `
            <div class="product-badges">
                ${badges.map(badge => `<span class="product-badge ${badge.class}">${badge.text}</span>`).join('')}
            </div>
        `;
    };

    // Render product cards
    const renderProducts = (products) => {
        const favorites = getFavorites();
        const track = document.querySelector('.carousel-track');
        
        if (!track) return;

        track.innerHTML = products.map(product => {
            const discount = calculateDiscount(product.price, product.original_price);
            const isFavorite = favorites.includes(product.id);
            const hasDiscount = discount > 0;
            
            // Random rating between 1.0 and 5.0 with halves
            const rating = Math.round((1 + Math.random() * 4) * 2) / 2; 
            const reviewCount = Math.floor(Math.random() * 300) + 5; 

            return `
                <div class="product-card" data-product-id="${product.id}" data-url="${product.url}">
                    ${generateBadges(product.id)}
                    <svg class="heart-icon ${isFavorite ? 'active' : ''}" data-product-id="${product.id}" width="20" height="20" viewBox="0 0 24 24" fill="none" color="#ff6b35"> 
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="${isFavorite ? '#ff6b35' : 'none'}"/>
                    </svg>
                    <div class="product-image-container">
                        <img class="product-image" src="${product.img}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-title"><span class="brand">${product.brand}</span> - ${product.name}</div>
                    ${generateStarRating(rating, reviewCount)}
                    <div class="product-pricing">
                        ${hasDiscount ? `
                            <div class=\"price-meta\">
                                <span class=\"original-price\">${product.original_price.toFixed(2)} TL</span>
                                <span class=\"discount-text\">%${discount}</span>
                                <span class=\"discount-badge\">↓</span>
                            </div>
                            <div class=\"final-price final-price--discount\">${product.price.toFixed(2)} TL</div>
                        ` : `
                            <div class=\"final-price\">${product.price.toFixed(2)} TL</div>
                        `}
                    </div>
                    <button class="add-to-cart-btn">Sepete Ekle</button>
                </div>
            `;
        }).join('');
    };

    // Carousel navigation
    let currentTranslate = 0;
    let cardStepPx = 260; 

    const getCardStep = () => {
        try {
            const trackEl = document.querySelector('.carousel-track');
            if (!trackEl) return cardStepPx;
            const cards = trackEl.querySelectorAll('.product-card');
            if (!cards || cards.length < 2) {
                const firstWidth = cards?.[0]?.offsetWidth || 240;
                const gapStr = window.getComputedStyle(trackEl).gap || '20px';
                const gap = parseFloat(gapStr) || 20;
                return firstWidth + gap;
            }
            const step = cards[1].offsetLeft - cards[0].offsetLeft;
            return step > 0 ? step : (cards[0].offsetWidth + 20);
        } catch (_) {
            return cardStepPx;
        }
    };

    const updateCarousel = () => {
        const track = document.querySelector('.carousel-track');
        const container = document.querySelector('.carousel-container');
        const prevBtn = document.querySelector('.carousel-nav-prev');
        const nextBtn = document.querySelector('.carousel-nav-next');
        
        if (!track || !container) return;

        const maxTranslate = Math.max(0, track.scrollWidth - container.clientWidth);
        
        currentTranslate = Math.max(0, Math.min(currentTranslate, maxTranslate));
        track.style.transform = `translateX(-${currentTranslate}px)`;
        
        prevBtn.disabled = currentTranslate <= 0;
        nextBtn.disabled = currentTranslate >= maxTranslate;
    };

    // Set up event listeners
    const setEvents = async () => {
        try {
            const products = await getProductData();
            renderProducts(products);
            
            setTimeout(() => {
                cardStepPx = getCardStep();
                currentTranslate = Math.round(currentTranslate / cardStepPx) * cardStepPx;
                updateCarousel();
            }, 100);

            // Navigation events
            document.querySelector('.carousel-nav-prev')?.addEventListener('click', () => {
                cardStepPx = getCardStep();
                currentTranslate = Math.max(0, currentTranslate - cardStepPx); // slide by one card
                updateCarousel();
            });

            document.querySelector('.carousel-nav-next')?.addEventListener('click', () => {
                cardStepPx = getCardStep();
                currentTranslate += cardStepPx; // slide by one card
                updateCarousel();
            });

            document.querySelector('.carousel-track')?.addEventListener('click', (e) => {
                const heartIcon = e.target.closest('.heart-icon');
                if (heartIcon) {
                    e.stopPropagation();
                    const productId = parseInt(heartIcon.dataset.productId);
                    toggleFavorite(productId, heartIcon);
                    return;
                }

                const productCard = e.target.closest('.product-card');
                if (productCard && !e.target.classList.contains('add-to-cart-btn')) {
                    const url = productCard.dataset.url;
                    if (url) {
                        window.open(url, '_blank');
                    }
                }
            });

            window.addEventListener('resize', () => {
                cardStepPx = getCardStep();
                currentTranslate = Math.round(currentTranslate / cardStepPx) * cardStepPx;
                updateCarousel();
            });

        } catch (error) {
            console.error('Error setting up events:', error);
        }
    };

    // Toggle favorite status
    const toggleFavorite = (productId, heartIcon) => {
        const favorites = getFavorites();
        const index = favorites.indexOf(productId);
        
        if (index === -1) {
            favorites.push(productId);
            heartIcon.classList.add('active');
            heartIcon.querySelector('path').setAttribute('fill', '#ff6b35');
        } else {
            favorites.splice(index, 1);
            heartIcon.classList.remove('active');
            heartIcon.querySelector('path').setAttribute('fill', 'none');
        }
        
        saveFavorites(favorites);
    };

    init();
})();
