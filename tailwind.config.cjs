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
        text: withOpacity(`--color-bg-l1`),
      },
      backgroundColor: {
        skin: {
          bg: withOpacity(`--color-bg-l2`),
        }
      },
      borderColor: {
        customColor3Bottom: withOpacity(`--color-bg-l3`), 
      },
      borderWidth: {
        customColor3Bottom: '0 0 1px 0', // 设置边框底部
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
