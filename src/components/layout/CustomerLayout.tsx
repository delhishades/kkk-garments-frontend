import { DashboardShell } from "./DashboardShell";

const navItems = [
  { to: "/account/catalog", label: "Catalog" },
  { to: "/account/cart", label: "Cart" },
  { to: "/account/quotations", label: "Quotations" },
  { to: "/account/devices", label: "Devices" },
  { to: "/account/profile", label: "Profile" },
];

export function CustomerLayout() {
  return <DashboardShell brandLabel="Customer Portal" navItems={navItems} />;
}
