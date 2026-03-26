/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",           // все файлы
    "./src/features/**/*.{js,ts,jsx,tsx}",  // ← обязательно для админки
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}