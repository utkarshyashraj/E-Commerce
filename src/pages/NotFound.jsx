import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container section">
      <div className="empty">
        <h2>404 — Page not found</h2>
        <p className="muted">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
