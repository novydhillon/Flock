import { defineConfig } from 'vite';

// Only local development and the explicit development distribution include QA.
export default defineConfig(({ mode }) => ({
  build: { minify: mode === 'qa' || mode === 'development' ? false : 'esbuild' },
  define: { __FLOCK_QA__: JSON.stringify(mode === 'development' || mode === 'qa') },
}));
