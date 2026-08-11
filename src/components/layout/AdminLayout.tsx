import { DashboardShell } from "./DashboardShell";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/customers", label: "Customers" },
  { to: "/admin/devices", label: "Devices" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/pricing", label: "Pricing" },
  { to: "/admin/quotations", label: "Quotations" },
  { to: "/admin/audit-log", label: "Audit Log" },
];

export function AdminLayout() {
  return <DashboardShell brandLabel="Admin Portal" navItems={navItems} />;
}
