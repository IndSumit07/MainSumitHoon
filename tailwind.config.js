/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monts: "Montserrat",
        bruno: "Bruno Ace",
        zen: "Zen Dots",
        mich: "Michroma",
        orb: "Orbitron",
        space: "Space Grotesk",
      },
    },
  },
  plugins: [],
};
