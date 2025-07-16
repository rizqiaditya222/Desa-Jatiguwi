import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#0E4D45', 
      },
      fontFamily: {
        plusJakartaSans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;