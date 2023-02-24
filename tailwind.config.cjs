/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#1F2128',
        secondaryBackground: '#242731',
        primary: '#6C5DD3',
        secondary: '#ecc94b',
        divider: '#454343',
        green: '#53CE53',
        red: '#FF5353',
        icon: '#808191'
      },
    },
  },
  plugins: [],
}
