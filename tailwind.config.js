/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: { DEFAULT: '#1A1A1A', light: '#2D2D2D' },
        accent: { DEFAULT: '#C4744A', light: '#D4926E', dark: '#A85D35' },
        bg: { DEFAULT: '#F8F6F3', secondary: '#F0EDE8' },
        border: '#E8E4DF',
        'border-hover': '#D4CFC8',
        'text-secondary': '#6B6560',
        'text-muted': '#9C9590',
        success: '#3B7D4F',
        error: '#C53030',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
