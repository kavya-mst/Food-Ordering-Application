import React from 'react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const itemId = item.id ?? item._id;
  const cartItem = cartItems.find((ci) => ci.id === itemId);
  const quantity = cartItem?.quantity || 0;
  const { name, description, price, rating, category, image } = item;

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, quantity - 1);
    }
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
          {quantity > 0 ? (
            <div className="quantity-controller food-quantity-controller">
              <button className="quantity-btn" onClick={handleDecrease}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(itemId, quantity + 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => addToCart(item)}>
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
