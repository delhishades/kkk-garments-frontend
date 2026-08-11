import type { CartItem } from "../types";

// In-memory-only mock cart (real implementation: GET/POST/PUT/DELETE /api/cart[/items])
const STORAGE_KEY = "kkk_mock_cart_v1";

function readCart(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getCart(): CartItem[] {
  return readCart();
}

export function addToCart(item: CartItem): CartItem[] {
  const items = readCart();
  const existing = items.find((i) => i.variantId === item.variantId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }
  writeCart(items);
  return items;
}

export function updateCartItem(variantId: string, quantity: number): CartItem[] {
  const items = readCart().map((i) => (i.variantId === variantId ? { ...i, quantity } : i));
  writeCart(items);
  return items;
}

export function removeCartItem(variantId: string): CartItem[] {
  const items = readCart().filter((i) => i.variantId !== variantId);
  writeCart(items);
  return items;
}

export function clearCart(): CartItem[] {
  writeCart([]);
  return [];
}
