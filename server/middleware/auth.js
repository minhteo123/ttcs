const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Use mock data for demonstration
const useMockData = true;

// Mock user for demonstration
const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  preferences: {
    categories: ['Technology', 'Books'],
    tags: ['reading', 'music', 'technology']
  }
};

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // For mock data, accept any token
    if (useMockData) {
      req.user = mockUser;
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'giftsecret');

    // Add user from payload
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 