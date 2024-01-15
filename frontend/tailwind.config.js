/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#F8F3EA",
        navy: "#0B1957",
        beige: "#FFD8D1",
        pink: "#FA9EBC",
      },
      fontFamily: {
        primary: "Blackout",
      },
    },
  },
  plugins: [],
};
