import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal({ onSuccess }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    // Save lead locally
    const lead = { ...form, createdAt: new Date().toISOString() };
    localStorage.setItem("mv_lead", JSON.stringify(lead));
    setTimeout(() => { setLoading(false); onSuccess(lead); }, 400);
  };

  const field = (key, label, placeholder, type = "text") => (
    <div className="mb-4">
      <label
        className="block font-cinzel text-[10px] tracking-[0.18em] uppercase mb-1.5"
        style={{ color: "#C9A84C" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: "" })); }}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-sm text-sm outline-none font-garamond"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${errors[key] ? "#9B2235" : "rgba(201,168,76,0.25)"}`,
          color: "#F5EDD6",
        }}
      />
      {errors[key] && (
        <p className="text-xs mt-1" style={{ color: "#E05C6A" }}>{errors[key]}</p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-5"
        style={{ background: "rgba(0,0,0,0.9)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="w-full max-w-sm rounded-sm p-8"
          style={{
            background: "linear-gradient(160deg, #1A1510, #231D16)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <div className="text-center mb-6">
            <div
              className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ color: "#C9A84C" }}
            >
              Welcome to
            </div>
            <div
              className="font-cormorant font-semibold text-2xl"
              style={{ color: "#F5EDD6" }}
            >
              Mana Vastra
            </div>
            <p className="font-garamond text-sm mt-2" style={{ color: "#A08858" }}>
              Tell us a little about yourself to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {field("name", "Your Name", "e.g. Priya Sharma")}
            {field("phone", "WhatsApp Number", "10-digit mobile number", "tel")}
            {field("city", "Your City", "e.g. Hyderabad")}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ opacity: 0.9, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 mt-2 rounded-sm font-cinzel text-[9px] tracking-[0.2em] uppercase text-white"
              style={{ background: loading ? "#7a6030" : "#C9A84C", color: "#1A1510" }}
            >
              {loading ? "Please wait…" : "Explore Collection →"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
