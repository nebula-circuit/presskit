import CopyButton from '@/components/copy-button/copy-button'
import SectionHeader from '@/components/section-header/section-header'
import { fallbackSrc, media, srcSet } from '@/content/media'
import { useT } from '@/i18n'
import s from './style.module.css'

export default function BioSection() {
  const t = useT()

  return (
    <section id='bio' aria-labelledby='bio-title' className={s.section}>
      <figure className={s.hero}>
        <img
          srcSet={srcSet(media.hero)}
          sizes='(min-width: 1200px) 560px, (min-width: 1024px) 46vw, 100vw'
          src={fallbackSrc(media.hero)}
          width={media.hero.width}
          height={media.hero.height}
          alt={t.hero.alt}
          fetchPriority='high'
          className={s.heroImg}
        />
        <figcaption className={s.tag}>
          <span className={s.dot} aria-hidden='true' />
          {t.hero.tag}
        </figcaption>
      </figure>

      <div className={s.body}>
        <h1 className={s.name}>Nebula Circuit</h1>
        <p className={s.meta}>
          {t.hero.genre} <span aria-hidden='true'>·</span> {t.hero.location}
        </p>

        <SectionHeader id='bio' title={t.bio.title}>
          <CopyButton text={t.bio.text} label={t.bio.copy} copiedLabel={t.bio.copied} small />
        </SectionHeader>
        <p className={s.text}>{t.bio.text}</p>
      </div>
    </section>
  )
}
