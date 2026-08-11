import { PageHeader } from "../../components/ui/PageHeader";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";

export function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <PageHeader eyebrow="Get in touch" title="Contact" description="Questions about trade accounts, existing quotations, or bulk capacity." />
      <form className="grid gap-5 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <div className="md:col-span-2">
          <label className="field-label" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} className="input-field" required />
        </div>
        <div className="md:col-span-2">
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </div>
  );
}
