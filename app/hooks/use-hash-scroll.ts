import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Scrolls to the URL hash on load and after navigations (shared `/#media` links, legacy
 * redirects, language switch). React Router's scroll restoration restores a saved position
 * instead (on first load every location shares the "default" key), so re-apply the anchor after it.
 */
export function useHashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
      behavior: 'instant',
    })
  }, [hash])
}
