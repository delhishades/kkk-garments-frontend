import { PageHeader } from "../../components/ui/PageHeader";

export function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-sm text-ink-soft">
      <PageHeader title="Privacy Policy" />
      <p>
        We collect the business and device information required to approve your account and secure your
        login. This information is used only to operate your trade account, generate quotations, and maintain
        an audit trail of account and pricing changes. We do not sell customer data.
      </p>
    </div>
  );
}
