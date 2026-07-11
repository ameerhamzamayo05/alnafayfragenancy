// ===== AL NAFAY FRAGRANCE - MAIN APP =====

// ---- CART STATE ----
let cart = JSON.parse(localStorage.getItem('alnafay_cart') || '[]');

function saveCart() {
  localStorage.setItem('alnafay_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  renderCart();
}

function addToCart(id, e) {
  if (e) e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  saveCart();
  showToast(`✓ ${p.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function renderCart() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!el) return;
  if (cart.length === 0) {
    el.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>';
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `Rs. ${total.toLocaleString()}`;
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function checkout() {
  if (cart.length === 0) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = `Hello! I'd like to place an order:\n\n${cart.map(i => `• ${i.name} x${i.qty} = Rs. ${(i.price*i.qty).toLocaleString()}`).join('\n')}\n\nTotal: Rs. ${total.toLocaleString()}`;
  window.open(`https://wa.me/923000000000?text=${encodeURIComponent(msg)}`, '_blank');
}

// ---- PRODUCTS RENDER ----
function renderProducts() {
  const bestGrid = document.getElementById('productsGrid');
  const newGrid = document.getElementById('newArrivalsGrid');
  if (bestGrid) {
    bestGrid.innerHTML = PRODUCTS.filter(p => p.isBestSeller).map(productCard).join('');
  }
  if (newGrid) {
    newGrid.innerHTML = PRODUCTS.filter(p => p.isNew).map(productCard).join('');
  }
}

function productCard(p) {
  return `
    <div class="product-card" onclick="openModal(${p.id})">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-category">${p.category} · ${p.type}</div>
        <div class="product-price-row">
          <div>
            <span class="product-price">Rs. ${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="product-price-old">Rs. ${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id}, event)">+ Add</button>
        </div>
      </div>
    </div>
  `;
}

// ---- MODAL ----
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img">${p.emoji}</div>
    <div class="modal-info">
      <div class="modal-brand">${p.brand}</div>
      <div class="modal-name">${p.name}</div>
      <div class="modal-category">${p.category} · ${p.type}</div>
      <div class="modal-desc">${p.description}</div>
      <div class="modal-price">
        Rs. ${p.price.toLocaleString()}
        ${p.oldPrice ? `<span class="modal-old-price">Rs. ${p.oldPrice.toLocaleString()}</span>` : ''}
      </div>
      <div class="modal-actions">
        <button class="btn-primary" onclick="addToCart(${p.id}); closeModal();">Add to Cart 🛍</button>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ---- SEARCH ----
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('active');
  if (bar.classList.contains('active')) document.getElementById('searchInput').focus();
}

function searchProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  if (!q) { renderProducts(); return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  const bestGrid = document.getElementById('productsGrid');
  if (bestGrid) bestGrid.innerHTML = results.length
    ? results.map(productCard).join('')
    : '<p style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px 0;">No products found for "' + q + '"</p>';
}

// ---- CATEGORY FILTER ----
function filterCategory(cat) {
  const filtered = PRODUCTS.filter(p => p.category === cat || p.type === cat);
  const bestGrid = document.getElementById('productsGrid');
  if (bestGrid) {
    bestGrid.innerHTML = filtered.length
      ? filtered.map(productCard).join('')
      : `<p style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px 0;">No products in "${cat}" category</p>`;
    document.querySelector('#bestsellers').scrollIntoView({ behavior: 'smooth' });
  }
}

// ---- HERO SLIDER ----
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function changeSlide(dir) { goToSlide(currentSlide + dir); }

let sliderTimer = setInterval(() => changeSlide(1), 5000);

// ---- NAV TOGGLE (mobile) ----
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

// ---- HEADER SCROLL ----
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 60) header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
  else header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
});

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- FORMS ----
function submitForm(e) {
  e.preventDefault();
  showToast('✓ Message sent! We\'ll get back to you soon.');
  e.target.reset();
}

function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('✓ Subscribed! Welcome to Al Nafay Fragrance.');
  e.target.reset();
}

// ---- SMOOTH NAV LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('nav').classList.remove('open');
    }
  });
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
});
