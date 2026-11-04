import { DiscogsIcon, InstagramIcon, SoundCloudIcon } from '@/components/icons/icons'

export const socialLinks = [
  {
    key: 'instagram',
    href: 'https://instagram.com/nebulacircuit',
    Icon: InstagramIcon,
  },
  {
    key: 'soundcloud',
    href: 'https://soundcloud.com/nebulacircuit',
    Icon: SoundCloudIcon,
  },
  {
    key: 'discogs',
    href: 'https://www.discogs.com/artist/16008693-Nebula-Circuit',
    Icon: DiscogsIcon,
  },
] as const
