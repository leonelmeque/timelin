/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Notion-inspired minimal palette
        bg: {
          DEFAULT: '#FFFFFF',
          secondary: '#F7F6F3',
          tertiary: '#EDECE9',
          hover: '#E8E7E4',
          dark: '#191919',
        },
        fg: {
          DEFAULT: '#37352F',
          secondary: '#787774',
          tertiary: '#B4B4B0',
          inverse: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#2383E2',
          light: '#E8F0FE',
          hover: '#1B6EC2',
        },
        border: {
          DEFAULT: '#E3E2DE',
          strong: '#D3D1CB',
        },
        status: {
          todo: '#E3E2DE',
          ongoing: '#D3E5EF',
          onhold: '#FADEC9',
          completed: '#DBEDDB',
        },
        tag: {
          blue: '#D3E5EF',
          green: '#DBEDDB',
          orange: '#FADEC9',
          pink: '#F5E0E9',
          purple: '#E8DEEE',
          red: '#FFE2DD',
          yellow: '#FDECC8',
          gray: '#E3E2DE',
        },
        // Keep old colors for compatibility during migration
        primary: {
          50: '#F0EFF7', 100: '#A5A0CE', 200: '#7E78B8', 300: '#645CAA',
          400: '#464077', 500: '#3D3868', DEFAULT: '#3D3868',
        },
        success: {
          50: '#eff7ee', 100: '#a0d29f', 200: '#77bf75', 300: '#5bb259',
          400: '#407d3e', 500: '#386d36',
        },
        warning: {
          50: '#fbf8ed', 100: '#e9d797', 200: '#dfc66a', 300: '#d9ba4c',
          400: '#988235', 500: '#84712e',
        },
        danger: {
          50: '#fbedef', 100: '#e997a1', 200: '#df6a79', 300: '#d94c5d',
          400: '#983541', 500: '#842e39',
        },
        toolbar: {
          bg: '#191919',
          active: '#2F2F2F',
          accent: '#2383E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['11px', '16px'],
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      maxWidth: {
        'content': '900px',
      },
    },
  },
  plugins: [],
};
