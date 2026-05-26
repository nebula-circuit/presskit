import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Download from '@mui/icons-material/Download'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

interface VideoItem {
  src: string
  label: string
}

const VIDEO_RATIOS = ['848 / 480', '848 / 480', '480 / 848', '406 / 720']

const FEATURED_COUNT = 2

const DOWNLOAD_FILES = [
  'nebula-circuit-1.mp4',
  'nebula-circuit-2.mp4',
  'nebula-circuit-3.mp4',
  'nebula-circuit-4.mp4',
]

export default function Page() {
  const { t } = useTranslation()

  const videos = t('pages.videos.items', { returnObjects: true }) as VideoItem[]

  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleVideoLoad = (idx: number) => {
    setLoaded((prev) => new Set(prev).add(idx))
  }

  const handlePlay = (idx: number) => {
    videoRefs.current.forEach((el, i) => {
      if (el && i !== idx && !el.paused) el.pause()
    })
  }

  const renderVideo = (v: VideoItem, idx: number) => (
    <Box key={idx} sx={{ ...styles.item, aspectRatio: VIDEO_RATIOS[idx] }}>
      {!loaded.has(idx) && <Skeleton variant='rounded' animation='wave' sx={styles.skeleton} />}

      <Box
        ref={(el: HTMLVideoElement | null) => {
          videoRefs.current[idx] = el
        }}
        component='video'
        src={`${import.meta.env.BASE_URL}${v.src.replace(/^\//, '')}`}
        aria-label={v.label}
        controls
        playsInline
        preload={idx < 2 ? 'auto' : 'metadata'}
        onLoadedMetadata={() => handleVideoLoad(idx)}
        onPlay={() => handlePlay(idx)}
        sx={{
          ...styles.video,
          opacity: loaded.has(idx) ? 1 : 0,
        }}
      />
    </Box>
  )

  const handleDownload = async () => {
    setLoading(true)

    try {
      await downloadAll(import.meta.env.BASE_URL)
    } finally {
      setLoading(false)
    }
  }

  const buttonLabel = loading ? t('pages.videos.downloading') : t('pages.videos.download')
  const fabLabel = loading ? t('pages.videos.downloading') : t('pages.videos.downloadShort')
  const buttonIcon = loading ? <CircularProgress size={18} color='inherit' /> : <Download />

  return (
    <Box sx={styles.root}>
      <Button
        variant='outlined'
        startIcon={buttonIcon}
        disabled={loading}
        onClick={handleDownload}
        sx={styles.desktopButton}
      >
        {buttonLabel}
      </Button>

      {Array.isArray(videos) && (
        <>
          <Box sx={styles.featured}>
            {videos.slice(0, FEATURED_COUNT).map((v, i) => renderVideo(v, i))}
          </Box>

          {videos.length > FEATURED_COUNT && (
            <Box sx={styles.grid}>
              {videos.slice(FEATURED_COUNT).map((v, i) => renderVideo(v, i + FEATURED_COUNT))}
            </Box>
          )}
        </>
      )}

      <Button
        variant='contained'
        startIcon={buttonIcon}
        disabled={loading}
        onClick={handleDownload}
        sx={styles.fab}
      >
        {fabLabel}
      </Button>
    </Box>
  )
}

// Aux
async function downloadAll(base: string) {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  await Promise.all(
    DOWNLOAD_FILES.map(async (name) => {
      const res = await fetch(`${base}assets/download-video/${name}`)
      zip.file(name, await res.blob())
    })
  )
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'nebula-circuit-press-videos.zip'
  a.click()

  URL.revokeObjectURL(url)
}
