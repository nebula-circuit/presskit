import { ArrowUpRightIcon } from '@/components/icons/icons'
import SectionHeader from '@/components/section-header/section-header'
import SoundcloudFacade from '@/components/soundcloud-facade/soundcloud-facade'
import { asset, media } from '@/content/media'
import { useT } from '@/i18n'
import s from './style.module.css'

type CoverKey = keyof typeof media.images

export default function MusicSection() {
  const t = useT()

  return (
    <section id='music' aria-labelledby='music-title' className={s.section}>
      <SectionHeader id='music' title={t.music.title} />

      <h3 className={s.sub}>{t.music.releasesTitle}</h3>
      <ul className={s.releases}>
        {t.music.releases.map((release) => {
          const cover = media.images[release.image as CoverKey]

          return (
            <li key={release.id}>
              <a href={release.url} target='_blank' rel='noopener noreferrer' className={s.release}>
                <img
                  src={asset(cover.src)}
                  width={cover.width}
                  height={cover.height}
                  alt=''
                  loading='lazy'
                  decoding='async'
                  className={s.cover}
                />
                <span className={s.info}>
                  <span className={s.label}>{release.label}</span>
                  <span className={s.title}>{release.title}</span>
                  <span className={s.date}>{release.date}</span>
                </span>
                <span className={s.desc}>{release.description}</span>
                <span className={s.cta}>
                  {t.music.listen} <ArrowUpRightIcon size={14} />
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <h3 className={s.sub}>{t.music.sessionsTitle}</h3>
      <div className={s.sessions}>
        {t.music.sessions.map((session) => (
          <SoundcloudFacade
            key={session.url}
            title={session.title}
            url={session.url}
            playLabel={t.music.play}
          />
        ))}
      </div>
    </section>
  )
}
