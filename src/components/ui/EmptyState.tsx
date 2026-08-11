export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-dashed border-ink/25 px-6 py-14 text-center">
      <p className="font-display uppercase tracking-tag text-indigo-500">{title}</p>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </div>
  );
}
