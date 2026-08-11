import { mockDevices } from "../api/mockData";
import type { Device } from "../types";
import { delay } from "./delay";

// Mirrors: GET /api/customer/devices, POST /api/customer/devices/request,
// GET/PATCH /api/admin/devices*
export async function listMyDevices(userId: string): Promise<Device[]> {
  await delay();
  return mockDevices.filter((d) => d.userId === userId);
}

export async function listAllDevices(): Promise<Device[]> {
  await delay();
  return mockDevices;
}

export async function requestDeviceApproval(userId: string): Promise<Device> {
  await delay(400);
  const device: Device = {
    id: `dev-${Date.now()}`,
    userId,
    fingerprint: `fp_${Math.random().toString(36).slice(2, 8)}`,
    ipAddress: "0.0.0.0",
    userAgent: navigator.userAgent,
    browser: "Unknown",
    os: "Unknown",
    createdAt: new Date().toISOString(),
    status: "PENDING",
  };
  mockDevices.push(device);
  return device;
}
