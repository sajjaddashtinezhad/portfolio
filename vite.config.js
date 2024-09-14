import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',  // Ensures the root is the current folder where index.html is
  base: './', // Relative paths for production
  build: {
    outDir: 'dist',  // Output to 'dist/' directory
    rollupOptions: {
      input: './src/main.js', // Focus on your Three.js entry point
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Short alias for src if needed
    },
  },
});
