// src/Component/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' ,BussinessRole:''});
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.BussinessRole) {
      return toast.error('All fields are required');
    }
    try {
      const res = await axios.post('http://localhost:5000/user/login', formData);
      toast.success("Login Successful");
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="BussinessRole" placeholder="BussinessRole" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p style={{ textAlign: 'center' }}>
          Don&apos;t have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
