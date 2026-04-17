/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./mission.html",
    "./founder.html",
    "./services/**/*.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#1C1C1C",
          slate: "#1C1C1C",
          black: "#000000",
          paper: "#FAFAFA",
          stone: "#D8D3CB",
          sage: "#C4C7B5",
          taupe: "#B8B2A6",
          rose: "#B8B2A6",
          roseDeep: "#1C1C1C",
          mist: "#F0EFED",
          accent: "#000000",
          accentMuted: "#E8E8E8",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: [
          "Plus Jakarta Sans",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(28, 28, 28, 0.08), 0 8px 16px -8px rgba(28, 28, 28, 0.06)",
        card: "0 1px 3px rgba(28, 28, 28, 0.06), 0 8px 24px rgba(28, 28, 28, 0.06)",
      },
      backgroundImage: {
        "wash-light":
          "radial-gradient(1200px 600px at 10% -10%, rgba(28, 28, 28, 0.04), transparent 55%), radial-gradient(900px 500px at 90% 0%, rgba(216, 211, 203, 0.45), transparent 52%)",
        "wash-hero":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(28, 28, 28, 0.06), transparent 60%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(196, 199, 181, 0.22), transparent 50%)",
      },
      transitionDuration: {
        DEFAULT: "220ms",
      },
    },
  },
  plugins: [],
};
