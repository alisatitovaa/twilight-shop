// ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
let cart = JSON.parse(localStorage.getItem('twilight_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('twilight_favorites')) || [];
let currentTheme = localStorage.getItem('twilight_theme') || 'light';

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function saveCart() {
    localStorage.setItem('twilight_cart', JSON.stringify(cart));
    updateCartUI();
}

function saveFavorites() {
    localStorage.setItem('twilight_favorites', JSON.stringify(favorites));
    updateFavoritesUI();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// ===== ТЕМА =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const lightBtn = themeToggle.querySelector('[data-theme="light"]');
    const darkBtn = themeToggle.querySelector('[data-theme="dark"]');
    
    if (currentTheme === 'light') {
        lightBtn?.classList.add('active');
        darkBtn?.classList.remove('active');
    } else {
        darkBtn?.classList.add('active');
        lightBtn?.classList.remove('active');
    }

    themeToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-btn');
        if (!btn) return;
        
        const theme = btn.dataset.theme;
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('twilight_theme', theme);
        
        themeToggle.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
}

// ===== КНОПКА НАВЕРХ =====
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== МОДАЛЬНОЕ ОКНО ТОВАРА =====
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    const imageUrl = product.imageUrl || '';
    const imageContent = imageUrl 
        ? `<img src="${imageUrl}" alt="${product.name}" onerror="this.parentElement.innerHTML='${product.image}'">`
        : product.image;

    const inFavorites = isInFavorites(productId);

    modal.innerHTML = `
        <div class="product-modal__content">
            <button class="product-modal__close" onclick="this.closest('.product-modal').remove()">✕</button>
            <div class="product-modal__grid">
                <div class="product-modal__image">
                    ${imageContent}
                </div>
                <div class="product-modal__info">
                    <h2>${product.name}</h2>
                    <div class="product-modal__category">${product.categoryName}</div>
                    <p class="product-modal__description">${product.description}</p>
                    ${product.fullDescription ? `<p style="margin-bottom: 20px;">${product.fullDescription}</p>` : ''}
                    <div class="product-modal__price">${formatPrice(product.price)}</div>
                    <div class="product-modal__actions">
                        <button class="btn btn--primary" onclick="addToCart(${product.id}); this.closest('.product-modal').remove()">
                            🛒 В корзину
                        </button>
                        <button class="btn btn--secondary" onclick="toggleFavorite(${product.id}); updateModalFavorite(this, ${product.id})">
                            ${inFavorites ? '❤️ В избранном' : '🤍 В избранное'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('open'), 10);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function updateModalFavorite(btn, productId) {
    const inFavorites = isInFavorites(productId);
    btn.innerHTML = inFavorites ? '❤️ В избранном' : '🤍 В избранное';
}

// ===== КОРЗИНА =====
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            imageUrl: product.imageUrl,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification(`✅ ${product.name} добавлен в корзину`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('🗑️ Товар удалён из корзины');
}

function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const count = getCartCount();
    cartCountElements.forEach(el => el.textContent = count);

    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Корзина пуста</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item__image">
                        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.parentElement.innerHTML='${item.image}'">` : item.image}
                    </div>
                    <div class="cart-item__info">
                        <div class="cart-item__title">${item.name}</div>
                        <div class="cart-item__price">${formatPrice(item.price)}</div>
                        <div class="cart-item__quantity">
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="cart-item__remove" onclick="removeFromCart(${item.id})">Удалить</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = formatPrice(getCartTotal());
    }
}

// ===== ИЗБРАННОЕ =====
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const index = favorites.findIndex(item => item.id === productId);
    
    if (index === -1) {
        favorites.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            imageUrl: product.imageUrl
        });
        showNotification(`❤️ ${product.name} добавлен в избранное`);
    } else {
        favorites.splice(index, 1);
        showNotification(`💔 ${product.name} удалён из избранного`);
    }
    
    saveFavorites();
    renderProducts();
}

function removeFromFavorites(productId) {
    favorites = favorites.filter(item => item.id !== productId);
    saveFavorites();
    renderProducts();
    showNotification('🗑️ Товар удалён из избранного');
}

function isInFavorites(productId) {
    return favorites.some(item => item.id === productId);
}

function updateFavoritesUI() {
    const favoritesCountElements = document.querySelectorAll('#favoritesCount');
    favoritesCountElements.forEach(el => el.textContent = favorites.length);

    const favoritesItemsContainer = document.getElementById('favoritesItems');
    
    if (favoritesItemsContainer) {
        if (favorites.length === 0) {
            favoritesItemsContainer.innerHTML = '<p class="favorites-empty">Нет избранных товаров</p>';
        } else {
            favoritesItemsContainer.innerHTML = favorites.map(item => `
                <div class="favorite-item">
                    <div class="favorite-item__image">
                        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.parentElement.innerHTML='${item.image}'">` : item.image}
                    </div>
                    <div class="favorite-item__info">
                        <div class="favorite-item__title">${item.name}</div>
                        <div class="favorite-item__price">${formatPrice(item.price)}</div>
                        <div class="favorite-item__actions">
                            <button class="btn btn--small" onclick="addToCart(${item.id})">В корзину</button>
                            <button class="favorite-item__remove" onclick="removeFromFavorites(${item.id})">✕</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// ===== ОТРИСОВКА ТОВАРОВ =====
function renderProducts(containerId = 'catalogProducts', category = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px;color:var(--text-light);">Товары не найдены</p>';
        return;
    }

    container.innerHTML = filteredProducts.map(product => {
        const inFavorites = isInFavorites(product.id);
        const imageContent = product.imageUrl 
            ? `<img src="${product.imageUrl}" alt="${product.name}" onerror="this.parentElement.innerHTML='${product.image}'">`
            : product.image;
        
        return `
            <div class="product-card" onclick="showProductModal(${product.id})">
                ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
                <div class="product-card__image">
                    ${imageContent}
                    <button class="product-card__favorite ${inFavorites ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        ${inFavorites ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="product-card__content">
                    <div class="product-card__category">${product.categoryName}</div>
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__price">${formatPrice(product.price)}</div>
                    <div class="product-card__actions">
                        <button class="btn btn--primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                            🛒 В корзину
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featuredProducts = products.filter(p => p.badge === 'Хит').slice(0, 4);

    container.innerHTML = featuredProducts.map(product => {
        const inFavorites = isInFavorites(product.id);
        const imageContent = product.imageUrl 
            ? `<img src="${product.imageUrl}" alt="${product.name}" onerror="this.parentElement.innerHTML='${product.image}'">`
            : product.image;
        
        return `
            <div class="product-card" onclick="showProductModal(${product.id})">
                ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
                <div class="product-card__image">
                    ${imageContent}
                    <button class="product-card__favorite ${inFavorites ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        ${inFavorites ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="product-card__content">
                    <div class="product-card__category">${product.categoryName}</div>
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__price">${formatPrice(product.price)}</div>
                    <div class="product-card__actions">
                        <button class="btn btn--primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                            🛒 В корзину
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
function initSidebars() {
    const overlay = document.getElementById('overlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const favoritesSidebar = document.getElementById('favoritesSidebar');
    const cartBtn = document.getElementById('cartBtn');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const closeFavoritesBtn = document.getElementById('closeFavoritesBtn');

    function closeAllSidebars() {
        cartSidebar?.classList.remove('open');
        favoritesSidebar?.classList.remove('open');
        overlay?.classList.remove('open');
    }

    function openSidebar(sidebar) {
        closeAllSidebars();
        sidebar?.classList.add('open');
        overlay?.classList.add('open');
    }

    cartBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openSidebar(cartSidebar);
    });

    favoritesBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openSidebar(favoritesSidebar);
    });

    closeCartBtn?.addEventListener('click', closeAllSidebars);
    closeFavoritesBtn?.addEventListener('click', closeAllSidebars);
    overlay?.addEventListener('click', closeAllSidebars);
}

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            renderProducts('catalogProducts', category);
        });
    });
}

function initPromoCode() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = copyBtn.dataset.code;
            navigator.clipboard?.writeText(code).then(() => {
                showNotification('📋 Промокод скопирован!');
            }).catch(() => {
                alert(`Промокод: ${code}`);
            });
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('📧 Сообщение отправлено! Мы свяжемся с вами.');
            form.reset();
        });
    }
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация UI
    updateCartUI();
    updateFavoritesUI();
    initSidebars();
    initPromoCode();
    initContactForm();
    initTheme();
    initScrollToTop();

    // Рендеринг товаров
    if (document.getElementById('catalogProducts')) {
        renderProducts('catalogProducts', 'all');
        initTabs();
    }

    if (document.getElementById('featuredProducts')) {
        renderFeaturedProducts();
    }
});

// Экспорт функций для глобального доступа
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.toggleFavorite = toggleFavorite;
window.removeFromFavorites = removeFromFavorites;
window.showProductModal = showProductModal;
window.updateModalFavorite = updateModalFavorite;