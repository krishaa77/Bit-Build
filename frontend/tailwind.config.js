/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        ink: {
          900: "#0b1220",
          800: "#0f172a",
          700: "#111c33",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)",
      },
    },
  },
  plugins: [],
};