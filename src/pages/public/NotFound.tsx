import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="font-mono text-6xl text-indigo-200">404</p>
      <h1 className="mt-4 text-2xl">Page not found</h1>
      <Link to="/" className="btn-secondary mt-8 inline-flex">Back to Home</Link>
    </div>
  );
}
