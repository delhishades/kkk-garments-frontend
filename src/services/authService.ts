import { mockCurrentAdmin, mockCurrentCustomer } from "../api/mockData";
import type { AuthUser } from "../types";
import { delay } from "./delay";

// Mirrors: POST /api/auth/login /register /logout /forgot-password /reset-password
export async function login(email: string, _password: string): Promise<AuthUser> {
  await delay(500);
  if (email.includes("admin")) return mockCurrentAdmin;
  return mockCurrentCustomer;
}

export async function register(_payload: Record<string, unknown>): Promise<{ status: "PENDING_APPROVAL" }> {
  await delay(600);
  return { status: "PENDING_APPROVAL" };
}

export async function logout(): Promise<void> {
  await delay(150);
}

export async function requestPasswordReset(_email: string): Promise<void> {
  await delay(400);
}
