import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Download from '@mui/icons-material/Download'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

interface GalleryImage {
  src: string
  alt: string
}

const DOWNLOAD_FILES = [
  'nebula-circuit-1.jpg',
  'nebula-circuit-2.jpg',
  'nebula-circuit-3.jpg',
  'nebula-circuit-4.jpg',
  'nebula-circuit-5.jpg',
  'nebula-circuit-6.jpg',
  'nebula-circuit-7.jpg',
  'nebula-circuit-8.jpg',
  'nebula-circuit-live-setup-diagram.jpeg',
]

export default function Page() {
  const { t } = useTranslation()

  const images = t('pages.gallery.images', { returnObjects: true }) as GalleryImage[]

  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)

    try {
      await downloadAll(import.meta.env.BASE_URL)
    } finally {
      setLoading(false)
    }
  }

  const buttonLabel = loading ? t('pages.gallery.downloading') : t('pages.gallery.download')
  const fabLabel = loading ? t('pages.gallery.downloading') : t('pages.gallery.downloadShort')
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

      <Box sx={styles.grid}>
        {Array.isArray(images) &&
          images.map((img, idx) => (
            <Box key={idx} sx={styles.item}>
              <Box
                component='img'
                src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, '')}`}
                alt={img.alt}
                loading={idx < 2 ? 'eager' : 'lazy'}
                sx={styles.image}
              />
            </Box>
          ))}
      </Box>

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
      const res = await fetch(`${base}assets/download-img/${name}`)
      zip.file(name, await res.blob())
    })
  )
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'nebula-circuit-press-photos.zip'
  a.click()

  URL.revokeObjectURL(url)
}
