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
          slate: "#454545",
          black: "#1C1C1C",
          paper: "#FFFFFF",
          stone: "#F5F3F0",
          sage: "#C4C7B5",
          taupe: "#E5E1DA",
          rose: "#E5E1DA",
          roseDeep: "#1C1C1C",
          mist: "#FAFAF9",
          accent: "#1C1C1C",
          accentMuted: "#F0EFEC",
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
        soft:
          "0 2px 20px -4px rgba(28, 28, 28, 0.06), 0 6px 16px -8px rgba(28, 28, 28, 0.04)",
        card: "0 1px 2px rgba(28, 28, 28, 0.03), 0 8px 24px rgba(28, 28, 28, 0.05)",
      },
      backgroundImage: {
        "wash-light":
          "radial-gradient(1200px 600px at 10% -10%, rgba(196, 199, 181, 0.14), transparent 55%), radial-gradient(900px 500px at 90% 0%, rgba(228, 225, 218, 0.45), transparent 52%), linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%)",
        "wash-hero":
          "radial-gradient(ellipse 90% 70% at 50% -30%, rgba(196, 199, 181, 0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(216, 211, 203, 0.28), transparent 50%), linear-gradient(180deg, #FFFFFF 0%, #F8F7F5 100%)",
      },
      transitionDuration: {
        DEFAULT: "220ms",
      },
    },
  },
  plugins: [],
};
