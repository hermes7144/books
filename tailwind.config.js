/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f75866'
      },
      backgroundImage: {
        // banner: `url('../public/images/banner.jpg')`,
        avatar: `url('/public/images/avatar.svg')`
      },
    },
  },
  plugins: [],
}

