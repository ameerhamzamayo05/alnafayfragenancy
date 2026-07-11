const express = require('express');
const router = express.Router();

// In-memory product database
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
  },
  {
    id: 3,
    name: 'Fresh Citrus',
    price: 1200,
    image: 'https://via.placeholder.com/300x300?text=Fresh+Citrus',
    description: 'Refreshing citrus blend',
    category: 'citrus'
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;