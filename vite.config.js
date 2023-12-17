
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Custom headers for SharedArrayBuffer support
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  build: {
    outDir: '../public/vite', // Output to Laravel's public directory
  },
  },
});
