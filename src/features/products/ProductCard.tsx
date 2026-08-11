import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { formatCurrency } from "../../utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/catalog/${product.id}`} className="card group block overflow-hidden">
      <div className="flex aspect-[4/3] items-center justify-center bg-canvas-dim">
        <span className="font-display text-xs uppercase tracking-tag text-ink-soft">{product.fabric}</span>
      </div>
      <div className="p-4">
        <p className="label-tag border-ink/20 text-ink-soft">{product.sku}</p>
        <h3 className="mt-2 text-lg normal-case tracking-normal text-ink group-hover:text-indigo-500">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-ink-soft">{product.categoryName} · {product.fit} · {product.sleeveType}</p>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-mono text-sm text-indigo-600">from {formatCurrency(product.priceTiers[product.priceTiers.length - 1].unitPrice)}</span>
          <span className="text-xs text-ink-soft">MOQ {product.moq}</span>
        </div>
      </div>
    </Link>
  );
}
