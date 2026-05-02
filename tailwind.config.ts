import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Urbanist",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "emerald-soft": "0 0 60px rgba(16, 185, 129, 0.16)",
        "blue-soft": "0 0 60px rgba(59, 130, 246, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
