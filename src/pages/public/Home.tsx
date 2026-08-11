import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <section className="border-b border-ink/15 bg-canvas-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-tag text-rust-500">
              Est. wholesale garment manufacturing
            </p>
            <h1 className="text-4xl leading-tight md:text-5xl">
              Bulk quotations, quoted your way — approved partners only.
            </h1>
            <p className="mt-5 max-w-md text-sm text-ink-soft">
              Browse the full production catalog, build a bulk order across sizes and colors, and receive a
              typeset quotation the moment you submit. Payment and fulfillment continue the way they always
              have: offline, by phone, on your terms.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/register" className="btn-primary">Request Trade Access</Link>
              <Link to="/catalog" className="btn-secondary">View Catalog</Link>
            </div>
          </div>
          <div className="card p-8">
            <p className="label-tag border-indigo-500 text-indigo-500">Sample Quotation</p>
            <dl className="mt-4 space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <dt className="text-ink-soft">Quotation No.</dt>
                <dd>QT-2026-000041</dd>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <dt className="text-ink-soft">Classic Polo · Black · S</dt>
                <dd>500 units</dd>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <dt className="text-ink-soft">Unit Price</dt>
                <dd>₹215</dd>
              </div>
              <div className="flex justify-between text-base text-indigo-600">
                <dt className="font-display uppercase tracking-tag">Grand Total</dt>
                <dd>₹1,07,500</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl">How trade access works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "Register", copy: "Submit your business details for review." },
            { step: "Get Approved", copy: "Our team verifies your account before catalog access opens." },
            { step: "Build a Quotation", copy: "Select variants, quantities, and let the pricing engine do the math." },
            { step: "Receive the PDF", copy: "A typeset quotation lands in your inbox — offline from there." },
          ].map((s) => (
            <div key={s.step} className="border border-ink/15 p-5">
              <p className="font-display uppercase tracking-tag text-rust-500">{s.step}</p>
              <p className="mt-2 text-sm text-ink-soft">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
