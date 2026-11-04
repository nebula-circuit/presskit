import { useLocation } from 'react-router'
import en from './locales/en.json'
import es from './locales/es.json'

export const languages = ['es', 'en'] as const
export type Language = (typeof languages)[number]
export type Dict = typeof es

const dicts: Record<Language, Dict> = { es, en }

// Spanish lives at the root, English under /en
export function langFromPath(pathname: string): Language {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es'
}

/** Path without the language prefix, e.g. `/en/rider` → `/rider` */
export function stripLang(pathname: string) {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/'
}

export function localePath(lang: Language, path = '/') {
  if (lang === 'es') return path
  return path === '/' ? '/en' : `/en${path}`
}

export function getDict(lang: Language) {
  return dicts[lang]
}

export function useLang() {
  return langFromPath(useLocation().pathname)
}

export function useT() {
  return dicts[useLang()]
}

export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}
