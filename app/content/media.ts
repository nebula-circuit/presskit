import media from './media.json'

export { media }

export type ResponsiveImage = { base: string; widths: number[]; width: number; height: number }

/** Public asset URL, aware of the GitHub Pages base path */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function srcSet({ base, widths }: ResponsiveImage) {
  return widths.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(', ')
}

/** Mid-size variant as the plain `src` fallback */
export function fallbackSrc({ base, widths }: ResponsiveImage) {
  return asset(`${base}-${widths[Math.floor(widths.length / 2)]}.webp`)
}

export function formatMB(bytes: number) {
  return `${Math.round(bytes / 1_000_000)} MB`
}
