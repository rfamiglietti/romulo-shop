import React from 'react';
import './HeroSection.css';

function HeroSection({ onLoginClick }) {
  return (
    <div className="hero">
      <h1>Bem-vindo à Romulo Shop</h1>
      <p>Os melhores produtos você encontra aqui!</p>
      <button className="btn-login" onClick={onLoginClick}>Login</button>
    </div>
  );
}

export default HeroSection;