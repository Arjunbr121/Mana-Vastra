import { useEffect, useState } from "react";
import api from "@/api/client";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
};

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadUsers = async () => {
    const { data } = await api.get("/auth/users");
    setUsers(data);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      loadUsers();
    }
  }, [user]);

  if (user?.role !== "admin") {
    return (
      <div className="rounded-3xl border border-border bg-[#120f0c] p-8 text-muted">
        Only admins can manage staff accounts.
      </div>
    );
  }

  const handleCreate = async (event) => {
    event.preventDefault();
    await api.post("/auth/users", form);
    setForm(initialForm);
    loadUsers();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Users"
        title="Team access"
        description="Create staff accounts and control whether each person has full admin rights or read-only access."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreate}>
              <Input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
                required
              />
              <select
                className="w-full rounded-xl border border-border bg-[#120f0c] px-4 py-3 text-sm text-foreground"
                value={form.role}
                onChange={(e) => setForm((current) => ({ ...current, role: e.target.value }))}
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
              <Button className="w-full" type="submit">
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            {users.map((staff) => (
              <div key={staff._id} className="rounded-2xl border border-border bg-[#120f0c] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-muted">{staff.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm capitalize text-primary">{staff.role}</p>
                    <p className="text-xs text-muted">Added {formatDate(staff.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
