/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E57373",
        "primary-hover": "#EF5350",
        "sidebar-bg": "#F5F6F8",
        "sidebar-active": "#E57373",
        "page-bg": "#F7F8FA",
        "card-bg": "#FFFFFF",
        "border-soft": "#ECEEF2",
        "text-main": "#2C2C2C",
        "text-muted": "#8A8F98",
        "input-bg": "#FFFFFF",
      }
    },
  },
  plugins: [],
}
