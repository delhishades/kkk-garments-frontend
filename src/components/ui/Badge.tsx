type Tone = "neutral" | "gold" | "sage" | "rust" | "indigo";

const toneClasses: Record<Tone, string> = {
  neutral: "border-ink/25 text-ink-soft",
  gold: "border-gold-500 text-gold-500",
  sage: "border-sage-500 text-sage-600",
  rust: "border-rust-500 text-rust-500",
  indigo: "border-indigo-500 text-indigo-500",
};

const statusTone: Record<string, Tone> = {
  PENDING: "gold",
  APPROVED: "sage",
  REJECTED: "rust",
  SUSPENDED: "rust",
  BLOCKED: "rust",
  DELETED: "neutral",
  REVOKED: "rust",
  SUBMITTED: "indigo",
  UNDER_REVIEW: "gold",
  ACCEPTED: "sage",
  CANCELLED: "neutral",
  COMPLETED: "sage",
  ACTIVE: "sage",
  INACTIVE: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = statusTone[status] ?? "neutral";
  return <span className={`label-tag ${toneClasses[tone]}`}>{status.replace(/_/g, " ")}</span>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={`label-tag ${toneClasses[tone]}`}>{children}</span>;
}
