import type React from 'react'
import { styled } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'

const DRAWER_WIDTH = 240

export const styles = {
  drawerContainer: {
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: DRAWER_WIDTH,
    },
  },
  navTitle: {
    my: 2,
    textAlign: 'center',
  },
  navListContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
  },
  languageSwitchContainer: {
    textAlign: 'center',
  },
}

export const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active?: boolean; component?: React.ElementType; to?: string }>(({ theme, $active }) => ({
  textAlign: 'center',
  color: $active ? theme.palette.primary.main : theme.palette.text.primary,
  textDecoration: $active ? 'underline' : 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))
