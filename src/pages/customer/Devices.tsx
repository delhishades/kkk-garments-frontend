import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import * as deviceService from "../../services/deviceService";
import type { Device } from "../../types";
import { formatDate } from "../../utils/format";

export function Devices() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (!user) return;
    deviceService.listMyDevices(user.id).then(setDevices);
  }, [user]);

  async function handleRequest() {
    if (!user) return;
    setRequesting(true);
    const device = await deviceService.requestDeviceApproval(user.id);
    setDevices((prev) => [...prev, device]);
    setRequesting(false);
  }

  return (
    <div>
      <PageHeader
        title="Approved Devices"
        description="Only devices your account has been approved on can log in. Request approval for a new device below."
      />
      <div className="overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">Browser / OS</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.id} className="border-b border-ink/10">
                <td className="px-4 py-3">{d.browser} / {d.os}</td>
                <td className="px-4 py-3 font-mono text-xs">{d.ipAddress}</td>
                <td className="px-4 py-3">{d.lastLogin ? formatDate(d.lastLogin) : "—"}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Button variant="secondary" onClick={handleRequest} disabled={requesting}>
          {requesting ? "Requesting…" : "Request Access From This Device"}
        </Button>
      </div>
    </div>
  );
}
