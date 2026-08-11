// Domain types mirrored from SRS section 34 (Database design) and section 9/11/24 (statuses)

export type CustomerStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED"
  | "BLOCKED"
  | "DELETED";

export type DeviceStatus = "PENDING" | "APPROVED" | "REJECTED" | "REVOKED" | "BLOCKED";

export type QuotationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export type UserRole = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  companyName: string;
  businessType: string;
  gstin?: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  website?: string;
  whatsappNumber?: string;
  expectedMonthlyVolume?: string;
  status: CustomerStatus;
  createdAt: string;
}

export interface Device {
  id: string;
  userId: string;
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  createdAt: string;
  approvedAt?: string;
  lastLogin?: string;
  status: DeviceStatus;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
}

export interface PriceTier {
  minQuantity: number;
  unitPrice: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  moq: number;
  stock?: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  fabric: string;
  gsm: number;
  fit: string;
  sleeveType: string;
  status: "ACTIVE" | "INACTIVE";
  featured: boolean;
  images: { url: string; alt: string; order: number }[];
  moq: number;
  basePrice: number;
  priceTiers: PriceTier[];
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  sku: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface QuotationItem extends CartItem {
  lineTotal: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  status: QuotationStatus;
  createdAt: string;
  validUntil: string;
  pdfUrl?: string;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: string;
  newValue?: string;
  ip: string;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: CustomerStatus;
}
