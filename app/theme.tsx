import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'

const base = import.meta.env.BASE_URL

const fontFaces = `
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('${base}assets/fonts/JetBrainsMono-latin-ext.woff2') format('woff2');
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF,
      U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020,
      U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('${base}assets/fonts/JetBrainsMono-latin.woff2') format('woff2');
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193,
      U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

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
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
          },
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
      <GlobalStyles styles={fontFaces} />
      {children}
    </ThemeProvider>
  )
}
