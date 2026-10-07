import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: '#581C25', dark: '#3E1219' },
        rose: '#8A5560',
        sage: '#B0B9B5',
        ocean: '#2F5670',
        cream: { DEFAULT: '#F3F2EE', light: '#FAF8F2' },
        ink: '#171313',
        danger: '#9B1C1C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: '6rem',
        gutter: '1.5rem',
      },
      maxWidth: {
        page: '80rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-8deg)' },
          '50%': { transform: 'translateY(-0.6rem) rotate(-5deg)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        carousel: 'marquee 50s linear infinite',
        float: 'float 6s ease-in-out infinite',
        rise: 'rise 0.9s ease-out both',
      },
    },
  },
} satisfies Config
