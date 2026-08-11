import { mockQuotations } from "../api/mockData";
import type { CartItem, Quotation, QuotationItem } from "../types";
import { delay } from "./delay";

// Mirrors: POST /api/quotations, GET /api/quotations/{id}, GET /api/customer/quotations
export async function listMyQuotations(): Promise<Quotation[]> {
  await delay();
  return mockQuotations;
}

export async function getQuotation(id: string): Promise<Quotation | undefined> {
  await delay();
  return mockQuotations.find((q) => q.id === id || q.quotationNumber === id);
}

// Section 22/40: backend validates MOQ + snapshots prices at submission time
export async function submitQuotation(customerName: string, customerId: string, cartItems: CartItem[]): Promise<Quotation> {
  await delay(600);
  const items: QuotationItem[] = cartItems.map((i) => ({
    ...i,
    lineTotal: i.quantity * i.unitPrice,
  }));
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const nextNumber = (mockQuotations.length + 41).toString().padStart(6, "0");
  const quotation: Quotation = {
    id: `q-${Date.now()}`,
    quotationNumber: `QT-2026-${nextNumber}`,
    customerId,
    customerName,
    items,
    subtotal,
    tax: 0,
    grandTotal: subtotal,
    status: "SUBMITTED",
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };
  mockQuotations.unshift(quotation);
  return quotation;
}
