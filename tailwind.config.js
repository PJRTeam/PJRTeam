/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./mission.html",
    "./founder.html",
    "./training.html",
    "./services/**/*.html",
    "./news/**/*.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#111111",
          slate: "#454545",
          black: "#111111",
          paper: "#FFFFFF",
          stone: "#F5F3F0",
          sage: "#C4C7B5",
          tan: "#D8D3CB",
          blue: "#111111",
          blueHover: "#2A2A2A",
          blueMist: "#BEC7D0",
          taupe: "#E5E1DA",
          rose: "#E5E1DA",
          roseDeep: "#111111",
          mist: "#FAFAF9",
          accent: "#111111",
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
          "radial-gradient(1200px 600px at 10% -10%, rgba(17, 17, 17, 0.05), transparent 55%), radial-gradient(900px 500px at 90% 0%, rgba(190, 199, 208, 0.38), transparent 52%), linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%)",
        "wash-hero":
          "radial-gradient(ellipse 90% 70% at 50% -30%, rgba(17, 17, 17, 0.06), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(190, 199, 208, 0.28), transparent 50%), linear-gradient(180deg, #FFFFFF 0%, #F8F7F5 100%)",
      },
      transitionDuration: {
        DEFAULT: "220ms",
      },
    },
  },
  plugins: [],
};
