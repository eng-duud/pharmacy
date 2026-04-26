import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0056b3",
          dark: "#003d80",
          light: "#3378c2",
        },
        teal: {
          DEFAULT: "#008080",
          light: "#20b2aa",
        },
        medical: {
          clean: "#f8fafc",
          accent: "#e0f2f1",
        }
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
