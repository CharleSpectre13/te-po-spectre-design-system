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
        tepo: {
          void: '#03010A',
          night: '#0A0614',
          surface: '#120C24',
          elevated: '#1A1235',
          cyan: '#00E5D0',
          'cyan-bright': '#5EFBF0',
          ice: '#A8D8FF',
          ember: '#FF4D2E',
          'ember-soft': '#FF8A3D',
          gold: '#F5C542',
          'gold-bright': '#FFE08A',
          bone: '#F2EDE4',
          muted: '#9B93B0',
        },
      },
      boxShadow: {
        'tepo-cyan': '0 0 24px rgba(0, 229, 208, 0.45)',
        'tepo-gold': '0 0 28px rgba(245, 197, 66, 0.5)',
        'tepo-ember': '0 0 20px rgba(255, 77, 46, 0.4)',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
