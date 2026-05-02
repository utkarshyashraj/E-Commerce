export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
