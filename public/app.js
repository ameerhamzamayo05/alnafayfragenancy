// Load and display products
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">Rs. ${product.price}</p>
          <p class="product-description">${product.description}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}')">Add to Cart</button>
        </div>
      `;
      productsList.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Add to cart (simple implementation)
function addToCart(productId, productName) {
  alert(`${productName} added to cart! (Shopping cart feature coming soon)`);
}

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});