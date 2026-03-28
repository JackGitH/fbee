import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0B0E11',
          dim: '#0B0E11',
          'container-low': '#101417',
          container: '#161A1E',
          'container-high': '#1C2024',
          'container-highest': '#22262B',
          bright: '#282D31',
        },
        primary: {
          DEFAULT: '#FFD16C',
          dim: '#ECB200',
          fixed: '#FDC003',
          container: '#FDC003',
          on: '#604700',
        },
        secondary: {
          DEFAULT: '#00E3FD',
          dim: '#00D4EC',
          fixed: '#26E6FF',
          'fixed-dim': '#00D7F0',
        },
        tertiary: {
          DEFAULT: '#B5FFC2',
          dim: '#24F07E',
          fixed: '#3FFF8B',
          'fixed-dim': '#24F07E',
        },
        error: {
          DEFAULT: '#FF7351',
          dim: '#D53D18',
          container: '#B92902',
        },
        'on-surface': '#F8F9FE',
        'on-surface-variant': '#A9ABAF',
        outline: {
          DEFAULT: '#737679',
          variant: '#45484C',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Inter Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'headline-lg': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['1.75rem', { lineHeight: '1.25', fontWeight: '600' }],
        'title-lg': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'title-md': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
