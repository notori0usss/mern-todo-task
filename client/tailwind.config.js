/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFF7D4 ",
        button: "#FFD95A ",
        highlight: "#C07F00",
        normal: "#4C3D3D",
      },
    },
  },
  plugins: [],
};
