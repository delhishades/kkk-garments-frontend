import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Field } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import * as productService from "../../services/productService";
import type { Product } from "../../types";

export function ProductForm() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isNew && id) productService.getProduct(id).then((p) => setProduct(p ?? null));
  }, [id, isNew]);

  return (
    <div>
      <PageHeader title={isNew ? "New Product" : "Edit Product"} description="Basic, image and commercial information for this product." />
      <form className="grid max-w-3xl gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <Field label="Product Name" defaultValue={product?.name} required />
        <Field label="SKU" defaultValue={product?.sku} required />
        <Field label="Category" defaultValue={product?.categoryName} required />
        <Field label="Fabric" defaultValue={product?.fabric} />
        <Field label="GSM" type="number" defaultValue={product?.gsm} />
        <Field label="Fit" defaultValue={product?.fit} />
        <Field label="Sleeve Type" defaultValue={product?.sleeveType} />
        <Field label="MOQ" type="number" defaultValue={product?.moq} required />
        <Field label="Base Price (₹)" type="number" defaultValue={product?.basePrice} required />
        <div className="sm:col-span-2">
          <label className="field-label">Description</label>
          <textarea className="input-field" rows={4} defaultValue={product?.description} />
        </div>
        <div className="sm:col-span-2 flex gap-3">
          <Button type="submit">Save Product</Button>
          <Button type="button" variant="secondary">Add Variant</Button>
        </div>
      </form>
    </div>
  );
}
