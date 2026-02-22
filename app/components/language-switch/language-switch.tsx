import ButtonGroup from '@mui/material/ButtonGroup'
import { useTranslation } from 'react-i18next'
import { type Language, languages, setStoredLanguage } from '../../i18n'
import { LangButton } from './style'

export default function LanguageSwitch() {
  const { i18n } = useTranslation()

  const currentLang = (i18n.language?.slice(0, 2) || 'es') as Language
  const effectiveLang = languages.includes(currentLang) ? currentLang : 'es'

  const handleChange = (lng: Language) => {
    i18n.changeLanguage(lng)
    setStoredLanguage(lng)

    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng
    }
  }

  return (
    <ButtonGroup size='small' variant='text' aria-label='Language'>
      {languages.map((lng) => (
        <LangButton
          key={lng}
          $active={effectiveLang === lng}
          onClick={() => handleChange(lng)}
          aria-pressed={effectiveLang === lng}
        >
          {lng.toUpperCase()}
        </LangButton>
      ))}
    </ButtonGroup>
  )
}
