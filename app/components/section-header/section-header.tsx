import type { ReactNode } from 'react'
import { type SectionId, sectionIndex } from '@/sections/sections'
import s from './style.module.css'

interface SectionHeaderProps {
  id: SectionId
  title: string
  /** Actions shown at the right end of the header rule */
  children?: ReactNode
}

export default function SectionHeader({ id, title, children }: SectionHeaderProps) {
  return (
    <div className={s.header}>
      <h2 id={`${id}-title`} className={s.title}>
        <span className={s.num}>{sectionIndex(id)}</span>
        <span className={s.sep} aria-hidden='true'>
          —
        </span>
        {title}
      </h2>
      <span className={s.rule} aria-hidden='true' />
      {children && <div className={s.actions}>{children}</div>}
    </div>
  )
}
