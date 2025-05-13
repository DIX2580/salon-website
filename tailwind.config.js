// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        'primary': '#d4a373',
        'secondary': '#faedcd',
        'accent': '#ccd5ae',
        'dark': '#2c2c2c',
        'light': '#fefefe',
      },
    },
  },
  plugins: [],
}