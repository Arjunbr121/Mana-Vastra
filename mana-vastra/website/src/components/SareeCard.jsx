import { motion } from "framer-motion";
import { formatPrice, PATTERNS } from "../data/sarees";

function SareePlaceholder({ saree, index }) {
  const p = PATTERNS[index % PATTERNS.length];
  const id = `sv${index}`;
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={saree.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0A0705" />
        </linearGradient>
        <pattern id={`pat${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M15 2 L28 15 L15 28 L2 15 Z" fill="none" stroke={p[1]} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill={`url(#bg${id})`} />
      <rect width="240" height="240" fill={`url(#pat${id})`} />
      <g transform="translate(120,120)">
        <path d="M0,-20 C8,-8 20,0 20,0 C8,8 0,20 0,20 C-8,8 -20,0 -20,0 C-8,-8 0,-20 0,-20Z" fill={p[1]} opacity="0.5" />
        <circle cx="0" cy="0" r="5" fill={p[1]} opacity="0.7" />
      </g>
    </svg>
  );
}

export default function SareeCard({ saree, index, onOrder }) {
  const discount = saree.salePrice
    ? Math.round(((saree.price - saree.salePrice) / saree.price) * 100)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)" }}
      onClick={() => onOrder(saree)}
      className="cursor-pointer rounded-sm overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A1510 0%, #231D16 100%)", border: "1px solid rgba(201,168,76,0.15)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} className="w-full h-full">
          {saree.image ? (
            <img src={saree.image} alt={saree.name} className="w-full h-full object-contain" style={{ background: "#0A0705" }} />
          ) : (
            <SareePlaceholder saree={saree} index={index} />
          )}
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-2.5 left-2.5 font-cinzel text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-sm"
          style={{ background: "linear-gradient(135deg, #8B6914, #C9A84C)", color: "#0A0705" }}
        >
          {saree.type}
        </div>

        {/* Discount badge */}
        {discount && (
          <div
            className="absolute top-2.5 right-2.5 font-cinzel text-[8px] px-1.5 py-0.5 rounded-sm"
            style={{ background: "rgba(155,35,53,0.85)", color: "#fff", border: "1px solid rgba(155,35,53,0.5)" }}
          >
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-3" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="font-cormorant font-semibold text-sm leading-snug mb-1.5 truncate" style={{ color: "#F5EDD6" }}>
          {saree.name}
        </div>

        {/* Price row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          <span className="font-garamond text-base font-semibold" style={{ color: "#F0D080" }}>
            {formatPrice(saree.salePrice || saree.price)}
          </span>
          {saree.salePrice && (
            <span className="font-garamond text-xs line-through" style={{ color: "#5A4A2A" }}>
              {formatPrice(saree.price)}
            </span>
          )}
        </div>

        <motion.button
          whileHover={{ opacity: 0.88 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { e.stopPropagation(); onOrder(saree); }}
          className="block w-full font-cormorant font-bold text-xs tracking-[0.15em] uppercase py-2 rounded-sm text-center"
          style={{ background: "linear-gradient(135deg, #8B6914, #C9A84C)", color: "#0A0705" }}
        >
          Order Now
        </motion.button>
      </div>
    </motion.div>
  );
}
