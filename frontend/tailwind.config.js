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
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
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
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.500), 0 0 20px theme(colors.primary.500)',
        'neon-secondary': '0 0 5px theme(colors.secondary.500), 0 0 20px theme(colors.secondary.500)',
        'neon-accent': '0 0 5px theme(colors.accent.500), 0 0 20px theme(colors.accent.500)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dots-pattern': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2389c05a\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        // WordPress preset gradients
        'vivid-cyan-blue-to-vivid-purple': 'linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%)',
        'light-green-cyan-to-vivid-green-cyan': 'linear-gradient(135deg, rgb(122, 220, 180) 0%, rgb(0, 208, 130) 100%)',
        'luminous-vivid-amber-to-luminous-vivid-orange': 'linear-gradient(135deg, rgba(252, 185, 0, 1) 0%, rgba(255, 105, 0, 1) 100%)',
        'luminous-vivid-orange-to-vivid-red': 'linear-gradient(135deg, rgba(255, 105, 0, 1) 0%, rgb(207, 46, 46) 100%)',
        'very-light-gray-to-cyan-bluish-gray': 'linear-gradient(135deg, rgb(238, 238, 238) 0%, rgb(169, 184, 195) 100%)',
        'cool-to-warm-spectrum': 'linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%)',
        'blush-light-purple': 'linear-gradient(135deg, rgb(255, 206, 236) 0%, rgb(152, 150, 240) 100%)',
        'blush-bordeaux': 'linear-gradient(135deg, rgb(254, 205, 165) 0%, rgb(254, 45, 45) 50%, rgb(107, 0, 62) 100%)',
        'luminous-dusk': 'linear-gradient(135deg, rgb(255, 203, 112) 0%, rgb(199, 81, 192) 50%, rgb(65, 88, 208) 100%)',
        'pale-ocean': 'linear-gradient(135deg, rgb(255, 245, 203) 0%, rgb(182, 227, 212) 50%, rgb(51, 167, 181) 100%)',
        'electric-grass': 'linear-gradient(135deg, #E9F3DB 5%, #89C05A  100%)',
        'midnight': 'linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 116, 252) 100%)',
        // Custom gradients based on WordPress preset colors
        'vertical-bg-to-quinary': 'linear-gradient(90deg, #FFFFFF 55%, #2377D1 55%)',
        'vertical-bg-to-primary': 'linear-gradient(90deg, #FFFFFF 59%, #89c05a 59%)',
        'horizontal-bg-to-primary': 'linear-gradient(180deg, #FFFFFF 72%, #89c05a 72%)',
        'horizontal-primary-to-bg': 'linear-gradient(180deg, #89c05a 51%, #FFFFFF 51%)',
        'horizontal-bg-to-tertiary': 'linear-gradient(180deg, #FFFFFF 28%, #ad6088 28%)',
        'diagonal-secondary-to-bg': 'linear-gradient(to bottom right, #F8F5EF 50%, #FFFFFF 50%)',
        'diagonal-bg-to-secondary': 'linear-gradient(to bottom right, #FFFFFF 50%, #F8F5EF 50%)',
        'diagonal-secondary-to-primary': 'linear-gradient(135deg, transparent 74%, #89c05a 74%)',
        'diagonal-quinary-to-bg': 'linear-gradient(135deg, #2377D1 55%, #FFFFFF 55%)',
        'diagonal-primary-to-foreground': 'linear-gradient(106deg, #89c05a 46%, #211F1D 46%)',
        'diagonal-bg-to-secondary-triangle': 'linear-gradient(41deg, #FFFFFF 96%, #F8F5EF 97%)',
        'diagonal-bg-to-primary-triangle': 'linear-gradient(43deg, #FFFFFF 94%, #89c05a 94%)',
        'diagonal-foreground-to-primary-triangle': 'linear-gradient(135deg, rgba(0, 0, 0, 0.39) 89%, #89c05a 89%)',
      },
      aspectRatio: {
        'square': '1',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
};
