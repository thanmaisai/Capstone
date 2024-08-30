import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows global functions like `describe`, `it`
    environment: 'jsdom', // simulates a browser environment
    setupFiles: "vitest.setup.js", // correct path to setup file
  },
});
