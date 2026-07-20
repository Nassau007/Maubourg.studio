/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm near-black
        ink: {
          DEFAULT: '#14140F',
          soft: '#1E1E17',
          800: '#26261D',
          700: '#3A3A2E',
          600: '#565646',
          500: '#77776A',
        },
        // Warm bone / paper
        bone: {
          DEFAULT: '#F5F1E8',
          100: '#FBF9F3',
          200: '#EFE9DB',
          300: '#E3DBC8',
        },
        // Brand emerald — growth, results, trust
        emerald: {
          DEFAULT: '#0E6B4A',
          light: '#12855C',
          dark: '#0A4E37',
          50: '#EAF5EF',
        },
        // Bright acid signal — used sparingly for emphasis
        signal: {
          DEFAULT: '#CBF74A',
          dark: '#A6D411',
        },
      },
      borderRadius: {
        card: '18px',
      },
      maxWidth: {
        content: '1160px',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
};
