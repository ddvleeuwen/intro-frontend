/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        '3d-sm': 'inset 0 -1px 2px 0 rgba(0, 0, 0, 0.1),' +
          'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25),' +
          '0 2px 16px 0 rgba(0, 0, 0, 0.1)',
        '3d-md': 'inset 0 -2px 2px 0 rgba(0, 0, 0, 0.1),' +
          'inset 0 2px 1px 0 rgba(255, 255, 255, 0.10),' +
          '0 2px 16px 0 rgba(0, 0, 0, 0.1)',
        '3d-lg': 'inset 0 -4px 2px 0 rgba(0, 0, 0, 0.1),' +
          'inset 0 4px 1px 0 rgba(255, 255, 255, 0.10),' +
          '0 2px 16px 0 rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'primary': colors.sky[ 300 ],
        'primary-border': colors.sky[ 200 ],
        'secondary': colors.stone[ 200 ],
        'bg-primary': colors.white,
        'bg-secondary': colors.stone[ 100 ],
        'border': colors.stone[ 300 ],
        'txt-primary': colors.black,
        'txt-secondary': colors.stone[ 500 ],
        'txt-contrast': colors.sky[ 900 ],

        'dark-primary': colors.sky[ 800 ],
        'dark-primary-border': colors.sky[ 400 ],
        'dark-secondary': colors.zinc[ 300 ],
        'dark-bg-primary': colors.zinc[ 800 ],
        'dark-bg-secondary': colors.zinc[ 900 ],
        'dark-border': colors.zinc[ 600 ],
        'dark-txt-primary': colors.white,
        'dark-txt-secondary': colors.zinc[ 300 ],
        'dark-txt-contrast': colors.white,
      }
    },
  },
  plugins: [],
}

