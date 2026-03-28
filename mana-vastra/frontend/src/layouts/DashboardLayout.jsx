import { LogOut, LayoutGrid, Package, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/users", label: "Users", icon: Users },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background bg-gold-grid bg-[size:100%_auto,32px_32px,32px_32px] text-foreground">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-border bg-card/95 p-6 shadow-glow">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Mana Vastra</p>
            <h1 className="mt-3 text-3xl font-semibold">Admin Atelier</h1>
            <p className="mt-2 text-sm text-muted">Luxury inventory control for your saree collection.</p>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-[#120f0c] p-4">
            <p className="text-sm text-muted">Signed in as</p>
            <p className="mt-2 font-semibold">{user?.name}</p>
            <p className="text-sm text-primary">{user?.role}</p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems
              .filter((item) => item.to !== "/users" || user?.role === "admin")
              .map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                        isActive ? "bg-primary text-background" : "text-muted hover:bg-white/5 hover:text-foreground"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
          </nav>

          <Button className="mt-8 w-full" variant="outline" onClick={logout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </aside>

        <main className="rounded-3xl border border-border bg-card/70 p-5 shadow-glow backdrop-blur lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
