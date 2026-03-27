/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",           // все файлы
    "./src/features/**/*.{js,ts,jsx,tsx}",  // ← обязательно для админки
    "./src/features/admin/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Основные классы, которые используются в админке
    /^bg-/, /^text-/, /^border-/, /^hover:/, /^dark:/,
    'min-h-screen', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8',
    'rounded-3xl', 'rounded-2xl', 'rounded-xl', 'shadow-xl', 'shadow-lg',
    'backdrop-blur-sm', 'bg-white/80', 'dark:bg-gray-800/80',
    'from-blue-600', 'to-purple-600', 'from-green-500', 'to-green-600',
    'from-red-500', 'to-red-600', 'bg-gradient-to-r',
    'hover:bg-gray-50', 'hover:bg-gray-700',
    // Для таблицы и кнопок
    'hover:bg-gray-50', 'hover:bg-gray-700', 'backdrop-blur-sm',
    'shadow-xl', 'shadow-lg', 'rounded-3xl', 'rounded-2xl', 'rounded-xl',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}