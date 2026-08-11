import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import * as deviceService from "../../services/deviceService";
import { mockCustomers } from "../../api/mockData";
import type { Device } from "../../types";
import { formatDate } from "../../utils/format";

export function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    deviceService.listAllDevices().then(setDevices);
  }, []);

  function customerName(userId: string) {
    const c = mockCustomers.find((c) => c.id === userId);
    return c ? c.companyName : userId;
  }

  function setStatus(id: string, status: Device["status"]) {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  return (
    <div>
      <PageHeader title="Device Approvals" description="Approve, reject, or revoke devices attempting to access customer accounts." />
      <div className="overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Browser / OS</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.id} className="border-b border-ink/10">
                <td className="px-4 py-3">{customerName(d.userId)}</td>
                <td className="px-4 py-3">{d.browser} / {d.os}</td>
                <td className="px-4 py-3 font-mono text-xs">{d.ipAddress}</td>
                <td className="px-4 py-3">{formatDate(d.createdAt)}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {d.status === "PENDING" && (
                      <>
                        <Button onClick={() => setStatus(d.id, "APPROVED")}>Approve</Button>
                        <Button variant="danger" onClick={() => setStatus(d.id, "REJECTED")}>Reject</Button>
                      </>
                    )}
                    {d.status === "APPROVED" && (
                      <Button variant="danger" onClick={() => setStatus(d.id, "REVOKED")}>Revoke</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
