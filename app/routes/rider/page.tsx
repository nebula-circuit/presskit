import { Link } from 'react-router'
import btn from '@/components/button/style.module.css'
import Header from '@/components/header/header'
import { ArrowLeftIcon, PrintIcon } from '@/components/icons/icons'
import { getDict, langFromPath, localePath, useLang, useT } from '@/i18n'
import RiderContent from '@/sections/rider/rider-content'
import { pageMeta } from '@/seo'
import { cx } from '@/utils/cx'
import s from './style.module.css'

import type { Route } from './+types/page'

export const meta: Route.MetaFunction = ({ location }) => {
  const lang = langFromPath(location.pathname)
  const { riderTitle, riderDescription } = getDict(lang).meta
  return pageMeta({ lang, path: '/rider', title: riderTitle, description: riderDescription })
}

export default function Page() {
  const t = useT()
  const lang = useLang()

  return (
    <>
      <Header />
      <main className={s.main}>
        <div className={cx(s.toolbar, 'no-print')}>
          <Link to={`${localePath(lang)}#rider`} className={cx(btn.button, btn.ghost)}>
            <ArrowLeftIcon size={16} />
            {t.rider.back}
          </Link>
          <button type='button' className={btn.button} onClick={() => window.print()}>
            <PrintIcon size={16} />
            {t.rider.print}
          </button>
        </div>

        <h1 className={s.title}>
          <span className={s.brand}>{t.nav.brand}</span>
          {t.rider.title}
        </h1>

        <RiderContent />

        <p className={s.footer}>
          {t.contact.email} <span aria-hidden='true'>·</span> nebula-circuit.github.io/presskit
        </p>
      </main>
    </>
  )
}
