import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  if (!user) {
    return <div className="container text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Thông tin cá nhân
          </button>
          <button 
            className={`profile-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Sở thích & Mong muốn
          </button>
          <button 
            className={`profile-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Lịch sử quà tặng
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'info' && (
            <div className="profile-section">
              <h2>Thông tin cá nhân</h2>
              <form className="profile-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Họ và Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={user.name}
                    readOnly
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    readOnly
                  />
                </div>
                
                <div className="form-group">
                  <button type="button" className="btn">Cập nhật thông tin</button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div className="profile-section">
              <h2>Sở thích & Mong muốn</h2>
              <p>Hãy cho chúng tôi biết sở thích của bạn để nhận được gợi ý quà tặng phù hợp hơn.</p>
              
              <div className="preferences-form mt-4">
                <div className="form-group">
                  <label className="form-label">Danh mục yêu thích</label>
                  <div className="checkbox-group-vertical">
                    <div className="checkbox-item">
                      <input type="checkbox" id="tech" name="tech" />
                      <label htmlFor="tech">Công nghệ</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="fashion" name="fashion" />
                      <label htmlFor="fashion">Thời trang</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="home" name="home" />
                      <label htmlFor="home">Đồ gia dụng</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="books" name="books" />
                      <label htmlFor="books">Sách & Văn phòng phẩm</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Sở thích</label>
                  <div className="checkbox-group-vertical">
                    <div className="checkbox-item">
                      <input type="checkbox" id="reading" name="reading" />
                      <label htmlFor="reading">Đọc sách</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="travel" name="travel" />
                      <label htmlFor="travel">Du lịch</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="cooking" name="cooking" />
                      <label htmlFor="cooking">Nấu ăn</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="sports" name="sports" />
                      <label htmlFor="sports">Thể thao</label>
                    </div>
                  </div>
                </div>
                
                <button className="btn mt-3">Lưu sở thích</button>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="profile-section">
              <h2>Lịch sử quà tặng</h2>
              <p className="empty-state">
                Bạn chưa có lịch sử quà tặng nào.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 