import { reactRouter } from '@react-router/dev/vite'
import * as esbuild from 'esbuild'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

/** Transform .js files that contain JSX (e.g. MUI monorepo packages) so Vite's import analysis can parse them */
function muiJsxPlugin() {
  return {
    name: 'vite:mui-jsx',
    enforce: 'pre' as const,
    async transform(code: string, id: string) {
      if (!id.endsWith('.js') || !id.includes('mui-')) return null
      if (!code.includes('</') && !code.includes('/>')) return null
      const result = await esbuild.transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        format: 'esm',
      })
      return { code: result.code, map: result.map }
    },
  }
}

export default defineConfig({
  plugins: [muiJsxPlugin(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    // MUI/styled-engine ships .js files that contain JSX
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  ssr: {
    // Workaround for resolving dependencies in the server bundle
    // Without this, the React context will be different between direct import and transitive imports in development environment
    // For more information, see https://github.com/mui/material-ui/issues/45878#issuecomment-2987441663
    optimizeDeps: {
      include: ['@emotion/*', '@mui/*'],
      esbuildOptions: {
        loader: { '.js': 'jsx' },
      },
    },
    noExternal: ['@emotion/*', '@mui/*'],
  },
})
