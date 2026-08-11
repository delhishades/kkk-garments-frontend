import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import * as adminService from "../../services/adminService";

type Stats = Awaited<ReturnType<typeof adminService.getDashboardStats>>;

const cards: { key: keyof Stats; label: string }[] = [
  { key: "totalCustomers", label: "Total Customers" },
  { key: "pendingCustomers", label: "Pending Customers" },
  { key: "approvedCustomers", label: "Approved Customers" },
  { key: "pendingDeviceRequests", label: "Pending Device Requests" },
  { key: "totalProducts", label: "Total Products" },
  { key: "activeProducts", label: "Active Products" },
  { key: "pendingQuotations", label: "Pending Quotations" },
  { key: "todaysQuotations", label: "Today's Quotations" },
  { key: "monthQuotations", label: "This Month's Quotations" },
];

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    adminService.getDashboardStats().then(setStats);
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Dashboard" />
      {!stats ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.key} className="border border-ink/15 p-5">
              <p className="font-mono text-3xl text-indigo-600">{stats[c.key]}</p>
              <p className="mt-1 text-xs font-display uppercase tracking-tag text-ink-soft">{c.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
