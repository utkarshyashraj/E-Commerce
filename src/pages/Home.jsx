import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/fakestore.js';
import ProductCard from '../components/ProductCard.jsx';
import Loader from '../components/Loader.jsx';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    productsApi
      .getAll()
      .then((data) => {
        if (mounted) setFeatured(data.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">New arrivals every week</span>
            <h1>
              Curated products.
              <br />
              Delivered to your door.
            </h1>
            <p className="lead">
              Browse our growing catalog of electronics, apparel, jewelry and more.
              Powered by the FakeStore API — built as a showcase React + React Router
              e-commerce app.
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop now
              </Link>
              <Link to="/cart" className="btn btn-ghost btn-lg">
                View cart
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
        </div>
      </section>

      <section className="container section">
        <header className="section-header">
          <h2>Featured products</h2>
          <Link to="/products" className="muted link">
            See all →
          </Link>
        </header>

        {loading ? (
          <Loader label="Loading featured products…" />
        ) : (
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="container section">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast shipping</h3>
            <p className="muted">Free shipping on orders over $50.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">↩</div>
            <h3>Easy returns</h3>
            <p className="muted">30-day hassle-free returns policy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure checkout</h3>
            <p className="muted">Your data is encrypted and protected.</p>
          </div>
        </div>
      </section>
    </>
  );
}
