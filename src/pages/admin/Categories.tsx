import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import * as productService from "../../services/productService";
import type { Category } from "../../types";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    productService.listCategories().then(setCategories);
  }, []);

  return (
    <div>
      <PageHeader title="Categories" description="Organize the catalog into unlimited nested categories." />
      <div className="grid gap-8 md:grid-cols-2">
        <ul className="divide-y divide-ink/10 border border-ink/15">
          {categories.map((c) => (
            <li key={c.id} className={`px-4 py-3 text-sm ${c.parentId ? "pl-8 text-ink-soft" : "font-medium"}`}>
              {c.parentId ? "— " : ""}
              {c.name}
            </li>
          ))}
        </ul>
        <form className="space-y-4 border border-ink/15 p-5" onSubmit={(e) => e.preventDefault()}>
          <p className="field-label">Add Category</p>
          <Field label="Category Name" required />
          <select className="input-field">
            <option value="">No parent (top level)</option>
            {categories.filter((c) => !c.parentId).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Button type="submit">Add Category</Button>
        </form>
      </div>
    </div>
  );
}
