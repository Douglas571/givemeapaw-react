/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#45BD93',
        secondary: '#F96153',
        divisor: 'hsl(0, 0%, 82%)',
        background: '#E1E0E0',

        'title-gray': '#8f8f8f',
      }
    },
  },
  plugins: [],
}
