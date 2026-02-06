/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2874f0",
          dark: "#1e5cc2",
        },
        secondary: {
          DEFAULT: "#fb641b",
          dark: "#e65a16",
        },
        accent: {
          yellow: "#ff9f00",
        },
        bg: {
          light: "#f1f3f6",
        }
      },
    },
  },
  plugins: [],
};
