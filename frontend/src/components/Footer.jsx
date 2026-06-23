import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>🍕 BiteSpeed</h3>
            <p>Bringing delicious meals straight to your college dorm room or doorstep, hot and fresh, in under 30 minutes.</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support & Contact</h3>
            <p>📍 Kavya Food Court, Block-C</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@bitespeed.edu</p>
          </div>
          <div className="footer-col">
            <h3>Timings</h3>
            <p>⏰ Monday - Sunday</p>
            <p>🕒 09:00 AM - 11:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BiteSpeed Food Ordering. Built as a College Mini Project with 🧡</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
