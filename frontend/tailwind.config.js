/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#213294",
        secondary: "#4c4cb5",
        tertiary: "#3c5f96",
        modelDesc: "#cce6eb",
        white: '#fff',
        yellow: "#f7e892",
        cred:"#282c2e",
        save: "#cdcfd1",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'hero-lg': "url('../assets/back.jpg')",
        'hero-sm': "url('../assets/back.jpg')",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};