import { motion } from "framer-motion";
import { formatPrice, PATTERNS } from "../data/sarees";

function SareePlaceholder({ saree, index }) {
  const p = PATTERNS[index % PATTERNS.length];
  const id = `sv${index}`;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 240 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={saree.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0A0705" />
        </linearGradient>
        <pattern
          id={`pat${id}`}
          x="0"
          y="0"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M15 2 L28 15 L15 28 L2 15 Z"
            fill="none"
            stroke={p[1]}
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="240" height="320" fill={`url(#bg${id})`} />
      <rect width="240" height="320" fill={`url(#pat${id})`} />
      <path
        d="M60 40 Q80 60 70 120 Q60 180 80 240 Q100 280 120 300 Q90 285 70 250 Q50 210 55 170 Q60 130 45 80 Z"
        fill={p[1]}
        opacity="0.15"
      />
      <path
        d="M120 20 Q160 50 155 110 Q150 170 170 220 Q185 260 180 300 Q160 280 155 240 Q145 200 145 160 Q145 110 130 60 Z"
        fill={p[1]}
        opacity="0.1"
      />
      <rect
        x="10"
        y="10"
        width="220"
        height="300"
        fill="none"
        stroke={p[1]}
        strokeWidth="1"
        opacity="0.3"
      />
      <rect
        x="16"
        y="16"
        width="208"
        height="288"
        fill="none"
        stroke={p[1]}
        strokeWidth="0.5"
        opacity="0.2"
      />
      <g transform="translate(120,160)">
        <path
          d="M0,-20 C8,-8 20,0 20,0 C8,8 0,20 0,20 C-8,8 -20,0 -20,0 C-8,-8 0,-20 0,-20Z"
          fill={p[1]}
          opacity="0.5"
        />
        <circle cx="0" cy="0" r="5" fill={p[1]} opacity="0.7" />
      </g>
      <g opacity="0.4">
        {[30, 70, 110, 150, 190, 210].map((x) => (
          <circle key={x} cx={x} cy="35" r="2" fill={p[1]} />
        ))}
      </g>
      <rect x="10" y="270" width="220" height="20" fill={p[1]} opacity="0.15" />
      <path
        d="M10 270 Q60 260 120 270 Q180 280 230 270 L230 290 Q180 285 120 280 Q60 275 10 290 Z"
        fill={p[1]}
        opacity="0.2"
      />
    </svg>
  );
}

export default function SareeCard({ saree, index, onOrder }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)",
      }}
      onClick={() => onOrder(saree)}
      className="cursor-pointer rounded-sm overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1A1510 0%, #231D16 100%)",
        border: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <SareePlaceholder saree={saree} index={index} />
        </motion.div>

        {/* Badge */}
        <div
          className="absolute top-2.5 left-2.5 font-cinzel text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-sm"
          style={{
            background: "linear-gradient(135deg, #8B6914, #C9A84C)",
            color: "#0A0705",
          }}
        >
          {saree.type}
        </div>
      </div>

      {/* Info */}
      <div
        className="px-4 pt-3 pb-4"
        style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div
          className="font-cormorant text-[11px] tracking-[0.2em] uppercase mb-1"
          style={{ color: "#A08858" }}
        >
          {saree.type}
        </div>
        <div
          className="font-cormorant font-semibold text-base leading-snug mb-2.5"
          style={{ color: "#F5EDD6" }}
        >
          {saree.name}
        </div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-garamond text-lg" style={{ color: "#F0D080" }}>
            {formatPrice(saree.price)}
          </span>
          <span
            className="font-cinzel text-[8px] tracking-wider px-2 py-1 rounded-sm"
            style={{
              color: "#A08858",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {saree.id}
          </span>
        </div>
        <motion.button
          whileHover={{ opacity: 0.88 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            onOrder(saree);
          }}
          className="block w-full font-cormorant font-bold text-xs tracking-[0.15em] uppercase py-2.5 rounded-sm text-center"
          style={{
            background: "linear-gradient(135deg, #8B6914, #C9A84C)",
            color: "#0A0705",
          }}
        >
          Order Now
        </motion.button>
      </div>
    </motion.div>
  );
}
