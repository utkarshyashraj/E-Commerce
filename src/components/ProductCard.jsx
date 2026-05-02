import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
