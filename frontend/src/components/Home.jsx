import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Our E-Commerce App! 🛒</h1>
      <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to continue.</p>
    </div>
  );
};

export default Home;
