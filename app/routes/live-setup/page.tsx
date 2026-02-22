import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

export default function Page() {
  const { t } = useTranslation()
  const routing = t('pages.liveSetup.routing', { returnObjects: true }) as string[]

  return (
    <Box sx={styles.root}>
      <Box
        component='img'
        src={`${import.meta.env.BASE_URL}${String(t('pages.liveSetup.image')).replace(/^\//, '')}`}
        alt='Live setup'
        sx={styles.image}
      />

      <Typography variant='body1' sx={styles.intro}>
        {t('pages.liveSetup.intro')}
      </Typography>

      <Box sx={styles.gearBlock}>
        <Typography variant='body1'>{t('pages.liveSetup.darkTrinity')}</Typography>
        <Typography variant='body1'>{t('pages.liveSetup.pill')}</Typography>
        <Typography variant='body1'>{t('pages.liveSetup.goldenMaster')}</Typography>
      </Box>

      <Typography variant='subtitle1' sx={styles.routingTitle}>
        {t('pages.liveSetup.routingTitle')}
      </Typography>
      {Array.isArray(routing) && (
        <Box component='ul' sx={styles.routingList}>
          {routing.map((item, i) => (
            <Typography key={i} component='li' variant='body1'>
              {item}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  )
}
