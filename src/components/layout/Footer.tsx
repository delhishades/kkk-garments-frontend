import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-canvas-dim">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-ink-soft">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display uppercase tracking-tag text-indigo-600">KKK Garments</p>
            <p className="mt-2">Wholesale manufacturing &amp; bulk quotations for approved trade partners.</p>
          </div>
          <div>
            <p className="mb-2 font-display uppercase tracking-tag text-ink-soft">Company</p>
            <ul className="space-y-1">
              <li><Link to="/about" className="hover:text-indigo-500">About</Link></li>
              <li><Link to="/catalog" className="hover:text-indigo-500">Catalog</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-display uppercase tracking-tag text-ink-soft">Legal</p>
            <ul className="space-y-1">
              <li><Link to="/terms" className="hover:text-indigo-500">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-500">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 font-mono text-xs">
          Quotations generated electronically. Payment and fulfillment are handled offline.
        </p>
      </div>
    </footer>
  );
}
