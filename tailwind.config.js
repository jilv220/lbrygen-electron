module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#2f9176',
      'green-800': '#59a791',
      'yellow': '#ffc82c',
      'white': '#ffffff',
      'black': '#1f1f22',
      'dark': '#121212',
      'gray-dark': '#273444',
      'gray': '#242424',
      'gray-light': '#d3dce6',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
