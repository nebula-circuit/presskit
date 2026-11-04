import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { LEGACY_REDIRECTS } from '@/legacy-redirects'

import type { Route } from './+types/legacy-redirect'

function target(pathname: string) {
  const slug = pathname.replace(/\/$/, '').split('/').pop() ?? ''
  return LEGACY_REDIRECTS[slug] ?? '/'
}

// The prerendered page redirects instantly via meta refresh, before any JS loads
export const meta: Route.MetaFunction = ({ location }) => [
  { title: 'Nebula Circuit — Presskit' },
  { name: 'robots', content: 'noindex' },
  {
    httpEquiv: 'refresh',
    content: `0;url=${import.meta.env.BASE_URL}${target(location.pathname).slice(1)}`,
  },
]

export default function LegacyRedirect() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const to = target(pathname)

  useEffect(() => {
    navigate(to, { replace: true })
  }, [navigate, to])

  return <Link to={to}>Nebula Circuit — Presskit</Link>
}
