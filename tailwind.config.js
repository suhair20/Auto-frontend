/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "playball": ["Playball"],
        "passion": ["Passion"],
        "robot": ["Robot"],
        "robot-bold": ["Robot-bold"]
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slide: 'slide 15s linear infinite',
      },
      
    },
  },
  plugins: [],
};


