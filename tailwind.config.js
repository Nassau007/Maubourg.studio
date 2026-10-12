/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Exploration B "Foret": Bricolage Grotesque for headings, Hanken Grotesk for text.
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Deep forest green: the text colour on light sections and the
        // background of the hero, the closing form and the footer.
        ink: {
          DEFAULT: '#0F2A20',
          soft: '#163528',
          800: '#1D3F31',
          700: '#2C4639',
          600: '#3B5347',
          500: '#4E6458',
        },
        // Green-tinted paper, no cream.
        bone: {
          DEFAULT: '#EEF0EA',
          100: '#F7F8F4',
          200: '#E2E7DE',
          300: '#D1D9CC',
        },
        // Links and small marks on light sections: a mid forest green.
        emerald: {
          DEFAULT: '#1E5E46',
          light: '#26755A',
          dark: '#164735',
          50: '#E4EDE6',
        },
        // The one warm accent: coral. Fills and marks only, never small text
        // on a light background (it fails contrast there).
        signal: {
          DEFAULT: '#EE9278',
          dark: '#E07A5F',
          50: '#FBE6DE',
        },
      },
      borderRadius: {
        card: '20px',
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
