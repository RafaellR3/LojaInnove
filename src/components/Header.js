import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const closeMenu = () => setMenuAberto(false);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" onClick={closeMenu} className="logo-link">
          <img src="images/logobranca.png" alt="Loja Innove" className="logo" />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
        <nav className={`nav ${menuAberto ? 'ativo' : ''}`}>
          <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>
            <FaHome className="icon" /> Home
          </Link>
          <Link to="/produtos" onClick={closeMenu} className={location.pathname === '/produtos' ? 'active' : ''}>
            <FaBoxOpen className="icon" /> Produtos
          </Link>
          <Link to="/carrinho" onClick={closeMenu} className={location.pathname === '/carrinho' ? 'active' : ''}>
            <FaShoppingCart className="icon" /> Carrinho
          </Link>
          <Link to="/favoritos" onClick={closeMenu} className={location.pathname === '/favoritos' ? 'active' : ''}>
            <FaHeart className="icon" /> Favoritos
          </Link>
          <Link to="/perfil" onClick={closeMenu} className={location.pathname === '/perfil' ? 'active' : ''}>
            <FaUser className="icon" /> Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
