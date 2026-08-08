import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F6F7F3",
        surface: "#FFFFFF",
        "surface-muted": "#EDF2EE",
        text: "#18211F",
        "text-muted": "#5F6B66",
        accent: "#276B58",
        "accent-soft": "#D8EBE2",
        "warning-soft": "#FFF2CC",
        border: "#D6DED8",
        clay: "#A55F47",
        ink: "#172622"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(23, 38, 34, 0.14)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
