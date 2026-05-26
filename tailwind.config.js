/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#4F46E5',
          DEFAULT: '#6366F1',
          dark: '#4338CA',
        },
      },
    },
  },
  plugins: [],
}
