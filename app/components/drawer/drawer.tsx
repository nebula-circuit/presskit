import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '@/components/language-switch/language-switch'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { Routes } from '@/routes'
import { styles, NavListItemButton } from './style'

const navKeys: Record<string, string> = {
  [Routes.INTRO]: 'nav.intro',
  [Routes.RELEASES]: 'nav.releases',
  [Routes.LIVE_SETUP]: 'nav.liveSetup',
  [Routes.GALLERY]: 'nav.gallery',
  [Routes.TECHNICAL_RIDER]: 'nav.technicalRider',
}

interface NavDrawerProps {
  open: boolean
  onClose: () => void
  pathname: string
  navItems: readonly string[]
}

export default function NavDrawer({ open, onClose, pathname, navItems }: NavDrawerProps) {
  const { t } = useTranslation()

  const isMobile = useIsMobile()

  return (
    <nav>
      <Drawer
        variant='temporary'
        open={open}
        onClose={onClose}
        sx={styles.drawerContainer}
        ModalProps={{
          keepMounted: true, // NOTE: Better open performance on mobile
        }}
      >
        <Box>
          <Typography variant='h6' sx={styles.navTitle}>
            {t('nav.brand')}
          </Typography>

          <Divider />

          <Box sx={styles.navListContainer}>
            <List onClick={onClose}>
              {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <NavListItemButton component={Link} to={item} $active={pathname === `/${item}`}>
                    <ListItemText primary={t(navKeys[item] ?? item)} />
                  </NavListItemButton>
                </ListItem>
              ))}
            </List>

            {isMobile && (
              <Box sx={styles.languageSwitchContainer}>
                <LanguageSwitch />
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </nav>
  )
}
