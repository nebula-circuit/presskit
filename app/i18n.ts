import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

const LANG_KEY = 'app-lang'

export const languages = ['es', 'en'] as const
export type Language = (typeof languages)[number]

const stored = typeof window !== 'undefined' ? localStorage.getItem(LANG_KEY) : null
const defaultLang: Language =
  stored && languages.includes(stored as Language) ? (stored as Language) : 'es'

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: defaultLang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
})

export function setStoredLanguage(lng: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANG_KEY, lng)
  }
}

export default i18n
