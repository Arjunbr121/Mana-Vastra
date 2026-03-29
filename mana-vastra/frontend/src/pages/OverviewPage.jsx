import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
            {stats.monthlyTrend.length ? (
              <ResponsiveContainer width="100%" height={288}>
                <BarChart
                  data={stats.monthlyTrend}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  barCategoryGap="30%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2118" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#9c8a72", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(d) => `${parseInt(d, 10)}`}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#9c8a72", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(193,149,84,0.08)" }}
                    contentStyle={{
                      background: "#120f0c",
                      border: "1px solid #2a2118",
                      borderRadius: "12px",
                      color: "#f5ede0",
                      fontSize: 13,
                    }}
                    formatter={(value, name) =>
                      name === "revenue"
                        ? [formatCurrency(value), "Revenue"]
                        : [value, "Sarees sold"]
                    }
                    labelFormatter={(label) => `Day ${parseInt(label, 10)}`}
                  />
                  <Bar dataKey="soldCount" name="soldCount" fill="#c19554" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted">
                No sarees marked sold this month yet.
              </div>
            )}
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
