import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const parentEnv = loadEnv(mode, '../', '');

  const maptilerKey =
    process.env.VITE_MAPTILER_API_KEY ||
    process.env.MAPTILER_API_KEY ||
    env.VITE_MAPTILER_API_KEY ||
    env.MAPTILER_API_KEY ||
    parentEnv.VITE_MAPTILER_API_KEY ||
    parentEnv.MAPTILER_API_KEY ||
    '';

  const mapplsKey =
    process.env.NEXT_PUBLIC_MAPPLS_MAP_KEY ||
    process.env.VITE_MAPPLS_MAP_KEY ||
    process.env.VITE_MAPPLS_API_KEY ||
    process.env.MAPPLS_API_KEY ||
    process.env.VITE_MAPMYINDIA_API_KEY ||
    process.env.MAPMYINDIA_API_KEY ||
    env.NEXT_PUBLIC_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_MAP_KEY ||
    env.VITE_MAPPLS_API_KEY ||
    env.MAPPLS_API_KEY ||
    parentEnv.NEXT_PUBLIC_MAPPLS_MAP_KEY ||
    parentEnv.VITE_MAPPLS_MAP_KEY ||
    parentEnv.VITE_MAPPLS_API_KEY ||
    parentEnv.MAPPLS_API_KEY ||
    '';

  const mapplsRestKey =
    process.env.NEXT_PUBLIC_MAPPLS_REST_KEY ||
    process.env.VITE_MAPPLS_REST_KEY ||
    env.NEXT_PUBLIC_MAPPLS_REST_KEY ||
    env.VITE_MAPPLS_REST_KEY ||
    parentEnv.NEXT_PUBLIC_MAPPLS_REST_KEY ||
    parentEnv.VITE_MAPPLS_REST_KEY ||
    mapplsKey;

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    envDir: '../',
    define: {
      'import.meta.env.VITE_MAPTILER_API_KEY': JSON.stringify(maptilerKey),
      'import.meta.env.NEXT_PUBLIC_MAPPLS_MAP_KEY': JSON.stringify(mapplsKey),
      'import.meta.env.NEXT_PUBLIC_MAPPLS_REST_KEY': JSON.stringify(mapplsRestKey),
      'import.meta.env.VITE_MAPPLS_MAP_KEY': JSON.stringify(mapplsKey),
      'import.meta.env.VITE_MAPPLS_REST_KEY': JSON.stringify(mapplsRestKey),
      'import.meta.env.VITE_MAPPLS_API_KEY': JSON.stringify(mapplsKey),
      'import.meta.env.VITE_MAPMYINDIA_API_KEY': JSON.stringify(mapplsKey)
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


