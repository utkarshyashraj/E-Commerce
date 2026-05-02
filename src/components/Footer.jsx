export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>ShopSphere</strong>
          <p className="muted">Your one-stop e-commerce demo.</p>
        </div>
        <div className="muted small">
          Powered by{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
            FakeStore API
          </a>{' '}
          • Built with React &amp; React Router
        </div>
        <div className="muted small">© {new Date().getFullYear()} ShopSphere</div>
      </div>
    </footer>
  );
}
