import { motion } from "framer-motion";

export default function OrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden text-center px-5 py-7"
      style={{
        background:
          "linear-gradient(135deg, #1A1510 0%, #231D16 50%, #1A1510 100%)",
        borderTop: "1px solid rgba(201,168,76,0.25)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(155,35,53,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div
          className="font-cinzel text-[11px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "#C9A84C" }}
        >
          📢 HOW TO ORDER
        </div>

        <div
          className="inline-block font-cormorant font-bold px-6 py-2.5 mb-5 rounded-sm"
          style={{
            fontSize: "clamp(17px, 4vw, 24px)",
            color: "#F0D080",
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          DM on WhatsApp <strong>7892106868</strong> with the Saree Code
        </div>

        <div className="flex flex-col gap-1.5 items-center">
          {[
            "No Phone Calls Accepted",
            "No Cash on Delivery  |  No Returns Policy",
          ].map((rule, i) => (
            <div
              key={i}
              className="flex items-center gap-2 font-garamond font-semibold"
              style={{
                fontSize: "clamp(12px, 2.5vw, 14px)",
                color: "#C0392B",
                letterSpacing: "0.06em",
              }}
            >
              <span style={{ color: "#E74C3C", fontWeight: 900 }}>✗</span>
              {rule}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
