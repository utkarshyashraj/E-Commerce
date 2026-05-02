import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Cart() {
  const {
    items,
    subtotal,
    shipping,
    tax,
    total,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      setPlacing(false);
      setPlaced(true);
    }, 900);
  };

  if (placed) {
    return (
      <section className="container section">
        <div className="success-box">
          <h2>Order placed 🎉</h2>
          <p className="muted">Thanks for shopping with ShopSphere. Your demo order was recorded.</p>
          <Link to="/products" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container section">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p className="muted">Browse products and add something you love.</p>
          <Link to="/products" className="btn btn-primary">
            Shop products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <header className="section-header">
        <div>
          <h2>Your cart</h2>
          <p className="muted">{totalItems} item(s)</p>
        </div>
        <button className="btn btn-ghost" onClick={clearCart}>
          Clear cart
        </button>
      </header>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-thumb" />
              <div className="cart-info">
                <Link to={`/products/${item.id}`} className="cart-title">
                  {item.title}
                </Link>
                <span className="muted small">{item.category}</span>
                <span className="cart-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-qty">
                <div className="qty-control">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-link small"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <div className="cart-line-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handleCheckout}
            disabled={placing}
          >
            {placing ? 'Placing order…' : 'Checkout'}
          </button>
          {!isAuthenticated && (
            <p className="muted small center">You’ll be asked to sign in first.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
