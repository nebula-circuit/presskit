import { theme } from '../../theme'

const BG_IMAGE = `${import.meta.env.BASE_URL}assets/img/bg.jpg`

export const styles = {
  root: {
    minHeight: '100%',
  },
  bgImage: {
    position: 'relative',
    minHeight: { xs: '35vh', md: '45vh' },
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${BG_IMAGE})`,
      backgroundSize: '60%',
      backgroundPosition: 'center',
      filter: 'grayscale(100%)',
      zIndex: 0,
      [theme.breakpoints.down('sm')]: {
        backgroundSize: '160%',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(to top, rgba(10,11,15,0.95) 0%, rgba(10,11,15,0.5) 40%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: 720,
    mx: 'auto',
    px: 2,
    pb: 3,
    pt: 4,
  },
  heroTitle: {
    textShadow: '0 2px 12px rgba(0,0,0,0.8)',
  },
  content: {
    maxWidth: 720,
    mx: 'auto',
    px: 2,
    pt: 2,
    pb: 4,
    mt: { xs: 0, md: -4 },
    position: 'relative',
    zIndex: 1,
  },
  paper: {
    p: 2.5,
    mb: 4,
    borderColor: 'primary.main',
    borderWidth: 1,
    bgcolor: 'action.hover',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1,
    mb: 2,
  },
  overline: {
    fontWeight: 600,
  },
  copyButton: {
    textTransform: 'none',
  },
  shortBioText: {
    whiteSpace: 'pre-line',
  },
  longBioSection: {
    '& > p': { mb: 2 },
  },
}
