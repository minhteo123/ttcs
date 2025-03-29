const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const giftRoutes = require('./routes/gifts');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection - try to connect but continue if it fails
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gift-discovery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error, using mock data:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gifts', giftRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Gift Discovery API is running');
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 