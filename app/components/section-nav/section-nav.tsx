import type { MouseEvent } from 'react'
import { useT } from '@/i18n'
import { SECTIONS, type SectionId, sectionIndex } from '@/sections/sections'
import { cx } from '@/utils/cx'
import s from './style.module.css'

interface SectionNavProps {
  /** `top` lives in the desktop header, `bottom` is the fixed mobile tab bar */
  variant: 'top' | 'bottom'
  active: SectionId
}

export default function SectionNav({ variant, active }: SectionNavProps) {
  const t = useT()

  return (
    <nav aria-label={t.nav.label} className={cx(s.nav, s[variant], 'no-print')}>
      <ol className={s.list}>
        {SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => goToSection(e, id)}
              className={s.link}
              aria-current={active === id ? 'true' : undefined}
            >
              <span className={s.led} aria-hidden='true' />
              <span className={s.num} aria-hidden='true'>
                {sectionIndex(id)}
              </span>
              <span>{t.nav[id]}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Aux
function goToSection(e: MouseEvent<HTMLAnchorElement>, id: SectionId) {
  const el = document.getElementById(id)
  if (!el || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

  // A native hash jump fires popstate, which React Router treats as a navigation and answers by
  // restoring a saved scroll position, cancelling the jump. Scroll ourselves and only sync the URL.
  e.preventDefault()
  el.scrollIntoView()
  history.replaceState(history.state, '', `#${id}`)
}
