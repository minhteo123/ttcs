import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await axios.get(`${API_URL}/gifts`);
        setGifts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(gift => gift.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gifts');
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/gifts/search?query=${searchTerm}`);
      setGifts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Search failed');
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/gifts/category/${category}`);
      setGifts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to filter by category');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Khám phá món quà hoàn hảo</h1>
          <p>Tìm kiếm món quà phù hợp với tính cách và sở thích của người thân yêu</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm món quà..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn">Tìm kiếm</button>
          </form>
        </div>
      </div>
      
      <div className="categories-section">
        <div className="container">
          <h2>Danh mục</h2>
          <div className="categories-list">
            <button 
              className="category-item active"
              onClick={() => window.location.reload()}
            >
              Tất cả
            </button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                className="category-item"
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="gifts-section">
        <div className="container">
          <h2>Món quà gợi ý</h2>
          
          {gifts.length === 0 ? (
            <div className="text-center mt-5">Không tìm thấy món quà nào</div>
          ) : (
            <div className="gifts-grid">
              {gifts.map(gift => (
                <div key={gift._id} className="gift-card">
                  <div className="gift-image">
                    <img src={gift.imageUrl} alt={gift.name} />
                  </div>
                  <div className="gift-info">
                    <h3>{gift.name}</h3>
                    <p className="gift-price">{gift.price.toLocaleString()} đ</p>
                    <p className="gift-category">{gift.category}</p>
                    <Link to={`/gift/${gift._id}`} className="btn">Xem chi tiết</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 