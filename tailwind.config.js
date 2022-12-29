/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: { primary: "#e8513a", secondary: "#272643" },
    },
    fontFamily: { Poppins: ["Poppins", "sans-serif"] },
    container: { padding: "2rem", center: true },
    screens: { sm: "640px", md: "768px" },
  },
  plugins: [],
};
