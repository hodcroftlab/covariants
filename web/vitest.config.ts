import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reportsDirectory: '.coverage',
    },
    setupFiles: ['vitestSetup.ts'],
  },
  // for some reason, vitest does not manage to load postcss.config.ts even though it should
  // https://github.com/vitejs/vite/issues/11894
  // https://github.com/postcss/postcss-load-config/issues/239
  // passing an empty config fixes this issue for now
  css: {
    postcss: {},
  },
})
