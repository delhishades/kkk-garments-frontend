import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "../components/layout/PublicLayout";
import { CustomerLayout } from "../components/layout/CustomerLayout";
import { AdminLayout } from "../components/layout/AdminLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { AdminRoute } from "../routes/AdminRoute";

// Public
import { Home } from "../pages/public/Home";
import { About } from "../pages/public/About";
import { Catalog } from "../pages/public/Catalog";
import { ProductDetail } from "../pages/public/ProductDetail";
import { Contact } from "../pages/public/Contact";
import { Login } from "../pages/public/Login";
import { Register } from "../pages/public/Register";
import { RegistrationPending } from "../pages/public/RegistrationPending";
import { ForgotPassword } from "../pages/public/ForgotPassword";
import { Terms } from "../pages/public/Terms";
import { Privacy } from "../pages/public/Privacy";
import { NotFound } from "../pages/public/NotFound";

// Customer
import { Cart } from "../pages/customer/Cart";
import { Quotations as CustomerQuotations } from "../pages/customer/Quotations";
import { QuotationDetail as CustomerQuotationDetail } from "../pages/customer/QuotationDetail";
import { Devices as CustomerDevices } from "../pages/customer/Devices";
import { Profile } from "../pages/customer/Profile";

// Admin
import { Dashboard as AdminDashboard } from "../pages/admin/Dashboard";
import { Customers as AdminCustomers } from "../pages/admin/Customers";
import { Devices as AdminDevices } from "../pages/admin/Devices";
import { Products as AdminProducts } from "../pages/admin/Products";
import { ProductForm as AdminProductForm } from "../pages/admin/ProductForm";
import { Categories as AdminCategories } from "../pages/admin/Categories";
import { Pricing as AdminPricing } from "../pages/admin/Pricing";
import { Quotations as AdminQuotations } from "../pages/admin/Quotations";
import { QuotationDetail as AdminQuotationDetail } from "../pages/admin/QuotationDetail";
import { AuditLog as AdminAuditLog } from "../pages/admin/AuditLog";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetail /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/registration-pending", element: <RegistrationPending /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account",
        element: <CustomerLayout />,
        children: [
          { path: "catalog", element: <Catalog /> },
          { path: "catalog/:id", element: <ProductDetail /> },
          { path: "cart", element: <Cart /> },
          { path: "quotations", element: <CustomerQuotations /> },
          { path: "quotations/:id", element: <CustomerQuotationDetail /> },
          { path: "devices", element: <CustomerDevices /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "customers", element: <AdminCustomers /> },
          { path: "devices", element: <AdminDevices /> },
          { path: "products", element: <AdminProducts /> },
          { path: "products/:id", element: <AdminProductForm /> },
          { path: "categories", element: <AdminCategories /> },
          { path: "pricing", element: <AdminPricing /> },
          { path: "quotations", element: <AdminQuotations /> },
          { path: "quotations/:id", element: <AdminQuotationDetail /> },
          { path: "audit-log", element: <AdminAuditLog /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
],
{
    basename: "/kkk-garments-frontend",
});
