import { Link } from 'react-router'
import LanguageSwitch from '@/components/language-switch/language-switch'
import SectionNav from '@/components/section-nav/section-nav'
import { localePath, useLang, useT } from '@/i18n'
import type { SectionId } from '@/sections/sections'
import { cx } from '@/utils/cx'
import s from './style.module.css'

interface HeaderProps {
  /** Section highlighted by the scroll-spy; enables the desktop section nav */
  active?: SectionId
}

export default function Header({ active }: HeaderProps) {
  const t = useT()
  const lang = useLang()

  return (
    <header className={cx(s.header, 'no-print')}>
      <div className={s.inner}>
        <Link to={localePath(lang)} className={s.brand}>
          <span className={s.brandName}>{t.nav.brand}</span>
          <span className={s.brandSub}>{t.nav.subtitle}</span>
        </Link>

        {active && <SectionNav variant='top' active={active} />}

        <LanguageSwitch hash={active && active !== 'bio' ? `#${active}` : ''} />
      </div>
    </header>
  )
}
