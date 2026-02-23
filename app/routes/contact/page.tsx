import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { socialLinks } from '@/config/const'
import { styles } from './style'

export default function Page() {
  const { t } = useTranslation()
  const email = t('pages.contact.email')

  const { copyToClipboard, copiedWhich } = useCopyToClipboard()

  return (
    <Box sx={styles.root}>
      <Button
        variant='outlined'
        startIcon={<EmailOutlined />}
        onClick={() => copyToClipboard(email, 'short')}
        sx={styles.emailButton}
      >
        {copiedWhich === 'short' ? t('pages.intro.copied') : email}
      </Button>

      <Box sx={styles.socials}>
        {socialLinks.map(({ href, Icon, label }) => (
          <IconButton
            key={href}
            component='a'
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t(label)}
            sx={styles.socialLink}
          >
            <Icon size={24} />
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}
