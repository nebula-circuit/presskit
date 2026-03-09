import * as React from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { CacheProvider } from '@emotion/react'
import Box from '@mui/material/Box'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import AppTheme from './theme'
import createEmotionCache from './createCache'
import './i18n'

import type { Route } from './+types/root'

export const meta: Route.MetaFunction = () => [
  { title: 'Nebula Circuit Presskit' },
  { name: 'description', content: 'Electronic music artist presskit' },
]

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: `${import.meta.env.BASE_URL}favicon-32.png`,
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '64x64',
    href: `${import.meta.env.BASE_URL}favicon-64.png`,
  },
  {
    rel: 'preload',
    href: `${import.meta.env.BASE_URL}assets/fonts/JetBrainsMono-latin.woff2`,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `${import.meta.env.BASE_URL}assets/img/gallery-4.webp`,
    as: 'image',
    type: 'image/webp',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <InitColorSchemeScript defaultMode='dark' />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const cache = createEmotionCache()

export default function App() {
  if (typeof window !== 'undefined') {
    return (
      <CacheProvider value={cache}>
        <AppTheme>
          <Outlet />
        </AppTheme>
      </CacheProvider>
    )
  }
  return (
    <AppTheme>
      <Outlet />
    </AppTheme>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <Box component='main' sx={{ pt: 8, p: 2, maxWidth: 'lg', mx: 'auto' }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <Box component='pre' sx={{ width: '100%', p: 2, overflowX: 'auto' }}>
          <code>{stack}</code>
        </Box>
      )}
    </Box>
  )
}
