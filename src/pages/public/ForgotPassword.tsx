import { useState } from "react";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import * as authService from "../../services/authService";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await authService.requestPasswordReset(email);
    setSubmitting(false);
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl">Reset Password</h1>
      <p className="mt-2 mb-8 text-sm text-ink-soft">Enter the email on your trade account and we'll send reset instructions.</p>
      {sent ? (
        <p className="border border-sage-500 bg-sage-50 p-4 text-sm text-sage-600">
          If an account matches that email, reset instructions are on their way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Sending…" : "Send Reset Link"}
          </Button>
        </form>
      )}
    </div>
  );
}
