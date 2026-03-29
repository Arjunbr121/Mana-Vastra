import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../data/sarees";

export default function MenuDrawer({
  open,
  activeCategory,
  onSelect,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)" }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 left-0 h-full z-50 flex flex-col pt-20 pb-10"
            style={{
              width: "min(280px, 80vw)",
              background: "linear-gradient(160deg, #110E09 0%, #1A1510 100%)",
              borderRight: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <div
              className="font-cinzel text-[9px] tracking-[0.35em] uppercase px-7 pb-4 mb-2"
              style={{
                color: "#8B6914",
                borderBottom: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              Collections
            </div>

            {CATEGORIES.map(({ key, label }, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelect(key)}
                className="flex items-center gap-3 px-7 py-3 w-full text-left font-cormorant font-semibold text-base tracking-wide transition-all duration-200 relative"
                style={{
                  color: activeCategory === key ? "#F0D080" : "#D4C49A",
                  background:
                    activeCategory === key
                      ? "rgba(201,168,76,0.06)"
                      : "transparent",
                }}
              >
                {activeCategory === key && (
                  <motion.span
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ background: "#C9A84C" }}
                  />
                )}
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: "#C9A84C",
                    opacity: activeCategory === key ? 1 : 0.4,
                  }}
                />
                {label}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
