/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-blue': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4285F4',
          },
        },
        '.scrollbar-thumb-rounded': {
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
          },
        },
        '.scrollbar-thumb-height': {
          '&::-webkit-scrollbar-thumb': {
            height: '10px',
          },
        },
        '.scrollbar-track-light': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#E1ECFF',
          },
        },
        '.scrollbar-thumb-hover': {
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
