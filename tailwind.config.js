/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0EFF7',
          100: '#A5A0CE',
          200: '#7E78B8',
          300: '#645CAA',
          400: '#464077',
          500: '#3D3868',
          DEFAULT: '#3D3868',
        },
        success: {
          50: '#eff7ee',
          100: '#a0d29f',
          200: '#77bf75',
          300: '#5bb259',
          400: '#407d3e',
          500: '#386d36',
        },
        warning: {
          50: '#fbf8ed',
          100: '#e9d797',
          200: '#dfc66a',
          300: '#d9ba4c',
          400: '#988235',
          500: '#84712e',
        },
        danger: {
          50: '#fbedef',
          100: '#e997a1',
          200: '#df6a79',
          300: '#d94c5d',
          400: '#983541',
          500: '#842e39',
        },
        toolbar: {
          bg: '#1A1730',
          active: '#2D2952',
          accent: '#645CAA',
        },
      },
    },
  },
  plugins: [],
};
