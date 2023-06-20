/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{html,js, ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#6d9773",
      "primary-half": "#849486",
      secondary: "#bb8a52",
      "secondary-half": "#bfa485",
      paper: "#efefef",
      "paper-half": "#d6d6d6",
      font: "#0c3b2e",
      "font-half": "#526560",
      surface: "#ffba00",
      error: "#bc6c25",
      tomato: "tomato",
      orange: "orange",
      yellow: "yellow",
      green: "green",
    },
    fontFamily: {
      serif: ["Cormorant Infant", "serif"],
      sans: ["Graphik", "sans-serif"],
    },
    extend: {
      spacinßg: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  extend: {},
  plugins: [],
}
