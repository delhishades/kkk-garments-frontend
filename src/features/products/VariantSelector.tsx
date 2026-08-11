import type { ProductVariant } from "../../types";

interface Props {
  variants: ProductVariant[];
  selectedId?: string;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: Props) {
  const colors = Array.from(new Set(variants.map((v) => v.color)));

  return (
    <div className="space-y-4">
      {colors.map((color) => (
        <div key={color}>
          <p className="field-label">{color}</p>
          <div className="flex flex-wrap gap-2">
            {variants
              .filter((v) => v.color === color)
              .map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelect(v)}
                  className={`border px-3 py-1.5 text-xs font-mono uppercase tracking-tag transition-colors ${
                    selectedId === v.id
                      ? "border-indigo-500 bg-indigo-500 text-canvas"
                      : "border-ink/25 text-ink-soft hover:border-indigo-500 hover:text-indigo-500"
                  }`}
                >
                  {v.size}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
