import { useEffect, useState } from "react";
import { LogOut, LayoutGrid, Package, ArrowUp } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/inventory", label: "Inventory", icon: Package },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const main = document.getElementById("main-scroll");
    const onScroll = () => setShowTop(main.scrollTop > 300);
    main?.addEventListener("scroll", onScroll);
    return () => main?.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background bg-gold-grid bg-[size:100%_auto,32px_32px,32px_32px] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6">

        {/* Sticky sidebar */}
        <aside className="sticky top-6 h-[calc(100vh-3rem)] w-[280px] shrink-0 self-start rounded-3xl border border-border bg-card/95 p-6 shadow-glow flex flex-col">
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

          <nav className="mt-8 space-y-2 flex-1">
            {navItems.map((item) => {
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

          <Button className="mt-auto w-full" variant="outline" onClick={logout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </aside>

        {/* Scrollable main */}
        <main
          id="main-scroll"
          className="relative flex-1 overflow-y-auto rounded-3xl border border-border bg-card/70 p-5 shadow-glow backdrop-blur lg:p-8"
          style={{ maxHeight: "calc(100vh - 3rem)" }}
        >
          <Outlet />

          {/* Go to top button */}
          {showTop && (
            <button
              onClick={scrollToTop}
              title="Back to top"
              className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-glow transition hover:bg-primary hover:text-background"
            >
              <ArrowUp size={18} />
            </button>
          )}
        </main>

      </div>
    </div>
  );
}
