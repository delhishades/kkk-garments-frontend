import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import * as adminService from "../../services/adminService";
import type { CustomerProfile } from "../../types";
import { formatDate } from "../../utils/format";

export function Customers() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);

  useEffect(() => {
    adminService.listCustomers().then(setCustomers);
  }, []);

  async function approve(id: string) {
    await adminService.approveCustomer(id);
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: "APPROVED" } : c)));
  }

  async function reject(id: string) {
    await adminService.rejectCustomer(id);
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: "REJECTED" } : c)));
  }

  return (
    <div>
      <PageHeader title="Customers" description="Review new registrations and manage existing trade accounts." />
      <div className="overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-ink/10">
                <td className="px-4 py-3">{c.companyName}</td>
                <td className="px-4 py-3">
                  {c.firstName} {c.lastName}
                  <div className="text-xs text-ink-soft">{c.email}</div>
                </td>
                <td className="px-4 py-3">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3">
                  {c.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button onClick={() => approve(c.id)}>Approve</Button>
                      <Button variant="danger" onClick={() => reject(c.id)}>Reject</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
