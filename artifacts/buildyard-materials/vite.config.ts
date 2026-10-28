import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = Number(process.env.PORT) || 5173;

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
  server: {
    host: '0.0.0.0',
    port,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port,
    strictPort: true,
  },
});
