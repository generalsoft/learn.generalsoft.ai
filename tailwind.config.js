/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#7cc5fc',
          400: '#3aa2f8',
          500: '#0c82eb',
          600: '#0261cc',
          700: '#034ba3',
          800: '#073f85',
          900: '#0c356e',
          950: '#062049',
        },
      },
    },
  },
  plugins: [],
}
