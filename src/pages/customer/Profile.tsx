import { Field } from "../../components/ui/Field";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { mockCustomers } from "../../api/mockData";

export function Profile() {
  const profile = mockCustomers[1];
  return (
    <div>
      <PageHeader title="Profile" description="Keep your business details current — this is what appears on your quotations." />
      <form className="grid max-w-2xl gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field label="First Name" defaultValue={profile.firstName} />
        <Field label="Last Name" defaultValue={profile.lastName} />
        <Field label="Email" defaultValue={profile.email} type="email" />
        <Field label="Mobile Number" defaultValue={profile.mobileNumber} />
        <Field label="Company Name" defaultValue={profile.companyName} />
        <Field label="Business Type" defaultValue={profile.businessType} />
        <Field label="GSTIN" defaultValue={profile.gstin} />
        <Field label="City" defaultValue={profile.address.city} />
        <div className="sm:col-span-2">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
