import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    open: true,
    host: true,
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
            if (id.includes('axios')) return 'vendor-axios'
            if (id.includes('zod')) return 'vendor-zod'
            if (id.includes('react-hook-form')) return 'vendor-rhf'
            return 'vendor'
          }
        },
      },
    },
    minify: 'esbuild',
    target: 'es2022',
  },

  css: {
    devSourcemap: true,
    postcss: { plugins: [] },
  },

  // Фронтенд будет работать на поддомене, Traefik проксирует API
  base: '/',
  envPrefix: 'VITE_',
})