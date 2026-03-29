import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalContent } from "@/components/ui/dialog";
import { resolveImage } from "@/lib/utils";

const emptyForm = {
  sku: "",
  name: "",
  description: "",
  category: "",
  fabric: "",
  color: "",
  occasion: "",
  price: "",
  salePrice: "",
  stock: "1",
  available: true,
  inventoryStatus: "in_stock",
  featured: false,
  tags: "",
  existingImages: [],
  newImages: [],
};

const categories = [
  "Silk Saree",
  "Cotton Saree",
  "Designer Saree",
  "Fancy Saree",
  "Ilkal Saree",
  "Banarasi Saree",
  "Daily Wear Saree",
];

export default function AddSareeModal({ open, onOpenChange, onSaved, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(initialData?._id);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }

    setForm({
      sku: initialData.sku || "",
      name: initialData.name || "",
      description: initialData.description || "",
      category: initialData.category || "",
      fabric: initialData.fabric || "",
      color: initialData.color || "",
      occasion: initialData.occasion || "",
      price: String(initialData.price || ""),
      salePrice: initialData.salePrice ? String(initialData.salePrice) : "",
      stock: String(initialData.stock ?? 1),
      available: Boolean(initialData.available),
      inventoryStatus: initialData.inventoryStatus || "in_stock",
      featured: Boolean(initialData.featured),
      tags: (initialData.tags || []).join(", "),
      existingImages: initialData.images || [],
      newImages: [],
    });
  }, [initialData, open]);

  const setValue = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "newImages") {
          return;
        }

        if (key === "existingImages") {
          payload.append(key, JSON.stringify(value));
          return;
        }

        payload.append(key, value);
      });

      Array.from(form.newImages).forEach((file) => {
        payload.append("images", file);
      });

      if (isEditing) {
        await api.patch(`/inventory/${initialData._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Saree updated successfully");
      } else {
        await api.post("/inventory", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Saree added to inventory");
      }

      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(isEditing ? "Failed to update saree" : "Failed to add saree", {
        description: err?.response?.data?.message || err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const removeImage = (url) => {
    setForm((current) => ({
      ...current,
      existingImages: current.existingImages.filter((image) => image.url !== url),
    }));
  };

  return (
    <ModalContent
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Edit Saree" : "Add Saree"}
      description="Manage catalog details, pricing, tags, and up to five images."
    >
      <form className="space-y-6" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="SKU" value={form.sku} onChange={(e) => setValue("sku", e.target.value)} />
          <Input
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setValue("name", e.target.value)}
            required
          />
          <select
            className="w-full rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
            value={form.category}
            onChange={(e) => setValue("category", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Input placeholder="Fabric" value={form.fabric} onChange={(e) => setValue("fabric", e.target.value)} />
          <Input placeholder="Color" value={form.color} onChange={(e) => setValue("color", e.target.value)} />
          <Input
            placeholder="Occasion"
            value={form.occasion}
            onChange={(e) => setValue("occasion", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setValue("price", e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Sale price"
            value={form.salePrice}
            onChange={(e) => setValue("salePrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setValue("stock", e.target.value)}
          />
          <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setValue("tags", e.target.value)} />
        </div>

        <textarea
          className="min-h-28 w-full rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setValue("description", e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setValue("available", e.target.checked)}
            />
            Available for sale
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setValue("featured", e.target.checked)}
            />
            Featured in highlights
          </label>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted">Images</p>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setValue("newImages", e.target.files)}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {form.existingImages.map((image) => (
              <div key={image.url} className="overflow-hidden rounded-2xl border border-border bg-[#100d0a]">
                <img className="h-36 w-full object-cover" src={resolveImage(image.url)} alt={form.name} />
                <button
                  type="button"
                  className="w-full border-t border-border px-4 py-2 text-sm text-danger"
                  onClick={() => removeImage(image.url)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Update Saree" : "Create Saree"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
