import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../api/fakestore.js';
import { useCart } from '../context/CartContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const load = () => {
    setLoading(true);
    setError(null);
    productsApi
      .getById(id)
      .then((data) => {
        if (!data || !data.id) throw new Error('Product not found');
        setProduct(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleAdd = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="container section"><Loader /></div>;
  if (error) return <div className="container section"><ErrorMessage message={error} onRetry={load} /></div>;
  if (!product) return null;

  return (
    <section className="container section">
      <div className="breadcrumbs muted small">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{' '}
        <span>{product.title}</span>
      </div>

      <div className="product-detail">
        <div className="product-detail-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-body">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="price-large">${product.price.toFixed(2)}</div>
          <p className="lead">{product.description}</p>

          <div className="qty-row">
            <label className="muted small">Quantity</label>
            <div className="qty-control">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="cta-row">
            <button className="btn btn-primary btn-lg" onClick={handleAdd}>
              Add to Cart · ${(product.price * quantity).toFixed(2)}
            </button>
            <Link to="/products" className="btn btn-ghost btn-lg">
              Keep browsing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
