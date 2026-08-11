/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F2EDE3",
        "canvas-dim": "#E7DFCF",
        ink: "#221F1B",
        "ink-soft": "#4A453D",
        indigo: {
          DEFAULT: "#26344A",
          50: "#EEF1F5",
          100: "#D4DBE4",
          400: "#3E5470",
          500: "#26344A",
          600: "#1B2536",
          700: "#131A26",
        },
        rust: {
          DEFAULT: "#B5432B",
          50: "#FBEEEA",
          400: "#C25A3F",
          500: "#B5432B",
          600: "#8F341F",
        },
        gold: {
          DEFAULT: "#C99A3D",
          50: "#FBF3E1",
          400: "#D6AE5C",
          500: "#C99A3D",
        },
        sage: {
          DEFAULT: "#6B7A5E",
          50: "#EEF1EA",
          500: "#6B7A5E",
          600: "#54604A",
        },
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Source Sans 3'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      letterSpacing: {
        tag: "0.14em",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
      },
    },
  },
  plugins: [],
};
