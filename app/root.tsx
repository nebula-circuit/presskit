import type { ReactNode } from 'react'
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'
import fontLatin from './assets/fonts/JetBrainsMono-latin.woff2?url'
import { getDict, langFromPath, localePath } from './i18n'
import './styles/global.css'

import type { Route } from './+types/root'

const base = import.meta.env.BASE_URL

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}favicon-32.png` },
  { rel: 'icon', type: 'image/png', sizes: '64x64', href: `${base}favicon-64.png` },
  { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
  { rel: 'preload', href: fontLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
]

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  return (
    <html lang={langFromPath(pathname)}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta name='theme-color' content='#0a0b0f' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const lang = langFromPath(useLocation().pathname)
  const t = getDict(lang).error

  const notFound = isRouteErrorResponse(error) && error.status === 404
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined

  return (
    <main className='error-page'>
      <p className='error-page__code'>{notFound ? '404' : t.generic}</p>
      <h1>{notFound ? t.notFound : t.unexpected}</h1>
      <Link to={localePath(lang)}>{t.home}</Link>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
