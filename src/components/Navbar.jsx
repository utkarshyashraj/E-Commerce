import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const renderNavLinks = () => (
    <div className="nav-links">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
        Products
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
        Cart
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </NavLink>
    </div>
  );

  const renderNavActions = () => (
    <div className="nav-actions">
      {isAuthenticated ? (
        <>
          <span className="user-pill">Hi, {user.username}</span>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
          Login
        </Link>
      )}
    </div>
  );

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner container">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">◆</span>
            <span>ShopSphere</span>
          </Link>

          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className="nav-panel nav-panel--desktop" aria-label="Primary">
            {renderNavLinks()}
            {renderNavActions()}
          </nav>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {renderNavLinks()}
        {renderNavActions()}
      </nav>
    </>
  );
}
