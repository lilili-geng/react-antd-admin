/** @type {import('tailwindcss').Config} */

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
      },
      backgroundImage: {
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
