/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: '#FF9D14',
        brandGrey: '#D3D3D3'
      },
    },
  },
  plugins: [],
}

