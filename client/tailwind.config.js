/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        everforest: {
          bg: "#2D353B",
          border: "#3D4649",
          borderFocused: "#9F947D",
          bgSoft: "#2F383E",
          select: "#3C464C",
          selectFocused: "#4D555B",
          text: "#EBE5D3",
          textDisabled: "#565957",
          header: "#D3C6AA",
          red: "#C36869",
          green: "#83C092",
          greener: "#4C7054",
          greenHover: "#578061",
          orange: "#E69873",
          blue: "#31608E",
          blueHover: "#3A729A",
          darkBlue: "#475673",
          darkBlueHover: "#586680",
          cyan: "#7FBBB3",
          pink: "#756070",
          pinkHover: "#7C6877",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drag-none": {
          "-webkit-user-drag": "none",
          "-khtml-user-drag": "none",
          "-moz-user-drag": "none",
          "-o-user-drag": "none",
          "user-drag": "none",
        },
      });
    }),
  ],
};
