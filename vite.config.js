import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Vital for Electron file loading compatibility
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
