/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#f9f9f9',
        // body: '#01012F',
        rose: '#BE123C',
        'rose-light': '#C93F61',
        'light-gray': '#9CA3AF',
        'text-gray': '#666666',
      },
      screens: {
        mobile: {
          max: '768px',
        },
      },
      // transitionProperty: {
      //   margin: 'margin',
      //   opacity: 'opacity',
      //   transform: 'transform',
      // },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
}
