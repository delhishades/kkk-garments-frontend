import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PublicNavbar() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-ink/15 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center bg-indigo-500 font-display text-canvas">K</span>
          <span className="font-display text-lg uppercase tracking-tag text-indigo-600">KKK Garments</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-display uppercase tracking-tag ${isActive ? "text-rust-500" : "text-ink-soft hover:text-indigo-500"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to={user.role === "CUSTOMER" ? "/account/quotations" : "/admin/dashboard"} className="btn-secondary">
              My Account
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Log In
              </Link>
              <Link to="/register" className="btn-primary hidden sm:inline-flex">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
