import { useState } from 'react'
import { PlayIcon } from '@/components/icons/icons'
import s from './style.module.css'

interface SoundcloudFacadeProps {
  title: string
  url: string
  playLabel: string
}

/**
 * Lightweight stand-in for the SoundCloud player: the real iframe (1 MB+ of third-party JS)
 * only loads once the visitor asks to listen.
 */
export default function SoundcloudFacade({ title, url, playLabel }: SoundcloudFacadeProps) {
  const [active, setActive] = useState(false)

  if (active) {
    return <iframe title={title} src={embedSrc(url)} allow='autoplay' className={s.embed} />
  }

  return (
    <button type='button' className={s.facade} onClick={() => setActive(true)}>
      <span className={s.play}>
        <PlayIcon size={22} />
      </span>
      <span className={s.meta}>
        <span className={s.kicker}>SoundCloud</span>
        <span className={s.title}>{title}</span>
        <span className={s.wave} aria-hidden='true' />
      </span>
      <span className={s.cta}>{playLabel}</span>
    </button>
  )
}

// Aux
function embedSrc(trackUrl: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%2300e5ff&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
}
