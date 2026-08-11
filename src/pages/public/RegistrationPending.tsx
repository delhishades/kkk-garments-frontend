import { Link } from "react-router-dom";

export function RegistrationPending() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="label-tag mx-auto w-fit border-gold-500 text-gold-500">Pending Approval</p>
      <h1 className="mt-4 text-3xl">We've received your application</h1>
      <p className="mt-4 text-sm text-ink-soft">
        Our team reviews new trade accounts within 1–2 business days. You'll receive an email once your
        account and this device are approved and you can log in.
      </p>
      <Link to="/" className="btn-secondary mt-8 inline-flex">Back to Home</Link>
    </div>
  );
}
