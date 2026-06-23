import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders, loadOrders } = useCart();

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      loadOrders();
    }, 3000);
    return () => clearInterval(interval);
  }, [loadOrders]);

  if (!order) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">❌</span>
          <h3>Order Not Found</h3>
          <p>We couldn't locate any order with ID: <strong>{orderId}</strong>.</p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const stages = [
    { label: 'Order Received', icon: '📥' },
    { label: 'Order Accepted', icon: '✅' },
    { label: 'Preparing Food', icon: '🍳' },
    { label: 'Out For Delivery', icon: '🛵' },
    { label: 'Delivered', icon: '🏠' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.label === order.status);
  const isRejected = order.status === 'Rejected';

  // Calculate percentage for progress line width
  let progressWidth = 0;
  if (!isRejected && currentStageIndex !== -1) {
    progressWidth = (currentStageIndex / (stages.length - 1)) * 100;
  }

  return (
    <div className="container">
      <div className="confirmation-layout">
        
        {/* Header Success / Cancelled */}
        <div className="conf-header">
          {isRejected ? (
            <>
              <span className="conf-icon-success" style={{ color: 'var(--danger)' }}>⚠️</span>
              <h2 style={{ color: 'var(--danger)' }}>Order Cancelled</h2>
              <p>We are sorry, your order was rejected by the kitchen.</p>
            </>
          ) : (
            <>
              <span className="conf-icon-success">🎉</span>
              <h2>Order Placed Successfully!</h2>
              <p>Your kitchen is preparing something delicious.</p>
            </>
          )}
        </div>

        {/* Order Details Panel */}
        <div className="order-meta-grid">
          <div className="meta-item">
            <label>Order ID</label>
            <span>#{order.id}</span>
          </div>
          <div className="meta-item">
            <label>Date & Time</label>
            <span>{order.timestamp}</span>
          </div>
          <div className="meta-item">
            <label>Total Price</label>
            <span style={{ color: 'var(--primary)' }}>₹{order.totalAmount}</span>
          </div>
          <div className="meta-item">
            <label>Payment Method</label>
            <span>{order.shippingDetails.paymentMethod}</span>
          </div>
        </div>

        {/* Live Progress Tracker */}
        {!isRejected ? (
          <div className="tracker-container">
            <h3 className="tracker-title">Live Tracking Status</h3>
            
            <div className="tracker-steps">
              {/* Animated Progress Line */}
              <div 
                className="tracker-progress-line" 
                style={
                  window.innerWidth > 768 
                    ? { width: `${progressWidth}%` } 
                    : { height: `${progressWidth}%` }
                }
              />

              {stages.map((stage, idx) => {
                let statusClass = '';
                if (idx < currentStageIndex) {
                  statusClass = 'completed';
                } else if (idx === currentStageIndex) {
                  statusClass = 'active';
                }

                return (
                  <div key={stage.label} className={`tracker-step ${statusClass}`}>
                    <div className="tracker-node" title={stage.label}>
                      {idx < currentStageIndex ? '✓' : stage.icon}
                    </div>
                    <div className="tracker-label">
                      {stage.label}
                      {order.statusTimeline && (
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
                          {order.statusTimeline.find((t) => t.status === stage.label)?.time || ''}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--danger-light)', border: '1px solid var(--danger)', borderRadius: 'var(--radius)', padding: '1rem 1.5rem', textAlign: 'center', marginBottom: '2rem', color: '#721c24' }}>
            <strong>Store Notice:</strong> This order was cancelled. Please check menu options or try ordering again.
          </div>
        )}

        {/* Summary of Items */}
        <div className="order-items-summary">
          <h4>Items Ordered</h4>
          {order.items.map((item) => (
            <div key={item.id} className="summary-item-row">
              <span>{item.name} <strong style={{ color: 'var(--text-muted)' }}>x{item.quantity}</strong></span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          
          <div className="summary-item-row" style={{ fontWeight: '700', fontSize: '1rem', borderTop: '2px dashed var(--gray-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
            <span>Grand Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
          <Link to="/menu" className="btn btn-secondary">
            Order More Food
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
