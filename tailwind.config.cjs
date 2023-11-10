/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({opacityValue}) => {
      if (opacityValue != null) {
          return `rgba(var(${variableName}),${opacityValue})`
      }
      return `rgb(var(${variableName})`
  }
}
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
      },
      fontWeight: {
      },
      colors: {
        li: {
          color: withOpacity(`--li-text-color`),
          textIconText: withOpacity(`--li-textIconText-color`),
        }
      },
      backgroundColor: {
        li: {
          bg: withOpacity(`--li-bg-color`),
          iconLeftBg: withOpacity(`--li-iconLeftBg-color`),
        }
      },
      borderColor: {
        li: {
          'border-color': withOpacity(`--li-border-color`), 
        }
      },
      borderWidth: {
        '1': '1px',
      },
      spacing: {},
      maxWidth: {
        wrap: '1280px',
      },
      screens: {
        xlg: { max: '992px' },
        m: { max: '768px' },
        nmd: { min: '769px' },
      },
      translate: {
      },
    },
  },
  plugins: [],
};
