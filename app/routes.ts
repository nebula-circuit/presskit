import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export const Routes = {
  INTRO: 'intro',
  RELEASES: 'releases',
  LIVE_SETUP: 'live-setup',
  GALLERY: 'gallery',
  TECHNICAL_RIDER: 'technical-rider',
} as const

export default [
  layout('routes/main/page.tsx', [
    index('routes/main/index.tsx'),
    route(Routes.INTRO, 'routes/intro/page.tsx'),
    route(Routes.RELEASES, 'routes/releases/page.tsx'),
    route(Routes.LIVE_SETUP, 'routes/live-setup/page.tsx'),
    route(Routes.GALLERY, 'routes/gallery/page.tsx'),
    route(Routes.TECHNICAL_RIDER, 'routes/technical-rider/page.tsx'),
  ]),
] satisfies RouteConfig
