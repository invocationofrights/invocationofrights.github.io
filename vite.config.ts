import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),   //  ← makes "@/..." work
    },
  },
  test: {
    environment: 'node',
  },
});
