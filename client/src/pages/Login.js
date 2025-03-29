import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const { login, error, clearError, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    clearError();
    
    const success = await login({ email, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab active">Đăng nhập</Link>
            <Link to="/register" className="auth-tab">Đăng ký</Link>
          </div>
          <div className="auth-form-content">
            <h2>Đăng nhập</h2>
            <p className="auth-subtitle">Đăng nhập để khám phá quà tặng phù hợp.</p>
            
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Nhập email của bạn"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Nhập mật khẩu của bạn"
                />
              </div>
              
              <div className="form-group">
                <div className="flex justify-between">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                    />
                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                  </div>
                  <a href="#!" className="forgot-password">Quên mật khẩu?</a>
                </div>
              </div>
              
              <button type="submit" className="btn w-full">ĐĂNG NHẬP</button>
            </form>
            
            <div className="social-auth">
              <p>Hoặc đăng nhập với</p>
              <div className="social-buttons">
                <button className="social-btn google">
                  <i className="fab fa-google"></i>
                  Tiếp tục với Google
                </button>
                <button className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                  Tiếp tục với Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-image">
          <div className="auth-image-content">
            <h1>Khám phá món quà hoàn hảo</h1>
            <p>Dựa trên tính cách của bạn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 