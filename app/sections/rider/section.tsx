import { Link } from 'react-router'
import btn from '@/components/button/style.module.css'
import { ArrowUpRightIcon } from '@/components/icons/icons'
import SectionHeader from '@/components/section-header/section-header'
import { localePath, useLang, useT } from '@/i18n'
import { cx } from '@/utils/cx'
import RiderContent from './rider-content'

export default function RiderSection() {
  const t = useT()
  const lang = useLang()

  return (
    <section id='rider' aria-labelledby='rider-title'>
      <SectionHeader id='rider' title={t.rider.title}>
        <Link to={localePath(lang, '/rider')} className={cx(btn.button, btn.small)}>
          {t.rider.openPage}
          <ArrowUpRightIcon size={14} />
        </Link>
      </SectionHeader>
      <RiderContent />
    </section>
  )
}
