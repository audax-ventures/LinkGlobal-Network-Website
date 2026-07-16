/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050914',
          900: '#0a1128',
          800: '#0e1c3d',
          700: '#132952',
        },
        brand: {
          blue: '#1ba3e0',
          cyan: '#3ec6ff',
          light: '#8fe0ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
