/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'DM Mono'", "monospace"],
        display: ["'Bebas Neue'", "cursive"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: "#050810",
        surface: "#08101a",
        border: "#182436",
        muted: "#2d4a62",
        primary: "#0ea5e9",
        "primary-dark": "#0369a1",
        accent: "#38bdf8",
        success: "#4ade80",
        warning: "#f59e0b",
        danger: "#ef4444",
        purple: "#a78bfa",
      },
    },
  },
  plugins: [],
}
