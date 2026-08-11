export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-8 border-b border-ink/15 pb-6">
      {eyebrow && <p className="mb-2 text-xs font-mono uppercase tracking-tag text-rust-500">{eyebrow}</p>}
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm text-ink-soft">{description}</p>}
    </div>
  );
}
