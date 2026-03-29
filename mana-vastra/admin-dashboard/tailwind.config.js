/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d0c0a",
        foreground: "#f5efe1",
        card: "#16130f",
        border: "#2d241a",
        muted: "#c5b28b",
        primary: "#d4a85d",
        secondary: "#6f5430",
        success: "#2d8b57",
        danger: "#a74b4b",
      },
      boxShadow: {
        glow: "0 18px 60px rgba(212, 168, 93, 0.18)",
      },
      backgroundImage: {
        "gold-grid":
          "radial-gradient(circle at top, rgba(212,168,93,0.16), transparent 40%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
