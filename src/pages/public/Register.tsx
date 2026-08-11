import { PageHeader } from "../../components/ui/PageHeader";
import { RegisterForm } from "../../features/auth/RegisterForm";

export function Register() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <PageHeader
        eyebrow="Trade account"
        title="Register for Trade Access"
        description="Every account is reviewed by our team before catalog access is granted."
      />
      <RegisterForm />
    </div>
  );
}
