import { useEffect, useState } from "react";
import { Eye, EyeOff, Minus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/client";
import PageHeader from "@/components/PageHeader";
import AddSareeModal from "@/components/AddSareeModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency, resolveImage } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const categories = [
  "All Categories",
  "Silk Saree",
  "Cotton Saree",
  "Designer Saree",
  "Fancy Saree",
  "Ilkal Saree",
  "Banarasi Saree",
  "Daily Wear Saree",
];

export default function InventoryPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadInventory = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== "All Categories") params.category = category;
      if (statusFilter !== "all") params.inventoryStatus = statusFilter;
      const { data } = await api.get("/inventory", { params });
      setItems(data);
    } catch (err) {
      toast.error("Failed to load inventory", { description: err?.response?.data?.message || err.message });
    }
  };

  useEffect(() => {
    loadInventory();
  }, [search, category, statusFilter]);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this saree?")) return;
    try {
      await api.delete(`/inventory/${id}`);
      toast.success("Saree deleted");
      loadInventory();
    } catch (err) {
      toast.error("Failed to delete saree", { description: err?.response?.data?.message || err.message });
    }
  };

  const toggleVisibility = async (id) => {
    try {
      await api.patch(`/inventory/${id}/toggle`);
      toast.success("Visibility updated");
      loadInventory();
    } catch (err) {
      toast.error("Failed to update visibility", { description: err?.response?.data?.message || err.message });
    }
  };

  const adjustStock = async (id, action) => {
    try {
      await api.patch(`/inventory/${id}/stock`, { action });
      loadInventory();
    } catch (err) {
      toast.error("Failed to adjust stock", { description: err?.response?.data?.message || err.message });
    }
  };

  const totalCount = items.length;
  const inStockCount = items.filter((item) => item.inventoryStatus === "in_stock").length;
  const soldCount = items.filter((item) => item.inventoryStatus === "sold").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inventory"
        title="Curate the collection"
        description="Add new arrivals, adjust pricing, update stock, and keep the live website inventory in sync."
        actions={
          user?.role === "admin" ? (
            <Button onClick={() => { setSelected(null); setModalOpen(true); }}>
              <Plus size={16} className="mr-2" />
              Add Saree
            </Button>
          ) : null
        }
      />

      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto]">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <Input
                className="pl-11"
                placeholder="Search by name, category, fabric, color..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((entry) => (
                <option key={entry} value={entry}>{entry}</option>
              ))}
            </select>
            <select
              className="rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="sold">Sold Out</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">Total items</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{totalCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">In stock</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{inStockCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">Sold out</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{soldCount}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Piece</th>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">MRP</th>
                  <th className="px-4 py-3 font-medium">Sales Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  {user?.role === "admin" ? <th className="px-4 py-3 font-medium">Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-border/70">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImage(item.images?.[0]?.url) || "https://placehold.co/80x80?text=Saree"}
                          alt={item.name}
                          className="h-14 w-14 rounded-2xl object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted">{item.sku || "—"}</td>
                    <td className="px-4 py-4">{item.category}</td>

                                        <td className="px-4 py-4">
                      {item.salePrice ? (
                        <span className="text-primary font-medium">{formatCurrency(item.price)}</span>
                      ) : (
                        <span>{formatCurrency(item.price)}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">{item.salePrice ? formatCurrency(item.salePrice) : "—"}</td>
                    <td className="px-4 py-4">
                      {user?.role === "admin" ? (
                        <div className="flex items-center gap-2">
                          <button
                            title="Remove 1 from stock"
                            disabled={item.stock <= 0}
                            onClick={() => adjustStock(item._id, "decrement")}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-[#120f0c] text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center font-medium text-foreground">{item.stock}</span>
                          <button
                            title="Add 1 to stock"
                            onClick={() => adjustStock(item._id, "increment")}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-[#120f0c] text-muted transition hover:border-primary hover:text-primary"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      ) : (
                        <span>{item.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge tone={item.inventoryStatus === "sold" ? "danger" : "success"}>
                          {item.inventoryStatus === "sold" ? "Sold Out" : "In Stock"}
                        </Badge>
                        <Badge tone={item.available ? "success" : "warning"}>
                          {item.available ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                    </td>
                    {user?.role === "admin" ? (
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            title={item.available ? "Hide from website" : "Show on website"}
                            onClick={() => toggleVisibility(item._id)}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-[#120f0c] px-3 py-1.5 text-xs text-muted transition hover:border-primary hover:text-primary"
                          >
                            {item.available ? <EyeOff size={13} /> : <Eye size={13} />}
                            {item.available ? "Hide" : "Show"}
                          </button>
                          <button
                            title="Edit saree"
                            onClick={() => { setSelected(item); setModalOpen(true); }}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-[#120f0c] px-3 py-1.5 text-xs text-muted transition hover:border-primary hover:text-primary"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          <button
                            title="Delete saree"
                            onClick={() => deleteItem(item._id)}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-[#120f0c] px-3 py-1.5 text-xs text-red-400 transition hover:border-red-400"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
                {!items.length && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted">
                      No sarees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddSareeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={selected}
        onSaved={loadInventory}
      />
    </div>
  );
}
