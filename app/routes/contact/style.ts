export const styles = {
  root: {
    maxWidth: 720,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    py: { xs: 4, sm: 8 },
  },
  emailButton: {
    textTransform: 'none',
    fontSize: { xs: '0.85rem', sm: '1.1rem' },
    mb: 5,
    px: { xs: 2.5, sm: 4 },
    py: { xs: 1, sm: 1.5 },
  },
  socials: {
    display: 'flex',
    gap: 3,
  },
  socialLink: {
    color: 'text.secondary',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'primary.main',
    },
  },
}
