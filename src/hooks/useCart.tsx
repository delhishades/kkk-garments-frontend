import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types";
import * as cartService from "../services/cartService";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(cartService.getCart());

  const addItem = (item: CartItem) => setItems(cartService.addToCart(item));
  const updateItem = (variantId: string, quantity: number) => setItems(cartService.updateCartItem(variantId, quantity));
  const removeItem = (variantId: string) => setItems(cartService.removeCartItem(variantId));
  const clear = () => setItems(cartService.clearCart());
  const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
