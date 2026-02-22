import { theme } from '../../theme'

export const styles = {
  toolbar: {
    pr: { xs: 1, sm: 2 },
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  titleText: {
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: 600,
  },
  titleSubtitle: {
    cursor: 'pointer',
    fontSize: '0.7rem',
    opacity: 0.85,
    letterSpacing: '0.1em',
  },
  navMobileButton: {
    ml: 'auto',
    display: { sm: 'none' },
    color: 'text.primary',
  },
  navButtonsContainer: {
    display: { xs: 'none', sm: 'block' },
  },
  languageSwitchContainer: {
    mr: 'auto',
    ml: { xs: 0, sm: 2 },
  },
  mainContainer: {
    flex: 1,
    p: 3,
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    py: 1.5,
    px: 2,
    borderTop: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
    zIndex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 3,
    [theme.breakpoints.down('sm')]: {
      gap: 2,
    },
    '& a': {
      color: 'primary.main',
      textDecoration: 'none',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: 0.75,
      '&:hover': { color: 'primary.light', textDecoration: 'underline' },
    },
  },
}
