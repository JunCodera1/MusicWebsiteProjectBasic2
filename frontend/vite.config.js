// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import gói path


import svgrPlugin from 'vite-plugin-svgr';



export default defineConfig({
  plugins: [react(), svgr(), svgrPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Cấu hình alias '@' trỏ đến 'src'
    },
  },
});