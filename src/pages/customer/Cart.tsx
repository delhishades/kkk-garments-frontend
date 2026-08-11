import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import { CartTable } from "../../features/cart/CartTable";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/format";
import * as quotationService from "../../services/quotationService";

export function Cart() {
  const { items, total, updateItem, removeItem, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!user) return;
    setSubmitting(true);
    const quotation = await quotationService.submitQuotation(user.name, user.id, items);
    clear();
    setSubmitting(false);
    navigate(`/account/quotations/${quotation.id}`);
  }

  return (
    <div>
      <PageHeader title="Cart" description="Review quantities before submitting a bulk quotation request." />
      {items.length === 0 ? (
        <EmptyState title="Your cart is empty" description="Browse the catalog and add variants to build a quotation." />
      ) : (
        <>
          <CartTable items={items} onUpdateQuantity={updateItem} onRemove={removeItem} />
          <div className="mt-6 flex items-center justify-between border-t border-ink/15 pt-6">
            <div>
              <p className="text-xs text-ink-soft">Estimated total</p>
              <p className="font-mono text-2xl text-indigo-600">{formatCurrency(total)}</p>
            </div>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Quotation Request"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
