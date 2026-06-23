import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodData } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const popularDishes = foodData
    .filter((item) => item.rating >= 4.7)
    .slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/menu?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    { name: 'North Indian', icon: '🍲' },
    { name: 'South Indian', icon: '🫓' },
    { name: 'Fast Food', icon: '🍔' },
    { name: 'Chinese', icon: '🥢' },
    { name: 'Desserts', icon: '🍨' }
  ];

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Craving Delicious Food?</h1>
            <p>Order yummy dishes from BiteSpeed and get them delivered hot & fast!</p>
            <form onSubmit={handleSearchSubmit} className="search-container">
              <input
                type="text"
                placeholder="Search for your favorite dishes (e.g. Biryani, Burger)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </section>

      <div className="container">
        <section style={{ marginBottom: '3rem' }}>
          <h3 className="section-title">Explore Food Categories</h3>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="section-title">Our Popular Dishes</h3>
          <div className="menu-grid">
            {popularDishes.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn btn-outline" onClick={() => navigate('/menu')}>
              View Entire Menu &rarr;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
