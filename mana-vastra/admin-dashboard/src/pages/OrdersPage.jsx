import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/api/client";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

const statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders", { description: err?.response?.data?.message || err.message });
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}`, { status });
      toast.success("Order status updated");
      loadOrders();
    } catch (err) {
      toast.error("Failed to update order status", { description: err?.response?.data?.message || err.message });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Orders"
        title="Client order flow"
        description="Track incoming orders from your website and keep fulfillment status up to date."
      />

      <Card>
        <CardContent className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-border bg-[#120f0c] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                    <Badge tone={order.status === "delivered" ? "success" : order.status === "cancelled" ? "danger" : "warning"}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {order.customerName} • {order.email} • {order.phone}
                  </p>
                  <p className="mt-2 text-sm text-muted">Placed on {formatDate(order.createdAt)}</p>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <p className="text-xl font-semibold text-primary">{formatCurrency(order.totalAmount)}</p>
                  <select
                    className="rounded-xl border border-border bg-card px-4 py-2 text-sm"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {order.items.map((item, index) => (
                  <div key={`${order._id}-${index}`} className="rounded-2xl border border-border p-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      Qty {item.quantity} • {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
