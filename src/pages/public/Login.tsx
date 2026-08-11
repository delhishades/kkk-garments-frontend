import { Link } from "react-router-dom";
import { LoginForm } from "../../features/auth/LoginForm";

export function Login() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-tag text-rust-500">Trade Portal</p>
      <h1 className="text-3xl">Log In</h1>
      <p className="mt-2 mb-8 text-sm text-ink-soft">Approved customers and staff only.</p>
      <LoginForm />
      <div className="mt-6 flex justify-between text-xs">
        <Link to="/forgot-password" className="text-indigo-500 hover:underline">Forgot password?</Link>
        <Link to="/register" className="text-indigo-500 hover:underline">Request access</Link>
      </div>
    </div>
  );
}
