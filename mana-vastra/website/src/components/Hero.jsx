import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

export default function Hero({ onExplore }) {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,35,53,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(46,107,62,0.1) 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%)
        `,
      }}
    >
      {/* Ornament */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-5">
        <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C9A84C" }} />
        <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
      </motion.div>

      <motion.p
        {...fadeUp(0.1)}
        className="font-cormorant italic tracking-[0.3em] uppercase mb-4 text-sm"
        style={{ color: "#A08858" }}
      >
        Since generations of elegance
      </motion.p>

      <motion.h1
        {...fadeUp(0.2)}
        className="shimmer-text font-cinzel font-black leading-tight mb-1"
        style={{ fontSize: "clamp(32px, 9vw, 72px)" }}
      >
        ಮನ ವಸ್ತ್ರ

      </motion.h1>

            <motion.h2
        {...fadeUp(0.2)}
        className="shimmer-text font-cinzel font-black leading-tight mb-1"
        style={{ fontSize: "clamp(32px, 9vw, 72px)" }}
      >
        Mana Vastra
      </motion.h2>


      <motion.p
        {...fadeUp(0.35)}
        className="font-cormorant italic mb-12"
        style={{ fontSize: "clamp(15px, 3vw, 22px)", color: "#D4C49A", letterSpacing: "0.08em" }}
      >
        Where Tradition Meets Grace
      </motion.p>

      <motion.div {...fadeUp(0.5)} className="flex gap-4 flex-wrap justify-center">
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(201,168,76,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onExplore}
          className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-7 py-3"
          style={{
            background: "linear-gradient(135deg, #8B6914, #C9A84C, #8B6914)",
            color: "#0A0705",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          Explore Collections
        </motion.button>

        <motion.a
          whileHover={{ y: -2, background: "rgba(201,168,76,0.08)" }}
          whileTap={{ scale: 0.97 }}
          href="https://wa.me/917892106868"
          target="_blank"
          rel="noopener noreferrer"
          className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-7 py-3 border transition-all duration-200"
          style={{
            color: "#C9A84C",
            borderColor: "#C9A84C",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          Order on WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}
