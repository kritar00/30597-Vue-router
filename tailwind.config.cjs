/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cornflower-blue': {
          '50': '#edf6ff',
          '100': '#dfedff',
          '200': '#c5deff',
          '300': '#a2c7ff',
          '400': '#7ca6fd',
          '500': '#6489f7',
          '600': '#405eeb',
          '700': '#324ad0',
          '800': '#2b40a8',
          '900': '#2b3d84',
        },
      },
      aspectRatio: {
        "9/14": '9 / 14'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },

  },
  plugins: [],
}
