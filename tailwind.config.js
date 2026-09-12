/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090B",
        card: "#18181B",
        card2: "#1f1f24",
        purple: { DEFAULT: "#7C3AED", light: "#a78bfa" },
        cyan: { DEFAULT: "#06B6D4", light: "#67e8f9" },
        gold: "#f5c451",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        floatUp: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0.9" },
          "100%": { transform: "translateY(-135vh) rotate(10deg)", opacity: "0" },
        },
        blink: { "50%": { opacity: "0" } },
        "pulse-heart": {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 25s linear infinite",
        floatUp: "floatUp 8s linear forwards",
        blink: "blink 0.8s step-end infinite",
        "pulse-heart": "pulse-heart 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
