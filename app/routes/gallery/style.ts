export const styles = {
  root: {
    maxWidth: 900,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  desktopButton: {
    display: { xs: 'none', sm: 'inline-flex' },
    alignSelf: 'flex-end',
    mb: 3,
    textTransform: 'none',
    '&.Mui-disabled': {
      borderColor: 'divider',
      color: 'text.secondary',
    },
  },
  grid: {
    columnCount: { xs: 1, sm: 2 },
    columnGap: 2,
  },
  item: {
    position: 'relative',
    breakInside: 'avoid',
    mb: 2,
  },
  image: {
    width: '100%',
    display: 'block',
    borderRadius: 1,
    transition: 'opacity 0.3s ease-in',
  },
  skeleton: {
    position: 'absolute',
    inset: 0,
    height: '100%',
    borderRadius: 1,
  },
  fab: {
    position: 'fixed',
    bottom: 96,
    left: '50%',
    transform: 'translateX(-50%)',
    display: { xs: 'flex', sm: 'none' },
    textTransform: 'none',
    whiteSpace: 'nowrap',
    borderRadius: 8,
    px: 3,
    zIndex: 1100,
    '&.Mui-disabled': {
      bgcolor: 'primary.main',
      color: 'text.secondary',
      opacity: 0.6,
    },
  },
}
