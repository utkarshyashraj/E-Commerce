export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader">
      <div className="spinner" aria-hidden="true" />
      <span className="muted">{label}</span>
    </div>
  );
}
