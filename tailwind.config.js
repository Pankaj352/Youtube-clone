/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'youtube': {
          red: '#FF0000',
          black: '#282828',
          gray: '#909090',
          'dark-bg': '#0F0F0F',
          'light-bg': '#FFFFFF',
          'hover-bg': '#272727',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}