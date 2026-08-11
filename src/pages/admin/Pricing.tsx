import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import * as adminService from "../../services/adminService";
import type { Product } from "../../types";
import { formatCurrency } from "../../utils/format";

export function Pricing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    adminService.listAdminProducts().then((res) => {
      setProducts(res);
      setSelected(res[0] ?? null);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Pricing" description="Adjust quantity-tiered pricing without code changes." />
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <ul className="divide-y divide-ink/10 border border-ink/15">
          {products.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelected(p)}
                className={`w-full px-4 py-3 text-left text-sm ${selected?.id === p.id ? "bg-indigo-500 text-canvas" : "hover:bg-canvas-dim"}`}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        {selected && (
          <div className="border border-ink/15 p-5">
            <p className="field-label">{selected.name} — Pricing Tiers</p>
            <table className="mt-3 w-full text-sm">
              <thead className="text-left font-display text-xs uppercase tracking-tag text-ink-soft">
                <tr>
                  <th className="py-2">MOQ</th>
                  <th className="py-2">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {selected.priceTiers.map((t) => (
                  <tr key={t.minQuantity} className="border-t border-ink/10">
                    <td className="py-2 font-mono">{t.minQuantity}</td>
                    <td className="py-2 font-mono">
                      <input className="input-field w-32" defaultValue={t.unitPrice} type="number" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" type="button">+ Add Tier</Button>
              <Button type="button">Save Pricing</Button>
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              Current base: {formatCurrency(selected.basePrice)}. Changing a tier here is recorded to the price
              history and audit log — existing quotations keep their original locked price.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
