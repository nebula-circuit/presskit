import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/presskit/' : '/',
  plugins: [reactRouter()],
  resolve: { tsconfigPaths: true },
})
