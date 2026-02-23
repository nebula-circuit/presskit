import { type SyntheticEvent, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Routes } from '@/routes'
import NavDrawer from '@/components/drawer/drawer'
import LanguageSwitch from '@/components/language-switch/language-switch'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { socialLinks } from '@/config/const'
import { styles } from './style'

const navItems = Object.values(Routes)

const navKeys: Record<string, string> = {
  [Routes.INTRO]: 'nav.intro',
  [Routes.RELEASES]: 'nav.releases',
  [Routes.LIVE_SETUP]: 'nav.liveSetup',
  [Routes.GALLERY]: 'nav.gallery',
  [Routes.TECHNICAL_RIDER]: 'nav.technicalRider',
  [Routes.CONTACT]: 'nav.contact',
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const isMobile = useIsMobile()

  const tabValue = Math.max(
    0,
    navItems.findIndex((item) => pathname === `/${item}`)
  )

  const handleGoToAbout = () => {
    setMobileOpen(false)
    navigate(Routes.INTRO)
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    navigate(navItems[newValue])
  }

  return (
    <Box sx={styles.layout}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.title}>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              color='primary'
              sx={styles.titleText}
              onClick={handleGoToAbout}
            >
              {t('nav.brand')}
            </Typography>

            <Typography
              component='span'
              variant='caption'
              color='text.primary'
              sx={styles.titleSubtitle}
              onClick={handleGoToAbout}
            >
              {t('nav.subtitle')}
            </Typography>
          </Box>

          <IconButton
            aria-label={t('nav.openDrawer')}
            edge='start'
            size='large'
            onClick={handleDrawerToggle}
            sx={styles.navMobileButton}
          >
            <MenuIcon />
          </IconButton>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='navigation tabs'
            sx={styles.navButtonsContainer}
          >
            {navItems.map((item, idx) => (
              <Tab
                key={item}
                id={`nav-tab-${idx}`}
                aria-controls={`nav-tabpanel-${idx}`}
                label={t(navKeys[item] ?? item)}
              />
            ))}
          </Tabs>

          {!isMobile && (
            <Box sx={styles.languageSwitchContainer}>
              <LanguageSwitch />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <NavDrawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        pathname={pathname}
        navItems={navItems}
      />

      <Box component='main' sx={styles.mainContainer}>
        <Toolbar />
        <Outlet />
      </Box>

      <Box component='footer' sx={styles.footer}>
        {socialLinks.map((link) => {
          const Icon = link.Icon

          return (
            <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
              <Icon size={20} aria-hidden />
              {t(link.label)}
            </a>
          )
        })}
      </Box>
    </Box>
  )
}
