import { mockAuditLog, mockCustomers, mockProducts, mockQuotations } from "../api/mockData";
import type { AuditLogEntry, CustomerProfile, Product, Quotation } from "../types";
import { delay } from "./delay";

// Mirrors GET /api/admin/* endpoints (section 35) and dashboard counts (section 29)
export async function getDashboardStats() {
  await delay();
  return {
    totalCustomers: mockCustomers.length,
    pendingCustomers: mockCustomers.filter((c) => c.status === "PENDING").length,
    approvedCustomers: mockCustomers.filter((c) => c.status === "APPROVED").length,
    pendingDeviceRequests: 1,
    totalProducts: mockProducts.length,
    activeProducts: mockProducts.filter((p) => p.status === "ACTIVE").length,
    pendingQuotations: mockQuotations.filter((q) => q.status === "SUBMITTED").length,
    todaysQuotations: mockQuotations.length,
    monthQuotations: mockQuotations.length,
  };
}

export async function listCustomers(): Promise<CustomerProfile[]> {
  await delay();
  return mockCustomers;
}

export async function approveCustomer(id: string): Promise<void> {
  await delay(300);
  const c = mockCustomers.find((c) => c.id === id);
  if (c) c.status = "APPROVED";
}

export async function rejectCustomer(id: string): Promise<void> {
  await delay(300);
  const c = mockCustomers.find((c) => c.id === id);
  if (c) c.status = "REJECTED";
}

export async function listAdminProducts(): Promise<Product[]> {
  await delay();
  return mockProducts;
}

export async function listAdminQuotations(): Promise<Quotation[]> {
  await delay();
  return mockQuotations;
}

export async function listAuditLog(): Promise<AuditLogEntry[]> {
  await delay();
  return mockAuditLog;
}
