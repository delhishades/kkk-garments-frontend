import { PageHeader } from "../../components/ui/PageHeader";

export function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <PageHeader
        eyebrow="Since inception"
        title="About KKK Garments"
        description="A clothing manufacturer and wholesaler serving approved business customers with bulk production runs."
      />
      <div className="prose-sm space-y-4 text-sm text-ink-soft">
        <p>
          We manufacture and supply apparel in bulk to retailers, distributors and corporate buyers. Every
          account on this platform is reviewed before catalog access is granted, and every login is tied to a
          device our team has approved — the same discipline we apply on the factory floor extends to how we
          run this ordering system.
        </p>
        <p>
          Once a quotation is submitted, our commercial team takes it from there: confirming quantities,
          production timelines, and payment terms offline, the way business has always been done between us
          and our trade partners.
        </p>
      </div>
    </div>
  );
}
