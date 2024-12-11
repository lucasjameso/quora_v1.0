/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#013362',
            dark: '#014789'
          },
          secondary: {
            DEFAULT: '#1D3E84',
            dark: '#2650A8'
          },
          accent: {
            DEFAULT: '#F46F25',
            hover: '#FF8544'
          },
          dark: {
            DEFAULT: '#2A2A2A',
            lighter: '#333333',
            darker: '#1A1A1A'
          },
          gray: {
            DEFAULT: '#7F7F7F',
            dark: '#404040',
            medium: '#7F7F7F',
            light: '#BFBFBF'
          },
          text: {
            DEFAULT: '#F4F5F1',
            secondary: '#BFBFBF'
          },
          background: {
            DEFAULT: '#2A2A2A',
            darker: '#1A1A1A'
          }
        }
      },
      animation: {
        'pulse': 'pulse 8s ease-in-out infinite',
        'glow': 'glow 8s ease-in-out infinite'
      },
      transitionDuration: {
        '600': '600ms'
      }
    }
  },
  plugins: []
};