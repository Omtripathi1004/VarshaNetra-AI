import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const parentEnv = loadEnv(mode, '../', '');
  const maptilerKey = process.env.VITE_MAPTILER_API_KEY || env.VITE_MAPTILER_API_KEY || parentEnv.VITE_MAPTILER_API_KEY || '';

  return {
    plugins: [react()],
    build: {
      outDir: '../backend/dist',
      emptyOutDir: true
    },
    envDir: '../',
    define: {
      'import.meta.env.VITE_MAPTILER_API_KEY': JSON.stringify(maptilerKey)
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        }
      }
    }
  };
});


