/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mukta': 'Mukta',
        'russo': 'Russo One'
      },
      colors: {
        'tl-primary': '#d183b5',
        'tl-secondary': '#28304f',
        'tl-light': '#f5f5fa',
        'tl-dark': '#151921',
        'tl-hover': '#dbaddf'
      }
    },
  },
  plugins: [],
}
