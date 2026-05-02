import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production builds target GitHub Pages project URL:
// https://utkarshyashraj.github.io/E-Commerce/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/E-Commerce/' : '/',
  server: {
    port: 5173,
    open: true,
  },
}));
