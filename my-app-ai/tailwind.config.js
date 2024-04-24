/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{html,js}",
  ],

  theme: {
    extend: {
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
      },
      height: {
        120: "30rem",
      },
    },
  },
  plugins: [],
};
