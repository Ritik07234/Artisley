/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Very important
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
