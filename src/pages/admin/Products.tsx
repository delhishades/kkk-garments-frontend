import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import * as adminService from "../../services/adminService";
import type { Product } from "../../types";
import { formatCurrency } from "../../utils/format";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    adminService.listAdminProducts().then(setProducts);
  }, []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PageHeader title="Products" description="Create and manage the catalog customers browse." />
        <Link to="/admin/products/new"><Button>New Product</Button></Link>
      </div>
      <div className="overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">MOQ</th>
              <th className="px-4 py-3">Base Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink/10">
                <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.categoryName}</td>
                <td className="px-4 py-3">{p.moq}</td>
                <td className="px-4 py-3 font-mono">{formatCurrency(p.basePrice)}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3">
                  <Link to={`/admin/products/${p.id}`} className="text-xs text-indigo-500 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
