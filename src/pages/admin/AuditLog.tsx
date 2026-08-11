import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import * as adminService from "../../services/adminService";
import type { AuditLogEntry } from "../../types";
import { formatDate } from "../../utils/format";

export function AuditLog() {
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    adminService.listAuditLog().then(setEntries);
  }, []);

  return (
    <div>
      <PageHeader title="Audit Log" description="Every sensitive administrative action, recorded for accountability." />
      <div className="overflow-x-auto border border-ink/15">
        <table className="w-full text-sm">
          <thead className="border-b border-ink/15 bg-canvas-dim text-left font-display text-xs uppercase tracking-tag text-ink-soft">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">Change</th>
              <th className="px-4 py-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-ink/10">
                <td className="px-4 py-3">{formatDate(e.timestamp)}</td>
                <td className="px-4 py-3">{e.user}</td>
                <td className="px-4 py-3 font-mono text-xs">{e.action}</td>
                <td className="px-4 py-3">{e.entity} #{e.entityId}</td>
                <td className="px-4 py-3 font-mono text-xs">
                  {e.oldValue && <span className="text-rust-500 line-through">{e.oldValue}</span>} {e.newValue && <span className="text-sage-600">{e.newValue}</span>}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{e.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
