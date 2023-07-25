/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#D6D8DD',
        primary: "#1D2432",
        secondary: "#2F495E",
        tertiary: "#85929E",
        light: "#EBF5FB",
        dark: "#17202A",
        success: "#229954",
        error: "#C0392B",
      }
    },
  },
  plugins: [],
}