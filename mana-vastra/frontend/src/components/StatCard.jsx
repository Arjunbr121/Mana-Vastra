import { Card, CardContent } from "./ui/card";

export default function StatCard({ label, value, hint }) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{hint}</p>
      </CardContent>
    </Card>
  );
}
