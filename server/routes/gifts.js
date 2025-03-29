const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const auth = require('../middleware/auth');

// Mock data for gifts (to use when DB is not available)
const mockGifts = [
  {
    _id: '60d21b4967d0d8992e610c85',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation for an immersive audio experience.',
    price: 1500000,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['music', 'technology', 'audio', 'wireless'],
    rating: 4.7
  },
  {
    _id: '60d21b4967d0d8992e610c86',
    name: 'Smart Watch',
    description: 'A versatile smartwatch that helps you track your fitness goals, manage notifications, and stay connected.',
    price: 2300000,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['wearable', 'technology', 'fitness', 'watch'],
    rating: 4.5
  },
  {
    _id: '60d21b4967d0d8992e610c87',
    name: 'Leather Wallet',
    description: 'Elegant leather wallet with multiple card slots and RFID protection for everyday use.',
    price: 650000,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    tags: ['accessories', 'fashion', 'leather', 'wallet'],
    rating: 4.3
  },
  {
    _id: '60d21b4967d0d8992e610c88',
    name: 'Aromatic Candle Set',
    description: 'A set of 3 aromatic candles to create a warm and relaxing atmosphere in any home.',
    price: 450000,
    category: 'Home Decor',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['home', 'decor', 'relaxation', 'candle'],
    rating: 4.8
  },
  {
    _id: '60d21b4967d0d8992e610c89',
    name: 'Coffee Machine',
    description: 'Automatic coffee machine that makes delicious espresso, cappuccino, and other coffee varieties at home.',
    price: 3800000,
    category: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1595246161325-8c1f4442ff9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['kitchen', 'coffee', 'appliance', 'beverages'],
    rating: 4.6
  },
  {
    _id: '60d21b4967d0d8992e610c8a',
    name: 'Plant Terrarium',
    description: 'A beautiful glass terrarium with small plants for a touch of nature in indoor spaces.',
    price: 750000,
    category: 'Home Decor',
    imageUrl: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['plants', 'decor', 'nature', 'home'],
    rating: 4.4
  },
  {
    _id: '60d21b4967d0d8992e610c8b',
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat for comfortable home workouts and meditation sessions.',
    price: 550000,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    tags: ['yoga', 'fitness', 'exercise', 'wellness'],
    rating: 4.2
  },
  {
    _id: '60d21b4967d0d8992e610c8c',
    name: 'Book Collection',
    description: 'A curated collection of bestselling books for avid readers and book enthusiasts.',
    price: 900000,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    tags: ['books', 'reading', 'literature', 'collection'],
    rating: 4.9
  },
  {
    _id: '60d21b4967d0d8992e610c8d',
    name: 'Handcrafted Jewelry Box',
    description: 'Beautiful handcrafted wooden jewelry box with multiple compartments and a mirror.',
    price: 1200000,
    category: 'Home Decor',
    imageUrl: 'https://images.unsplash.com/photo-1631125915902-d8abe50b8e1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    tags: ['jewelry', 'storage', 'wooden', 'handcrafted'],
    rating: 4.6
  },
  {
    _id: '60d21b4967d0d8992e610c8e',
    name: 'Digital Camera',
    description: 'High-resolution digital camera with multiple lenses for photography enthusiasts.',
    price: 5500000,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    tags: ['photography', 'technology', 'camera', 'digital'],
    rating: 4.8
  },
  {
    _id: '60d21b4967d0d8992e610c8f',
    name: 'Luxury Perfume Set',
    description: 'A collection of luxury perfumes in an elegant gift box, perfect for fragrance lovers.',
    price: 2800000,
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-b434362febd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['perfume', 'beauty', 'fragrance', 'luxury'],
    rating: 4.7
  },
  {
    _id: '60d21b4967d0d8992e610c90',
    name: 'Gourmet Chocolate Box',
    description: 'Premium assortment of handcrafted chocolates from around the world in a luxury gift box.',
    price: 850000,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['chocolate', 'food', 'gourmet', 'sweets'],
    rating: 4.9
  }
];

// Use mock data for demonstration
const useMockData = true;

// Get all gifts - GET /api/gifts
router.get('/', (req, res) => {
  if (useMockData) {
    return res.json(mockGifts);
  }
  giftController.getAllGifts(req, res);
});

// Get gift by ID - GET /api/gifts/:id
router.get('/:id', (req, res) => {
  if (useMockData) {
    const gift = mockGifts.find(g => g._id === req.params.id);
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    return res.json(gift);
  }
  giftController.getGiftById(req, res);
});

// Get gifts by category - GET /api/gifts/category/:category
router.get('/category/:category', (req, res) => {
  if (useMockData) {
    const gifts = mockGifts.filter(g => g.category.toLowerCase() === req.params.category.toLowerCase());
    return res.json(gifts);
  }
  giftController.getGiftsByCategory(req, res);
});

// Search gifts - GET /api/gifts/search?query=searchterm
router.get('/search', (req, res) => {
  if (useMockData) {
    const { query } = req.query;
    if (!query) {
      return res.json(mockGifts);
    }
    
    const lowerQuery = query.toLowerCase();
    const gifts = mockGifts.filter(g => 
      g.name.toLowerCase().includes(lowerQuery) || 
      g.description.toLowerCase().includes(lowerQuery) || 
      g.category.toLowerCase().includes(lowerQuery) ||
      g.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    
    return res.json(gifts);
  }
  giftController.searchGifts(req, res);
});

// Get recommended gifts for user - GET /api/gifts/recommend
router.get('/recommend', auth, (req, res) => {
  if (useMockData) {
    // For mock data, just return some top-rated gifts
    const recommendedGifts = [...mockGifts].sort((a, b) => b.rating - a.rating).slice(0, 5);
    return res.json(recommendedGifts);
  }
  giftController.recommendGifts(req, res);
});

module.exports = router; 