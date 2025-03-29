const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Use mock data for demonstration
const useMockData = true;

// Mock user for demonstration
const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  password: '$2a$10$yw5DVmCxtEiEt0j8xHl72OkM2pwNOBUwCOJyutJ/SxRsQFjXrDvQq' // hashed 'password123'
};

// Register user - POST /api/auth/register
router.post('/register', (req, res) => {
  if (useMockData) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    
    if (email === mockUser.email) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const token = jwt.sign(
      { id: 'new-user-123' },
      process.env.JWT_SECRET || 'giftsecret',
      { expiresIn: '1d' }
    );
    
    return res.status(201).json({
      token,
      user: {
        id: 'new-user-123',
        name,
        email
      }
    });
  }
  
  authController.register(req, res);
});

// Login user - POST /api/auth/login
router.post('/login', (req, res) => {
  if (useMockData) {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    
    if (email !== mockUser.email) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // For demo purposes, accept any password
    const token = jwt.sign(
      { id: mockUser._id },
      process.env.JWT_SECRET || 'giftsecret',
      { expiresIn: '1d' }
    );
    
    return res.json({
      token,
      user: {
        id: mockUser._id,
        name: mockUser.name,
        email: mockUser.email
      }
    });
  }
  
  authController.login(req, res);
});

// Get current user - GET /api/auth/me
router.get('/me', auth, (req, res) => {
  if (useMockData) {
    return res.json({
      _id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
      preferences: {
        categories: ['Technology', 'Books'],
        tags: ['reading', 'music', 'technology']
      }
    });
  }
  
  authController.getCurrentUser(req, res);
});

module.exports = router; 