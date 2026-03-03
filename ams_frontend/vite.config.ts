import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 3000, // Specify the port number here
  },
  preview: {
    port: 3000, // Fix port for `npm run preview`
  },
  resolve:
  {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build:
  {
    outDir: 'build', // Output directory for build artifacts
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure correct entry file
    },
  },
  define: {
    global: 'window',
  },
})
