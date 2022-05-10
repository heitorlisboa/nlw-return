module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#996dff',
          500: '#8257e5',
        },
        'on-brand': '#ffffff',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
