import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0D0F14',
          surface: '#151820',
          surface2: '#1C2030',
          surface3: '#242838',
        },
        accent: { DEFAULT: '#4F8EF7', 2: '#6B5EFF' },
        status: {
          critical: '#FF4D6A',
          high: '#FF8C42',
          medium: '#FFD166',
          resolved: '#06D6A0',
        },
        text: {
          primary: '#F0F2F8',
          secondary: '#8892A4',
          tertiary: '#555E70',
        },
      },
      fontFamily: { sans: ['Onest', 'system-ui', 'sans-serif'] },
      borderRadius: { sm: '12px', md: '18px', lg: '24px' },
      height: { nav: '68px', topbar: '58px' },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        float: 'float 3s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
