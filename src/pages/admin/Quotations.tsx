import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { QuotationTable } from "../../features/quotations/QuotationTable";
import * as adminService from "../../services/adminService";
import type { Quotation } from "../../types";

export function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    adminService.listAdminQuotations().then(setQuotations);
  }, []);

  return (
    <div>
      <PageHeader title="Quotation Requests" description="All quotations submitted across every customer account." />
      <QuotationTable quotations={quotations} basePath="/admin/quotations" />
    </div>
  );
}
