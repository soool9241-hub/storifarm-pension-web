import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F1FAF6",
          100: "#E1F5EE",
          500: "#0F6E56",
          600: "#0B5A46",
          700: "#085041",
          900: "#04342C",
        },
        ink: {
          900: "#0B0F0E",
          700: "#33403C",
          500: "#5B6A65",
          300: "#A7B3AE",
          100: "#ECEFED",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,20,16,0.04), 0 8px 24px rgba(10,20,16,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
