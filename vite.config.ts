import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['lucide-react'],
  }
});