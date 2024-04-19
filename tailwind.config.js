/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        '1440': '1440px'
      },
      colors: {
        'cpink': '#FE93B1',
      },
      keyframes: {
        'border-spin': {
          '100%': { transform: 'rotate(-360deg)' }
        }
      },
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
      }
    },
    fontFamily: {
      jost: ["Jost", "system-ui", "sans-serif"],
    },
  },
  plugins: [],
};
