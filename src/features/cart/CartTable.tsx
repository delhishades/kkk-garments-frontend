import type { CartItem } from "../../types";
import { formatCurrency } from "../../utils/format";
import { Button } from "../../components/ui/Button";

interface Props {
  items: CartItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
}

export function CartTable({ items, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="overflow-x-auto border border-ink/15">
      <table className="w-full text-sm">
        <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Color / Size</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Unit Price</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.variantId} className="border-b border-ink/10">
              <td className="px-4 py-3">{item.productName}</td>
              <td className="px-4 py-3 font-mono text-xs">{item.sku}</td>
              <td className="px-4 py-3">{item.color} / {item.size}</td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  className="input-field w-24"
                  value={item.quantity}
                  min={0}
                  onChange={(e) => onUpdateQuantity(item.variantId, Number(e.target.value))}
                />
              </td>
              <td className="px-4 py-3 font-mono">{formatCurrency(item.unitPrice)}</td>
              <td className="px-4 py-3 font-mono text-indigo-600">{formatCurrency(item.unitPrice * item.quantity)}</td>
              <td className="px-4 py-3">
                <Button variant="danger" onClick={() => onRemove(item.variantId)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
