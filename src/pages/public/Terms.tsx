import { PageHeader } from "../../components/ui/PageHeader";

export function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-sm text-ink-soft">
      <PageHeader title="Terms & Conditions" />
      <p>
        Access to this catalog and quotation tool is restricted to approved business customers. Quotations
        generated through this platform are indicative and do not constitute an order until confirmed offline
        with our sales team. Pricing is subject to the tier in effect at the time of quotation submission and
        is not retroactively altered by later price changes.
      </p>
    </div>
  );
}
