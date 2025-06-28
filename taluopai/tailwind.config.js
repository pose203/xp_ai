/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin-reverse 12s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'flow-down': 'flow-down 4s ease-in-out infinite',
        'flow-up': 'flow-up 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(200, 182, 255, 0.3)',
      },
      colors: {
        primary: {
          DEFAULT: '#c8b6ff',
          dark: '#2d1b4d',
          darker: '#1a1333',
          light: '#e2d9ff',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
} 