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
        'black': {
          '50': '#f7f7f7',
          '100': '#e3e3e3',
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#666666',
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '900': '#000000',
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
