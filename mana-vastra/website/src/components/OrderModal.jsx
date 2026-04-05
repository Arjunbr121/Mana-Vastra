import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../data/sarees";

export default function OrderModal({ saree, onClose }) {
  if (!saree) return null;

  const lead = (() => { try { return JSON.parse(localStorage.getItem("mv_lead")) || {}; } catch { return {}; } })();

  const waMsg = encodeURIComponent(
    `Hi! I am *${lead.name || "a customer"}* from *${lead.city || "—"}* (📞 ${lead.phone || "—"}).\n\nI would like to order the *${saree.name}* (Code: ${saree.id}) priced at ${formatPrice(saree.salePrice || saree.price)}.\n\nKindly assist me with the order. Thank you! 🙏`,
  );

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center p-5"
        style={{ background: "rgba(0,0,0,0.85)" }}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-sm p-8"
          style={{
            background: "linear-gradient(160deg, #1A1510, #231D16)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-200"
            style={{
              border: "1px solid rgba(201,168,76,0.25)",
              color: "#C9A84C",
            }}
            aria-label="Close"
          >
            ✕
          </button>

          <div
            className="font-cinzel text-[11px] tracking-[0.2em] uppercase mb-1.5"
            style={{ color: "#C9A84C" }}
          >
            Order This Saree
          </div>
          <div
            className="font-cormorant font-semibold text-xl mb-5"
            style={{ color: "#F5EDD6" }}
          >
            {saree.name}
          </div>

          {[
            ["Type", saree.type],
            ["Selling Price", formatPrice(saree.salePrice || saree.price)],
            ...(saree.salePrice ? [["MRP", formatPrice(saree.price)]] : []),
            ["Saree Code", saree.id],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center py-2.5 font-garamond text-sm"
              style={{
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                color: "#D4C49A",
              }}
            >
              <span>{label}</span>
              <span style={{ color: "#F0D080", fontWeight: 600 }}>{value}</span>
            </div>
          ))}

          <div
            className="mt-5 p-3.5 rounded-sm text-center font-cormorant text-sm leading-relaxed"
            style={{
              background: "rgba(155,35,53,0.1)",
              border: "1px solid rgba(155,35,53,0.25)",
              color: "#D4C49A",
            }}
          >
            <strong className="block mb-1.5" style={{ color: "#F0D080" }}>
              📱 How to Order
            </strong>
            Send this Saree Code to <strong>7892106868</strong> on WhatsApp to
            place your order.
            <small className="block mt-1.5" style={{ color: "#A08858" }}>
              No calls · No COD · No Returns
            </small>
          </div>

          <motion.a
            whileHover={{ opacity: 0.9, y: -1 }}
            href={`https://wa.me/917892106868?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-3 rounded-sm font-cinzel text-[9px] tracking-[0.2em] uppercase text-white text-center"
            style={{ background: "#25D366" }}
          >
            ORDER ON WHATSAPP →
          </motion.a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
