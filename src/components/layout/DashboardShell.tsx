import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  to: string;
  label: string;
}

export function DashboardShell({
  brandLabel,
  navItems,
}: {
  brandLabel: string;
  navItems: NavItem[];
}) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-60 shrink-0 border-r border-ink/15 bg-canvas-dim md:block">
        <div className="border-b border-ink/15 px-6 py-5">
          <Link to="/" className="font-display text-sm uppercase tracking-tag text-indigo-600">
            KKK Garments
          </Link>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-tag text-rust-500">{brandLabel}</p>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-display uppercase tracking-tag ${
                  isActive ? "bg-indigo-500 text-canvas" : "text-ink-soft hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink/15 bg-canvas px-6 py-4">
          <p className="text-sm text-ink-soft">
            Signed in as <span className="font-medium text-ink">{user?.name}</span>
          </p>
          <button onClick={() => logout()} className="btn-secondary">
            Log Out
          </button>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
