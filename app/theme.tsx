import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: '#0a0b0f',
          paper: '#12141c',
        },
        primary: {
          main: '#00e5ff',
          light: '#6effff',
          dark: '#00b2cc',
        },
        secondary: {
          main: '#e040fb',
          light: '#ea80fc',
          dark: '#aa00c7',
        },
        text: {
          primary: '#e8e8ec',
          secondary: '#8a8a9a',
          disabled: '#5a5a68',
        },
        divider: 'rgba(0, 229, 255, 0.12)',
        error: { main: '#ff5252' },
        success: { main: '#00e676' },
        warning: { main: '#ffab40' },
        info: { main: '#00e5ff' },
      },
    },
    light: {
      palette: {
        background: {
          default: '#0f1117',
          paper: '#181b24',
        },
        primary: {
          main: '#00b8d4',
          light: '#5efce8',
          dark: '#0097a7',
        },
        secondary: {
          main: '#d500f9',
          light: '#ff5bff',
          dark: '#9e00c5',
        },
        text: {
          primary: '#c5c6d0',
          secondary: '#7a7b8a',
          disabled: '#4a4b58',
        },
        divider: 'rgba(0, 184, 212, 0.15)',
      },
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "SF Mono", "Fira Code", monospace',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'var(--mui-palette-background-paper)',
          borderBottom: '1px solid var(--mui-palette-divider)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

export { theme }

interface AppThemeProps {
  children: React.ReactNode
}

export default function AppTheme({ children }: AppThemeProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
