/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#3b82f6',
      },
      backgroundImage: {
        'split-blue-white':
          'linear-gradient(to bottom, #3b82f6 40%, white 40%)',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
