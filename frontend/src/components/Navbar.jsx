import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { currentUser, logoutUser } = useAuth();
  const { cartCount, clearCartOnLogout } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCartOnLogout();
    logoutUser();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
          🍕 BiteSpeed
        </Link>

        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/menu" className="nav-link">
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className="nav-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </li>

          <li className="nav-user">
            {currentUser ? (
              <>
                <Link to="/profile" className="profile-link">
                  👤 {currentUser?.name?.split(' ')[0] || 'User'}
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin" className="btn btn-primary btn-sm">
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
