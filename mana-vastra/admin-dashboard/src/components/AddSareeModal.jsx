import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalContent } from "@/components/ui/dialog";
import { resolveImage } from "@/lib/utils";

const emptyForm = {
  sku: "", name: "", description: "", category: "", fabric: "",
  color: "", occasion: "", price: "", salePrice: "", stock: "1",
  available: true, inventoryStatus: "in_stock", featured: false,
  tags: "", images: [], newImageUrl: "", newFiles: [],
};

const categories = [
  "Silk Saree", "Cotton Saree", "Designer Saree", "Fancy Saree",
  "Ilkal Saree", "Banarasi Saree", "Daily Wear Saree",
];

export default function AddSareeModal({ open, onOpenChange, onSaved, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(initialData?._id);

  useEffect(() => {
    if (!initialData) { setForm(emptyForm); return; }
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
      images: initialData.images || [],
      newImageUrl: "",
      newFiles: [],
    });
  }, [initialData, open]);

  const setValue = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setValue("newFiles", files);
    setFilePreviews(Array.from(files).map((f) => URL.createObjectURL(f)));
  };

  const addImageUrl = () => {
    const url = form.newImageUrl.trim();
    if (!url) return;
    if (form.images.length >= 5) { toast.error("Max 5 images allowed"); return; }
    setValue("images", [...form.images, { url }]);
    setValue("newImageUrl", "");
  };

  const removeImage = (url) =>
    setValue("images", form.images.filter((img) => img.url !== url));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      const fields = { sku: form.sku, name: form.name, description: form.description,
        category: form.category, fabric: form.fabric, color: form.color,
        occasion: form.occasion, price: form.price, salePrice: form.salePrice,
        stock: form.stock, available: form.available, featured: form.featured,
        inventoryStatus: form.inventoryStatus,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean).join(","),
        existingImages: JSON.stringify(form.images),
      };
      Object.entries(fields).forEach(([k, v]) => payload.append(k, v));
      Array.from(form.newFiles).forEach((f) => payload.append("images", f));

      if (isEditing) {
        await api.patch(`/inventory/${initialData._id}`, payload, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Saree updated successfully");
      } else {
        await api.post("/inventory", payload, { headers: { "Content-Type": "multipart/form-data" } });
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

  return (
    <ModalContent open={open} onOpenChange={onOpenChange}
      title={isEditing ? "Edit Saree" : "Add Saree"}
      description="Manage catalog details, pricing, tags, and images."
    >
      <form className="space-y-6" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="SKU" value={form.sku} onChange={(e) => setValue("sku", e.target.value)} />
          <Input placeholder="Product name" value={form.name} onChange={(e) => setValue("name", e.target.value)} required />
          <select className="w-full rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
            value={form.category} onChange={(e) => setValue("category", e.target.value)} required>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Input placeholder="Fabric" value={form.fabric} onChange={(e) => setValue("fabric", e.target.value)} />
          <Input placeholder="Color" value={form.color} onChange={(e) => setValue("color", e.target.value)} />
          <Input placeholder="Occasion" value={form.occasion} onChange={(e) => setValue("occasion", e.target.value)} />
          <Input type="number" placeholder="MRP (original price)" value={form.price} onChange={(e) => setValue("price", e.target.value)} required />
          <Input type="number" placeholder="Sales Price (discounted)" value={form.salePrice} onChange={(e) => setValue("salePrice", e.target.value)} />
          <Input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setValue("stock", e.target.value)} />
          <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setValue("tags", e.target.value)} />
        </div>

        <textarea
          className="min-h-28 w-full rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Description" value={form.description}
          onChange={(e) => setValue("description", e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
            <input type="checkbox" checked={form.available} onChange={(e) => setValue("available", e.target.checked)} />
            Available for sale
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
            <input type="checkbox" checked={form.featured} onChange={(e) => setValue("featured", e.target.checked)} />
            Featured in highlights
          </label>
        </div>

        {/* Images */}
        <div className="space-y-3">
          <p className="text-sm text-muted">Images (max 5)</p>

          {/* File upload → Cloudinary */}
          <div>
            <p className="text-xs text-muted mb-1">Upload from device</p>
            <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
            {filePreviews.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-3 mt-2">
                {filePreviews.map((src, i) => (
                  <img key={i} src={src} alt={`preview-${i}`}
                    className="h-28 w-full rounded-xl object-cover border border-border" />
                ))}
              </div>
            )}
          </div>

          {/* URL input */}
          <div>
            <p className="text-xs text-muted mb-1">Or paste an image URL</p>
            <div className="flex gap-2">
              <Input placeholder="https://..." value={form.newImageUrl}
                onChange={(e) => setValue("newImageUrl", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())} />
              <Button type="button" variant="outline" onClick={addImageUrl}>Add</Button>
            </div>
          </div>

          {/* Preview existing images */}
          {form.images.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {form.images.map((img) => (
                <div key={img.url} className="overflow-hidden rounded-2xl border border-border bg-[#100d0a]">
                  <img className="h-36 w-full object-cover" src={resolveImage(img.url)} alt={form.name}
                    onError={(e) => { e.target.style.display = "none"; }} />
                  <button type="button" className="w-full border-t border-border px-4 py-2 text-sm text-danger"
                    onClick={() => removeImage(img.url)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Update Saree" : "Create Saree"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
