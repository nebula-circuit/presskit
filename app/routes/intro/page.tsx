import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ContentCopy from '@mui/icons-material/ContentCopy'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

export default function Page() {
  const { t } = useTranslation()
  const { copyToClipboard, copiedWhich } = useCopyToClipboard()

  const shortBioText = t('bio.short')

  return (
    <Box sx={styles.root}>
      <Box component='section' sx={styles.bgImage} />

      <Box sx={styles.content}>
        <Paper variant='outlined' sx={styles.paper}>
          <Box sx={styles.sectionHeader}>
            <Typography variant='overline' color='primary' sx={styles.overline}>
              {t('pages.intro.bioTitle')}
            </Typography>

            <Button
              size='small'
              variant='outlined'
              startIcon={<ContentCopy />}
              onClick={() => copyToClipboard(shortBioText, 'short')}
              sx={styles.copyButton}
            >
              {copiedWhich === 'short' ? t('pages.intro.copied') : t('pages.intro.copyBio')}
            </Button>
          </Box>

          <Typography variant='body1' sx={styles.shortBioText}>
            {shortBioText}
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
