let adminToken = null;

// Check if admin is logged in
function checkAuth() {
  adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    window.location.href = '/admin/login';
  }
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
});

// Sidebar navigation
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    // Add active to clicked link
    link.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected section
    const sectionId = link.getAttribute('data-section') + '-section';
    document.getElementById(sectionId).classList.add('active');
  });
});

// Load products
async function loadProducts() {
  try {
    const response = await fetch('/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
      return;
    }

    const products = await response.json();
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>Rs. ${product.price}</td>
        <td>${product.category}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
            <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Add product
document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const category = document.getElementById('productCategory').value;
  const image = document.getElementById('productImage').value;
  const description = document.getElementById('productDescription').value;

  try {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        category,
        image,
        description
      })
    });

    if (response.ok) {
      alert('Product added successfully!');
      document.getElementById('addProductForm').reset();
      loadProducts();
    } else {
      alert('Error adding product');
    }
  } catch (error) {
    console.error('Error adding product:', error);
  }
});

// Delete product
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  try {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    if (response.ok) {
      alert('Product deleted successfully!');
      loadProducts();
    } else {
      alert('Error deleting product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Edit product (simplified)
function editProduct(id) {
  alert('Edit feature coming soon!');
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadProducts();
});