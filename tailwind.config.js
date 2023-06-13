/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#6d9773',
      'secondary': '#0c3b2e',
      'background': '#bb8a52',
      'surface': '#ffba00',
      'error': '#bc6c25',
    },
    fontFamily: {
      serif: ['Cormorant Infant', 'serif'],
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  extend: {},
},
  plugins: [],
}

