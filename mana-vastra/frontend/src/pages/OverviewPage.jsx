import { useEffect, useState } from "react";
import api from "@/api/client";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalSarees: 0,
    availableSarees: 0,
    soldSarees: 0,
    totalRevenue: 0,
    monthlySoldSarees: 0,
    monthlyRevenue: 0,
    topCategories: [],
    monthlyTrend: [],
  });

  useEffect(() => {
    api.get("/inventory/stats").then(({ data }) => setStats(data));
  }, []);

  const maxSoldCount = Math.max(...stats.monthlyTrend.map((item) => item.soldCount), 1);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Store pulse"
        description="Track live inventory, sold pieces, and this month’s manual WhatsApp sales performance."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Sarees" value={stats.totalSarees} hint="Catalog size" />
        <StatCard label="Available Pieces" value={stats.availableSarees} hint="Ready to sell" />
        <StatCard label="Sold Pieces" value={stats.soldSarees} hint="Tracked manually" />
        <StatCard label="Sales Value" value={formatCurrency(stats.totalRevenue)} hint="Sold inventory value" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>This month sales trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-end gap-3">
              {stats.monthlyTrend.length ? (
                stats.monthlyTrend.map((item) => (
                  <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className="w-full rounded-t-2xl bg-gradient-to-t from-primary to-[#f1d3a0]"
                      style={{ height: `${Math.max((item.soldCount / maxSoldCount) * 100, 12)}%` }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{item.soldCount}</p>
                      <p className="text-xs text-muted">{item.day}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted">
                  No sarees marked sold this month yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-[#120f0c] p-5">
              <p className="text-sm text-muted">Sarees sold this month</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{stats.monthlySoldSarees}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-5">
              <p className="text-sm text-muted">This month sales value</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{formatCurrency(stats.monthlyRevenue)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#120f0c] p-5">
              <p className="text-sm text-muted">Sell-through rate</p>
              <p className="mt-3 text-4xl font-semibold text-primary">
                {stats.totalSarees ? Math.round((stats.soldSarees / stats.totalSarees) * 100) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category performance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.topCategories.map((entry) => (
            <div key={entry.category} className="rounded-2xl border border-border bg-[#120f0c] p-5">
              <p className="text-sm text-muted">{entry.category}</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{entry.total}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-muted">
                <span>In stock: {entry.inStock}</span>
                <span>Sold: {entry.sold}</span>
              </div>
            </div>
          ))}
          {!stats.topCategories.length ? (
            <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted">
              Add inventory to start seeing category analytics.
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
