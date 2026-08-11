import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { ProductFilters } from "../../features/products/ProductFilters";
import { ProductCard } from "../../features/products/ProductCard";
import * as productService from "../../services/productService";
import type { Category, Product } from "../../types";

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.listCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    productService.listProducts({ search, categoryId }).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, [search, categoryId]);

  const activeProducts = useMemo(() => products.filter((p) => p.status === "ACTIVE"), [products]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <PageHeader
        eyebrow="Full catalog"
        title="Product Catalog"
        description="Prices shown reflect the lowest bulk tier. Sign in for tier pricing at your exact quantity."
      />
      <div className="mb-8">
        <ProductFilters
          categories={categories}
          search={search}
          categoryId={categoryId}
          onSearchChange={setSearch}
          onCategoryChange={setCategoryId}
        />
      </div>
      {loading ? (
        <p className="text-sm text-ink-soft">Loading catalog…</p>
      ) : activeProducts.length === 0 ? (
        <EmptyState title="No products found" description="Try a different search term or category." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
