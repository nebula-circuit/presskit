import type { ReactNode, SVGProps } from 'react'

// Minimal stroke icons drawn to match the hardware-panel look (replaces react-icons + MUI icons)
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 18, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.75}
      strokeLinecap='square'
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      {children}
    </svg>
  )
}

export const CopyIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x='8' y='8' width='12' height='12' />
    <path d='M16 8V4H4v12h4' />
  </Icon>
)

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M4 12l5 5L20 6' />
  </Icon>
)

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M12 4v11M7 10l5 5 5-5M4 20h16' />
  </Icon>
)

export const ArrowUpRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M7 17L17 7M8 7h9v9' />
  </Icon>
)

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M20 12H5M11 6l-6 6 6 6' />
  </Icon>
)

export const PlayIcon = (p: IconProps) => (
  <Icon {...p} fill='currentColor' stroke='none'>
    <path d='M7 4.5v15L19.5 12z' />
  </Icon>
)

export const PrintIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M6 9V3h12v6M6 18H3v-9h18v9h-3' />
    <rect x='6' y='14' width='12' height='7' />
  </Icon>
)

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x='3' y='5' width='18' height='14' />
    <path d='M3 6l9 7 9-7' />
  </Icon>
)

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x='3' y='3' width='18' height='18' rx='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.5' cy='6.5' r='0.6' fill='currentColor' />
  </Icon>
)

export const SoundCloudIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d='M11 8.5V18M8 11v7M5 12.5V18M2 14.5V18' />
    <path d='M14 18h5a3 3 0 0 0 .4-6 5 5 0 0 0-5.4-4.5V18' />
  </Icon>
)

export const DiscogsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx='12' cy='12' r='9' />
    <circle cx='12' cy='12' r='5.5' />
    <circle cx='12' cy='12' r='1.5' fill='currentColor' />
  </Icon>
)
