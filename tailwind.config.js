/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-text": "linear-gradient(to right, #ff7e5f, #feb47b)",
      },
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      bgPrimary: "var(--color-bg-primary)",
      tBase: "var(--color-text-base)",
    },
  },
};
