import Header from '@/components/header/header'
import SectionNav from '@/components/section-nav/section-nav'
import { useHashScroll } from '@/hooks/use-hash-scroll'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import { getDict, langFromPath } from '@/i18n'
import BioSection from '@/sections/bio/section'
import ContactSection from '@/sections/contact/section'
import MediaSection from '@/sections/media/section'
import MusicSection from '@/sections/music/section'
import RiderSection from '@/sections/rider/section'
import { SECTIONS } from '@/sections/sections'
import { pageMeta } from '@/seo'
import s from './style.module.css'

import type { Route } from './+types/page'

export const meta: Route.MetaFunction = ({ location }) => {
  const lang = langFromPath(location.pathname)
  const { title, description } = getDict(lang).meta
  return pageMeta({ lang, path: '/', title, description })
}

export default function Page() {
  const active = useScrollSpy(SECTIONS)
  useHashScroll()

  return (
    <>
      <Header active={active} />
      <main className={s.main}>
        <BioSection />
        <MusicSection />
        <MediaSection />
        <RiderSection />
        <ContactSection />
      </main>
      <SectionNav variant='bottom' active={active} />
    </>
  )
}
