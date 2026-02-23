import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

export default function Page() {
  const { t } = useTranslation()

  const techItems = t('pages.technicalRider.tech.items', { returnObjects: true }) as string[]

  return (
    <Box sx={styles.root}>
      <Typography variant='subtitle1' sx={styles.sectionTitle}>
        {t('pages.technicalRider.general.title')}
      </Typography>
      <Typography variant='body1' sx={styles.text}>
        {t('pages.technicalRider.general.text')}
      </Typography>

      <Typography variant='subtitle1' sx={styles.sectionTitle}>
        {t('pages.technicalRider.tech.title')}
      </Typography>
      {Array.isArray(techItems) && (
        <Box component='ul' sx={styles.list}>
          {techItems.map((item, i) => (
            <Typography key={i} component='li' variant='body1'>
              {item}
            </Typography>
          ))}
        </Box>
      )}

      <Typography variant='subtitle1' sx={styles.sectionTitle}>
        {t('pages.technicalRider.stage.title')}
      </Typography>
      <Typography variant='body1' sx={styles.text}>
        {t('pages.technicalRider.stage.text')}
      </Typography>

      <Typography variant='subtitle1' sx={styles.sectionTitle}>
        {t('pages.technicalRider.arrival.title')}
      </Typography>
      <Typography variant='body1' sx={styles.text}>
        {t('pages.technicalRider.arrival.text')}
      </Typography>
    </Box>
  )
}
