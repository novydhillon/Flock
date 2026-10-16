import { defineConfig } from 'vite';

// Only local development and the explicit development distribution include QA.
export default defineConfig(({ mode }) => ({
  define: { __FLOCK_QA__: JSON.stringify(mode === 'development' || mode === 'qa') }
}));
