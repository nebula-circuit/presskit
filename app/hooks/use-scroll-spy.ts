import { useEffect, useState } from 'react'

/** Id of the section currently crossing the middle band of the viewport */
export function useScrollSpy<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id as T)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}
