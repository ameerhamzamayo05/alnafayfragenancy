const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In-memory products database
let products = [
  {
    id: 1,
    name: 'Rose Elegance',
    price: 1500,
    image: 'https://via.placeholder.com/300x300?text=Rose+Elegance',
    description: 'Beautiful rose perfume with fresh notes',
    category: 'floral'
  },
  {
    id: 2,
    name: 'Oud Premium',
    price: 2500,
    image: 'https://via.placeholder.com/300x300?text=Oud+Premium',
    description: 'Luxurious oud fragrance',
    category: 'oriental'
  }
];

let nextId = 3;

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all products (admin)
router.get('/products', verifyAdmin, (req, res) => {
  res.json(products);
});

// Add new product
router.post('/products', verifyAdmin, (req, res) => {
  const { name, price, image, description, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    image: image || 'https://via.placeholder.com/300x300?text=Product',
    description: description || '',
    category: category || 'other'
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/products/:id', verifyAdmin, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price, image, description, category } = req.body;
  
  if (name) product.name = name;
  if (price) product.price = price;
  if (image) product.image = image;
  if (description) product.description = description;
  if (category) product.category = category;

  res.json(product);
});

// Delete product
router.delete('/products/:id', verifyAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;