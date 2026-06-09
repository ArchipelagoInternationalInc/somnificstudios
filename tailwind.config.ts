import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body:  ["var(--font-body)",  "Montserrat",            "system-ui", "sans-serif"],
        title: ["var(--font-title)", "Montserrat Alternates", "sans-serif"],
        hand:  ["var(--font-hand)",  "Caveat",                "cursive"],
      },
      colors: {
        "brand-bg":    "#6498d8",
        "brand-navy":  "#0c1746",
        "brand-field": "#131e54",
        "brand-glow":  "#ffe9b0",
        "brand-text":  "#f4f7fe",
      },
    },
  },
  plugins: [],
};
export default config;
