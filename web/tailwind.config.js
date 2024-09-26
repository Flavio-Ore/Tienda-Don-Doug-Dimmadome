/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'destructive': '#7f1d1d',
        'secure': '#1d4ed8',
        'confirmation': '#047857',        
        'navigating': '#FFB620',
        'stone': '#78716c',
        'off-white': '#D0DFFF',                                   
        'dark-1': '#020202',
        'dark-2': '#09090A',
        'dark-3': '#101012',
        'dark-4': '#1F1F22',
        'light-1': '#fffbeb',
        'light-2': '##fef3c7',
        'light-3': '#7878A3',
        'light-4': '#5C5C7B'
      },
      screens: {
        xxs: '380px',
        xs: '480px'
      },
      width: {
        420: '420px',
        465: '465px'
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif']
      },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)'
      // },
      // colors: {
      //   background: 'hsl(var(--background))',
      //   foreground: 'hsl(var(--foreground))',
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))'
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))'
      //   },
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))'
      //   },
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))'
      //   },
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))'
      //   },
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))'
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))'
      //   },
      //   border: 'hsl(var(--border))',
      //   input: 'hsl(var(--input))',
      //   ring: 'hsl(var(--ring))',
      //   chart: {
      //     1: 'hsl(var(--chart-1))',
      //     2: 'hsl(var(--chart-2))',
      //     3: 'hsl(var(--chart-3))',
      //     4: 'hsl(var(--chart-4))',
      //     5: 'hsl(var(--chart-5))'
      //   }
      // }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
