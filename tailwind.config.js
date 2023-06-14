/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./src/**/*.{html,js, ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#6d9773',
      'secondary': '#bb8a52',
      'background': '#efefef',
      'font': '#0c3b2e',
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
  plugins: [],
}

