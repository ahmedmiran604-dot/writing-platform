import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A",
        plum: "#4A1B4A",
        cream: "#FAF7F2",
        ink: "#2B2B2B",
        hairline: "#D8D2C4",
      },
      fontFamily: {
        bengali: ["var(--font-bengali)", "serif"],
        display: ["var(--font-lora)", "serif"],
      },
      maxWidth: {
        prose: "700px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "700px",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
