import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import * as authService from "../../services/authService";

export function RegisterForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await authService.register(Object.fromEntries(formData));
    setSubmitting(false);
    navigate("/registration-pending");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg">Account Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name" name="lastName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Mobile Number" name="mobile" type="tel" required />
          <Field label="Password" name="password" type="password" required />
          <Field label="Confirm Password" name="confirmPassword" type="password" required />
        </div>
      </section>

      <section className="section-rule pt-8">
        <h2 className="mb-4 text-lg">Business Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" required />
          <Field label="Business Type" name="businessType" required placeholder="Retailer / Distributor / ..." />
          <Field label="GSTIN" name="gstin" hint="If applicable" />
          <Field label="Business Address" name="address" required />
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
          <Field label="Country" name="country" required />
          <Field label="Postal Code" name="postalCode" required />
        </div>
      </section>

      <section className="section-rule pt-8">
        <h2 className="mb-4 text-lg">Optional</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Website" name="website" type="url" />
          <Field label="WhatsApp Number" name="whatsapp" type="tel" />
          <Field label="Expected Monthly Purchase Volume" name="expectedVolume" />
        </div>
      </section>

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Submitting…" : "Submit for Approval"}
      </Button>
    </form>
  );
}
