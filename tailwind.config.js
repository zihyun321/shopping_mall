module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        'teal': {
          100: '#1de9b6',
          200: '#80cbc4',
          300: '#26a69a',
          400: '#009688',
          500: '#00897b',
          600: '#00796b',
          700: '#00695c',
          800: '#004d40',
        }
        // ...
      },
      fontSize: {

      },
      fontFamily: {
        
      }
    },
  },
  plugins: [],
}
