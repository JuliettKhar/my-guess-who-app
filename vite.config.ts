import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  define: {
    VITE_API_KEY: JSON.stringify(
      process.env.NODE_ENV === 'development' ? process.env.VITE_API_KEY : ''
    )
  },
  base: '/my-guess-who-app/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // 💡 JS в корень
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
