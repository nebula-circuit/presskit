import { useMediaQuery } from '@mui/material'
import { theme } from '@/theme'

export function useIsMobile() {
  return useMediaQuery(theme.breakpoints.down('sm'))
}
