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

interface SessionItem {
  title: string
  url: string
}

export default function Page() {
  const { t } = useTranslation()

  const list = t('pages.releases.list', { returnObjects: true }) as ReleaseItem[]
  const sessions = t('pages.releases.sessions', { returnObjects: true }) as SessionItem[]

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
                  image={`${import.meta.env.BASE_URL}${release.image.replace(/^\//, '')}`}
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

      {Array.isArray(sessions) && sessions.length > 0 && (
        <Box sx={styles.sessionsSection}>
          <Typography variant='subtitle1' sx={styles.sessionsTitle}>
            {t('pages.releases.sessionsTitle')}
          </Typography>

          {sessions.map((session) => (
            <Box
              key={session.url}
              component='iframe'
              title={session.title}
              src={scEmbedSrc(session.url)}
              allow='autoplay'
              loading='lazy'
              sx={styles.embed}
              height={166}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

// Aux
function scEmbedSrc(trackUrl: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%2300e5ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
}
