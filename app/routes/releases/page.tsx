import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import AlbumIcon from '@mui/icons-material/Album'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

interface ReleaseItem {
  id: string
  title: string
  label: string
  date: string
  description: string
  url: string
  image: string
}

export default function Page() {
  const { t } = useTranslation()

  const list = t('pages.releases.list', { returnObjects: true }) as ReleaseItem[]

  if (!Array.isArray(list)) {
    return null
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.grid}>
        {list.map((release) => (
          <Card key={release.id} sx={styles.card} variant='outlined'>
            <CardActionArea
              href={release.url}
              target='_blank'
              rel='noopener noreferrer'
              sx={styles.actionArea}
            >
              <Box sx={styles.mediaWrap}>
                <CardMedia
                  component='img'
                  image={release.image}
                  alt={release.title}
                  sx={styles.media}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling
                    if (fallback) (fallback as HTMLElement).style.display = 'flex'
                  }}
                />
                <Box sx={styles.mediaFallback} aria-hidden>
                  <AlbumIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
                </Box>
              </Box>

              <CardContent sx={styles.content}>
                <Typography variant='overline' color='primary' sx={styles.label}>
                  {release.label}
                </Typography>

                <Typography component='h2' variant='h6' sx={styles.releaseTitle}>
                  {release.title}
                </Typography>

                <Typography variant='body2' color='text.secondary' sx={styles.date}>
                  {release.date}
                </Typography>

                <Typography variant='body2' sx={styles.description}>
                  {release.description}
                </Typography>

                <Typography variant='button' color='primary' sx={styles.cta}>
                  {t('pages.releases.listenOnBandcamp')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
