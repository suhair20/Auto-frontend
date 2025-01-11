/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        "playball":["Playball"],
        "passion":["Passion"],
        "robot":["Robot"],
        "robot-bold":["Robot-bold"]
      }
    },
  },
  plugins: [],
}

