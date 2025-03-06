/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@shadcn': path.resolve(__dirname, './src/components/ui'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@api': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@doug-dimadon': path.resolve(__dirname, './src/services/doug-dimadon')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.ts',
  }
})
