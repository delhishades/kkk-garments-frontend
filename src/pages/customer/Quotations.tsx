import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { QuotationTable } from "../../features/quotations/QuotationTable";
import * as quotationService from "../../services/quotationService";
import type { Quotation } from "../../types";

export function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quotationService.listMyQuotations().then((res) => {
      setQuotations(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Quotation History" description="Every quotation you've submitted, with the price locked at the time of submission." />
      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : quotations.length === 0 ? (
        <EmptyState title="No quotations yet" description="Add products to your cart and submit a quotation request." />
      ) : (
        <QuotationTable quotations={quotations} basePath="/account/quotations" />
      )}
    </div>
  );
}
