/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./src/**/*.{html,ts}'],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
      },
    },
  },

  plugins: [],
};
