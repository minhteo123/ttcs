const Gift = require('../models/Gift');

// Get all gifts
exports.getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get gift by ID
exports.getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    res.json(gift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get gifts by category
exports.getGiftsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const gifts = await Gift.find({ category });
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search gifts
exports.searchGifts = async (req, res) => {
  try {
    const { query } = req.query;
    const gifts = await Gift.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    });
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Recommend gifts based on user preferences
exports.recommendGifts = async (req, res) => {
  try {
    const { preferences } = req.user;
    let recommendedGifts = [];
    
    if (preferences && Object.keys(preferences).length > 0) {
      // Sample recommendation logic based on user preferences
      const preferredCategories = preferences.categories || [];
      const preferredTags = preferences.tags || [];
      
      if (preferredCategories.length > 0 || preferredTags.length > 0) {
        recommendedGifts = await Gift.find({
          $or: [
            { category: { $in: preferredCategories } },
            { tags: { $in: preferredTags } }
          ]
        }).limit(10);
      }
    }
    
    // If no recommendations based on preferences, return top rated gifts
    if (recommendedGifts.length === 0) {
      recommendedGifts = await Gift.find().sort({ rating: -1 }).limit(10);
    }
    
    res.json(recommendedGifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 