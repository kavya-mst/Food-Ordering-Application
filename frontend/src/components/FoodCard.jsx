import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { name, description, price, rating, category, image } = item;

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please Login First');
      navigate('/signin');
      return;
    }

    addToCart(item);
  };

  return (
    <div className="food-card">
      <div className="food-image-wrapper">
        <img src={image} alt={name} className="food-image" loading="lazy" />
        <span className="food-category-tag">{category}</span>
        <span className="food-rating-tag">
          <span className="food-rating-star">★</span> {rating}
        </span>
      </div>

      <div className="food-info">
        <h4 className="food-name">{name}</h4>
        <p className="food-description">{description}</p>

        <div className="food-footer">
          <span className="food-price">₹{price}</span>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;