import { type CSSProperties, useEffect, useRef } from 'react'
import DownloadLink from '@/components/download-link/download-link'
import { DownloadIcon } from '@/components/icons/icons'
import SectionHeader from '@/components/section-header/section-header'
import { asset, fallbackSrc, media, srcSet } from '@/content/media'
import { format, useT } from '@/i18n'
import { cx } from '@/utils/cx'
import s from './style.module.css'

type Video = (typeof media.videos)[number]

const isLandscape = (v: Video) => v.width > v.height
const ratio = (v: Video) => v.width / v.height

// Interleave landscape and portrait clips so each row pairs one of each: with column widths
// proportional to their aspect ratios, both clips in a row end up the same height
const landscapes = media.videos.filter(isLandscape)
const portraits = media.videos.filter((v) => !isLandscape(v))
const videoOrder = Array.from({ length: Math.max(landscapes.length, portraits.length) }, (_, i) => [
  landscapes[i],
  portraits[i],
])
  .flat()
  .filter((v): v is Video => Boolean(v))
const videoColumns =
  landscapes[0] && portraits[0] ? `${ratio(landscapes[0])}fr ${ratio(portraits[0])}fr` : '1fr'

export default function MediaSection() {
  const t = useT()
  const videosRef = useRef<HTMLDivElement>(null)

  // Only one clip plays at a time ('play' doesn't bubble, so listen in the capture phase)
  useEffect(() => {
    const root = videosRef.current
    if (!root) return

    const pauseOthers = (e: Event) => {
      root.querySelectorAll('video').forEach((v) => v !== e.target && v.pause())
    }
    root.addEventListener('play', pauseOthers, true)
    return () => root.removeEventListener('play', pauseOthers, true)
  }, [])

  return (
    <section id='media' aria-labelledby='media-title' className={s.section}>
      <SectionHeader id='media' title={t.media.title} />

      <div className={cx(s.downloads, 'no-print')}>
        <DownloadLink
          file={media.downloads.photos.file}
          label={t.media.downloadPhotos}
          bytes={media.downloads.photos.bytes}
        />
        <DownloadLink
          file={media.downloads.videos.file}
          label={t.media.downloadVideos}
          bytes={media.downloads.videos.bytes}
        />
      </div>

      <h3 className={s.sub}>{t.media.photosTitle}</h3>
      <ul className={s.gallery}>
        {media.gallery.map((photo, i) => (
          <li key={photo.id} className={s.photo}>
            <img
              srcSet={srcSet(photo)}
              sizes='(min-width: 1200px) 380px, (min-width: 1024px) 31vw, 50vw'
              src={fallbackSrc(photo)}
              width={photo.width}
              height={photo.height}
              alt={format(t.media.photoAlt, { n: i + 1 })}
              loading='lazy'
              decoding='async'
            />
            <a
              href={asset(photo.hq)}
              download
              className={s.hq}
              aria-label={format(t.media.downloadOne, { n: i + 1 })}
            >
              <DownloadIcon size={14} />
              HQ
            </a>
          </li>
        ))}
      </ul>

      <h3 className={s.sub}>{t.media.videosTitle}</h3>
      <div ref={videosRef} className={s.videos} style={{ '--cols': videoColumns } as CSSProperties}>
        {videoOrder.map((video) => (
          <video
            key={video.src}
            src={asset(video.src)}
            poster={asset(video.poster)}
            width={video.width}
            height={video.height}
            controls
            playsInline
            preload='none'
            aria-label={format(t.media.videoLabel, { n: media.videos.indexOf(video) + 1 })}
            className={cx(s.video, isLandscape(video) && s.landscape)}
            style={{ aspectRatio: `${video.width} / ${video.height}` }}
          />
        ))}
      </div>
    </section>
  )
}
