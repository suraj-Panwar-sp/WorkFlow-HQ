import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink-900 px-4 text-center">
      <p className="font-display text-6xl font-extrabold text-signal mb-3">404</p>
      <h1 className="font-display text-xl font-bold text-paper-100 mb-2">Page not found</h1>
      <p className="text-sm text-paper-100/50 max-w-sm mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/dashboard" className="btn-primary">
        Back to dashboard
      </Link>
    </div>
  );
}
