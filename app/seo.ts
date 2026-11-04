import type { MetaDescriptor } from 'react-router'
import { type Language, getDict, languages, localePath } from './i18n'

const SITE_URL = 'https://nebula-circuit.github.io/presskit'

interface PageMeta {
  lang: Language
  /** Language-less path, e.g. `/` or `/rider` */
  path: string
  title: string
  description: string
}

export function pageMeta({ lang, path, title, description }: PageMeta): MetaDescriptor[] {
  const url = (l: Language) => `${SITE_URL}${localePath(l, path).replace(/^\/$/, '')}/`
  const image = `${SITE_URL}/assets/img/og.jpg`

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Nebula Circuit' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url(lang) },
    { property: 'og:locale', content: getDict(lang).meta.locale },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: url(lang) },
    ...languages.map((l) => ({ tagName: 'link', rel: 'alternate', hrefLang: l, href: url(l) })),
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: url('es') },
  ]
}
