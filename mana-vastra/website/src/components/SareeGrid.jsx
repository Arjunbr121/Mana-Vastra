import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../data/sarees";
import SareeCard from "./SareeCard";

const API = `${import.meta.env.VITE_API_URL || "https://mana-vastra-backend-production.up.railway.app/api"}`;

const BACKEND = import.meta.env.VITE_API_URL?.replace("/api", "") || "https://mana-vastra-backend-production.up.railway.app";

const resolveImage = (url) => {
  if (!url) return null;
  // Convert Google Drive share link to direct image URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  if (url.startsWith("http")) return url;
  return `${BACKEND}${url}`;
};

const mapSaree = (s) => ({
  id: s.sku || s._id,
  name: s.name,
  type: s.category,
  category: s.category,
  price: s.price,
  salePrice: s.salePrice || null,
  image: resolveImage(s.images?.[0]?.url),
  color: s.color || "#8B1A1A",
});

export default function SareeGrid({ activeCategory, onOrder }) {
  const [allSarees, setAllSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch once on mount
  useEffect(() => {
    fetch(`${API}/inventory?available=true`)
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then((data) => { setAllSarees(data.map(mapSaree)); setLoading(false); })
      .catch(() => { setError("Could not load inventory. Is the backend running?"); setLoading(false); });
  }, []);

  // Filter on the frontend
  const cat = CATEGORIES.find((c) => c.key === activeCategory);
  const sarees = cat?.dbValue
    ? allSarees.filter((s) => s.category === cat.dbValue)
    : allSarees;

  const title = CATEGORIES.find((c) => c.key === activeCategory)?.label || "All Collections";

  return (
    <section id="collections" className="px-4 py-14 sm:px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span
          className="font-cormorant italic text-xs tracking-[0.3em] uppercase block mb-2.5"
          style={{ color: "#A08858" }}
        >
          Our Curated
        </span>
        <h2
          className="font-cinzel mb-4"
          style={{ fontSize: "clamp(18px, 5vw, 30px)", color: "#F0D080", letterSpacing: "0.08em" }}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, #8B6914)" }} />
          <span style={{ color: "#C9A84C", fontSize: 10 }}>✦</span>
          <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, #8B6914, transparent)" }} />
        </div>
      </motion.div>

      {/* Category filter pills */}
      <div className="flex gap-2 flex-wrap justify-center mb-10 px-2">
        {CATEGORIES.map(({ key, label }) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrder(null, key)}
            className="font-cormorant font-semibold text-sm tracking-wide px-4 py-2 rounded-sm border transition-all duration-200"
            style={
              activeCategory === key
                ? { background: "linear-gradient(135deg, #8B6914, #C9A84C)", color: "#0A0705", borderColor: "#C9A84C" }
                : { background: "transparent", color: "#A08858", borderColor: "rgba(201,168,76,0.25)" }
            }
          >
            {label.replace(" Saree", "").replace(" Wear", " Wear")}
          </motion.button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-20 font-cormorant text-lg" style={{ color: "#A08858" }}>
          Loading collection…
        </div>
      )}
      {error && (
        <div className="text-center py-20 font-cormorant text-base" style={{ color: "#E05C6A" }}>
          {error}
        </div>
      )}
      {!loading && !error && sarees.length === 0 && (
        <div className="text-center py-20 font-cormorant text-lg" style={{ color: "#A08858" }}>
          No sarees available in this category.
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {sarees.map((saree, i) => (
              <SareeCard key={saree.id} saree={saree} index={i} onOrder={onOrder} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
