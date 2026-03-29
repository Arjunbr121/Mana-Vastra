import { motion, AnimatePresence } from "framer-motion";
import { SAREES, CATEGORIES } from "../data/sarees";
import SareeCard from "./SareeCard";

export default function SareeGrid({ activeCategory, onOrder }) {
  const filtered =
    activeCategory === "All"
      ? SAREES
      : SAREES.filter((s) => s.category === activeCategory);
  const title =
    CATEGORIES.find((c) => c.key === activeCategory)?.label ||
    "All Collections";

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
          style={{
            fontSize: "clamp(18px, 5vw, 30px)",
            color: "#F0D080",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-2.5">
          <div
            className="w-20 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #8B6914)",
            }}
          />
          <span style={{ color: "#C9A84C", fontSize: 10 }}>✦</span>
          <div
            className="w-20 h-px"
            style={{
              background: "linear-gradient(90deg, #8B6914, transparent)",
            }}
          />
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
                ? {
                    background: "linear-gradient(135deg, #8B6914, #C9A84C)",
                    color: "#0A0705",
                    borderColor: "#C9A84C",
                  }
                : {
                    background: "transparent",
                    color: "#A08858",
                    borderColor: "rgba(201,168,76,0.25)",
                  }
            }
          >
            {label.replace(" Saree", "").replace(" Wear", " Wear")}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid gap-4 sm:gap-6 max-w-6xl mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((saree, i) => (
            <SareeCard
              key={saree.id}
              saree={saree}
              index={i}
              onOrder={onOrder}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
