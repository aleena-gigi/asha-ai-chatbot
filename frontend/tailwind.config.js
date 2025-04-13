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
        // WordPress preset colors
        wp: {
          black: '#000000',
          'cyan-bluish-gray': '#abb8c3',
          white: '#ffffff',
          'pale-pink': '#f78da7',
          'vivid-red': '#cf2e2e',
          'luminous-vivid-orange': '#ff6900',
          'luminous-vivid-amber': '#fcb900',
          'light-green-cyan': '#7bdcb5',
          'vivid-green-cyan': '#00d084',
          'pale-cyan-blue': '#8ed1fc',
          'vivid-cyan-blue': '#0693e3',
          'vivid-purple': '#9b51e0',
        },
        // Main theme colors
        foreground: '#211F1D',
        background: '#FFFFFF',
        primary: {
          50: '#F4F9ED',
          100: '#E9F3DB',
          200: '#D3E7B7',
          300: '#BDDB93',
          400: '#A7CF6F',
          500: '#89c05a', // Main primary color - Green
          600: '#6EA046',
          700: '#538032',
          800: '#39601F',
          900: '#1F400B',
        },
        secondary: {
          50: '#FDFCFB',
          100: '#FBF9F7',
          200: '#F8F5EF', // Main secondary color - Light beige
          300: '#F0EBE3',
          400: '#E8E1D7',
          500: '#E0D7CB',
          600: '#C4B9A9',
          700: '#A89B87',
          800: '#8C7D65',
          900: '#705F43',
        },
        tertiary: {
          50: '#F9EFF4',
          100: '#F3DFE9',
          200: '#E7BFD3',
          300: '#DB9FBD',
          400: '#CF7FA7',
          500: '#ad6088', // Main tertiary color - Mauve/pink
          600: '#8A4D6D',
          700: '#673A52',
          800: '#442737',
          900: '#21131C',
        },
        quaternary: {
          50: '#E6F7EE',
          100: '#CCEFDD',
          200: '#99DFBB',
          300: '#66CF99',
          400: '#33BF77',
          500: '#0A9A48', // Main quaternary color - Deep green
          600: '#087B3A',
          700: '#065C2B',
          800: '#043E1D',
          900: '#021F0E',
        },
        quinary: {
          50: '#E9F3FB',
          100: '#D3E7F7',
          200: '#A7CFEF',
          300: '#7BB7E7',
          400: '#4F9FDF',
          500: '#2377D1', // Main quinary color - Blue
          600: '#1C5FA7',
          700: '#15477D',
          800: '#0E2F54',
          900: '#07182A',
        },
        senary: {
          50: '#FCFBFA',
          100: '#F9F7F5',
          200: '#F3EFEB',
          300: '#EDE7E1',
          400: '#E7E2DE', // Main senary color - Light gray
          500: '#D1CCC8',
          600: '#B9B2AC',
          700: '#8B8580',
          800: '#5C5854',
          900: '#2E2C2A',
        },
        septenary: {
          50: '#FCE6F0',
          100: '#F9CCE1',
          200: '#F399C3',
          300: '#ED66A5',
          400: '#E73387',
          500: '#E0007F', // Main septenary color - Hot pink
          600: '#B30066',
          700: '#86004C',
          800: '#590033',
          900: '#2D0019',
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
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 10px rgba(137, 192, 90, 0.3)',
        'button-hover': '0 4px 15px rgba(137, 192, 90, 0.5)',
        'green-glow': '0 0 15px rgba(137, 192, 90, 0.6)',
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
