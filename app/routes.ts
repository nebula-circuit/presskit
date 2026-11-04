import { type RouteConfig, index, route } from '@react-router/dev/routes'
import { LEGACY_REDIRECTS } from './legacy-redirects'

export default [
  index('routes/home/page.tsx', { id: 'home-es' }),
  route('en', 'routes/home/page.tsx', { id: 'home-en' }),
  route('rider', 'routes/rider/page.tsx', { id: 'rider-es' }),
  route('en/rider', 'routes/rider/page.tsx', { id: 'rider-en' }),
  ...Object.keys(LEGACY_REDIRECTS).map((slug) =>
    route(slug, 'routes/legacy-redirect.tsx', { id: `legacy-${slug}` })
  ),
] satisfies RouteConfig
