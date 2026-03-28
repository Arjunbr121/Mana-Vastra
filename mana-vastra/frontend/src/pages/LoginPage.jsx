import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@manavastra.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-gold-grid bg-[size:100%_auto,34px_34px,34px_34px] px-4 text-foreground">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-border bg-card/80 p-10 shadow-glow backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Luxury Control Room</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">Manage your saree collection with calm, elegant clarity.</h1>
          <p className="mt-6 max-w-xl text-base text-muted">
            Track stock, publish live inventory to your website, review orders, and manage staff access from one polished dashboard.
          </p>
        </section>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Admin Login</p>
            <h2 className="mt-3 text-3xl font-semibold">Welcome back</h2>
            <p className="mt-2 text-sm text-muted">Use your seeded credentials to enter the dashboard.</p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm text-muted">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <Input className="pl-11" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-muted">Password</span>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <Input
                    className="pl-11"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>

              {error ? <p className="rounded-xl bg-danger/20 px-4 py-3 text-sm text-[#efb0b0]">{error}</p> : null}

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Enter Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
