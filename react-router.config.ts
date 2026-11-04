import path from 'node:path'
import type { Config } from '@react-router/dev/config'
import { LEGACY_REDIRECTS } from './app/legacy-redirects'
import { postBuild } from './scripts/post-build'

export default {
  ssr: false,
  // Must end with a slash: the prerender preview server requires it to start with Vite's `base`
  basename: process.env.GITHUB_PAGES === 'true' ? '/presskit/' : '/',
  // Every page ships as static HTML; any other path gets the SPA fallback (served as 404.html)
  prerender: [
    '/',
    '/en',
    '/rider',
    '/en/rider',
    ...Object.keys(LEGACY_REDIRECTS).map((slug) => `/${slug}`),
  ],
  async buildEnd({ reactRouterConfig }) {
    const { buildDirectory, basename } = reactRouterConfig
    await postBuild(path.join(buildDirectory, 'client'), basename)
  },
} satisfies Config
