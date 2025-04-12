/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#C1C2C5',
          100: '#A6A7AB',
          200: '#909296',
          300: '#5C5F66',
          400: '#373A40',
          500: '#2C2E33',
          600: '#25262B',
          700: '#1A1B1E',
          800: '#141517',
          900: '#101113',
        },
        primary: {
          50: '#E4F0FF',
          100: '#C9E0FF',
          200: '#A4C8FF',
          300: '#7EAFFF',
          400: '#5896FF',
          500: '#3377FF', // Main primary color
          600: '#2260DB',
          700: '#1549B7',
          800: '#0B3693',
          900: '#05246F',
        },
        secondary: {
          50: '#F0E7FF',
          100: '#E1CFFF',
          200: '#C9A7FF',
          300: '#B07FFF',
          400: '#9657FF',
          500: '#7C2FFF', // Main secondary color
          600: '#6520DB',
          700: '#4F14B7',
          800: '#390A93',
          900: '#23046F',
        },
        accent: {
          50: '#EDFCF4',
          100: '#D3F9E5',
          200: '#A7F3CC',
          300: '#7BEDB2',
          400: '#4FE799',
          500: '#23E17F', // Main accent color
          600: '#1BC16A',
          700: '#14A156',
          800: '#0D8142',
          900: '#06612E',
        },
        error: {
          50: '#FFE9E9',
          100: '#FFD3D3',
          200: '#FFA7A7',
          300: '#FF7B7B',
          400: '#FF4F4F',
          500: '#FF2323',
          600: '#DB1B1B',
          700: '#B71414',
          800: '#930D0D',
          900: '#6F0606',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.500), 0 0 20px theme(colors.primary.500)',
        'neon-secondary': '0 0 5px theme(colors.secondary.500), 0 0 20px theme(colors.secondary.500)',
        'neon-accent': '0 0 5px theme(colors.accent.500), 0 0 20px theme(colors.accent.500)',
      },
    },
  },
  plugins: [],
};
