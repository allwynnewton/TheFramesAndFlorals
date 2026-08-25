import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ---- Light "white & pink florals" palette ----
        blush: '#FBF4F2', // base warm white-pink (page background)
        porcelain: '#FFFFFF',
        petal: '#F7E4E7', // soft pink tint background
        mist: '#EEF2E9', // soft sage-tinted background
        rose: '#D98B98', // dusty-rose accent
        mauve: '#9C6B78', // deeper rose for emphasis
        sage: '#93A583', // greenery accent
        champagne: '#C2A063', // muted gold accent
        ink: '#4A403C', // primary text (warm taupe-charcoal)
        inksoft: '#6C635F', // muted taupe secondary text
        // ---- legacy tokens (kept so nothing errors; being phased out) ----
        ivory: '#F6F0E7',
        cream: '#E8DDCE',
        forest: '#17231D',
        charcoal: '#191919',
        wine: '#5A2634',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
