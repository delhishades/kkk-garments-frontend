import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as quotationService from "../../services/quotationService";
import type { Quotation } from "../../types";
import { StatusBadge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { formatCurrency, formatDate } from "../../utils/format";

export function QuotationDetail() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    if (!id) return;
    quotationService.getQuotation(id).then((q) => setQuotation(q ?? null));
  }, [id]);

  if (!quotation) return <p className="text-sm text-ink-soft">Loading quotation…</p>;

  return (
    <div>
      <Link to="/account/quotations" className="text-xs font-display uppercase tracking-tag text-ink-soft hover:text-indigo-500">
        ← All quotations
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-b border-ink/15 pb-6">
        <div>
          <p className="label-tag border-indigo-500 text-indigo-500">{quotation.quotationNumber}</p>
          <h1 className="mt-2 text-2xl">Quotation Detail</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Submitted {formatDate(quotation.createdAt)} · Valid until {formatDate(quotation.validUntil)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={quotation.status} />
          <Button variant="secondary">Download PDF</Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Color / Size</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {quotation.items.map((item) => (
              <tr key={item.variantId} className="border-b border-ink/10">
                <td className="px-4 py-3 font-mono text-xs">{item.sku}</td>
                <td className="px-4 py-3">{item.productName}</td>
                <td className="px-4 py-3">{item.color} / {item.size}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3 font-mono">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 font-mono">{formatCurrency(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 ml-auto max-w-xs space-y-2 font-mono text-sm">
        <div className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span>{formatCurrency(quotation.subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-ink-soft">Tax</span><span>{formatCurrency(quotation.tax)}</span></div>
        <div className="flex justify-between border-t border-ink/15 pt-2 text-base text-indigo-600"><span className="font-display uppercase tracking-tag">Grand Total</span><span>{formatCurrency(quotation.grandTotal)}</span></div>
      </div>

      <p className="mt-8 font-mono text-xs text-ink-soft">
        This quotation is generated electronically. Payment and fulfillment are handled offline.
      </p>
    </div>
  );
}
