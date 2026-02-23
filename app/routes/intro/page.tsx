import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ContentCopy from '@mui/icons-material/ContentCopy'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { parseLinks, stripLinks } from '@/utils/parse-links'
import { useTranslation } from 'react-i18next'
import { styles } from './style'

export default function Page() {
  const { t } = useTranslation()
  const longBioParagraphs = t('bio.long', { returnObjects: true }) as string[]

  const { copyToClipboard, copiedWhich } = useCopyToClipboard()

  const shortBioText = t('bio.short')

  const longBioText = Array.isArray(longBioParagraphs)
    ? stripLinks(longBioParagraphs.join('\n\n'))
    : ''

  return (
    <Box sx={styles.root}>
      <Box component='section' sx={styles.bgImage} />

      <Box sx={styles.content}>
        <Paper variant='outlined' sx={styles.paper}>
          <Box sx={styles.sectionHeader}>
            <Typography variant='overline' color='primary' sx={styles.overline}>
              {t('pages.intro.shortBioTitle')}
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

        <Box sx={styles.sectionHeader}>
          <Typography variant='overline' color='primary' sx={styles.overline}>
            {t('pages.intro.longBioTitle')}
          </Typography>

          <Button
            size='small'
            variant='outlined'
            startIcon={<ContentCopy />}
            onClick={() => copyToClipboard(longBioText, 'long')}
            sx={styles.copyButton}
          >
            {copiedWhich === 'long' ? t('pages.intro.copied') : t('pages.intro.copyBio')}
          </Button>
        </Box>

        <Box component='section' sx={styles.longBioSection}>
          {Array.isArray(longBioParagraphs) &&
            longBioParagraphs.map((paragraph, i) => (
              <Typography key={i} variant='body1'>
                {parseLinks(paragraph)}
              </Typography>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
