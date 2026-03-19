// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Babel-плагины для React 19 (пока compiler не обязателен, но синтаксис attributes может быть нужен)
      babel: {
        plugins: [
          ['@babel/plugin-syntax-import-attributes', { deprecatedAssertSyntax: true }],
        ],
      },
    }),

    tailwindcss(), // официальный плагин Tailwind v4 для Vite
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    open: true,           // открывает браузер при запуске
    host: true,           // позволяет открыть с телефона по локальной сети (если нужно)
  },

  build: {
    sourcemap: true,      // очень полезно в production для отладки ошибок

    rollupOptions: {
      output: {
        // Разделяем vendor-чанк (React + axios + zod и т.д.)
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'zod', 'react-hook-form'],
        },
      },
    },

    // Уменьшаем размер бандла, отключаем минификацию в dev (но включаем в prod)
    minify: 'esbuild',
    target: 'es2022',     // современный target, совместим с большинством браузеров
  },

  css: {
    devSourcemap: true,
    // Если используешь postcss (хотя с Tailwind v4 это необязательно)
    postcss: {
      plugins: [],
    },
  },

  // Опционально: если планируешь деплоить на поддомен / subdirectory
  // base: '/birthday/', // раскомментировать при необходимости
})