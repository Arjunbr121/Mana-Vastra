import { useEffect, useState } from "react";
import { CheckCheck, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import api from "@/api/client";
import PageHeader from "@/components/PageHeader";
import AddSareeModal from "@/components/AddSareeModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
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
    const params = {};
    if (search) params.search = search;
    if (category !== "All Categories") params.category = category;
    if (statusFilter !== "all") params.inventoryStatus = statusFilter;

    const { data } = await api.get("/inventory", { params });
    setItems(data);
  };

  useEffect(() => {
    loadInventory();
  }, [search, category, statusFilter]);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this saree?")) {
      return;
    }

    await api.delete(`/inventory/${id}`);
    loadInventory();
  };

  const toggleAvailability = async (id) => {
    await api.patch(`/inventory/${id}/toggle`);
    loadInventory();
  };

  const updateInventoryStatus = async (id, inventoryStatus) => {
    await api.patch(`/inventory/${id}/status`, { inventoryStatus });
    loadInventory();
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
            <Button
              onClick={() => {
                setSelected(null);
                setModalOpen(true);
              }}
            >
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
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
            <select
              className="rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">Visible inventory</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{totalCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">In stock</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{inStockCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-4">
              <p className="text-sm text-muted">Sold</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{soldCount}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Piece</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Inventory</th>
                  {user?.role === "admin" ? <th className="px-4 py-3 font-medium">Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-border/70">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.images?.[0]?.url || "https://placehold.co/80x80?text=Saree"}
                          alt={item.name}
                          className="h-14 w-14 rounded-2xl object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted">{item.sku || "No SKU"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{item.category}</td>
                    <td className="px-4 py-4">{formatCurrency(item.salePrice || item.price)}</td>
                    <td className="px-4 py-4">{item.stock}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge tone={item.inventoryStatus === "sold" ? "danger" : "success"}>
                          {item.inventoryStatus === "sold" ? "Sold" : "In Stock"}
                        </Badge>
                        <Badge tone={item.available ? "success" : "warning"}>
                          {item.available ? "Visible" : "Hidden"}
                        </Badge>
                      </div>
                    </td>
                    {user?.role === "admin" ? (
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" onClick={() => toggleAvailability(item._id)}>
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              updateInventoryStatus(
                                item._id,
                                item.inventoryStatus === "sold" ? "in_stock" : "sold"
                              )
                            }
                          >
                            <CheckCheck size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSelected(item);
                              setModalOpen(true);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-danger"
                            onClick={() => deleteItem(item._id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
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
