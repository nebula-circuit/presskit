export const styles = {
  root: {
    maxWidth: 900,
    mx: 'auto',
  },
  title: {
    mb: 3,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
    gap: 3,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  actionArea: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    '& > .MuiCardContent-root': {
      flexGrow: 1,
    },
  },
  mediaWrap: {
    position: 'relative',
    paddingTop: '100%',
    overflow: 'hidden',
    bgcolor: 'action.hover',
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mediaFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'left',
    '&:last-child': { pb: 2 },
  },
  label: {
    fontWeight: 600,
    display: 'block',
    mb: 0.5,
  },
  releaseTitle: {
    fontWeight: 600,
    mb: 0.5,
  },
  date: {
    display: 'block',
    mb: 1,
  },
  description: {
    mb: 1.5,
  },
  cta: {
    fontWeight: 600,
  },
  sessionsSection: {
    mt: 5,
  },
  sessionsTitle: {
    fontWeight: 600,
    mb: 2,
  },
  embed: {
    width: '100%',
    border: 'none',
    borderRadius: 1,
    overflow: 'hidden',
  },
}
