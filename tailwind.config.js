/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Official Brand Color Palette
        midnight: {
          DEFAULT: '#101116',
          900: '#0C0D11',
          950: '#08080B',
        },
        charcoal: {
          DEFAULT: '#1D2028',
          card: '#161820',
          hover: '#252934',
          border: '#2C303D',
          light: '#353A49',
        },
        gold: {
          DEFAULT: '#C9A45C', // Champagne Gold
          light: '#E5BE72',   // Light Gold
          dark: '#A5823E',
          muted: '#C9A45C26',
        },
        ivory: {
          DEFAULT: '#F5F3EE',
          muted: '#DCD9CF',
          subtle: '#B8B5AB',
        },
        muted: {
          DEFAULT: '#85858F',
          light: '#9E9EA8',
          dark: '#585863',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Plus Jakarta Sans', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(201, 164, 92, 0.25)',
        'gold-glow-lg': '0 0 35px -5px rgba(229, 190, 114, 0.35)',
        'cinematic': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}
