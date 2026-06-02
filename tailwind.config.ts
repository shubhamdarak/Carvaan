import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f9",
          100: "#d5e0f1",
          200: "#adc1e3",
          300: "#7a9dd0",
          400: "#4f7bbd",
          500: "#3060a8",
          600: "#254d8d",
          700: "#1e3d72",
          800: "#182f58",
          900: "#0f1e38",
          950: "#080f1e",
        },
        teal: {
          50: "#edfafa",
          100: "#d5f5f6",
          200: "#aaebed",
          300: "#6fd9de",
          400: "#3cbfca",
          500: "#20a4b0",
          600: "#178595",
          700: "#166a7a",
          800: "#175563",
          900: "#164653",
          950: "#082e38",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15,30,56,0.06), 0 1px 2px -1px rgba(15,30,56,0.06)",
        "card-hover":
          "0 4px 12px 0 rgba(15,30,56,0.08), 0 2px 4px -1px rgba(15,30,56,0.06)",
        panel:
          "0 1px 4px 0 rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
