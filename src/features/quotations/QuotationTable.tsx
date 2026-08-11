import { Link } from "react-router-dom";
import type { Quotation } from "../../types";
import { StatusBadge } from "../../components/ui/Badge";
import { formatCurrency, formatDate } from "../../utils/format";

export function QuotationTable({ quotations, basePath }: { quotations: Quotation[]; basePath: string }) {
  return (
    <div className="overflow-x-auto border border-ink/15">
      <table className="w-full text-sm">
        <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
          <tr>
            <th className="px-4 py-3">Quotation No.</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Grand Total</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((q) => (
            <tr key={q.id} className="border-b border-ink/10 hover:bg-canvas-dim/60">
              <td className="px-4 py-3">
                <Link to={`${basePath}/${q.id}`} className="font-mono text-indigo-500 hover:underline">
                  {q.quotationNumber}
                </Link>
              </td>
              <td className="px-4 py-3">{q.customerName}</td>
              <td className="px-4 py-3">{formatDate(q.createdAt)}</td>
              <td className="px-4 py-3 font-mono">{formatCurrency(q.grandTotal)}</td>
              <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
