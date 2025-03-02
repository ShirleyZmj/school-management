/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#135BB4",
        },
      },
    },
  },
  plugins: [],
  // ensure tailwind is compatible with ant design
  corePlugins: {
    preflight: false,
  },
};

export default config;
