import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productService from "../../services/productService";
import type { Product, ProductVariant } from "../../types";
import { VariantSelector } from "../../features/products/VariantSelector";
import { formatCurrency } from "../../utils/format";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { Button } from "../../components/ui/Button";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [moqError, setMoqError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    productService.getProduct(id).then((p) => {
      setProduct(p ?? null);
      setQuantity(p?.moq ?? 0);
    });
  }, [id]);

  if (!product) return <div className="mx-auto max-w-6xl px-6 py-14 text-sm text-ink-soft">Loading product…</div>;

  const unitPrice = productService.resolveUnitPrice(product, quantity);
  const lineTotal = unitPrice * quantity;

  function handleAddToCart() {
    if (!product) return;
    if (!variant) {
      setMoqError("Select a size and color first.");
      return;
    }
    // Backend must re-validate MOQ (section 21) — this is a UX convenience only.
    if (quantity < variant.moq) {
      setMoqError(`Minimum order quantity is ${variant.moq}`);
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    setMoqError("");
    addItem({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      sku: variant.sku,
      color: variant.color,
      size: variant.size,
      quantity,
      unitPrice,
    });
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Link to="/catalog" className="text-xs font-display uppercase tracking-tag text-ink-soft hover:text-indigo-500">
        ← Back to catalog
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center border border-ink/15 bg-canvas-dim">
          <span className="font-display text-sm uppercase tracking-tag text-ink-soft">{product.fabric}</span>
        </div>
        <div>
          <p className="label-tag border-ink/20 text-ink-soft">{product.sku}</p>
          <h1 className="mt-3 text-3xl">{product.name}</h1>
          <p className="mt-3 text-sm text-ink-soft">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-ink/10 py-4 font-mono text-xs">
            <div><dt className="text-ink-soft">Fabric</dt><dd>{product.fabric}</dd></div>
            <div><dt className="text-ink-soft">GSM</dt><dd>{product.gsm}</dd></div>
            <div><dt className="text-ink-soft">Fit</dt><dd>{product.fit}</dd></div>
            <div><dt className="text-ink-soft">Sleeve</dt><dd>{product.sleeveType}</dd></div>
          </dl>

          <div className="mt-6">
            <p className="field-label">Bulk pricing</p>
            <table className="w-full font-mono text-sm">
              <tbody>
                {product.priceTiers.map((t) => (
                  <tr key={t.minQuantity} className={`border-b border-ink/10 ${quantity >= t.minQuantity ? "text-indigo-600" : "text-ink-soft"}`}>
                    <td className="py-1.5">{t.minQuantity}+ units</td>
                    <td className="py-1.5 text-right">{formatCurrency(t.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <VariantSelector variants={product.variants} selectedId={variant?.id} onSelect={(v) => { setVariant(v); setMoqError(""); setAdded(false); }} />
          </div>

          <div className="mt-6">
            <label className="field-label" htmlFor="qty">Quantity (MOQ {variant?.moq ?? product.moq})</label>
            <input
              id="qty"
              type="number"
              className="input-field max-w-[160px]"
              value={quantity}
              min={0}
              onChange={(e) => { setQuantity(Number(e.target.value)); setMoqError(""); setAdded(false); }}
            />
            {moqError && <p className="mt-2 text-xs text-rust-500">{moqError}</p>}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
            <div>
              <p className="text-xs text-ink-soft">Line total</p>
              <p className="font-mono text-lg text-indigo-600">{formatCurrency(lineTotal)}</p>
            </div>
            <Button onClick={handleAddToCart}>{added ? "Added ✓" : "Add to Cart"}</Button>
          </div>
          {!user && <p className="mt-3 text-xs text-ink-soft">Sign in as an approved customer to add items to a quotation.</p>}
        </div>
      </div>
    </div>
  );
}
