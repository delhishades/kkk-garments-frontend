import { mockCategories, mockProducts } from "../api/mockData";
import type { Category, Product } from "../types";
import { delay } from "./delay";

// Mirrors: GET /api/products, GET /api/products/{id}, GET /api/categories
export async function listProducts(filters?: {
  search?: string;
  categoryId?: string;
  color?: string;
  size?: string;
}): Promise<Product[]> {
  await delay();
  let results = [...mockProducts];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }
  if (filters?.categoryId) {
    results = results.filter((p) => p.categoryId === filters.categoryId);
  }
  if (filters?.color) {
    results = results.filter((p) => p.variants.some((v) => v.color === filters.color));
  }
  if (filters?.size) {
    results = results.filter((p) => p.variants.some((v) => v.size === filters.size));
  }
  return results;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await delay();
  return mockProducts.find((p) => p.id === id);
}

export async function listCategories(): Promise<Category[]> {
  await delay(150);
  return mockCategories;
}

// Section 16: quantity-tiered pricing engine
export function resolveUnitPrice(product: Product, quantity: number): number {
  const applicable = [...product.priceTiers]
    .sort((a, b) => a.minQuantity - b.minQuantity)
    .filter((t) => quantity >= t.minQuantity)
    .pop();
  return applicable ? applicable.unitPrice : product.basePrice;
}
