/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#05b6d3',
        secondary: '#ef863e',
      },
      backgroundImage: {
        'login-bg-img': "url('/src/assets/bg-image.jpeg')",
        'signup-bg-img': "url('/src/assets/signup-bg-img.webp')",
      },
    },
  },
  plugins: [],
};
