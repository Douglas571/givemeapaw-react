/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(181, 48%, 51%)',
        divisor: 'hsl(0, 0%, 82%)'
      }
    },
  },
  plugins: [],
}
