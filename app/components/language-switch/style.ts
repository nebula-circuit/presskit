import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const LangButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active?: boolean }>(({ theme, $active }) => ({
  minWidth: 40,
  ...($active && {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  }),
}))
