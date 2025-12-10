/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#050505',
        'cyber-gray': '#121212',
        'neon-green': '#00ff9d',
        'neon-blue': '#00f3ff',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #00ff9d, 0 0 20px #00ff9d',
        'card-glow': '0 0 5px rgba(0, 255, 157, 0.2), 0 0 15px rgba(0, 255, 157, 0.1)',
      },
    },
  },
  plugins: [],
}