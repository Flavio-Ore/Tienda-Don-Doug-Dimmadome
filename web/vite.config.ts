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
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.ts',
  }
})
