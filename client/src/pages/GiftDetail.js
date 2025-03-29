import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './GiftDetail.css';

const API_URL = 'http://localhost:5000/api';

const GiftDetail = () => {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [relatedGifts, setRelatedGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const res = await axios.get(`${API_URL}/gifts/${id}`);
        setGift(res.data);
        
        // Fetch related gifts by category
        const relatedRes = await axios.get(`${API_URL}/gifts/category/${res.data.category}`);
        // Filter out the current gift and limit to 4 related gifts
        const filtered = relatedRes.data.filter(g => g._id !== id).slice(0, 4);
        setRelatedGifts(filtered);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gift details');
        setLoading(false);
      }
    };

    fetchGift();
  }, [id]);

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5 alert alert-danger">{error}</div>;
  }

  if (!gift) {
    return <div className="container text-center mt-5">Gift not found</div>;
  }

  return (
    <div className="gift-detail-container">
      <div className="container">
        <div className="gift-detail">
          <div className="gift-detail-image">
            <img src={gift.imageUrl} alt={gift.name} />
          </div>
          <div className="gift-detail-info">
            <h1>{gift.name}</h1>
            <p className="gift-detail-price">{gift.price.toLocaleString()} đ</p>
            <p className="gift-detail-category">Danh mục: <span>{gift.category}</span></p>
            
            <div className="gift-detail-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{gift.description}</p>
            </div>
            
            {gift.tags && gift.tags.length > 0 && (
              <div className="gift-detail-tags">
                <h3>Tags</h3>
                <div className="tags-list">
                  {gift.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="gift-detail-actions">
              <button className="btn gift-btn">Mua ngay</button>
              <button className="btn btn-outline gift-btn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        
        {relatedGifts.length > 0 && (
          <div className="related-gifts">
            <h2>Quà tặng tương tự</h2>
            <div className="gifts-grid">
              {relatedGifts.map(relatedGift => (
                <div key={relatedGift._id} className="gift-card">
                  <div className="gift-image">
                    <img src={relatedGift.imageUrl} alt={relatedGift.name} />
                  </div>
                  <div className="gift-info">
                    <h3>{relatedGift.name}</h3>
                    <p className="gift-price">{relatedGift.price.toLocaleString()} đ</p>
                    <p className="gift-category">{relatedGift.category}</p>
                    <Link to={`/gift/${relatedGift._id}`} className="btn">Xem chi tiết</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftDetail; 