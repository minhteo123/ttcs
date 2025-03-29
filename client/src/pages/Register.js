import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const { register, error, clearError, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    clearError();
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    // Register user
    const success = await register({ name, email, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab">Đăng nhập</Link>
            <Link to="/register" className="auth-tab active">Đăng ký</Link>
          </div>
          <div className="auth-form-content">
            <h2>Đăng ký</h2>
            <p className="auth-subtitle">Tạo tài khoản để khám phá quà tặng phù hợp.</p>
            
            {(formError || error) && (
              <div className="alert alert-danger">
                {formError || error}
              </div>
            )}
            
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Họ và Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              
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
                <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="Nhập lại mật khẩu của bạn"
                />
              </div>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                  />
                  <label htmlFor="terms">
                    Tôi đồng ý với <a href="#!">Điều khoản dịch vụ</a> và <a href="#!">Chính sách bảo mật</a>
                  </label>
                </div>
              </div>
              
              <button type="submit" className="btn w-full">ĐĂNG KÝ</button>
            </form>
            
            <div className="social-auth">
              <p>Hoặc đăng ký với</p>
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

export default Register; 