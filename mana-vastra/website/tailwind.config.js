/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F0D080",
          dark: "#8B6914",
        },
        brand: {
          red: "#9B2335",
          green: "#2E6B3E",
          black: "#0A0705",
          dark1: "#110E09",
          dark2: "#1A1510",
          dark3: "#231D16",
          dark4: "#2D261C",
          cream: "#F5EDD6",
          "cream-dim": "#D4C49A",
          "text-dim": "#A08858",
        },
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        garamond: ['"EB Garamond"', "serif"],
      },
    },
  },
  plugins: [],
};
