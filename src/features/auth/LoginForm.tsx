import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";

export function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      navigate(user.role === "CUSTOMER" ? "/account/quotations" : "/admin/dashboard");
    } catch {
      setError("Unable to sign in. Check your credentials and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <Field label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-xs text-rust-500">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing In…" : "Log In"}
      </Button>
      <p className="text-xs text-ink-soft">
        Demo: use an email containing "admin" for the admin portal, any other email for the customer portal.
      </p>
    </form>
  );
}
