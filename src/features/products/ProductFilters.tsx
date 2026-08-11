import type { Category } from "../../types";

interface Props {
  categories: Category[];
  search: string;
  categoryId: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

export function ProductFilters({ categories, search, categoryId, onSearchChange, onCategoryChange }: Props) {
  return (
    <div className="flex flex-col gap-4 border border-ink/15 p-4 md:flex-row md:items-center">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, SKU or fabric"
        className="input-field md:max-w-xs"
      />
      <select value={categoryId} onChange={(e) => onCategoryChange(e.target.value)} className="input-field md:max-w-xs">
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.parentId ? `— ${c.name}` : c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
