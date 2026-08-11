/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0EA5E9",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        dark: "#0F172A",
        light: "#F8FAFC",
        glass: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31,38,135,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl2: "20px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fade: "fade 0.5s ease",
        slide: "slide .5s ease",
        pulseSlow: "pulse 3s infinite",
      },
      keyframes: {
        float: {
          "0%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        fade: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        slide: {
          "0%": {
            transform: "translateY(25px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
